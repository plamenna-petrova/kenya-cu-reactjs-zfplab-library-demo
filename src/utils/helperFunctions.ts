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
        resultObject[currentResChildElementNameAttribute] = parseDateWithFormat(
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

export const parseDateWithFormat = (input: string, format: string): Date => {
  var p = input;
  var f = format;
  var y = 0;
  var M = 0;
  var d = 0;
  var h = 0;
  var m = 0;
  var s = 0;

  var yIx = f.indexOf("yyyy");
  var MIx = f.indexOf("MM");
  var dIx = f.indexOf("dd");
  var hIx = f.indexOf("HH");
  var mIx = f.indexOf("mm");
  var sIx = f.indexOf("ss");

  if (yIx !== -1) {
    y = parseInt(p.substring(yIx, yIx + 4));
  }
  else {
    yIx = f.indexOf("yy");
    if (yIx !== -1) {
      y = parseInt(p.substring(yIx, yIx + 2));
    }
  }

  if (MIx !== -1) {
    M = parseInt(p.substring(MIx, MIx + 2)) - 1;
  }

  if (dIx !== -1) {
    d = parseInt(p.substring(dIx, dIx + 2));
  }

  if (hIx !== -1) {
    h = parseInt(p.substring(hIx, hIx + 2));
  }

  if (mIx !== -1) {
    m = parseInt(p.substring(mIx, mIx + 2));
  }

  if (sIx !== -1) {
    s = parseInt(p.substring(sIx, sIx + 2));
  }

  return new Date(y, M, d, h, m, s);
};

export const base64stringToArrayBuffer = (input: string) => {
  var binary_string = window.atob(input);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }

  return bytes;
};