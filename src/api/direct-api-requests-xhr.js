import Tremol from "../assets/js/fp";

const DEFAULT_ZFP_LAB_SERVER_ADDRESS = "http://localhost:4444";

const TREMOL_FP_DATE_FORMAT = "dd-MM-yyyy HH:mm:ss";

// Requests

export const readStatus = () => {
  const readStatusCommandXML = `<Command Name="ReadStatus"></Command>`;
  const readStatusResponse = sendXHRRequest("POST", "/ReadStatus", readStatusCommandXML);
  return analyzeZFPLabServerResponseData(readStatusResponse);
};

export const readVersion = () => {
  const readStatusCommandXML = `<Command Name="ReadVersion"></Command>`;
  const readStatusResponse = sendXHRRequest("POST", "/ReadVersion", readStatusCommandXML);
  return analyzeZFPLabServerResponseData(readStatusResponse);
};

export const openCreditNoteWithFreeCustomerData = (
  companyName,
  clientPINNumber,
  headquarters,
  address,
  postalCodeAndCity,
  exemptionNumber,
  relatedInvoiceNumber,
  traderSystemInvoiceNumber
) => {
  const zfpCommandName = "OpenCreditNoteWithFreeCustomerData";

  const openCreditNoteWithFreeCustomerDataXMLString = `
    <Command Name="${zfpCommandName}">
      <Args>
        <Arg Name="CompanyName" Value="${companyName}" />
        <Arg Name="ClientPINnum" Value="${clientPINNumber}" />
        <Arg Name="HeadQuarters" Value="${headquarters}" />
        <Arg Name="Address" Value="${address}" />
        <Arg Name="PostalCodeAndCity" Value="${postalCodeAndCity}" />
        <Arg Name="ExemptionNum" Value="${exemptionNumber}" />
        <Arg Name="RelatedInvoiceNum" Value="${relatedInvoiceNumber}" />
        <Arg Name="TraderSystemInvNum" Value="${traderSystemInvoiceNumber}" />
      </Args>
    </Command>
  `.trim();

  const openCreditNoteWithFreeCustomerDataResponse = sendXHRRequest("POST", "", openCreditNoteWithFreeCustomerDataXMLString);

  return analyzeZFPLabServerResponseData(openCreditNoteWithFreeCustomerDataResponse);
};

export const openCreditNoteWithFreeCustomerDataWithArgsParsing = (
  companyName,
  clientPINNumber,
  headquarters,
  address,
  postalCodeAndCity,
  exemptionNumber,
  relatedInvoiceNumber,
  traderSystemInvoiceNumber
) => {
  const openCreditNoteWithFreeCustomerDataArgs = [
    "CompanyName", companyName,
    "ClientPINnum", clientPINNumber,
    "HeadQuarters", headquarters,
    "Address", address,
    "PostalCodeAndCity", postalCodeAndCity,
    "ExemptionNum", exemptionNumber,
    "RelatedInvoiceNum", relatedInvoiceNumber,
    "TraderSystemInvNum", traderSystemInvoiceNumber
  ];

  const openCreditNoteWithFreeCustomerDataXML = buildZFPCommandXMLFromArgs(
    "OpenCreditNoteWithFreeCustomerData", ...openCreditNoteWithFreeCustomerDataArgs
  );

  const openCreditNoteWithFreeCustomerDataResponse = sendXHRRequest("POST", "", openCreditNoteWithFreeCustomerDataXML);

  return analyzeZFPLabServerResponseData(openCreditNoteWithFreeCustomerDataResponse);
};

