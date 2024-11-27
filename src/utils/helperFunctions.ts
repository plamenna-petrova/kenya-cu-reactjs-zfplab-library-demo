import { APPLICATION_XML, TREMOL_FP_DATE_FORMAT } from "./constants";

export const analyzeZFPLabServerResponseData = (responseData: any): Record<string, any> => {
  const zfpLabServerResponseXMLDocument: Document = new DOMParser().parseFromString(
    responseData,
    APPLICATION_XML
  );

  const resRootElement: Element = zfpLabServerResponseXMLDocument.getElementsByTagName("Res")[0];
  const resChildElements: HTMLCollectionOf<Element> = resRootElement.getElementsByTagName("Res");

  const resultObject: Record<string, any> = {};

  let i: number = 0;

  for (; i < resChildElements.length; i++) {
    const currentResChildElement: Element = resChildElements[i];
    const currentResChildElementNameAttribute = currentResChildElement.getAttribute("Name") as string;
    const currentResChildElementTypeAttribute = currentResChildElement.getAttribute("Type") as string;
    const currentResChildElementValueAttribute = currentResChildElement.getAttribute("Value") as string;

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

export const isNullOrWhitespace = (input: string | null | undefined): boolean => !input || input.trim().length === 0;

export const sleepAsync = (milliseconds: number): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

export const generateExportFileName = (fileName: string, fileExtension: string): string => {
  const currentTimeForFileExport: Date = new Date();

  const generatedFileName: string =
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

export const parseDateWithCustomFormat = (stringParsedAsDate: string, customDateFormat: string): Date => {
  let year: number = 0;
  let month: number = 0;
  let date: number = 0;
  let hours: number = 0;
  let minutes: number = 0;
  let seconds: number = 0;

  let yearIndex: number = customDateFormat.indexOf("yyyy");
  let monthIndex: number = customDateFormat.indexOf("MM");
  let dateIndex: number = customDateFormat.indexOf("dd");
  let hoursIndex: number = customDateFormat.indexOf("HH");
  let minutesIndex: number = customDateFormat.indexOf("mm");
  let secondsIndex: number = customDateFormat.indexOf("ss");

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

export const base64stringToArrayBuffer = (inputString: string): Uint8Array => {
  const binaryString: string = window.atob(inputString);
  const binaryStringLength: number = binaryString.length;
  const uint8BytesArray: Uint8Array = new Uint8Array(binaryStringLength);

  for (let i = 0; i < binaryStringLength; i++) {
    uint8BytesArray[i] = binaryString.charCodeAt(i);
  }

  return uint8BytesArray;
};