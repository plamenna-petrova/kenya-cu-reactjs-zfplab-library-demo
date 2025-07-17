import Tremol from "../../assets/js/fp";

const DEFAULT_ZFP_LAB_SERVER_ADDRESS = "http://localhost:4444";

const TREMOL_FP_DATE_FORMAT = "dd-MM-yyyy HH:mm:ss";

const APPLICATION_XML = "application/xml";

// Core Logic

const sendXHRRequest = function (verb, endpoint, data, clientId) {
  const xhr = new XMLHttpRequest();
  const domParser = new DOMParser();
  const url = `${DEFAULT_ZFP_LAB_SERVER_ADDRESS}${endpoint}${clientId ? `?client=${clientId}` : ''}`;

  try {
    xhr.open(verb, url, false);
    xhr.setRequestHeader("Content-Type", "text/plain");

    console.log("verb", verb);
    console.log("request data", data);

    xhr.send(data);

    if (xhr.status !== 200) {
      throw new Error(`HTTP ${xhr.status} - ${xhr.statusText}`);
    }

    let xmlResponse = xhr.responseXML;

    if (!xmlResponse || !xmlResponse.length === 0) {
      try {
        if (xhr.responseText && xhr.responseText.length > 0) {
          xmlResponse = domParser.parseFromString(xhr.responseText, "application/xml");
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
      throw new Tremol.ServerError(
        `Server connection error (${error.message})`,
        Tremol.ServerErrorType.ServerConnectionError
      );
    }
  }
};

var throwOnServerError = function (resp) {
  var resRoot = resp.getElementsByTagName("Res")[0];
  var resCode = Number(resRoot.getAttribute("Code"));

  if (resCode !== 0) {
    var errorNode = resp.getElementsByTagName("Err")[0];
    var errorMessage = resp.getElementsByTagName("Message")[0].firstChild.data;

    if (resCode === 40) {
      var ste1 = parseInt(errorNode.getAttribute("STE1"), 16);
      var ste2 = parseInt(errorNode.getAttribute("STE2"), 16);
      var fpLibErrorCode = parseInt(errorNode.getAttribute("FPLibErrorCode"), 16);
      throw new Tremol.ServerError(errorMessage, resCode, ste1, ste2, fpLibErrorCode);
    }
    else {
      throw new Tremol.ServerError(errorMessage, resCode);
    }
  }
}

const analyzeZFPLabServerResponseData = (responseData) => {
  const zfpLabServerResponseXMLDocument = new DOMParser().parseFromString(
    responseData,
    APPLICATION_XML
  );

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

// Utility Functions

export const parseDateWithCustomFormat = (stringParsedAsDate, customDateFormat) => {
  let year = 0;
  let month = 0;
  let date = 0;
  let hours= 0;
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

// Requests

export const readStatus = () => {
  const readStatusCommandXML = `<Command Name="ReadStatus"></Command>`;
  const readStatusResponse = sendXHRRequest("POST", "/ReadStatus", readStatusCommandXML);
  return analyzeZFPLabServerResponseData(readStatusResponse);
};