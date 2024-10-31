export const isNullOrWhitespace = (input) => !input || input.trim().length === 0;

export const sleepAsync = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

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