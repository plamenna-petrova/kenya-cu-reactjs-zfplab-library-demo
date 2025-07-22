import Tremol from "../assets/js/fp";

const DEFAULT_ZFP_LAB_SERVER_ADDRESS = "http://localhost:4444";

const TREMOL_FP_DATE_FORMAT = "dd-MM-yyyy HH:mm:ss";

// Requests

export const readStatus = () => {
  const readStatusResponse = sendXHRRequest("GET", '/ReadStatus', null);
  return analyzeZFPLabServerResponseData(readStatusResponse);
};

export const readStatusZFPCommand = () => {
  return sendZFPCommand("ReadStatus");
}

export const readVersion = () => {
  const readVersionResponse = sendXHRRequest("GET", '/ReadVersion', null);
  return analyzeZFPLabServerResponseData(readVersionResponse);
};

export const readVersionZFPCommand = () => { 
  return sendZFPCommand("ReadVersion");
}

export const openCreditNoteWithFreeCustomerDataManually = (
  companyName,
  clientPINNumber,
  headquarters,
  address,
  postalCodeAndCity,
  exemptionNumber,
  relatedInvoiceNumber,
  traderSystemInvoiceNumber,
) => {
  const zfpCommandName = "OpenCreditNoteWithFreeCustomerData";

  const openCreditNoteWithFreeCustomerDataParams = [];
  
  if (companyName) {
    openCreditNoteWithFreeCustomerDataParams.push(`CompanyName=${companyName}`);
  }

  if (clientPINNumber) {
    openCreditNoteWithFreeCustomerDataParams.push(`ClientPINnum=${clientPINNumber}`);
  }

  if (headquarters) {
    openCreditNoteWithFreeCustomerDataParams.push(`HeadQuarters=${headquarters}`);
  }

  if (address) {
    openCreditNoteWithFreeCustomerDataParams.push(`Address=${address}`);
  }

  if (postalCodeAndCity) {
    openCreditNoteWithFreeCustomerDataParams.push(`PostalCodeAndCity=${postalCodeAndCity}`);
  }

  if (exemptionNumber) {
    openCreditNoteWithFreeCustomerDataParams.push(`ExemptionNum=${exemptionNumber}`);
  }

  if (relatedInvoiceNumber) {
    openCreditNoteWithFreeCustomerDataParams.push(`RelatedInvoiceNum=${relatedInvoiceNumber}`);
  }

  if (traderSystemInvoiceNumber) {
    openCreditNoteWithFreeCustomerDataParams.push(`TraderSystemInvNum=${traderSystemInvoiceNumber}`);
  }

  const openCreditNoteWithFreeCustomerDataQuery = `/${zfpCommandName}(${openCreditNoteWithFreeCustomerDataParams.join(",")})`;

  const openCreditNoteWithFreeCustomerDataResponse = sendXHRRequest(
    "GET", openCreditNoteWithFreeCustomerDataQuery, null
  );

  return analyzeZFPLabServerResponseData(openCreditNoteWithFreeCustomerDataResponse);
};

export const openCreditNoteWithFreeCustomerData = (
  companyName,
  clientPINNumber,
  headquarters,
  address,
  postalCodeAndCity,
  exemptionNumber,
  relatedInvoiceNumber,
  traderSystemInvoiceNumber,
) => {
  const zfpCommandName = "OpenCreditNoteWithFreeCustomerData";
  
  const openCreditNoteWithFreeCustomerDataParams = {
    CompanyName: companyName,
    ClientPINnum: clientPINNumber,
    HeadQuarters: headquarters,
    Address: address,
    PostalCodeAndCity: postalCodeAndCity,
    ExemptionNum: exemptionNumber,
    RelatedInvoiceNum: relatedInvoiceNumber,
    TraderSystemInvNum: traderSystemInvoiceNumber,
  };

  const openCreditNoteWithFreeCustomerDataQueryString = Object.entries(openCreditNoteWithFreeCustomerDataParams)
    .filter(([, value]) => value !== null && value !== undefined) 
    .map(([key, value]) => `${key}=${value}`)
    .join(",");

  const openCreditNoteWithFreeCustomerDataResponse = sendXHRRequest(
    "GET", `/${zfpCommandName}(${openCreditNoteWithFreeCustomerDataQueryString})`, null
  );

  return analyzeZFPLabServerResponseData(openCreditNoteWithFreeCustomerDataResponse);
};

export const openCreditNoteWithFreeCustomerDataZFPCommand = (
  companyName,
  clientPINNumber,
  headquarters,
  address,
  postalCodeAndCity,
  exemptionNumber,
  relatedInvoiceNumber,
  traderSystemInvoiceNumber,
) => {
  const zfpCommandName = "OpenCreditNoteWithFreeCustomerData";
  
  const openCreditNoteWithFreeCustomerDataParams = {
    CompanyName: companyName,
    ClientPINnum: clientPINNumber,
    HeadQuarters: headquarters,
    Address: address,
    PostalCodeAndCity: postalCodeAndCity,
    ExemptionNum: exemptionNumber,
    RelatedInvoiceNum: relatedInvoiceNumber,
    TraderSystemInvNum: traderSystemInvoiceNumber,
  };

  return sendZFPCommand(zfpCommandName, openCreditNoteWithFreeCustomerDataParams);
};

export const saveLog = () => {
  const logQuery = `/log()`;
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

export const sendZFPCommand = (commandName, commandParams = {}) => {
  const commandQuery = Object.entries(commandParams)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join(",");

  const endpoint = `/${commandName}${commandQuery ? `(${commandQuery})` : ""}`;

  const zfpCommandResponse = sendXHRRequest("GET", endpoint, null);

  return analyzeZFPLabServerResponseData(zfpCommandResponse);
};

const addParam = (params, key, value) => {
  if (value) {
    params.push(`${key}=${sanitizeString(value)}`);
  }
};

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

const sanitizeString = (value) => String(value).replace(/[,()]/g, " ");

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