export const saveLog = () => {
  const logQuery = `/log`;
  const serverLogXML = sendXHRRequest("GET", logQuery, null);

  const serializedLogString = new XMLSerializer().serializeToString(serverLogXML);

  const blob = new Blob([serializedLogString], { type: "text/plain" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = generateExportFileName('zfp_lab_server_log', '.txt');
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Core Logic

const sendXHRRequest = function (verb, endpoint, data, clientId) {
  const xmlHttpRequest = new XMLHttpRequest();
  const domParser = new DOMParser();
  const url = `${DEFAULT_ZFP_LAB_SERVER_ADDRESS}${endpoint}${clientId ? `?client=${clientId}` : ''}`;

  try {
    xmlHttpRequest.open(verb, url, false);
    xmlHttpRequest.setRequestHeader("Content-Type", "text/plain");

    xmlHttpRequest.send(data);

    if (xmlHttpRequest.status !== 200) {
      throw new Error(`HTTP ${xmlHttpRequest.status} - ${xmlHttpRequest.statusText}`);
    }

    let xmlResponse = xmlHttpRequest.responseXML;

    if (!xmlResponse || !xmlResponse.documentElement) {
      try {
        if (xmlHttpRequest.responseText && xmlHttpRequest.responseText.length > 0) {
          xmlResponse = domParser.parseFromString(xmlHttpRequest.responseText, "application/xml");
        } else {
          throw new Error();
        }
      } catch {
        throw new Tremol.ServerError("Server response missing", Tremol.ServerErrorType.ServerResponseMissing);
      }
    }

    throwOnServerError(xmlResponse);

    return xmlResponse;
  } catch (error) {
    if (error instanceof Tremol.ServerError) {
      throw error;
    } else {
      throw new Tremol.ServerError(`Server connection error (${error.message})`, Tremol.ServerErrorType.ServerConnectionError);
    }
  }
};

const throwOnServerError = (resp) => {
  const resRoot = resp.getElementsByTagName("Res")[0];
  const resCode = Number(resRoot.getAttribute("Code"));

  if (resCode !== 0) {
    const errorNode = resp.getElementsByTagName("Err")[0];
    const errorMessage = resp.getElementsByTagName("Message")[0].firstChild.data;

    if (resCode === 40) {
      const ste1 = parseInt(errorNode.getAttribute("STE1"), 16);
      const ste2 = parseInt(errorNode.getAttribute("STE2"), 16);
      const fpLibErrorCode = parseInt(errorNode.getAttribute("FPLibErrorCode"), 16);
      throw new Tremol.ServerError(errorMessage, resCode, ste1, ste2, fpLibErrorCode);
    }
    else {
      throw new Tremol.ServerError(errorMessage, resCode);
    }
  }
}

const analyzeZFPLabServerResponseData = (zfpLabServerResponseXMLDocument) => {
  const resRootElement = zfpLabServerResponseXMLDocument.getElementsByTagName("Res")[0];
  const resChildElements = resRootElement.getElementsByTagName("Res");

  const resultObject = {};

  let i = 0;

  for (; i < resChildElements.length; i++) {
    const currentResChildElement = resChildElements[i];
    const currentResChildElementNameAttribute = currentResChildElement.getAttribute("Name");
    const currentResChildElementTypeAttribute = currentResChildElement.getAttribute("Type");
    const currentResChildElementValueAttribute = currentResChildElement.getAttribute("Value");

    if (currentResChildElementValueAttribute === "@") {
      resultObject[currentResChildElementNameAttribute] = null;
      break;
    }

    if (currentResChildElementNameAttribute === "Reserve") {
      continue;
    }

    switch (currentResChildElementTypeAttribute) {
      case "Text":
        resultObject[currentResChildElementNameAttribute] = currentResChildElementValueAttribute;
        break;
      case "Number":
        resultObject[currentResChildElementNameAttribute] = parseFloat(currentResChildElementValueAttribute);
        break;
      case "Decimal":
        resultObject[currentResChildElementNameAttribute] = parseFloat(currentResChildElementValueAttribute);
        break;
      case "Option":
        resultObject[currentResChildElementNameAttribute] = currentResChildElementValueAttribute;
        break;
      case "DateTime":
        resultObject[currentResChildElementNameAttribute] = parseDateWithCustomFormat(
          currentResChildElementValueAttribute, TREMOL_FP_DATE_FORMAT
        );
        break;
      case "Reserve":
      case "OptionHardcoded":
        continue;
      case "Base64":
        resultObject[currentResChildElementNameAttribute] = base64stringToArrayBuffer(currentResChildElementValueAttribute);
        break;
      case "Decimal_with_format":
        resultObject[currentResChildElementNameAttribute] = parseFloat(currentResChildElementValueAttribute);
        break;
      case "Decimal_plus_80h":
        resultObject[currentResChildElementNameAttribute] = parseFloat(currentResChildElementValueAttribute);
        break;
      case "Status":
        resultObject[currentResChildElementNameAttribute] = currentResChildElementValueAttribute === "1";
        break;
      case "Null":
        resultObject[currentResChildElementNameAttribute] = null;
        break;
      default:
        resultObject[currentResChildElementNameAttribute] = currentResChildElementValueAttribute;
        break;
    }
  }

  if (Object.keys(resultObject).length === 1) {
    return Object.values(resultObject)[0];
  }

  return resultObject;
}

const buildZFPCommandXMLFromArgs = (zfpCommandName, ...args) => {
  try {
    if (args.length < 1) {
      throw new Error("Invalid number of arguments!");
    }

    if ((args.length % 2) !== 0) {
      throw new Error("Invalid number of arguments!");
    }

    let zfpCommandXML = '<Command Name="' + zfpCommandName + '">';

    if (args.length > 1) {
      zfpCommandXML += "<Args>";

      for (let a = 0; a < args.length; a += 2) {
        const argName = args[a];
        const argValue = args[a + 1];

        if (typeof argName === "undefined" || typeof argValue === "undefined" || argName == null || argValue == null) {
          continue;
        }

        if (typeof argValue === "string") {
          zfpCommandXML += `<Arg Name="${argName}" Value="${escapeForXML(argValue)}" />`;
        }
        else if (argValue instanceof Date) {
          zfpCommandXML += `<Arg Name="${argName}" Value="${toTremolFpString(argValue)}" />`;
        }
        else if (argValue instanceof Uint8Array) {
          zfpCommandXML += `<Arg Name="${argName}" Value="${toBase64string(argValue)}" />`;
        }
        else {
          zfpCommandXML += `<Arg Name="${argName}" Value="${escapeForXML(String(argValue))}" />`;
        }
      }

      zfpCommandXML += "</Args>";
    }

    zfpCommandXML += "</Command>";

    console.log(zfpCommandXML);

    return zfpCommandXML;

  } catch (error) {
    if (error instanceof Tremol.ServerError) {
      throw error;
    } else {
      throw new Tremol.ServerError(error.message, Tremol.ServerErrorType.ServerErr)
    }
  }
}

// Utility Functions

export const parseDateWithCustomFormat = (stringParsedAsDate, customDateFormat) => {
  let year = 0;
  let month = 0;
  let date = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  let yearIndex = customDateFormat.indexOf("yyyy");
  let monthIndex = customDateFormat.indexOf("MM");
  let dateIndex = customDateFormat.indexOf("dd");
  let hoursIndex = customDateFormat.indexOf("HH");
  let minutesIndex = customDateFormat.indexOf("mm");
  let secondsIndex = customDateFormat.indexOf("ss");

  if (yearIndex !== -1) {
    year = parseInt(stringParsedAsDate.substring(yearIndex, yearIndex + 4));
  } else {
    yearIndex = customDateFormat.indexOf("yy");

    if (yearIndex !== -1) {
      year = parseInt(stringParsedAsDate.substring(yearIndex, yearIndex + 2));
    }
  }

  if (monthIndex !== -1) {
    month = parseInt(stringParsedAsDate.substring(monthIndex, monthIndex + 2)) - 1;
  }

  if (dateIndex !== -1) {
    date = parseInt(stringParsedAsDate.substring(dateIndex, dateIndex + 2));
  }

  if (hoursIndex !== -1) {
    hours = parseInt(stringParsedAsDate.substring(hoursIndex, hoursIndex + 2));
  }

  if (minutesIndex !== -1) {
    minutes = parseInt(stringParsedAsDate.substring(minutesIndex, minutesIndex + 2));
  }

  if (secondsIndex !== -1) {
    seconds = parseInt(stringParsedAsDate.substring(secondsIndex, secondsIndex + 2));
  }

  return new Date(year, month, date, hours, minutes, seconds);
};

const base64stringToArrayBuffer = (inputString) => {
  const binaryString = window.atob(inputString);
  const binaryStringLength = binaryString.length;
  const uint8BytesArray = new Uint8Array(binaryStringLength);

  for (let i = 0; i < binaryStringLength; i++) {
    uint8BytesArray[i] = binaryString.charCodeAt(i);
  }

  return uint8BytesArray;
};

const toBase64string = (byteArray) => {
  let binaryString = '';

  for (let i = 0; i < byteArray.byteLength; i++) {
    binaryString += String.fromCharCode(byteArray[i]);
  }

  return window.btoa(binaryString);
};

const toTremolFpString = (dateObject = new Date()) => {
  const date = lpad(dateObject.getDate());
  const month = lpad((dateObject.getMonth() + 1));
  const year = lpad(dateObject.getFullYear(), 4);
  const hours = lpad(dateObject.getHours());
  const minutes = lpad(dateObject.getMinutes());
  const seconds = lpad(dateObject.getSeconds());
  return `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

const lpad = (value, size = 2) => {
  return String(value).padStart(size, "0");
};

const escapeForXML = (stringToEscapeForXML) => {
  return stringToEscapeForXML.toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
    .replaceAll("\n", "&#10;")
    .replaceAll("\r", "&#13;");
};

export const generateExportFileName = (fileName, fileExtension) => {
  const currentTimeForFileExport = new Date();

  const generatedFileName =
    `${fileName}_` +
    `${currentTimeForFileExport.getDate() < 10 ? '0' : ''}${currentTimeForFileExport.getDate()}.` +
    `${currentTimeForFileExport.getMonth() + 1 < 10 ? '0' : ''}${currentTimeForFileExport.getMonth() + 1}.` +
    `${currentTimeForFileExport.getFullYear()}_` +
    `${currentTimeForFileExport.getHours() < 10 ? '0' : ''}${currentTimeForFileExport.getHours()}_` +
    `${currentTimeForFileExport.getMinutes() < 10 ? '0' : ''}${currentTimeForFileExport.getMinutes()}_` +
    `${currentTimeForFileExport.getSeconds() < 10 ? '0' : ''}${currentTimeForFileExport.getSeconds()}` +
    `${fileExtension ? `${fileExtension}` : ''}`;

  return generatedFileName;
}