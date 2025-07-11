import Tremol from './fp_core.js'

Tremol.FP = Tremol.FP || function () { };
Tremol.FP.prototype.timeStamp = 2304121540;
/**
 * Programs the customer DB for special customer receipt issuing.
 * @param {string} HS_Code 10 symbols for HS code
 * @param {string} HS_Name 20 symbols for name of HS group
 * @param {Tremol.Enums.OptionTaxable} OptionTaxable 1 symbol for parameter: 
- '1' - Exempted 
- '0' - Taxable
 * @param {string} MesureUnit 3 symbols for mesure unit of item's code
 * @param {number} VAT_rate Value of VAT rate from 2 to 5 symbols with format ##.##
 */
Tremol.FP.prototype.AddNewHScode = function (HS_Code, HS_Name, OptionTaxable, MesureUnit, VAT_rate) {
	return this.do('AddNewHScode', 'HS_Code', HS_Code, 'HS_Name', HS_Name, 'OptionTaxable', OptionTaxable, 'MesureUnit', MesureUnit, 'VAT_rate', VAT_rate);
};

/**
 * Available only if the receipt is not closed. Cancel all sales in the receipt and close it .
 */
Tremol.FP.prototype.CancelReceipt = function () {
	return this.do('CancelReceipt');
};

/**
 * Change SD card.
 * @param {string} Password 6-symbols string
 * @param {string} SerialNum 20 symbols Manufacturing number for verification with original
 * @param {string} PINnum 11 symbols for PIN registration number for verification with original
 */
Tremol.FP.prototype.ChangeSDcard = function (Password, SerialNum, PINnum) {
	return this.do('ChangeSDcard', 'Password', Password, 'SerialNum', SerialNum, 'PINnum', PINnum);
};

/**
 * Clears the external display.
 */
Tremol.FP.prototype.ClearDisplay = function () {
	return this.do('ClearDisplay');
};

/**
 * @typedef {Object} CloseReceiptRes
 * @property {string} InvoiceNum 19 symbols for CU invoice number
 * @property {string} QRcode 128 symbols for QR code
 */

/**
 * Closes the opened fiscal receipt and returns receipt info.
 * @return {CloseReceiptRes}
 */
Tremol.FP.prototype.CloseReceipt = function () {
	return this.do('CloseReceipt');
};

/**
 * Confirm PIN number.
 * @param {string} Password 6-symbols string
 */
Tremol.FP.prototype.ConfirmFiscalization = function (Password) {
	return this.do('ConfirmFiscalization', 'Password', Password);
};

/**
 * Provides information for the daily fiscal report  with zeroing and fiscal memory record, preceded by Electronic Journal report.
 */
Tremol.FP.prototype.DailyReport = function () {
	return this.do('DailyReport');
};

/**
 * Executes the direct command .
 * @param {string} Input Raw request to FP
 * @return {string}
 */
Tremol.FP.prototype.DirectCommand = function (Input) {
	return this.do('DirectCommand', 'Input', Input);
};

/**
 * Shows the current date and time on the external display.
 */
Tremol.FP.prototype.DisplayDateTime = function () {
	return this.do('DisplayDateTime');
};

/**
 * Shows a 20-symbols text in the upper external display line.
 * @param {string} Text 16 symbols text
 */
Tremol.FP.prototype.DisplayTextLine1 = function (Text) {
	return this.do('DisplayTextLine1', 'Text', Text);
};

/**
 * Shows a 16-symbols text in the lower external display line.
 * @param {string} Text 16 symbols text
 */
Tremol.FP.prototype.DisplayTextLine2 = function (Text) {
	return this.do('DisplayTextLine2', 'Text', Text);
};

/**
 * Shows a 16-symbols text in the first line and last 16-symbols text in the second line of the external display lines.
 * @param {string} Text 32 symbols text
 */
Tremol.FP.prototype.DisplayTextLines1and2 = function (Text) {
	return this.do('DisplayTextLines1and2', 'Text', Text);
};

/**
 * Erase HS codes.
 * @param {string} Password 6 symbols for password
 */
Tremol.FP.prototype.EraseHScodes = function (Password) {
	return this.do('EraseHScodes', 'Password', Password);
};

/**
 * Informs about the issued document
 */
Tremol.FP.prototype.InfoLastReceiptDuplicate = function () {
	return this.do('InfoLastReceiptDuplicate');
};

/**
 * Opens a fiscal invoice credit note receipt assigned to the specified operator number and operator password with free info for customer data. The Invoice receipt can be issued only if the invoice range (start and end numbers) is set.
 * @param {string} CompanyName 30 symbols for Invoice company name
 * @param {string} ClientPINnum 14 symbols for client PIN number
 * @param {string} HeadQuarters 30 symbols for customer headquarters
 * @param {string} Address 30 symbols for Address
 * @param {string} PostalCodeAndCity 30 symbols for postal code and city
 * @param {string} ExemptionNum 30 symbols for exemption number
 * @param {string} RelatedInvoiceNum 19 symbols for the related invoice number in format 
###################
 * @param {string} TraderSystemInvNum 15 symbols for trader system invoice number
 */
Tremol.FP.prototype.OpenCreditNoteWithFreeCustomerData = function (CompanyName, ClientPINnum, HeadQuarters, Address, PostalCodeAndCity, ExemptionNum, RelatedInvoiceNum, TraderSystemInvNum) {
	return this.do('OpenCreditNoteWithFreeCustomerData', 'CompanyName', CompanyName, 'ClientPINnum', ClientPINnum, 'HeadQuarters', HeadQuarters, 'Address', Address, 'PostalCodeAndCity', PostalCodeAndCity, 'ExemptionNum', ExemptionNum, 'RelatedInvoiceNum', RelatedInvoiceNum, 'TraderSystemInvNum', TraderSystemInvNum);
};

/**
 * Opens a fiscal invoice debit note receipt assigned to the specified operator number and operator password with free info for customer data. The Invoice receipt can be issued only if the invoice range (start and end numbers) is set.
 * @param {string} CompanyName 30 symbols for Invoice company name
 * @param {string} ClientPINnum 14 symbols for client PIN number
 * @param {string} HeadQuarters 30 symbols for customer headquarters
 * @param {string} Address 30 symbols for Address
 * @param {string} PostalCodeAndCity 30 symbols for postal code and city
 * @param {string} ExemptionNum 30 symbols for exemption number
 * @param {string} RelatedInvoiceNum 19 symbols for the related invoice number in format 
###################
 * @param {string} TraderSystemInvNum 15 symbols for trader system invoice number
 */
Tremol.FP.prototype.OpenDebitNoteWithFreeCustomerData = function (CompanyName, ClientPINnum, HeadQuarters, Address, PostalCodeAndCity, ExemptionNum, RelatedInvoiceNum, TraderSystemInvNum) {
	return this.do('OpenDebitNoteWithFreeCustomerData', 'CompanyName', CompanyName, 'ClientPINnum', ClientPINnum, 'HeadQuarters', HeadQuarters, 'Address', Address, 'PostalCodeAndCity', PostalCodeAndCity, 'ExemptionNum', ExemptionNum, 'RelatedInvoiceNum', RelatedInvoiceNum, 'TraderSystemInvNum', TraderSystemInvNum);
};

/**
 * Opens a fiscal invoice receipt assigned to the specified operator number and operator password with free info for customer data. The Invoice receipt can be issued only if the invoice range (start and end numbers) is set.
 * @param {string} CompanyName 30 symbols for Invoice company name
 * @param {string} ClientPINnum 14 symbols for client PIN number
 * @param {string} HeadQuarters 30 symbols for customer headquarters
 * @param {string} Address 30 symbols for Address
 * @param {string} PostalCodeAndCity 30 symbols for postal code and city
 * @param {string} ExemptionNum 30 symbols for exemption number
 * @param {string} TraderSystemInvNum 15 symbols for trader system invoice number
 */
Tremol.FP.prototype.OpenInvoiceWithFreeCustomerData = function (CompanyName, ClientPINnum, HeadQuarters, Address, PostalCodeAndCity, ExemptionNum, TraderSystemInvNum) {
	return this.do('OpenInvoiceWithFreeCustomerData', 'CompanyName', CompanyName, 'ClientPINnum', ClientPINnum, 'HeadQuarters', HeadQuarters, 'Address', Address, 'PostalCodeAndCity', PostalCodeAndCity, 'ExemptionNum', ExemptionNum, 'TraderSystemInvNum', TraderSystemInvNum);
};

/**
 * Opens a fiscal receipt assigned to the specified operator number and operator password, parameters for receipt format and VAT type.
 * @param {Tremol.Enums.OptionReceiptFormat} OptionReceiptFormat 1 symbol with value: 
 - '1' - Detailed 
 - '0' - Brief
 * @param {string} TraderSystemInvNum 15 symbols for trader system invoice number
 */
Tremol.FP.prototype.OpenReceipt = function (OptionReceiptFormat, TraderSystemInvNum) {
	return this.do('OpenReceipt', 'OptionReceiptFormat', OptionReceiptFormat, 'TraderSystemInvNum', TraderSystemInvNum);
};

/**
 * @typedef {Object} OpenSellAndCloseInvoiceRes
 * @property {string} InvoiceNum 19 symbols for CU invoice number
 * @property {string} QRcode 128 symbols for QR code
 */

/**
 * Opens invoice after which makes sell of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction and then closes the invoice
 * @param {string} ClientPINnum 14 symbols for client PIN number
 * @param {string} ExemptionNum 15 symbols for the exemption number
 * @param {string} TraderSystemInvNum 15 symbols for the trader system invoice number
 * @param {string} NamePLU 36 symbols for article's name
 * @param {Tremol.Enums.OptionVATClass} OptionVATClass 1 symbol for article's VAT class with optional values:" 
 - 'A' - VAT Class A
 * @param {number} Price Up to 15 symbols for article's price with upto 5 digits after decimal point
 * @param {string} MeasureUnit 3 symbols for measure unit
 * @param {string} HSCode 10 symbols for HS Code in format XXXX.XX.XX
 * @param {number=} Quantity 1 to 10 symbols for quantity
 * @param {number=} DiscAddP 1 to 7 for percentage of discount/addition
 * @return {OpenSellAndCloseInvoiceRes}
 */
Tremol.FP.prototype.OpenSellAndCloseInvoice = function (ClientPINnum, ExemptionNum, TraderSystemInvNum, NamePLU, OptionVATClass, Price, MeasureUnit, HSCode, Quantity, DiscAddP) {
	return this.do('OpenSellAndCloseInvoice', 'ClientPINnum', ClientPINnum, 'ExemptionNum', ExemptionNum, 'TraderSystemInvNum', TraderSystemInvNum, 'NamePLU', NamePLU, 'OptionVATClass', OptionVATClass, 'Price', Price, 'MeasureUnit', MeasureUnit, 'HSCode', HSCode, 'Quantity', Quantity, 'DiscAddP', DiscAddP);
};

/**
 * @typedef {Object} OpenSellAndCloseReceiptRes
 * @property {string} InvoiceNum 19 symbols for CU invoice number
 * @property {string} QRcode 128 symbols for QR code
 */

/**
 * Opens receipt after which makes sell of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction and then closes the receipt
 * @param {string} TraderSystemInvNum 15 symbols for the trader system invoice number
 * @param {string} NamePLU 36 symbols for article's name
 * @param {Tremol.Enums.OptionVATClass} OptionVATClass 1 symbol for article's VAT class with optional values:" 
 - 'A' - VAT Class A
 * @param {number} Price Up to 15 symbols for article's price with upto 5 digits after decimal point
 * @param {string} MeasureUnit 3 symbols for measure unit
 * @param {string} HSCode 10 symbols for HS Code in format XXXX.XX.XX
 * @param {number=} Quantity 1 to 10 symbols for quantity
 * @param {number=} DiscAddP 1 to 7 for percentage of discount/addition
 * @return {OpenSellAndCloseReceiptRes}
 */
Tremol.FP.prototype.OpenSellAndCloseReceipt = function (TraderSystemInvNum, NamePLU, OptionVATClass, Price, MeasureUnit, HSCode, Quantity, DiscAddP) {
	return this.do('OpenSellAndCloseReceipt', 'TraderSystemInvNum', TraderSystemInvNum, 'NamePLU', NamePLU, 'OptionVATClass', OptionVATClass, 'Price', Price, 'MeasureUnit', MeasureUnit, 'HSCode', HSCode, 'Quantity', Quantity, 'DiscAddP', DiscAddP);
};

/**
 * Programs HS code at a given position (HS number in order).
 * @param {number} HS_Number 4 symbols for HS number in order in format ####
 * @param {string} HS_Code 10 symbols for HS code
 * @param {string} HS_Name 20 symbols for name of HS group
 * @param {Tremol.Enums.OptionTaxable} OptionTaxable 1 symbol for parameter: 
- '1' - Exempted 
- '0' - Taxable
 * @param {string} MesureUnit 3 symbols for mesure unit of item's code
 * @param {number} VAT_Rate Value of VAT rate from 2 to 5 symbols with format ##.##
 */
Tremol.FP.prototype.ProgHScode = function (HS_Number, HS_Code, HS_Name, OptionTaxable, MesureUnit, VAT_Rate) {
	return this.do('ProgHScode', 'HS_Number', HS_Number, 'HS_Code', HS_Code, 'HS_Name', HS_Name, 'OptionTaxable', OptionTaxable, 'MesureUnit', MesureUnit, 'VAT_Rate', VAT_Rate);
};

/**
 * Program the proxy server address.
 * @param {number} ParamLength Up to 3 symbols for parameter length
 * @param {string} Address 21 symbols for address
 */
Tremol.FP.prototype.ProgramProxyServerAddress = function (ParamLength, Address) {
	return this.do('ProgramProxyServerAddress', 'ParamLength', ParamLength, 'Address', Address);
};

/**
 * Stores a block containing the values of the VAT rates into the CU
 * @param {string} Password 6-symbols string
 * @param {number} VATrateA Value of VAT rate A from 2 to 6 symbols with format ##.##
 * @param {number} VATrateB Value of VAT rate B from 2 to 6 symbols with format ##.##
 * @param {number} VATrateC Value of VAT rate C from 2 to 6 symbols with format ##.##
 * @param {number} VATrateD Value of VAT rate D from 2 to 6 symbols with format ##.##
 * @param {number} VATrateE Value of VAT rate E from 2 to 6 symbols with format ##.##
 */
Tremol.FP.prototype.ProgVATrates = function (Password, VATrateA, VATrateB, VATrateC, VATrateD, VATrateE) {
	return this.do('ProgVATrates', 'Password', Password, 'VATrateA', VATrateA, 'VATrateB', VATrateB, 'VATrateC', VATrateC, 'VATrateD', VATrateD, 'VATrateE', VATrateE);
};

/**
 *  Reads raw bytes from FP.
 * @param {number} Count How many bytes to read if EndChar is not specified
 * @param {string} EndChar The character marking the end of the data. If present Count parameter is ignored.
 * @return {Uint8Array}
 */
Tremol.FP.prototype.RawRead = function (Count, EndChar) {
	return this.do('RawRead', 'Count', Count, 'EndChar', EndChar);
};

/**
 *  Writes raw bytes to FP 
 * @param {Uint8Array} Bytes The bytes in BASE64 ecoded string to be written to FP
 */
Tremol.FP.prototype.RawWrite = function (Bytes) {
	return this.do('RawWrite', 'Bytes', Bytes);
};

/**
 * @typedef {Object} CUnumbersRes
 * @property {string} SerialNumber 20 symbols for individual number of the CU
 * @property {string} PINnumber 11 symbols for pin number
 */

/**
 * Provides information about the manufacturing number of the CU and PIN number.
 * @return {CUnumbersRes}
 */
Tremol.FP.prototype.ReadCUnumbers = function () {
	return this.do('ReadCUnumbers');
};

/**
 * @typedef {Object} CurrentReceiptInfoRes
 * @property {Tremol.Enums.OptionIsReceiptOpened} OptionIsReceiptOpened 1 symbol with value: 
 - '0' - No 
 - '1' - Yes
 * @property {string} SalesNumber 3 symbols for number of sales
 * @property {number} SubtotalAmountVATGA Up to 13 symbols for subtotal by VAT group A
 * @property {number} SubtotalAmountVATGB Up to 13 symbols for subtotal by VAT group B
 * @property {number} SubtotalAmountVATGC Up to 13 symbols for subtotal by VAT group C
 * @property {number} SubtotalAmountVATGD Up to 13 symbols for subtotal by VAT group D
 * @property {number} SubtotalAmountVATGE Up to 13 symbols for subtotal by VAT group E
 * @property {Tremol.Enums.OptionReceiptFormat} OptionReceiptFormat (Format) 1 symbol with value: 
 - '1' - Detailed 
 - '0' - Brief
 * @property {Tremol.Enums.OptionClientReceipt} OptionClientReceipt 1 symbol with value: 
 - '1' - invoice (client) receipt 
 - '0' - standard receipt
 * @property {Tremol.Enums.OptionPowerDownInReceipt} OptionPowerDownInReceipt 1 symbol with value: 
- '0' - No 
- '1' - Yes
 */

/**
 * Read the current status of the receipt.
 * @return {CurrentReceiptInfoRes}
 */
Tremol.FP.prototype.ReadCurrentReceiptInfo = function () {
	return this.do('ReadCurrentReceiptInfo');
};

/**
 * @typedef {Object} DailyAmountsByVATRes
 * @property {number} SaleVATGrA Up to 15 symbols for the accumulated VAT in group A
 * @property {number} SaleVATGrB Up to 15 symbols for the accumulated VAT in group B
 * @property {number} SaleVATGrC Up to 15 symbols for the accumulated VAT in group C
 * @property {number} SaleVATGrD Up to 15 symbols for the accumulated VAT in group D
 * @property {number} SaleTurnoverVATGrE Up to 15 symbols for the accumulated turnover in group E
 * @property {number} SaleTurnoverABCD Up to 15 symbols for the sale turnover in VAT groups A, B, C, D
 * @property {number} RefundVATGrA Up to 15 symbols for the refund VAT in group A
 * @property {number} RefundVATGrB Up to 15 symbols for the refund VAT in group B
 * @property {number} RefundVATGrC Up to 15 symbols for the refund VAT in group C
 * @property {number} RefundVATGrD Up to 15 symbols for the refund VAT in group D
 * @property {number} RefundTurnoverVATGrE Up to 15 symbols for the refund accumulated turnover in group E
 * @property {number} RefundTurnoverABCD Up to 15 symbols for the refund turnover in VAT groups A, B, C, D
 */

/**
 * Provides information about the accumulated amounts and refunded amounts by VAT class in case that CU regularly informs about the Z report(7C)
 * @return {DailyAmountsByVATRes}
 */
Tremol.FP.prototype.ReadDailyAmountsByVAT = function () {
	return this.do('ReadDailyAmountsByVAT');
};

/**
 * Provides information about the current date and time.
 * @return {Date}
 */
Tremol.FP.prototype.ReadDateTime = function () {
	return this.do('ReadDateTime');
};

/**
 * @typedef {Object} DeviceModuleSupportRes
 * @property {Tremol.Enums.OptionLAN} OptionLAN 1 symbol for LAN suppor 
- '0' - No 
 - '1' - Yes
 * @property {Tremol.Enums.OptionWiFi} OptionWiFi 1 symbol for WiFi support 
- '0' - No 
 - '1' - Yes
 * @property {Tremol.Enums.OptionGPRS} OptionGPRS 1 symbol for GPRS support 
- '0' - No 
 - '1' - Yes 
BT (Bluetooth) 1 symbol for Bluetooth support 
- '0' - No 
 - '1' - Yes
 * @property {Tremol.Enums.OptionBT} OptionBT (Bluetooth) 1 symbol for Bluetooth support 
- '0' - No 
 - '1' - Yes
 */

/**
 * FlagsModule is a char with bits representing modules supported by the device.
 * @return {DeviceModuleSupportRes}
 */
Tremol.FP.prototype.ReadDeviceModuleSupport = function () {
	return this.do('ReadDeviceModuleSupport');
};

/**
 * @typedef {Object} DeviceModuleSupportByFirmwareRes
 * @property {Tremol.Enums.OptionLAN} OptionLAN 1 symbol for LAN suppor 
- '0' - No 
 - '1' - Yes
 * @property {Tremol.Enums.OptionWiFi} OptionWiFi 1 symbol for WiFi support 
- '0' - No 
 - '1' - Yes
 * @property {Tremol.Enums.OptionGPRS} OptionGPRS 1 symbol for GPRS support 
- '0' - No 
 - '1' - Yes 
BT (Bluetooth) 1 symbol for Bluetooth support 
- '0' - No 
 - '1' - Yes
 * @property {Tremol.Enums.OptionBT} OptionBT (Bluetooth) 1 symbol for Bluetooth support 
- '0' - No 
 - '1' - Yes
 */

/**
 * FlagsModule is a char with bits representing modules supported by the firmware
 * @return {DeviceModuleSupportByFirmwareRes}
 */
Tremol.FP.prototype.ReadDeviceModuleSupportByFirmware = function () {
	return this.do('ReadDeviceModuleSupportByFirmware');
};

/**
 * @typedef {Object} DeviceTCP_AddressesRes
 * @property {Tremol.Enums.OptionAddressType} OptionAddressType (Address type) 1 symbol with value: 
 - '2' - IP address 
 - '3' - Subnet Mask 
 - '4' - Gateway address 
 - '5' - DNS address
 * @property {string} DeviceAddress 15 symbols for the device's addresses
 */

/**
 * Provides information about device's network IP address, subnet mask, gateway address, DNS address.
 * @param {Tremol.Enums.OptionAddressType} OptionAddressType 1 symbol with value: 
 - '2' - IP address 
 - '3' - Subnet Mask 
 - '4' - Gateway address 
 - '5' - DNS address
 * @return {DeviceTCP_AddressesRes}
 */
Tremol.FP.prototype.ReadDeviceTCP_Addresses = function (OptionAddressType) {
	return this.do('ReadDeviceTCP_Addresses', 'OptionAddressType', OptionAddressType);
};

/**
 * Provides information about device's DHCP status
 * @return {Tremol.Enums.OptionDHCPEnabled}
 */
Tremol.FP.prototype.ReadDHCP_Status = function () {
	return this.do('ReadDHCP_Status');
};

/**
 * @typedef {Object} DiagnosticsRes
 * @property {Tremol.Enums.OptionDeviceType} OptionDeviceType 1 symbol for device type: 
 - '1' - A Type 
 - '2' - B Type
 * @property {string} SDIdxPos 10 symbols for current SD index position of last sent receipt
 * @property {string} LastInvoiceCUNum 19 symbols for number of last invoice according the CU
 * @property {string} LastInvoiceDate 6 symbols for last invoice date in the DDMMYY format
 * @property {string} LastEODDate 6 symbols for last sent EOD in the DDMMYY format
 * @property {string} InvoicesSent 4 symbold for number of invoices sent for the current day
 */

/**
 * Provides information about documents sending functions .
 * @return {DiagnosticsRes}
 */
Tremol.FP.prototype.ReadDiagnostics = function () {
	return this.do('ReadDiagnostics');
};

/**
 * Read whole Electronic Journal report from beginning to the end.
 */
Tremol.FP.prototype.ReadEJ = function () {
	return this.do('ReadEJ');
};

/**
 * Read Electronic Journal Report by CU Invoice Number (Multiple invoices)
 * @param {Tremol.Enums.OptionInvoiceReportFormat} OptionInvoiceReportFormat 1 character with value 
 - 'N' - Detailed EJ 
 - 'n' - Brief EJ
 * @param {number} StartCUInvoiceNum 10 symbols for start CU invoice number in format: ##########.
 * @param {number} EndCUInvoiceNum 10 symbols for end CU invoice number in format: ##########.
 */
Tremol.FP.prototype.ReadEJByCUInvoiceNum = function (OptionInvoiceReportFormat, StartCUInvoiceNum, EndCUInvoiceNum) {
	return this.do('ReadEJByCUInvoiceNum', 'OptionInvoiceReportFormat', OptionInvoiceReportFormat, 'StartCUInvoiceNum', StartCUInvoiceNum, 'EndCUInvoiceNum', EndCUInvoiceNum);
};

/**
 * Read Electronic Journal Report by CU Invoice Number (Multiple invoices) in the JSON format. The number of bytes equal to Length for JSON data must be read subsequently.
 * @param {Tremol.Enums.OptionInvoiceReportFormat} OptionInvoiceReportFormat 1 character with value 
 - 'N' - Detailed EJ 
 - 'n' - Brief EJ
 * @param {number} StartCUInvoiceNum 10 symbols for start CU invoice number in format: ##########.
 * @param {number} EndCUInvoiceNum 10 symbols for end CU invoice number in format: ##########.
 * @return {number}
 */
Tremol.FP.prototype.ReadEJByCUInvoiceNum_JSON = function (OptionInvoiceReportFormat, StartCUInvoiceNum, EndCUInvoiceNum) {
	return this.do('ReadEJByCUInvoiceNum_JSON', 'OptionInvoiceReportFormat', OptionInvoiceReportFormat, 'StartCUInvoiceNum', StartCUInvoiceNum, 'EndCUInvoiceNum', EndCUInvoiceNum);
};

/**
 * Read Electronic Journal Report by initial to end date.
 * @param {Date} StartRepFromDate 6 symbols for initial date in the DDMMYY format
 * @param {Date} EndRepFromDate 6 symbols for final date in the DDMMYY format
 */
Tremol.FP.prototype.ReadEJByDate = function (StartRepFromDate, EndRepFromDate) {
	return this.do('ReadEJByDate', 'StartRepFromDate', StartRepFromDate, 'EndRepFromDate', EndRepFromDate);
};

/**
 * Read Electronic Journal Report by initial to end date and time.
 * @param {Tremol.Enums.OptionReportFormat} OptionReportFormat 1 character with value 
 - 'T' - Detailed EJ 
 - 't' - Brief EJ
 * @param {Date} StartRepFromDate 16 symbols for initial date in the DD-MM-
 * @param {Date} EndRepFromDate 16 symbols for final date in the DD-MM-
 */
Tremol.FP.prototype.ReadEJByDateTime = function (OptionReportFormat, StartRepFromDate, EndRepFromDate) {
	return this.do('ReadEJByDateTime', 'OptionReportFormat', OptionReportFormat, 'StartRepFromDate', StartRepFromDate, 'EndRepFromDate', EndRepFromDate);
};

/**
 * Read Electronic Journal Report by initial to end date and time in the JSON format. The number of bytes equal to Length for JSON data must be read subsequently.
 * @param {Tremol.Enums.OptionReportFormat} OptionReportFormat 1 character with value 
 - 'T' - Detailed EJ 
 - 't' - Brief EJ
 * @param {Date} StartRepFromDate 16 symbols for initial date in the DD-MM-
 * @param {Date} EndRepFromDate 16 symbols for final date in the DD-MM-
 * @return {number}
 */
Tremol.FP.prototype.ReadEJByDateTime_JSON = function (OptionReportFormat, StartRepFromDate, EndRepFromDate) {
	return this.do('ReadEJByDateTime_JSON', 'OptionReportFormat', OptionReportFormat, 'StartRepFromDate', StartRepFromDate, 'EndRepFromDate', EndRepFromDate);
};

/**
 * Read Electronic Journal Report by initial to end date in the JSON format. The number of bytes equal to Length for JSON data must be read subsequently.
 * @param {Date} StartRepFromDate 6 symbols for initial date in the DDMMYY format
 * @param {Date} EndRepFromDate 6 symbols for final date in the DDMMYY format
 * @return {number}
 */
Tremol.FP.prototype.ReadEJByDate_JSON = function (StartRepFromDate, EndRepFromDate) {
	return this.do('ReadEJByDate_JSON', 'StartRepFromDate', StartRepFromDate, 'EndRepFromDate', EndRepFromDate);
};

/**
 * Read Electronic Journal Report by PIN number of buyer.
 * @param {Tremol.Enums.OptionPINReportFormat} OptionPINReportFormat 1 character with value 
 - 'P' - Detailed EJ 
 - 'p' - Brief EJ
 * @param {string} PINnumber 11 symbols for PIN number
 */
Tremol.FP.prototype.ReadEJByPINofBuyer = function (OptionPINReportFormat, PINnumber) {
	return this.do('ReadEJByPINofBuyer', 'OptionPINReportFormat', OptionPINReportFormat, 'PINnumber', PINnumber);
};

/**
 * Read Electronic Journal Report by PIN number of buyer in the JSON format. The number of bytes equal to Length for JSON data must be read subsequently.
 * @param {Tremol.Enums.OptionPINReportFormat} OptionPINReportFormat 1 character with value 
 - 'P' - Detailed EJ 
 - 'p' - Brief EJ
 * @param {string} PINnumber 11 symbols for PIN number
 * @return {number}
 */
Tremol.FP.prototype.ReadEJByPINofBuyer_JSON = function (OptionPINReportFormat, PINnumber) {
	return this.do('ReadEJByPINofBuyer_JSON', 'OptionPINReportFormat', OptionPINReportFormat, 'PINnumber', PINnumber);
};

/**
 * Read Electronic Journal Report by Trader System Invoice Number (Single Invoice).
 * @param {Tremol.Enums.OptionTraderSystemReportFormat} OptionTraderSystemReportFormat 1 character with value 
 - 'S' - Detailed EJ 
 - 's' - Brief EJ
 * @param {string} TraderSystemInvNum 15 symbols for trader system invoice 
number
 */
Tremol.FP.prototype.ReadEJByTraderSystemInvNum = function (OptionTraderSystemReportFormat, TraderSystemInvNum) {
	return this.do('ReadEJByTraderSystemInvNum', 'OptionTraderSystemReportFormat', OptionTraderSystemReportFormat, 'TraderSystemInvNum', TraderSystemInvNum);
};

/**
 * Read Electronic Journal Report by Trader System Invoice Number (Single Invoice) in the JSON format. The number of bytes equal to Length for JSON data must be read subsequently.
 * @param {Tremol.Enums.OptionTraderSystemReportFormat} OptionTraderSystemReportFormat 1 character with value 
 - 'S' - Detailed EJ 
 - 's' - Brief EJ
 * @param {string} TraderSystemInvNum 15 symbols for trader system invoice 
number
 * @return {number}
 */
Tremol.FP.prototype.ReadEJByTraderSystemInvNum_JSON = function (OptionTraderSystemReportFormat, TraderSystemInvNum) {
	return this.do('ReadEJByTraderSystemInvNum_JSON', 'OptionTraderSystemReportFormat', OptionTraderSystemReportFormat, 'TraderSystemInvNum', TraderSystemInvNum);
};

/**
 * Read whole Electronic Journal report from beginning to the end in the JSON format. The number of bytes equal to Length for JSON data must be read subsequently.
 * @return {number}
 */
Tremol.FP.prototype.ReadEJ_JSON = function () {
	return this.do('ReadEJ_JSON');
};

/**
 * @typedef {Object} EODAmountsRes
 * @property {number} EOD_sale_turnover Up to 20 symbols for the EOD sale turnover
 * @property {number} EOD_credit_turnover Up to 20 symbols for the EOD credit turnover
 * @property {number} EOD_saleVAT Up to 20 symbols for the EOD VAT from sales
 * @property {number} EOD_creditVAT Up to 20 symbols for the EOD VAT from credit invoices
 */

/**
 * Provides information about the accumulated EOD turnover and VAT
 * @return {EODAmountsRes}
 */
Tremol.FP.prototype.ReadEODAmounts = function () {
	return this.do('ReadEODAmounts');
};

/**
 * @typedef {Object} EODAmountsByDateRes
 * @property {Date} EOD_Date 6 symbols for initial date in the DDMMYY format
 * @property {number} EOD_sale_turnover Up to 20 symbols for the EOD sale turnover
 * @property {number} EOD_credit_turnover Up to 20 symbols for the EOD credit turnover
 * @property {number} EOD_saleVAT Up to 20 symbols for the EOD VAT from sales
 * @property {number} EOD_creditVAT Up to 20 symbols for the EOD VAT from credit invoices
 * @property {string} InvoiceCount 4 symbols for invoices count
 * @property {string} CreditCount 4 symbols for credit count
 */

/**
 * Provides information about the accumulated EOD turnover and VAT amounts by date
 * @param {Date} EOD_Date 6 symbols for initial date in the DDMMYY format
 * @return {EODAmountsByDateRes}
 */
Tremol.FP.prototype.ReadEODAmountsByDate = function (EOD_Date) {
	return this.do('ReadEODAmountsByDate', 'EOD_Date', EOD_Date);
};

/**
 * Provides information about first EOD date
 * @return {Date}
 */
Tremol.FP.prototype.ReadFirstEODDate = function () {
	return this.do('ReadFirstEODDate');
};

/**
 * @typedef {Object} GPRS_APNRes
 * @property {number} gprsAPNlength Up to 3 symbols for the APN length
 * @property {string} APN (APN) Up to 100 symbols for the device's GPRS APN
 */

/**
 * Provides information about device's GRPS APN.
 * @return {GPRS_APNRes}
 */
Tremol.FP.prototype.ReadGPRS_APN = function () {
	return this.do('ReadGPRS_APN');
};

/**
 * Read GPRS APN authentication type
 * @return {Tremol.Enums.OptionAuthenticationType}
 */
Tremol.FP.prototype.ReadGPRS_AuthenticationType = function () {
	return this.do('ReadGPRS_AuthenticationType');
};

/**
 * @typedef {Object} GPRS_PasswordRes
 * @property {number} PassLength Up to 3 symbols for the GPRS password length
 * @property {string} Password Up to 100 symbols for the device's GPRS password
 */

/**
 * Provides information about device's GPRS password.
 * @return {GPRS_PasswordRes}
 */
Tremol.FP.prototype.ReadGPRS_Password = function () {
	return this.do('ReadGPRS_Password');
};

/**
 * @typedef {Object} GPRS_UsernameRes
 * @property {number} gprsUserNameLength Up to 3 symbols for the GPRS username length
 * @property {string} Username Up to 100 symbols for the device's GPRS username
 */

/**
 * Providing information about device's GPRS user name.
 * @return {GPRS_UsernameRes}
 */
Tremol.FP.prototype.ReadGPRS_Username = function () {
	return this.do('ReadGPRS_Username');
};

/**
 * @typedef {Object} HScodeRes
 * @property {number} HS_Number 4 symbols for HS number in order in format ####
 * @property {string} HS_Code 10 symbols for HS code
 * @property {string} HS_Name 20 symbols for name of HS group
 * @property {Tremol.Enums.OptionTaxable} OptionTaxable 1 symbol for parameter: 
- '1' - Exempted 
- '0' - Taxable
 * @property {string} MesureUnit 3 symbols for mesure unit of item's code
 * @property {number} VAT_Rate (VAT rate) Value of VAT rate from 2 to 5 symbols with format ##.##
 */

/**
 * Programs HS code at a given position (HS number in order).
 * @param {number} HS_Number 4 symbols for HS number in order in format ####
 * @return {HScodeRes}
 */
Tremol.FP.prototype.ReadHScode = function (HS_Number) {
	return this.do('ReadHScode', 'HS_Number', HS_Number);
};

/**
 * Read the number of HS codes.
 * @return {number}
 */
Tremol.FP.prototype.ReadHScodeNumber = function () {
	return this.do('ReadHScodeNumber');
};

/**
 * @typedef {Object} HTTPS_ServerRes
 * @property {number} ParamLength Up to 3 symbols for parameter length
 * @property {string} Address 50 symbols for address
 */

/**
 * Providing information about server HTTPS address.
 * @return {HTTPS_ServerRes}
 */
Tremol.FP.prototype.ReadHTTPS_Server = function () {
	return this.do('ReadHTTPS_Server');
};

/**
 * @typedef {Object} InfoFromLastServerCommunicationRes
 * @property {Tremol.Enums.OptionServerResponse} OptionServerResponse 1 symbol with value 
- 'R' - At send receipt 
- 'Z' - At send EOD
 * @property {Tremol.Enums.OptionTransactionType} OptionTransactionType 1 symbol with value 
- 'c' - Error Code 
- 'm' - Error Message 
- 's' - Status 
- 'e' - Exception Message 
- 'r' - Response Code
 * @property {string} Message Up to 200 symbols for the message from the server
 */

/**
 * Provide information from the last communication with the server.
 * @param {Tremol.Enums.OptionServerResponse} OptionServerResponse 1 symbol with value 
- 'R' - At send receipt 
- 'Z' - At send EOD
 * @param {Tremol.Enums.OptionTransactionType} OptionTransactionType 1 symbol with value 
- 'c' - Error Code 
- 'm' - Error Message 
- 's' - Status 
- 'e' - Exception Message 
- 'r' - Response Code
 * @return {InfoFromLastServerCommunicationRes}
 */
Tremol.FP.prototype.ReadInfoFromLastServerCommunication = function (OptionServerResponse, OptionTransactionType) {
	return this.do('ReadInfoFromLastServerCommunication', 'OptionServerResponse', OptionServerResponse, 'OptionTransactionType', OptionTransactionType);
};

/**
 * Read invoice threshold count
 * @return {number}
 */
Tremol.FP.prototype.ReadInvoice_Threshold = function () {
	return this.do('ReadInvoice_Threshold');
};

/**
 * @typedef {Object} LastAndTotalReceiptNumRes
 * @property {string} LastCUInvoiceNum 19 symbols for the last number of invoice according the middleware, CU, 
internal invoice counter
 * @property {number} LastReceiptNum 7 symbols for last receipt number in format #######
 */

/**
 * Provides information about the number of the last issued receipt.
 * @return {LastAndTotalReceiptNumRes}
 */
Tremol.FP.prototype.ReadLastAndTotalReceiptNum = function () {
	return this.do('ReadLastAndTotalReceiptNum');
};

/**
 * @typedef {Object} NTP_AddressRes
 * @property {number} AddressLen Up to 3 symbols for the address length
 * @property {string} NTPAddress (NTP Address)50 symbols for the device's NTP address
 */

/**
 * Provides information about device's NTP address.
 * @return {NTP_AddressRes}
 */
Tremol.FP.prototype.ReadNTP_Address = function () {
	return this.do('ReadNTP_Address');
};

/**
 * Read/Store Invoice receipt copy to External SD card.
 * @param {Tremol.Enums.OptionInvoiceCopy} OptionInvoiceCopy 2 symbols for destination: 
 - 'J0' - Reading  
 - 'J4' - Storage in External SD card memory
 * @param {string} CUInvoiceNum 10 symbols for Invoice receipt Number.
 */
Tremol.FP.prototype.ReadOrStoreInvoiceCopy = function (OptionInvoiceCopy, CUInvoiceNum) {
	return this.do('ReadOrStoreInvoiceCopy', 'OptionInvoiceCopy', OptionInvoiceCopy, 'CUInvoiceNum', CUInvoiceNum);
};

/**
 * @typedef {Object} ProxyServerAddressRes
 * @property {number} ParamLength Up to 3 symbols for parameter length
 * @property {string} Address 21 symbols for address
 */

/**
 * Provides information about the proxy server address.
 * @return {ProxyServerAddressRes}
 */
Tremol.FP.prototype.ReadProxyServerAddress = function () {
	return this.do('ReadProxyServerAddress');
};

/**
 * Read device communication usage with server
 * @return {Tremol.Enums.OptionModule}
 */
Tremol.FP.prototype.ReadServer_UsedComModule = function () {
	return this.do('ReadServer_UsedComModule');
};

/**
 * @typedef {Object} SpecificMessageRes
 * @property {string} MessageNum 2 symbols for total number of messages
 * @property {Date} DateTime Date Time parameter
 * @property {string} Type 1 symbol for type
 * @property {string} Code 3 symbols for code
 * @property {string} MessageText Up to 128 symbols for message text
 */

/**
 * Reads specific message number
 * @param {string} MessageNum 2 symbols for total number of messages
 * @return {SpecificMessageRes}
 */
Tremol.FP.prototype.ReadSpecificMessage = function (MessageNum) {
	return this.do('ReadSpecificMessage', 'MessageNum', MessageNum);
};

/**
 * @typedef {Object} StatusRes
 * @property {boolean} Power_down_in_opened_fiscal_receipt Power down in opened fiscal receipt
 * @property {boolean} DateTime_not_set DateTime not set
 * @property {boolean} DateTime_wrong DateTime wrong
 * @property {boolean} RAM_reset RAM reset
 * @property {boolean} Hardware_clock_error Hardware clock error
 * @property {boolean} Reports_registers_Overflow Reports registers Overflow
 * @property {boolean} Opened_Fiscal_Receipt Opened Fiscal Receipt
 * @property {boolean} Receipt_Invoice_Type Receipt Invoice Type
 * @property {boolean} SD_card_near_full SD card near full
 * @property {boolean} SD_card_full SD card full
 * @property {boolean} CU_fiscalized CU fiscalized
 * @property {boolean} CU_produced CU produced
 * @property {boolean} Paired_with_TIMS Paired with TIMS
 * @property {boolean} Unsent_receipts Unsent receipts
 * @property {boolean} No_Sec_IC No Sec.IC
 * @property {boolean} No_certificates No certificates
 * @property {boolean} Service_jumper Service jumper
 * @property {boolean} Missing_SD_card Missing SD card
 * @property {boolean} Wrong_SD_card Wrong SD card
 * @property {boolean} Update_is_available Update is available
 */

/**
 * Provides detailed 6-byte information about the current status of the CU.
 * @return {StatusRes}
 */
Tremol.FP.prototype.ReadStatus = function () {
	return this.do('ReadStatus');
};

/**
 * Provides information about device's TCP port number.
 * @return {number}
 */
Tremol.FP.prototype.ReadTcpPortNumber = function () {
	return this.do('ReadTcpPortNumber');
};

/**
 * Provides information about if the TCP connection autostart when the device enter in Line/Sale mode.
 * @return {Tremol.Enums.OptionTCPAutoStart}
 */
Tremol.FP.prototype.ReadTCP_AutoStartStatus = function () {
	return this.do('ReadTCP_AutoStartStatus');
};

/**
 * Provides information about device's MAC address.
 * @return {string}
 */
Tremol.FP.prototype.ReadTCP_MACAddress = function () {
	return this.do('ReadTCP_MACAddress');
};

/**
 * @typedef {Object} TCP_PasswordRes
 * @property {number} PassLength Up to 3 symbols for the password length
 * @property {string} Password (Password) Up to 100 symbols for the TCP password
 */

/**
 * Provides information about device's TCP password.
 * @return {TCP_PasswordRes}
 */
Tremol.FP.prototype.ReadTCP_Password = function () {
	return this.do('ReadTCP_Password');
};

/**
 * Provides information about which module the device is in use: LAN or WiFi module. This information can be provided if the device has mounted both modules.
 * @return {Tremol.Enums.OptionUsedModule}
 */
Tremol.FP.prototype.ReadTCP_UsedModule = function () {
	return this.do('ReadTCP_UsedModule');
};

/**
 * Read time threshold minutes
 * @return {number}
 */
Tremol.FP.prototype.ReadTimeThreshold_Minutes = function () {
	return this.do('ReadTimeThreshold_Minutes');
};

/**
 * Reads all messages from log
 * @return {string}
 */
Tremol.FP.prototype.ReadTotalMessagesCount = function () {
	return this.do('ReadTotalMessagesCount');
};

/**
 * @typedef {Object} VATratesRes
 * @property {number} VATrateA (VAT rate A) Up to 7 symbols for VATrates of VAT class A in format ##.##%
 * @property {number} VATrateB (VAT rate B) Up to 7 symbols for VATrates of VAT class B in format ##.##%
 * @property {number} VATrateC (VAT rate C) Up to 7 symbols for VATrates of VAT class C in format ##.##%
 * @property {number} VATrateD (VAT rate D) Up to 7 symbols for VATrates of VAT class D in format ##.##%
 * @property {number} VATrateE (VAT rate E) Up to 7 symbols for VATrates of VAT class E in format ##.##%
 */

/**
 * Provides information about the current VAT rates (the last value stored in FM).
 * @return {VATratesRes}
 */
Tremol.FP.prototype.ReadVATrates = function () {
	return this.do('ReadVATrates');
};

/**
 * Provides information about the device version.
 * @return {string}
 */
Tremol.FP.prototype.ReadVersion = function () {
	return this.do('ReadVersion');
};

/**
 * @typedef {Object} WiFi_NetworkNameRes
 * @property {number} WiFiNameLength Up to 3 symbols for the WiFi name length
 * @property {string} WiFiNetworkName (Name) Up to 100 symbols for the device's WiFi network name
 */

/**
 * Provides information about WiFi network name where the device is connected.
 * @return {WiFi_NetworkNameRes}
 */
Tremol.FP.prototype.ReadWiFi_NetworkName = function () {
	return this.do('ReadWiFi_NetworkName');
};

/**
 * @typedef {Object} WiFi_PasswordRes
 * @property {number} PassLength Up to 3 symbols for the WiFi password length
 * @property {string} Password Up to 100 symbols for the device's WiFi password
 */

/**
 * Providing information about WiFi password where the device is connected.
 * @return {WiFi_PasswordRes}
 */
Tremol.FP.prototype.ReadWiFi_Password = function () {
	return this.do('ReadWiFi_Password');
};

/**
 * Provides information about device's idle timeout. This timeout is seconds in which the connection will be closed when there is an inactivity. This information is available if the device has LAN or WiFi. Maximal value - 7200, minimal value 1. 0 is for never close the connection.
 * @return {number}
 */
Tremol.FP.prototype.Read_IdleTimeout = function () {
	return this.do('Read_IdleTimeout');
};

/**
 * After every change on Idle timeout, LAN/WiFi/GPRS usage, LAN/WiFi/TCP/GPRS password or TCP auto start networks settings this Save command needs to be execute.
 */
Tremol.FP.prototype.SaveNetworkSettings = function () {
	return this.do('SaveNetworkSettings');
};

/**
 * The device scan out the list of available WiFi networks.
 */
Tremol.FP.prototype.ScanWiFiNetworks = function () {
	return this.do('ScanWiFiNetworks');
};

/**
 * Register the sell (for correction use minus sign in the price field) of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction.
 * @param {string} NamePLU 36 symbols for article's name
 * @param {Tremol.Enums.OptionVATClass} OptionVATClass 1 symbol for article's VAT class with optional values:" 
 - 'A' - VAT Class A
 * @param {number} Price Up to 15 symbols for article's price with upto 5 digits after decimal point
 * @param {string} MeasureUnit 3 symbols for measure unit
 * @param {string} HSCode 10 symbols for HS Code in format XXXX.XX.XX
 * @param {string} HSName 20 symbols for HS Name
 * @param {number} VATGrRate Up to 5 symbols for programmable VAT rate
 * @param {number=} Quantity 1 to 10 symbols for quantity
 * @param {number=} DiscAddP 1 to 7 for percentage of discount/addition
 */
Tremol.FP.prototype.SellPLUfromExtDB = function (NamePLU, OptionVATClass, Price, MeasureUnit, HSCode, HSName, VATGrRate, Quantity, DiscAddP) {
	return this.do('SellPLUfromExtDB', 'NamePLU', NamePLU, 'OptionVATClass', OptionVATClass, 'Price', Price, 'MeasureUnit', MeasureUnit, 'HSCode', HSCode, 'HSName', HSName, 'VATGrRate', VATGrRate, 'Quantity', Quantity, 'DiscAddP', DiscAddP);
};

/**
 * Register the sell (for correction use minus sign in the price field) of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction.
 * @param {string} NamePLU 36 symbols for article's name
 * @param {number} Price Up to 15 symbols for article's price with upto 5 digits after decimal point
 * @param {string} HSCode 10 symbols for HS Code in format XXXX.XX.XX
 * @param {number=} Quantity 1 to 10 symbols for quantity
 * @param {number=} DiscAddP 1 to 7 for percentage of discount/addition
 */
Tremol.FP.prototype.SellPLUfromExtDB_HS = function (NamePLU, Price, HSCode, Quantity, DiscAddP) {
	return this.do('SellPLUfromExtDB_HS', 'NamePLU', NamePLU, 'Price', Price, 'HSCode', HSCode, 'Quantity', Quantity, 'DiscAddP', DiscAddP);
};

/**
 * Sets the date and time and current values.
 * @param {Date} DateTime Date Time parameter in format: DD-MM-YY HH:MM
 */
Tremol.FP.prototype.SetDateTime = function (DateTime) {
	return this.do('SetDateTime', 'DateTime', DateTime);
};

/**
 * Program device's NTP address . To apply use - SaveNetworkSettings()
 * @param {number} AddressLen Up to 3 symbols for the address length
 * @param {string} NTPAddress 50 symbols for the device's NTP address
 */
Tremol.FP.prototype.SetDeviceNTP_Address = function (AddressLen, NTPAddress) {
	return this.do('SetDeviceNTP_Address', 'AddressLen', AddressLen, 'NTPAddress', NTPAddress);
};

/**
 * Program device's network IP address, subnet mask, gateway address, DNS address. To apply use -SaveNetworkSettings()
 * @param {Tremol.Enums.OptionAddressType} OptionAddressType 1 symbol with value: 
 - '2' - IP address 
 - '3' - Subnet Mask 
 - '4' - Gateway address 
 - '5' - DNS address
 * @param {string} DeviceAddress 15 symbols for the selected address
 */
Tremol.FP.prototype.SetDeviceTCP_Addresses = function (OptionAddressType, DeviceAddress) {
	return this.do('SetDeviceTCP_Addresses', 'OptionAddressType', OptionAddressType, 'DeviceAddress', DeviceAddress);
};

/**
 * Program device's MAC address . To apply use - SaveNetworkSettings()
 * @param {string} MACAddress 12 symbols for the MAC address
 */
Tremol.FP.prototype.SetDeviceTCP_MACAddress = function (MACAddress) {
	return this.do('SetDeviceTCP_MACAddress', 'MACAddress', MACAddress);
};

/**
 * Program device's TCP network DHCP enabled or disabled. To apply use -SaveNetworkSettings()
 * @param {Tremol.Enums.OptionDHCPEnabled} OptionDHCPEnabled 1 symbol with value: 
 - '0' - Disabled 
 - '1' - Enabled
 */
Tremol.FP.prototype.SetDHCP_Enabled = function (OptionDHCPEnabled) {
	return this.do('SetDHCP_Enabled', 'OptionDHCPEnabled', OptionDHCPEnabled);
};

/**
 * Program device's GPRS APN. To apply use -SaveNetworkSettings()
 * @param {number} gprsAPNlength Up to 3 symbols for the APN len
 * @param {string} APN Up to 100 symbols for the device's GPRS APN
 */
Tremol.FP.prototype.SetGPRS_APN = function (gprsAPNlength, APN) {
	return this.do('SetGPRS_APN', 'gprsAPNlength', gprsAPNlength, 'APN', APN);
};

/**
 * Programs GPRS APN authentication type
 * @param {Tremol.Enums.OptionAuthenticationType} OptionAuthenticationType 1 symbol with value: 
- '0' - None 
- '1' - PAP 
- '2' - CHAP 
- '3' - PAP or CHAP
 */
Tremol.FP.prototype.SetGPRS_AuthenticationType = function (OptionAuthenticationType) {
	return this.do('SetGPRS_AuthenticationType', 'OptionAuthenticationType', OptionAuthenticationType);
};

/**
 * Program device's GPRS password. To apply use - SaveNetworkSettings()
 * @param {number} PassLength Up to 3 symbols for the GPRS password len
 * @param {string} Password Up to 100 symbols for the device's GPRS password
 */
Tremol.FP.prototype.SetGPRS_Password = function (PassLength, Password) {
	return this.do('SetGPRS_Password', 'PassLength', PassLength, 'Password', Password);
};

/**
 * Programs server HTTPS address.
 * @param {number} ParamLength Up to 3 symbols for parameter length
 * @param {string} Address 50 symbols for address
 */
Tremol.FP.prototype.SetHTTPS_Address = function (ParamLength, Address) {
	return this.do('SetHTTPS_Address', 'ParamLength', ParamLength, 'Address', Address);
};

/**
 * Program device's idle timeout setting. Set timeout for closing the connection if there is an inactivity. Maximal value - 7200, minimal value 1. 0 is for never close the connection. This option can be used only if the device has LAN or WiFi. To apply use - SaveNetworkSettings()
 * @param {number} IdleTimeout 4 symbols for Idle timeout in format ####
 */
Tremol.FP.prototype.SetIdle_Timeout = function (IdleTimeout) {
	return this.do('SetIdle_Timeout', 'IdleTimeout', IdleTimeout);
};

/**
 * Programs invoice threshold count
 * @param {number} Value Up to 5 symbols for value
 */
Tremol.FP.prototype.SetInvoice_ThresholdCount = function (Value) {
	return this.do('SetInvoice_ThresholdCount', 'Value', Value);
};

/**
 * Stores PIN number in operative memory.
 * @param {string} Password 6-symbols string
 * @param {string} PINnum 11 symbols for PIN registration number
 */
Tremol.FP.prototype.SetPINnumber = function (Password, PINnum) {
	return this.do('SetPINnumber', 'Password', Password, 'PINnum', PINnum);
};

/**
 * Stores the Manufacturing number into the operative memory.
 * @param {string} Password 6-symbols string
 * @param {string} SerialNum 20 symbols Manufacturing number
 */
Tremol.FP.prototype.SetSerialNum = function (Password, SerialNum) {
	return this.do('SetSerialNum', 'Password', Password, 'SerialNum', SerialNum);
};

/**
 * Program device used to talk with the server . To apply use - SaveNetworkSettings()
 * @param {Tremol.Enums.OptionModule} OptionModule 1 symbol with value: 
 - '0' - GSM 
 - '1' - LAN/WiFi
 */
Tremol.FP.prototype.SetServer_UsedComModule = function (OptionModule) {
	return this.do('SetServer_UsedComModule', 'OptionModule', OptionModule);
};

/**
 * Program TCP port of the device.
 * @param {number} TcpPortNumber 5 symbols for TCP port number in format #####
 */
Tremol.FP.prototype.SetTcpPortNumber = function (TcpPortNumber) {
	return this.do('SetTcpPortNumber', 'TcpPortNumber', TcpPortNumber);
};

/**
 * Selects the active communication module - LAN or WiFi. This option can be set only if the device has both modules at the same time. To apply use - SaveNetworkSettings()
 * @param {Tremol.Enums.OptionUsedModule} OptionUsedModule 1 symbol with value: 
 - '1' - LAN module 
 - '2' - WiFi module
 */
Tremol.FP.prototype.SetTCP_ActiveModule = function (OptionUsedModule) {
	return this.do('SetTCP_ActiveModule', 'OptionUsedModule', OptionUsedModule);
};

/**
 * Program device's autostart TCP conection in sale/line mode. To apply use -SaveNetworkSettings()
 * @param {Tremol.Enums.OptionTCPAutoStart} OptionTCPAutoStart 1 symbol with value: 
 - '0' - No 
 - '1' - Yes
 */
Tremol.FP.prototype.SetTCP_AutoStart = function (OptionTCPAutoStart) {
	return this.do('SetTCP_AutoStart', 'OptionTCPAutoStart', OptionTCPAutoStart);
};

/**
 * Program device's TCP password. To apply use - SaveNetworkSettings()
 * @param {number} PassLength Up to 3 symbols for the password len
 * @param {string} Password Up to 100 symbols for the TCP password
 */
Tremol.FP.prototype.SetTCP_Password = function (PassLength, Password) {
	return this.do('SetTCP_Password', 'PassLength', PassLength, 'Password', Password);
};

/**
 * Programs time threshold minutes
 * @param {number} Value Up to 5 symbols for value
 */
Tremol.FP.prototype.SetTime_ThresholdMinutes = function (Value) {
	return this.do('SetTime_ThresholdMinutes', 'Value', Value);
};

/**
 * Program device's TCP WiFi network name where it will be connected. To apply use -SaveNetworkSettings()
 * @param {number} WiFiNameLength Up to 3 symbols for the WiFi network name len
 * @param {string} WiFiNetworkName Up to 100 symbols for the device's WiFi ssid network name
 */
Tremol.FP.prototype.SetWiFi_NetworkName = function (WiFiNameLength, WiFiNetworkName) {
	return this.do('SetWiFi_NetworkName', 'WiFiNameLength', WiFiNameLength, 'WiFiNetworkName', WiFiNetworkName);
};

/**
 * Program device's TCP WiFi password where it will be connected. To apply use -SaveNetworkSettings()
 * @param {number} PassLength Up to 3 symbols for the WiFi password len
 * @param {string} Password Up to 100 symbols for the device's WiFi password
 */
Tremol.FP.prototype.SetWiFi_Password = function (PassLength, Password) {
	return this.do('SetWiFi_Password', 'PassLength', PassLength, 'Password', Password);
};

/**
 * Restore default parameters of the device.
 * @param {string} Password 6-symbols string
 */
Tremol.FP.prototype.SoftwareReset = function (Password) {
	return this.do('SoftwareReset', 'Password', Password);
};

/**
 * Start a device update procedure if a new update is available.
 */
Tremol.FP.prototype.StartDeviceUpdate = function () {
	return this.do('StartDeviceUpdate');
};

/**
 * Start GPRS test on the device the result
 */
Tremol.FP.prototype.StartGPRStest = function () {
	return this.do('StartGPRStest');
};

/**
 * Start LAN test on the device the result
 */
Tremol.FP.prototype.StartLANtest = function () {
	return this.do('StartLANtest');
};

/**
 * Start WiFi test on the device the result
 */
Tremol.FP.prototype.StartWiFiTest = function () {
	return this.do('StartWiFiTest');
};

/**
 * Store whole Electronic Journal report to External SD card.
 * @param {Tremol.Enums.OptionReportStorage} OptionReportStorage 2 symbols for destination: 
 - 'J4' - Storage in External SD card memory 
 - 'JX' - Storage in External SD card memory for JSON
 */
Tremol.FP.prototype.StoreEJ = function (OptionReportStorage) {
	return this.do('StoreEJ', 'OptionReportStorage', OptionReportStorage);
};

/**
 * Store Electronic Journal Report by CU Invoice Number (Multiple invoices) to External SD card.
 * @param {Tremol.Enums.OptionReportStorage} OptionReportStorage 2 symbols for destination: 
 - 'J4' - Storage in External SD card memory 
 - 'JX' - Storage in External SD card memory for JSON
 * @param {Tremol.Enums.OptionInvoiceReportFormat} OptionInvoiceReportFormat 1 character with value 
 - 'N' - Detailed EJ 
 - 'n' - Brief EJ
 * @param {number} StartCUInvoiceNum 10 symbols for start CU invoice number in format: ##########.
 * @param {number} EndCUInvoiceNum 10 symbols for end CU invoice number in format: ##########.
 */
Tremol.FP.prototype.StoreEJByCUInvoiceNum = function (OptionReportStorage, OptionInvoiceReportFormat, StartCUInvoiceNum, EndCUInvoiceNum) {
	return this.do('StoreEJByCUInvoiceNum', 'OptionReportStorage', OptionReportStorage, 'OptionInvoiceReportFormat', OptionInvoiceReportFormat, 'StartCUInvoiceNum', StartCUInvoiceNum, 'EndCUInvoiceNum', EndCUInvoiceNum);
};

/**
 * Store Electronic Journal Report from report from date to date to External USB, External SD card.
 * @param {Tremol.Enums.OptionReportStorage} OptionReportStorage 2 symbols for destination: 
 - 'J4' - Storage in External SD card memory 
 - 'JX' - Storage in External SD card memory for JSON
 * @param {Date} StartRepFromDate 6 symbols for initial date in the DDMMYY format
 * @param {Date} EndRepFromDate 6 symbols for final date in the DDMMYY format
 */
Tremol.FP.prototype.StoreEJByDate = function (OptionReportStorage, StartRepFromDate, EndRepFromDate) {
	return this.do('StoreEJByDate', 'OptionReportStorage', OptionReportStorage, 'StartRepFromDate', StartRepFromDate, 'EndRepFromDate', EndRepFromDate);
};

/**
 * Store Electronic Journal Report from report from datetime to datetime to External SD card.
 * @param {Tremol.Enums.OptionReportStorage} OptionReportStorage 2 symbols for destination: 
 - 'J4' - Storage in External SD card memory 
 - 'JX' - Storage in External SD card memory for JSON
 * @param {Tremol.Enums.OptionReportFormat} OptionReportFormat 1 character with value 
 - 'T' - Detailed EJ 
 - 't' - Brief EJ
 * @param {Date} StartRepFromDate 16 symbols for initial date in the DD-MM-YYYY
 * @param {Date} EndRepFromDate 16 symbols for final date in the DD-MM-YYYY
 */
Tremol.FP.prototype.StoreEJByDateTime = function (OptionReportStorage, OptionReportFormat, StartRepFromDate, EndRepFromDate) {
	return this.do('StoreEJByDateTime', 'OptionReportStorage', OptionReportStorage, 'OptionReportFormat', OptionReportFormat, 'StartRepFromDate', StartRepFromDate, 'EndRepFromDate', EndRepFromDate);
};

/**
 * Store Electronic Journal Report by PIN number of buyer to External SD card.
 * @param {Tremol.Enums.OptionReportStorage} OptionReportStorage 2 symbols for destination: 
 - 'J4' - Storage in External SD card memory 
 - 'JX' - Storage in External SD card memory for JSON
 * @param {Tremol.Enums.OptionPINReportFormat} OptionPINReportFormat 1 character with value 
 - 'P' - Detailed EJ 
 - 'p' - Brief EJ
 * @param {string} PINnumber 11 symbols for PIN number
 */
Tremol.FP.prototype.StoreEJByPINofBuyer = function (OptionReportStorage, OptionPINReportFormat, PINnumber) {
	return this.do('StoreEJByPINofBuyer', 'OptionReportStorage', OptionReportStorage, 'OptionPINReportFormat', OptionPINReportFormat, 'PINnumber', PINnumber);
};

/**
 * Store Electronic Journal Report by Trader System Invoice Number (Single Invoice) to External SD card.
 * @param {Tremol.Enums.OptionReportStorage} OptionReportStorage 2 symbols for destination: 
 - 'J4' - Storage in External SD card memory 
 - 'JX' - Storage in External SD card memory for JSON
 * @param {Tremol.Enums.OptionTraderSystemReportFormat} OptionTraderSystemReportFormat 1 character with value 
 - 'S' - Detailed EJ 
 - 's' - Brief EJ
 * @param {string} TraderSystemInvNum 15 symbols for trader system invoice 
number
 */
Tremol.FP.prototype.StoreEJByTraderSystemInvNum = function (OptionReportStorage, OptionTraderSystemReportFormat, TraderSystemInvNum) {
	return this.do('StoreEJByTraderSystemInvNum', 'OptionReportStorage', OptionReportStorage, 'OptionTraderSystemReportFormat', OptionTraderSystemReportFormat, 'TraderSystemInvNum', TraderSystemInvNum);
};

/**
 * Calculate the subtotal amount with printing and display visualization options. Provide information about values of the calculated amounts. If a percent or value discount/addition has been specified the subtotal and the discount/addition value will be printed regardless the parameter for printing.
 * @param {Tremol.Enums.OptionDisplay} OptionDisplay 1 symbol with value: 
 - '1' - Yes 
 - '0' - No
 * @param {number=} DiscAddV Up to 13 symbols for the value of the 
discount/addition. Use minus sign '-' for discount
 * @param {number=} DiscAddP Up to 7 symbols for the percentage value of the 
discount/addition. Use minus sign '-' for discount
 * @return {number}
 */
Tremol.FP.prototype.Subtotal = function (OptionDisplay, DiscAddV, DiscAddP) {
	return this.do('Subtotal', 'OptionDisplay', OptionDisplay, 'DiscAddV', DiscAddV, 'DiscAddP', DiscAddP);
};

/**
* Sends client definitions to the server for compatibillity.
*/
Tremol.FP.prototype.ApplyClientLibraryDefinitions = function () {
	var defs = '<Defs><ServerStartupSettings>   <Encoding CodePage="1252" EncodingName="Western European (Windows)" />   <GenerationTimeStamp>2304121540</GenerationTimeStamp>   <SignalFD>0</SignalFD>   <SilentFindDevice>0</SilentFindDevice>   <EM>0</EM> </ServerStartupSettings><Command Name="AddNewHScode" CmdByte="0x4F"><FPOperation>Programs the customer DB for special customer receipt issuing.</FPOperation><Args><Arg Name="Option" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionW" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="reserved" Value="0000" Type="OptionHardcoded" MaxLen="4" /><Arg Name="HS_Code" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for HS code</Desc></Arg><Arg Name="HS_Name" Value="" Type="Text" MaxLen="20"><Desc>20 symbols for name of HS group</Desc></Arg><Arg Name="OptionTaxable" Value="" Type="Option" MaxLen="1"><Options><Option Name="Exempted" Value="1" /><Option Name="Taxable" Value="0" /></Options><Desc>1 symbol for parameter:  - \'1\' - Exempted  - \'0\' - Taxable</Desc></Arg><Arg Name="MesureUnit" Value="" Type="Text" MaxLen="3"><Desc>3 symbols for mesure unit of item\'s code</Desc></Arg><Arg Name="VAT_rate" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate from 2 to 5 symbols with format ##.##</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'Z\']> <;>< OptionW[\'W\']><;><reserved[\'0000\']> <;> <HS_Code[10]> <;> <HS_Name[20]><;><OptionTaxable[1]><;><MesureUnit[3]><;><VAT_rate[2..6]> ]]></ArgsFormatRaw></Args></Command><Command Name="CancelReceipt" CmdByte="0x39"><FPOperation>Available only if the receipt is not closed. Cancel all sales in the receipt and close it .</FPOperation></Command><Command Name="ChangeSDcard" CmdByte="0x41"><FPOperation>Change SD card.</FPOperation><Args><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6-symbols string</Desc></Arg><Arg Name="" Value="3" Type="OptionHardcoded" MaxLen="1" /><Arg Name="SerialNum" Value="" Type="Text" MaxLen="20"><Desc>20 symbols Manufacturing number for verification with original</Desc></Arg><Arg Name="PINnum" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for PIN registration number for verification with original</Desc></Arg><ArgsFormatRaw><![CDATA[ <Password[6]> <;> <\'3\'> <;> <SerialNum[20]><;><PINnum[11]> ]]></ArgsFormatRaw></Args></Command><Command Name="ClearDisplay" CmdByte="0x24"><FPOperation>Clears the external display.</FPOperation></Command><Command Name="CloseReceipt" CmdByte="0x38"><FPOperation>Closes the opened fiscal receipt and returns receipt info.</FPOperation><Response ACK="false"><Res Name="InvoiceNum" Value="" Type="Text" MaxLen="19"><Desc>19 symbols for CU invoice number</Desc></Res><Res Name="QRcode" Value="" Type="Text" MaxLen="128"><Desc>128 symbols for QR code</Desc></Res><ResFormatRaw><![CDATA[<InvoiceNum[19]<;><QRcode[128]>]]></ResFormatRaw></Response></Command><Command Name="ConfirmFiscalization" CmdByte="0x41"><FPOperation>Confirm PIN number.</FPOperation><Args><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6-symbols string</Desc></Arg><Arg Name="" Value="2" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <Password[6]> <;> <\'2\'>  ]]></ArgsFormatRaw></Args></Command><Command Name="DailyReport" CmdByte="0x7C"><FPOperation>Provides information for the daily fiscal report  with zeroing and fiscal memory record, preceded by Electronic Journal report.</FPOperation><Args><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'Z\'>  ]]></ArgsFormatRaw></Args></Command><Command Name="DirectCommand" CmdByte="0xF1"><FPOperation>Executes the direct command .</FPOperation><Args><Arg Name="Input" Value="" Type="Text" MaxLen="200"><Desc>Raw request to FP</Desc></Arg></Args><Response ACK="false"><Res Name="Output" Value="" Type="Text" MaxLen="200"><Desc>FP raw response</Desc></Res></Response></Command><Command Name="DisplayDateTime" CmdByte="0x28"><FPOperation>Shows the current date and time on the external display.</FPOperation></Command><Command Name="DisplayTextLine1" CmdByte="0x25"><FPOperation>Shows a 20-symbols text in the upper external display line.</FPOperation><Args><Arg Name="Text" Value="" Type="Text" MaxLen="16"><Desc>16 symbols text</Desc></Arg><ArgsFormatRaw><![CDATA[ <Text[16]>  ]]></ArgsFormatRaw></Args></Command><Command Name="DisplayTextLine2" CmdByte="0x26"><FPOperation>Shows a 16-symbols text in the lower external display line.</FPOperation><Args><Arg Name="Text" Value="" Type="Text" MaxLen="16"><Desc>16 symbols text</Desc></Arg><ArgsFormatRaw><![CDATA[ <Text[16]> ]]></ArgsFormatRaw></Args></Command><Command Name="DisplayTextLines1and2" CmdByte="0x27"><FPOperation>Shows a 16-symbols text in the first line and last 16-symbols text in the second line of the external display lines.</FPOperation><Args><Arg Name="Text" Value="" Type="Text" MaxLen="32"><Desc>32 symbols text</Desc></Arg><ArgsFormatRaw><![CDATA[ <Text[32]> ]]></ArgsFormatRaw></Args></Command><Command Name="EraseHScodes" CmdByte="0x4F"><FPOperation>Erase HS codes.</FPOperation><Args><Arg Name="Option" Value="z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionR" Value="D" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6 symbols for password</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'z\']><;><OptionR[\'D\']><;><Password[6]> ]]></ArgsFormatRaw></Args></Command><Command Name="InfoLastReceiptDuplicate" CmdByte="0x3A"><FPOperation>Informs about the issued document</FPOperation></Command><Command Name="OpenCreditNoteWithFreeCustomerData" CmdByte="0x30"><FPOperation>Opens a fiscal invoice credit note receipt assigned to the specified operator number and operator password with free info for customer data. The Invoice receipt can be issued only if the invoice range (start and end numbers) is set.</FPOperation><Args><Arg Name="reserved" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="reserved" Value="     0" Type="OptionHardcoded" MaxLen="6" /><Arg Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="InvoiceDebitNoteType" Value="A" Type="OptionHardcoded" MaxLen="1" /><Arg Name="CompanyName" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for Invoice company name</Desc></Arg><Arg Name="ClientPINnum" Value="" Type="Text" MaxLen="14"><Desc>14 symbols for client PIN number</Desc></Arg><Arg Name="HeadQuarters" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for customer headquarters</Desc></Arg><Arg Name="Address" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for Address</Desc></Arg><Arg Name="PostalCodeAndCity" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for postal code and city</Desc></Arg><Arg Name="ExemptionNum" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for exemption number</Desc></Arg><Arg Name="RelatedInvoiceNum" Value="" Type="Text" MaxLen="19"><Desc>19 symbols for the related invoice number in format  ###################</Desc></Arg><Arg Name="TraderSystemInvNum" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for trader system invoice number</Desc></Arg><ArgsFormatRaw><![CDATA[ <reserved[\'1\']> <;> <reserved[\'     0\']> <;> <reserved[\'0\']> <;> <InvoiceDebitNoteType[\'A\']> <;> <CompanyName[30]> <;> <ClientPINnum[14]> <;> <HeadQuarters[30]> <;> <Address[30]> <;> <PostalCodeAndCity[30]> <;> <ExemptionNum[30]> <;> <RelatedInvoiceNum[19]><;><TraderSystemInvNum[15]> ]]></ArgsFormatRaw></Args></Command><Command Name="OpenDebitNoteWithFreeCustomerData" CmdByte="0x30"><FPOperation>Opens a fiscal invoice debit note receipt assigned to the specified operator number and operator password with free info for customer data. The Invoice receipt can be issued only if the invoice range (start and end numbers) is set.</FPOperation><Args><Arg Name="reserved" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="reserved" Value="     0" Type="OptionHardcoded" MaxLen="6" /><Arg Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="InvoiceDebitNoteType" Value="@" Type="OptionHardcoded" MaxLen="1" /><Arg Name="CompanyName" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for Invoice company name</Desc></Arg><Arg Name="ClientPINnum" Value="" Type="Text" MaxLen="14"><Desc>14 symbols for client PIN number</Desc></Arg><Arg Name="HeadQuarters" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for customer headquarters</Desc></Arg><Arg Name="Address" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for Address</Desc></Arg><Arg Name="PostalCodeAndCity" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for postal code and city</Desc></Arg><Arg Name="ExemptionNum" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for exemption number</Desc></Arg><Arg Name="RelatedInvoiceNum" Value="" Type="Text" MaxLen="19"><Desc>19 symbols for the related invoice number in format  ###################</Desc></Arg><Arg Name="TraderSystemInvNum" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for trader system invoice number</Desc></Arg><ArgsFormatRaw><![CDATA[ <reserved[\'1\']> <;> <reserved[\'     0\']> <;> <reserved[\'0\']> <;> <InvoiceDebitNoteType[\'@\']> <;> <CompanyName[30]> <;> <ClientPINnum[14]> <;> <HeadQuarters[30]> <;> <Address[30]> <;> <PostalCodeAndCity[30]> <;> <ExemptionNum[30]> <;> <RelatedInvoiceNum[19]><;><TraderSystemInvNum[15]> ]]></ArgsFormatRaw></Args></Command><Command Name="OpenInvoiceWithFreeCustomerData" CmdByte="0x30"><FPOperation>Opens a fiscal invoice receipt assigned to the specified operator number and operator password with free info for customer data. The Invoice receipt can be issued only if the invoice range (start and end numbers) is set.</FPOperation><Args><Arg Name="reserved" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="reserved" Value="     0" Type="OptionHardcoded" MaxLen="6" /><Arg Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="InvoiceType" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="CompanyName" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for Invoice company name</Desc></Arg><Arg Name="ClientPINnum" Value="" Type="Text" MaxLen="14"><Desc>14 symbols for client PIN number</Desc></Arg><Arg Name="HeadQuarters" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for customer headquarters</Desc></Arg><Arg Name="Address" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for Address</Desc></Arg><Arg Name="PostalCodeAndCity" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for postal code and city</Desc></Arg><Arg Name="ExemptionNum" Value="" Type="Text" MaxLen="30"><Desc>30 symbols for exemption number</Desc></Arg><Arg Name="TraderSystemInvNum" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for trader system invoice number</Desc></Arg><ArgsFormatRaw><![CDATA[ <reserved[\'1\']> <;> <reserved[\'     0\']> <;> <reserved[\'0\']> <;> <InvoiceType[\'1\']> <;> <CompanyName[30]> <;> <ClientPINnum[14]> <;> <HeadQuarters[30]> <;> <Address[30]> <;> <PostalCodeAndCity[30]> <;> <ExemptionNum[30]> <;><TraderSystemInvNum[15]> ]]></ArgsFormatRaw></Args></Command><Command Name="OpenReceipt" CmdByte="0x30"><FPOperation>Opens a fiscal receipt assigned to the specified operator number and operator password, parameters for receipt format and VAT type.</FPOperation><Args><Arg Name="reserved" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="reserved" Value="     0" Type="OptionHardcoded" MaxLen="6" /><Arg Name="OptionReceiptFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief" Value="0" /><Option Name="Detailed" Value="1" /></Options><Desc>1 symbol with value:   - \'1\' - Detailed   - \'0\' - Brief</Desc></Arg><Arg Name="ReceiptType" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="TraderSystemInvNum" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for trader system invoice number</Desc></Arg><ArgsFormatRaw><![CDATA[<reserved[\'1\']> <;> <reserved[\'     0\']> <;> <ReceiptFormat[1]> <;> <ReceiptType[\'0\']><;><TraderSystemInvNum[15]> ]]></ArgsFormatRaw></Args></Command><Command Name="OpenSellAndCloseInvoice" CmdByte="0x2C"><FPOperation>Opens invoice after which makes sell of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction and then closes the invoice</FPOperation><Args><Arg Name="InvoiceType" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="ClientPINnum" Value="" Type="Text" MaxLen="14"><Desc>14 symbols for client PIN number</Desc></Arg><Arg Name="ExemptionNum" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for the exemption number</Desc></Arg><Arg Name="TraderSystemInvNum" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for the trader system invoice number</Desc></Arg><Arg Name="NamePLU" Value="" Type="Text" MaxLen="36"><Desc>36 symbols for article\'s name</Desc></Arg><Arg Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /></Options><Desc>1 symbol for article\'s VAT class with optional values:"   - \'A\' - VAT Class A</Desc></Arg><Arg Name="Price" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for article\'s price with upto 5 digits after decimal point</Desc></Arg><Arg Name="MeasureUnit" Value="" Type="Text" MaxLen="3"><Desc>3 symbols for measure unit</Desc></Arg><Arg Name="HSCode" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for HS Code in format XXXX.XX.XX</Desc></Arg><Arg Name="Quantity" Value="" Type="Decimal" MaxLen="10"><Desc>1 to 10 symbols for quantity</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="*" /></Arg><Arg Name="DiscAddP" Value="" Type="Decimal" MaxLen="7"><Desc>1 to 7 for percentage of discount/addition</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="," /></Arg><ArgsFormatRaw><![CDATA[ <InvoiceType[\'1\']> <;> <ClientPINnum[14]> <;><ExemptionNum[15]> <;><TraderSystemInvNum[15]> <;><NamePLU[36]> <;> <OptionVATClass[1]> <;> <Price[1..15]> <;><MeasureUnit[3]> <;><HSCode[10]>  {<\'*\'> <Quantity[1..10]>} {<\',\'> <DiscAddP[1..7]>}  ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="InvoiceNum" Value="" Type="Text" MaxLen="19"><Desc>19 symbols for CU invoice number</Desc></Res><Res Name="QRcode" Value="" Type="Text" MaxLen="128"><Desc>128 symbols for QR code</Desc></Res><ResFormatRaw><![CDATA[<InvoiceNum[19]<;><QRcode[128]>]]></ResFormatRaw></Response></Command><Command Name="OpenSellAndCloseReceipt" CmdByte="0x2C"><FPOperation>Opens receipt after which makes sell of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction and then closes the receipt</FPOperation><Args><Arg Name="ReceiptType" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="TraderSystemInvNum" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for the trader system invoice number</Desc></Arg><Arg Name="NamePLU" Value="" Type="Text" MaxLen="36"><Desc>36 symbols for article\'s name</Desc></Arg><Arg Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /></Options><Desc>1 symbol for article\'s VAT class with optional values:"   - \'A\' - VAT Class A</Desc></Arg><Arg Name="Price" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for article\'s price with upto 5 digits after decimal point</Desc></Arg><Arg Name="MeasureUnit" Value="" Type="Text" MaxLen="3"><Desc>3 symbols for measure unit</Desc></Arg><Arg Name="HSCode" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for HS Code in format XXXX.XX.XX</Desc></Arg><Arg Name="Quantity" Value="" Type="Decimal" MaxLen="10"><Desc>1 to 10 symbols for quantity</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="*" /></Arg><Arg Name="DiscAddP" Value="" Type="Decimal" MaxLen="7"><Desc>1 to 7 for percentage of discount/addition</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="," /></Arg><ArgsFormatRaw><![CDATA[ <ReceiptType[\'0\']><;><TraderSystemInvNum[15]><;><NamePLU[36]> <;>  <OptionVATClass[1]> <;> <Price[1..15]> <;> <MeasureUnit[3]> <;><HSCode[10]>  {<\'*\'> <Quantity[1..10]>} {<\',\'> <DiscAddP[1..7]>}  ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="InvoiceNum" Value="" Type="Text" MaxLen="19"><Desc>19 symbols for CU invoice number</Desc></Res><Res Name="QRcode" Value="" Type="Text" MaxLen="128"><Desc>128 symbols for QR code</Desc></Res><ResFormatRaw><![CDATA[<InvoiceNum[19]<;><QRcode[128]>]]></ResFormatRaw></Response></Command><Command Name="ProgHScode" CmdByte="0x4F"><FPOperation>Programs HS code at a given position (HS number in order).</FPOperation><Args><Arg Name="Option" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionW" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="HS_Number" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for HS number in order in format ####</Desc></Arg><Arg Name="HS_Code" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for HS code</Desc></Arg><Arg Name="HS_Name" Value="" Type="Text" MaxLen="20"><Desc>20 symbols for name of HS group</Desc></Arg><Arg Name="OptionTaxable" Value="" Type="Option" MaxLen="1"><Options><Option Name="Exempted" Value="1" /><Option Name="Taxable" Value="0" /></Options><Desc>1 symbol for parameter:  - \'1\' - Exempted  - \'0\' - Taxable</Desc></Arg><Arg Name="MesureUnit" Value="" Type="Text" MaxLen="3"><Desc>3 symbols for mesure unit of item\'s code</Desc></Arg><Arg Name="VAT_Rate" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate from 2 to 5 symbols with format ##.##</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'Z\']> <;><OptionW[\'W\']><;><HS_Number[4]> <;> <HS_Code[10]> <;> <HS_Name[20]><;><OptionTaxable[1]> <;> <MesureUnit[3]> <;> < VAT_Rate[2..6]> ]]></ArgsFormatRaw></Args></Command><Command Name="ProgramProxyServerAddress" CmdByte="0x4E"><FPOperation>Program the proxy server address.</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="ParamLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for parameter length</Desc></Arg><Arg Name="Address" Value="" Type="Text" MaxLen="21"><Desc>21 symbols for address</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'S\'><;><\'P\'><;> <ParamLength[1..3]> <;> <Address[21]> ]]></ArgsFormatRaw></Args></Command><Command Name="ProgVATrates" CmdByte="0x42"><FPOperation>Stores a block containing the values of the VAT rates into the CU</FPOperation><Args><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6-symbols string</Desc></Arg><Arg Name="VATrateA" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate A from 2 to 6 symbols with format ##.##</Desc></Arg><Arg Name="VATrateB" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate B from 2 to 6 symbols with format ##.##</Desc></Arg><Arg Name="VATrateC" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate C from 2 to 6 symbols with format ##.##</Desc></Arg><Arg Name="VATrateD" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate D from 2 to 6 symbols with format ##.##</Desc></Arg><Arg Name="VATrateE" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>Value of VAT rate E from 2 to 6 symbols with format ##.##</Desc></Arg><ArgsFormatRaw><![CDATA[ <Password[6]> <;> <VATrateA[1..6]> <;> <VATrateB[1..6]> <;> <VATrateC[1..6]> <;> <VATrateD[1..6]> <;><VATrateE[1..6]>  ]]></ArgsFormatRaw></Args></Command><Command Name="RawRead" CmdByte="0xFF"><FPOperation> Reads raw bytes from FP.</FPOperation><Args><Arg Name="Count" Value="" Type="Decimal" MaxLen="5"><Desc>How many bytes to read if EndChar is not specified</Desc></Arg><Arg Name="EndChar" Value="" Type="Text" MaxLen="1"><Desc>The character marking the end of the data. If present Count parameter is ignored.</Desc></Arg></Args><Response ACK="false"><Res Name="Bytes" Value="" Type="Base64" MaxLen="100000"><Desc>FP raw response in BASE64 encoded string</Desc></Res></Response></Command><Command Name="RawWrite" CmdByte="0xFE"><FPOperation> Writes raw bytes to FP </FPOperation><Args><Arg Name="Bytes" Value="" Type="Base64" MaxLen="5000"><Desc>The bytes in BASE64 ecoded string to be written to FP</Desc></Arg></Args></Command><Command Name="ReadCUnumbers" CmdByte="0x60"><FPOperation>Provides information about the manufacturing number of the CU and PIN number.</FPOperation><Response ACK="false"><Res Name="SerialNumber" Value="" Type="Text" MaxLen="20"><Desc>20 symbols for individual number of the CU</Desc></Res><Res Name="PINnumber" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for pin number</Desc></Res><ResFormatRaw><![CDATA[<SerialNumber[20]><;><PINnumber[11]>]]></ResFormatRaw></Response></Command><Command Name="ReadCurrentReceiptInfo" CmdByte="0x72"><FPOperation>Read the current status of the receipt.</FPOperation><Response ACK="false"><Res Name="OptionIsReceiptOpened" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="SalesNumber" Value="" Type="Text" MaxLen="3"><Desc>3 symbols for number of sales</Desc></Res><Res Name="SubtotalAmountVATGA" Value="" Type="Decimal" MaxLen="13"><Desc>Up to 13 symbols for subtotal by VAT group A</Desc></Res><Res Name="SubtotalAmountVATGB" Value="" Type="Decimal" MaxLen="13"><Desc>Up to 13 symbols for subtotal by VAT group B</Desc></Res><Res Name="SubtotalAmountVATGC" Value="" Type="Decimal" MaxLen="13"><Desc>Up to 13 symbols for subtotal by VAT group C</Desc></Res><Res Name="SubtotalAmountVATGD" Value="" Type="Decimal" MaxLen="13"><Desc>Up to 13 symbols for subtotal by VAT group D</Desc></Res><Res Name="SubtotalAmountVATGE" Value="" Type="Decimal" MaxLen="13"><Desc>Up to 13 symbols for subtotal by VAT group E</Desc></Res><Res Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Res Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionReceiptFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief" Value="0" /><Option Name="Detailed" Value="1" /></Options><Desc>(Format) 1 symbol with value:   - \'1\' - Detailed   - \'0\' - Brief</Desc></Res><Res Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Res Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionClientReceipt" Value="" Type="Option" MaxLen="1"><Options><Option Name="invoice (client) receipt" Value="1" /><Option Name="standard receipt" Value="0" /></Options><Desc>1 symbol with value:   - \'1\' - invoice (client) receipt   - \'0\' - standard receipt</Desc></Res><Res Name="OptionPowerDownInReceipt" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol with value:  - \'0\' - No  - \'1\' - Yes</Desc></Res><Res Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><ResFormatRaw><![CDATA[<IsReceiptOpened[1]> <;> <SalesNumber[3]> <;> <SubtotalAmountVATGA[1..13]> <;> <SubtotalAmountVATGB[1..13]> <;> <SubtotalAmountVATGC[1..13]> <;> <SubtotalAmountVATGD[1..13]> <;> <SubtotalAmountVATGE[1..13]> <;> <reserved[\'0\']> <;><reserved[\'0\']> <;> <ReceiptFormat[1]> <;> <reserved[\'0\']> <;> <reserved[\'0\']> <;> <ClientReceipt[1]> <;> <PowerDownInReceipt[1]> <;> <reserved[\'0\']>]]></ResFormatRaw></Response></Command><Command Name="ReadDailyAmountsByVAT" CmdByte="0x6D"><FPOperation>Provides information about the accumulated amounts and refunded amounts by VAT class in case that CU regularly informs about the Z report(7C)</FPOperation><Response ACK="false"><Res Name="SaleVATGrA" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for the accumulated VAT in group A</Desc></Res><Res Name="SaleVATGrB" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for the accumulated VAT in group B</Desc></Res><Res Name="SaleVATGrC" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for the accumulated VAT in group C</Desc></Res><Res Name="SaleVATGrD" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for the accumulated VAT in group D</Desc></Res><Res Name="SaleTurnoverVATGrE" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for the accumulated turnover in group E</Desc></Res><Res Name="SaleTurnoverABCD" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for the sale turnover in VAT groups A, B, C, D</Desc></Res><Res Name="RefundVATGrA" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for the refund VAT in group A</Desc></Res><Res Name="RefundVATGrB" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for the refund VAT in group B</Desc></Res><Res Name="RefundVATGrC" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for the refund VAT in group C</Desc></Res><Res Name="RefundVATGrD" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for the refund VAT in group D</Desc></Res><Res Name="RefundTurnoverVATGrE" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for the refund accumulated turnover in group E</Desc></Res><Res Name="RefundTurnoverABCD" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for the refund turnover in VAT groups A, B, C, D</Desc></Res><ResFormatRaw><![CDATA[<SaleVATGrA[1..15]> <;> <SaleVATGrB[1..15]> <;> <SaleVATGrC[1..15]> <;><SaleVATGrD[1..15]> <;><SaleTurnoverVATGrE[1..15]> <;> <SaleTurnoverABCD[1..15]> <;> <RefundVATGrA[1..15]> <;> <RefundVATGrB[1..15]> <;> <RefundVATGrC[1..15]> <;> <RefundVATGrD[1..15]> <;> <RefundTurnoverVATGrE[1..15]> <;> <RefundTurnoverABCD[1..15]>]]></ResFormatRaw></Response></Command><Command Name="ReadDateTime" CmdByte="0x68"><FPOperation>Provides information about the current date and time.</FPOperation><Response ACK="false"><Res Name="DateTime" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>Date Time parameter in format: DD-MM-YY [Space] hh:mm</Desc></Res><ResFormatRaw><![CDATA[<DateTime "DD-MM-YYYY HH:MM">]]></ResFormatRaw></Response></Command><Command Name="ReadDeviceModuleSupport" CmdByte="0x4E"><FPOperation>FlagsModule is a char with bits representing modules supported by the device.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'D\'><;><\'D\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionLAN" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for LAN suppor  - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="OptionWiFi" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for WiFi support  - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="OptionGPRS" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for GPRS support  - \'0\' - No   - \'1\' - Yes  BT (Bluetooth) 1 symbol for Bluetooth support  - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="OptionBT" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>(Bluetooth) 1 symbol for Bluetooth support  - \'0\' - No   - \'1\' - Yes</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'D\'><;><\'D\'><;><LAN[1]><;><WiFi>[1]><;><GPRS>[1]><;><BT[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadDeviceModuleSupportByFirmware" CmdByte="0x4E"><FPOperation>FlagsModule is a char with bits representing modules supported by the firmware</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'D\'><;><\'S\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionLAN" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for LAN suppor  - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="OptionWiFi" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for WiFi support  - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="OptionGPRS" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for GPRS support  - \'0\' - No   - \'1\' - Yes  BT (Bluetooth) 1 symbol for Bluetooth support  - \'0\' - No   - \'1\' - Yes</Desc></Res><Res Name="OptionBT" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>(Bluetooth) 1 symbol for Bluetooth support  - \'0\' - No   - \'1\' - Yes</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'D\'><;><\'S\'><;><LAN[1]><;><WiFi>[1]><;><GPRS>[1]><;><BT[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadDeviceTCP_Addresses" CmdByte="0x4E"><FPOperation>Provides information about device\'s network IP address, subnet mask, gateway address, DNS address.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionAddressType" Value="" Type="Option" MaxLen="1"><Options><Option Name="DNS address" Value="5" /><Option Name="Gateway address" Value="4" /><Option Name="IP address" Value="2" /><Option Name="Subnet Mask" Value="3" /></Options><Desc>1 symbol with value:   - \'2\' - IP address   - \'3\' - Subnet Mask   - \'4\' - Gateway address   - \'5\' - DNS address</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'T\'><;><AddressType[1]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionAddressType" Value="" Type="Option" MaxLen="1"><Options><Option Name="DNS address" Value="5" /><Option Name="Gateway address" Value="4" /><Option Name="IP address" Value="2" /><Option Name="Subnet Mask" Value="3" /></Options><Desc>(Address type) 1 symbol with value:   - \'2\' - IP address   - \'3\' - Subnet Mask   - \'4\' - Gateway address   - \'5\' - DNS address</Desc></Res><Res Name="DeviceAddress" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for the device\'s addresses</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'T\'><;>< AddressType[1]><;><DeviceAddress[15]>]]></ResFormatRaw></Response></Command><Command Name="ReadDHCP_Status" CmdByte="0x4E"><FPOperation>Provides information about device\'s DHCP status</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'T\'><;><\'1\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionDHCPEnabled" Value="" Type="Option" MaxLen="1"><Options><Option Name="Disabled" Value="0" /><Option Name="Enabled" Value="1" /></Options><Desc>(Status) 1 symbols for device\'s DHCP status  - \'0\' - Disabled   - \'1\' - Enabled</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'T\'><;><\'1\'><;><DHCPEnabled[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadDiagnostics" CmdByte="0x22"><FPOperation>Provides information about documents sending functions .</FPOperation><Response ACK="false"><Res Name="OptionDeviceType" Value="" Type="Option" MaxLen="1"><Options><Option Name="A Type" Value="1" /><Option Name="B Type" Value="2" /></Options><Desc>1 symbol for device type:   - \'1\' - A Type   - \'2\' - B Type</Desc></Res><Res Name="SDIdxPos" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for current SD index position of last sent receipt</Desc></Res><Res Name="LastInvoiceCUNum" Value="" Type="Text" MaxLen="19"><Desc>19 symbols for number of last invoice according the CU</Desc></Res><Res Name="LastInvoiceDate" Value="" Type="Text" MaxLen="6"><Desc>6 symbols for last invoice date in the DDMMYY format</Desc></Res><Res Name="LastEODDate" Value="" Type="Text" MaxLen="6"><Desc>6 symbols for last sent EOD in the DDMMYY format</Desc></Res><Res Name="InvoicesSent" Value="" Type="Text" MaxLen="4"><Desc>4 symbold for number of invoices sent for the current day</Desc></Res><ResFormatRaw><![CDATA[<DeviceType[1]> <;> <SDIdxPos[10]> <;> <LastInvoiceCUNum[19]> <;> <LastInvoiceDate[6]> <;> <LastEODDate[6]> <;> <InvoicesSent[4]>]]></ResFormatRaw></Response></Command><Command Name="ReadEJ" CmdByte="0x7C"><FPOperation>Read whole Electronic Journal report from beginning to the end.</FPOperation><Args><Arg Name="" Value="J0" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="*" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'J0\'> <;> <\'*\'> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="ReadEJByCUInvoiceNum" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report by CU Invoice Number (Multiple invoices)</FPOperation><Args><Arg Name="" Value="J0" Type="OptionHardcoded" MaxLen="2" /><Arg Name="OptionInvoiceReportFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief EJ" Value="n" /><Option Name="Detailed EJ" Value="N" /></Options><Desc>1 character with value   - \'N\' - Detailed EJ   - \'n\' - Brief EJ</Desc></Arg><Arg Name="StartCUInvoiceNum" Value="" Type="Decimal_with_format" MaxLen="10" Format="0000000000."><Desc>10 symbols for start CU invoice number in format: ##########.</Desc></Arg><Arg Name="EndCUInvoiceNum" Value="" Type="Decimal_with_format" MaxLen="10" Format="0000000000."><Desc>10 symbols for end CU invoice number in format: ##########.</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'J0\'> <;> <InvoiceReportFormat[1]> <;> <StartCUInvoiceNum[10]> <;> <EndCUInvoiceNum[10]> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="ReadEJByCUInvoiceNum_JSON" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report by CU Invoice Number (Multiple invoices) in the JSON format. The number of bytes equal to Length for JSON data must be read subsequently.</FPOperation><Args><Arg Name="" Value="JY" Type="OptionHardcoded" MaxLen="2" /><Arg Name="OptionInvoiceReportFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief EJ" Value="n" /><Option Name="Detailed EJ" Value="N" /></Options><Desc>1 character with value   - \'N\' - Detailed EJ   - \'n\' - Brief EJ</Desc></Arg><Arg Name="StartCUInvoiceNum" Value="" Type="Decimal_with_format" MaxLen="10" Format="0000000000."><Desc>10 symbols for start CU invoice number in format: ##########.</Desc></Arg><Arg Name="EndCUInvoiceNum" Value="" Type="Decimal_with_format" MaxLen="10" Format="0000000000."><Desc>10 symbols for end CU invoice number in format: ##########.</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'JY\'> <;> < InvoiceReportFormat[1]> <;> <StartCUInvoiceNum[10]> <;> <EndCUInvoiceNum[10]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="JY" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="Length" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for length</Desc></Res><ResFormatRaw><![CDATA[<\'JY\'> <;> <\'Z\'> <;> <Length[1..10]>]]></ResFormatRaw></Response></Command><Command Name="ReadEJByDate" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report by initial to end date.</FPOperation><Args><Arg Name="" Value="J0" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Arg Name="StartRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for initial date in the DDMMYY format</Desc></Arg><Arg Name="EndRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for final date in the DDMMYY format</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'J0\'> <;> <\'D\'> <;> <StartRepFromDate "DDMMYY"><;>  <EndRepFromDate "DDMMYY"> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="ReadEJByDateTime" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report by initial to end date and time.</FPOperation><Args><Arg Name="" Value="J0" Type="OptionHardcoded" MaxLen="2" /><Arg Name="OptionReportFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief EJ" Value="t" /><Option Name="Detailed EJ" Value="T" /></Options><Desc>1 character with value   - \'T\' - Detailed EJ   - \'t\' - Brief EJ</Desc></Arg><Arg Name="StartRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>16 symbols for initial date in the DD-MM-</Desc></Arg><Arg Name="EndRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>16 symbols for final date in the DD-MM-</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'J0\'> <;> <ReportFormat[1]> <;> <StartRepFromDate "DD-MM-YYYY HH:MM"><;> <EndRepFromDate "DD-MM-YYYY HH:MM"> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="ReadEJByDateTime_JSON" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report by initial to end date and time in the JSON format. The number of bytes equal to Length for JSON data must be read subsequently.</FPOperation><Args><Arg Name="" Value="JY" Type="OptionHardcoded" MaxLen="2" /><Arg Name="OptionReportFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief EJ" Value="t" /><Option Name="Detailed EJ" Value="T" /></Options><Desc>1 character with value   - \'T\' - Detailed EJ   - \'t\' - Brief EJ</Desc></Arg><Arg Name="StartRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>16 symbols for initial date in the DD-MM-</Desc></Arg><Arg Name="EndRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>16 symbols for final date in the DD-MM-</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'JY\'> <;> <ReportFormat[1]> <;> <StartRepFromDate "DD-MM-YYYY HH:MM"><;> <EndRepFromDate "DD-MM-YYYY HH:MM"> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="JY" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="Length" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for length</Desc></Res><ResFormatRaw><![CDATA[<\'JY\'> <;> <\'Z\'> <;> <Length[1..10]>]]></ResFormatRaw></Response></Command><Command Name="ReadEJByDate_JSON" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report by initial to end date in the JSON format. The number of bytes equal to Length for JSON data must be read subsequently.</FPOperation><Args><Arg Name="" Value="JY" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Arg Name="StartRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for initial date in the DDMMYY format</Desc></Arg><Arg Name="EndRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for final date in the DDMMYY format</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'JY\'> <;> <\'D\'> <;> <StartRepFromDate "DDMMYY"><;>  <EndRepFromDate "DDMMYY"> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="JY" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="Length" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for length</Desc></Res><ResFormatRaw><![CDATA[<\'JY\'> <;> <\'Z\'> <;> <Length[1..10]>]]></ResFormatRaw></Response></Command><Command Name="ReadEJByPINofBuyer" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report by PIN number of buyer.</FPOperation><Args><Arg Name="" Value="J0" Type="OptionHardcoded" MaxLen="2" /><Arg Name="OptionPINReportFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief EJ" Value="p" /><Option Name="Detailed EJ" Value="P" /></Options><Desc>1 character with value   - \'P\' - Detailed EJ   - \'p\' - Brief EJ</Desc></Arg><Arg Name="PINnumber" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for PIN number</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'J0\'> <;> <PINReportFormat[1]> <;> <PINnumber[11]>  ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="ReadEJByPINofBuyer_JSON" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report by PIN number of buyer in the JSON format. The number of bytes equal to Length for JSON data must be read subsequently.</FPOperation><Args><Arg Name="" Value="JY" Type="OptionHardcoded" MaxLen="2" /><Arg Name="OptionPINReportFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief EJ" Value="p" /><Option Name="Detailed EJ" Value="P" /></Options><Desc>1 character with value   - \'P\' - Detailed EJ   - \'p\' - Brief EJ</Desc></Arg><Arg Name="PINnumber" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for PIN number</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'JY\'> <;> < PINReportFormat[1]> <;> <PINnumber[11]>  ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="JY" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="Length" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for length</Desc></Res><ResFormatRaw><![CDATA[<\'JY\'> <;> <\'Z\'> <;> <Length[1..10]>]]></ResFormatRaw></Response></Command><Command Name="ReadEJByTraderSystemInvNum" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report by Trader System Invoice Number (Single Invoice).</FPOperation><Args><Arg Name="" Value="J0" Type="OptionHardcoded" MaxLen="2" /><Arg Name="OptionTraderSystemReportFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief EJ" Value="s" /><Option Name="Detailed EJ" Value="S" /></Options><Desc>1 character with value   - \'S\' - Detailed EJ   - \'s\' - Brief EJ</Desc></Arg><Arg Name="TraderSystemInvNum" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for trader system invoice  number</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'J0\'> <;> <TraderSystemReportFormat[1]> <;> <TraderSystemInvNum[15]> ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="ReadEJByTraderSystemInvNum_JSON" CmdByte="0x7C"><FPOperation>Read Electronic Journal Report by Trader System Invoice Number (Single Invoice) in the JSON format. The number of bytes equal to Length for JSON data must be read subsequently.</FPOperation><Args><Arg Name="" Value="JY" Type="OptionHardcoded" MaxLen="2" /><Arg Name="OptionTraderSystemReportFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief EJ" Value="s" /><Option Name="Detailed EJ" Value="S" /></Options><Desc>1 character with value   - \'S\' - Detailed EJ   - \'s\' - Brief EJ</Desc></Arg><Arg Name="TraderSystemInvNum" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for trader system invoice  number</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'JY\'> <;> < TraderSystemReportFormat[1]> <;> <TraderSystemInvNum[15]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="JY" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="Length" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for length</Desc></Res><ResFormatRaw><![CDATA[<\'JY\'> <;> <\'Z\'> <;> <Length[1..10]>]]></ResFormatRaw></Response></Command><Command Name="ReadEJ_JSON" CmdByte="0x7C"><FPOperation>Read whole Electronic Journal report from beginning to the end in the JSON format. The number of bytes equal to Length for JSON data must be read subsequently.</FPOperation><Args><Arg Name="" Value="JY" Type="OptionHardcoded" MaxLen="2" /><Arg Name="" Value="*" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'JY\'> <;> <\'*\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="JY" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="*" Type="OptionHardcoded" MaxLen="1" /><Res Name="Length" Value="" Type="Decimal" MaxLen="10"><Desc>Up to 10 symbols for length</Desc></Res><ResFormatRaw><![CDATA[<\'JY\'> <;> <\'*\'> <;> <Length[1..10]>]]></ResFormatRaw></Response></Command><Command Name="ReadEODAmounts" CmdByte="0x6D"><FPOperation>Provides information about the accumulated EOD turnover and VAT</FPOperation><Args><Arg Name="Option" Value="d" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <Option[\'d\']> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Option" Value="d" Type="OptionHardcoded" MaxLen="1" /><Res Name="EOD_sale_turnover" Value="" Type="Decimal" MaxLen="20"><Desc>Up to 20 symbols for the EOD sale turnover</Desc></Res><Res Name="EOD_credit_turnover" Value="" Type="Decimal" MaxLen="20"><Desc>Up to 20 symbols for the EOD credit turnover</Desc></Res><Res Name="EOD_saleVAT" Value="" Type="Decimal" MaxLen="20"><Desc>Up to 20 symbols for the EOD VAT from sales</Desc></Res><Res Name="EOD_creditVAT" Value="" Type="Decimal" MaxLen="20"><Desc>Up to 20 symbols for the EOD VAT from credit invoices</Desc></Res><ResFormatRaw><![CDATA[<Option[\'d\']> <;> <EOD_sale_turnover[1..20]> <;> <EOD_credit_turnover[1..20]> <;> <EOD_saleVAT[1..20]> <;> <EOD_creditVAT [1..20]> <;>]]></ResFormatRaw></Response></Command><Command Name="ReadEODAmountsByDate" CmdByte="0x6D"><FPOperation>Provides information about the accumulated EOD turnover and VAT amounts by date</FPOperation><Args><Arg Name="Option" Value="d" Type="OptionHardcoded" MaxLen="1" /><Arg Name="EOD_Date" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for initial date in the DDMMYY format</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'d\']> <;> <EOD_Date "DDMMYY"> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Option" Value="d" Type="OptionHardcoded" MaxLen="1" /><Res Name="EOD_Date" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for initial date in the DDMMYY format</Desc></Res><Res Name="EOD_sale_turnover" Value="" Type="Decimal" MaxLen="20"><Desc>Up to 20 symbols for the EOD sale turnover</Desc></Res><Res Name="EOD_credit_turnover" Value="" Type="Decimal" MaxLen="20"><Desc>Up to 20 symbols for the EOD credit turnover</Desc></Res><Res Name="EOD_saleVAT" Value="" Type="Decimal" MaxLen="20"><Desc>Up to 20 symbols for the EOD VAT from sales</Desc></Res><Res Name="EOD_creditVAT" Value="" Type="Decimal" MaxLen="20"><Desc>Up to 20 symbols for the EOD VAT from credit invoices</Desc></Res><Res Name="InvoiceCount" Value="" Type="Text" MaxLen="4"><Desc>4 symbols for invoices count</Desc></Res><Res Name="CreditCount" Value="" Type="Text" MaxLen="4"><Desc>4 symbols for credit count</Desc></Res><ResFormatRaw><![CDATA[<Option[\'d\']> <;> <EOD_Date "DDMMYY"> <;> <EOD_sale_turnover[1..20]> <;> <EOD_credit_turnover[1..20]> <;> <EOD_saleVAT[1..20]> <;> <EOD_creditVAT [1..20]> <;> <InvoiceCount[4]> <;> <CreditCount[4]>]]></ResFormatRaw></Response></Command><Command Name="ReadFirstEODDate" CmdByte="0x6D"><FPOperation>Provides information about first EOD date</FPOperation><Args><Arg Name="Option" Value="d" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Option" Value="f" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <Option[\'d\']> <;> <Option[\'f\']> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Option" Value="d" Type="OptionHardcoded" MaxLen="1" /><Res Name="Option" Value="f" Type="OptionHardcoded" MaxLen="1" /><Res Name="DateTime" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>Date Time parameter in format: DDMMYY</Desc></Res><ResFormatRaw><![CDATA[<Option[\'d\']> <;> <Option[\'f\']> <;> <DateTime "DDMMYY">]]></ResFormatRaw></Response></Command><Command Name="ReadGPRS_APN" CmdByte="0x4E"><FPOperation>Provides information about device\'s GRPS APN.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="A" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'G\'><;><\'A\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="A" Type="OptionHardcoded" MaxLen="1" /><Res Name="gprsAPNlength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the APN length</Desc></Res><Res Name="APN" Value="" Type="Text" MaxLen="100"><Desc>(APN) Up to 100 symbols for the device\'s GPRS APN</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'G\'><;><\'A\'><;><gprsAPNlength[1..3]><;><APN[100]>]]></ResFormatRaw></Response></Command><Command Name="ReadGPRS_AuthenticationType" CmdByte="0x4E"><FPOperation>Read GPRS APN authentication type</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'G\'><;><\'N\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionAuthenticationType" Value="" Type="Option" MaxLen="1"><Options><Option Name="CHAP" Value="2" /><Option Name="None" Value="0" /><Option Name="PAP" Value="1" /><Option Name="PAP or CHAP" Value="3" /></Options><Desc>1 symbol with value:  - \'0\' - None  - \'1\' - PAP  - \'2\' - CHAP  - \'3\' - PAP or CHAP</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'G\'><;><\'N\'><;><AuthenticationType[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadGPRS_Password" CmdByte="0x4E"><FPOperation>Provides information about device\'s GPRS password.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'G\'><;><\'P\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Res Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the GPRS password length</Desc></Res><Res Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s GPRS password</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'G\'><;><\'P\'><;><PassLength[1..3]><;><Password[100]>]]></ResFormatRaw></Response></Command><Command Name="ReadGPRS_Username" CmdByte="0x4E"><FPOperation>Providing information about device\'s GPRS user name.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="U" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'G\'><;><\'U\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="U" Type="OptionHardcoded" MaxLen="1" /><Res Name="gprsUserNameLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the GPRS username length</Desc></Res><Res Name="Username" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s GPRS username</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'G\'><;><\'U\'><;><gprsUserNameLength[1..3]><;><Username[100]>]]></ResFormatRaw></Response></Command><Command Name="ReadHScode" CmdByte="0x4F"><FPOperation>Programs HS code at a given position (HS number in order).</FPOperation><Args><Arg Name="Option" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionR" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="HS_Number" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for HS number in order in format ####</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'Z\']> <;><OptionR[\'R\']><;><HS_Number[4]>  ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Option" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionR" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="HS_Number" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for HS number in order in format ####</Desc></Res><Res Name="HS_Code" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for HS code</Desc></Res><Res Name="HS_Name" Value="" Type="Text" MaxLen="20"><Desc>20 symbols for name of HS group</Desc></Res><Res Name="OptionTaxable" Value="" Type="Option" MaxLen="1"><Options><Option Name="Exempted" Value="1" /><Option Name="Taxable" Value="0" /></Options><Desc>1 symbol for parameter:  - \'1\' - Exempted  - \'0\' - Taxable</Desc></Res><Res Name="MesureUnit" Value="" Type="Text" MaxLen="3"><Desc>3 symbols for mesure unit of item\'s code</Desc></Res><Res Name="VAT_Rate" Value="" Type="Decimal_with_format" MaxLen="6" Format="00.00"><Desc>(VAT rate) Value of VAT rate from 2 to 5 symbols with format ##.##</Desc></Res><ResFormatRaw><![CDATA[<Option[\'Z\']> <;><OptionR[\'R\']><;><HS_Number[4]> <;> <HS_Code[10]> <;> <HS_Name[20]> <;><OptionTaxable[1]> <;> <MesureUnit[3]> <;> < VAT_Rate[2..6]>]]></ResFormatRaw></Response></Command><Command Name="ReadHScodeNumber" CmdByte="0x4F"><FPOperation>Read the number of HS codes.</FPOperation><Args><Arg Name="Option" Value="z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionR" Value="R" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <Option[\'z\']> <;><OptionR[\'R\']>  ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Option" Value="z" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionR" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="HScodesNumber" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for HS codes number in format ####</Desc></Res><ResFormatRaw><![CDATA[<Option[\'z\']> <;><OptionR[\'R\']><;>< HScodesNumber [4]>]]></ResFormatRaw></Response></Command><Command Name="ReadHTTPS_Server" CmdByte="0x4E"><FPOperation>Providing information about server HTTPS address.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="H" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'S\'><;><\'H\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="C" Type="OptionHardcoded" MaxLen="1" /><Res Name="ParamLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for parameter length</Desc></Res><Res Name="Address" Value="" Type="Text" MaxLen="50"><Desc>50 symbols for address</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'S\'><;><\'C\'><;><ParamLength[1..3]><;><Address[50]>]]></ResFormatRaw></Response></Command><Command Name="ReadInfoFromLastServerCommunication" CmdByte="0x5A"><FPOperation>Provide information from the last communication with the server.</FPOperation><Args><Arg Name="Option" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionServerResponse" Value="" Type="Option" MaxLen="1"><Options><Option Name="At send EOD" Value="Z" /><Option Name="At send receipt" Value="R" /></Options><Desc>1 symbol with value  - \'R\' - At send receipt  - \'Z\' - At send EOD</Desc></Arg><Arg Name="OptionTransactionType" Value="" Type="Option" MaxLen="1"><Options><Option Name="Error Code" Value="c" /><Option Name="Error Message" Value="m" /><Option Name="Exception Message" Value="e" /><Option Name="Response Code" Value="r" /><Option Name="Status" Value="s" /></Options><Desc>1 symbol with value  - \'c\' - Error Code  - \'m\' - Error Message  - \'s\' - Status  - \'e\' - Exception Message  - \'r\' - Response Code</Desc></Arg><ArgsFormatRaw><![CDATA[ <Option[\'S\']><;> <ServerResponse[1]><;><TransactionType[1]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="Option" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionServerResponse" Value="" Type="Option" MaxLen="1"><Options><Option Name="At send EOD" Value="Z" /><Option Name="At send receipt" Value="R" /></Options><Desc>1 symbol with value  - \'R\' - At send receipt  - \'Z\' - At send EOD</Desc></Res><Res Name="OptionTransactionType" Value="" Type="Option" MaxLen="1"><Options><Option Name="Error Code" Value="c" /><Option Name="Error Message" Value="m" /><Option Name="Exception Message" Value="e" /><Option Name="Response Code" Value="r" /><Option Name="Status" Value="s" /></Options><Desc>1 symbol with value  - \'c\' - Error Code  - \'m\' - Error Message  - \'s\' - Status  - \'e\' - Exception Message  - \'r\' - Response Code</Desc></Res><Res Name="Message" Value="" Type="Text" MaxLen="200"><Desc>Up to 200 symbols for the message from the server</Desc></Res><ResFormatRaw><![CDATA[<Option[\'S\']><;> <ServerResponse[1]><;><TransactionType[1]><;><Message[200]>]]></ResFormatRaw></Response></Command><Command Name="ReadInvoice_Threshold" CmdByte="0x4E"><FPOperation>Read invoice threshold count</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="I" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'S\'><;><\'I\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="I" Type="OptionHardcoded" MaxLen="1" /><Res Name="Value" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for value</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'S\'><;><\'I\'><;><Value[1..5]>]]></ResFormatRaw></Response></Command><Command Name="ReadLastAndTotalReceiptNum" CmdByte="0x71"><FPOperation>Provides information about the number of the last issued receipt.</FPOperation><Response ACK="false"><Res Name="LastCUInvoiceNum" Value="" Type="Text" MaxLen="19"><Desc>19 symbols for the last number of invoice according the middleware, CU,  internal invoice counter</Desc></Res><Res Name="LastReceiptNum" Value="" Type="Decimal_with_format" MaxLen="7" Format="0000000"><Desc>7 symbols for last receipt number in format #######</Desc></Res><ResFormatRaw><![CDATA[<LastCUInvoiceNum[19]> <;> <LastReceiptNum[7]>]]></ResFormatRaw></Response></Command><Command Name="ReadNTP_Address" CmdByte="0x4E"><FPOperation>Provides information about device\'s NTP address.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'S\'><;><\'N\' > ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><Res Name="AddressLen" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the address length</Desc></Res><Res Name="NTPAddress" Value="" Type="Text" MaxLen="50"><Desc>(NTP Address)50 symbols for the device\'s NTP address</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'S\'><;><\'N\'><;><AddressLen[1..3]><;><NTPAddress[50]>]]></ResFormatRaw></Response></Command><Command Name="ReadOrStoreInvoiceCopy" CmdByte="0x7C"><FPOperation>Read/Store Invoice receipt copy to External SD card.</FPOperation><Args><Arg Name="OptionInvoiceCopy" Value="" Type="Option" MaxLen="2"><Options><Option Name="Reading" Value="J0" /><Option Name="Storage in External SD card memory" Value="J4" /></Options><Desc>2 symbols for destination:   - \'J0\' - Reading    - \'J4\' - Storage in External SD card memory</Desc></Arg><Arg Name="" Value="I" Type="OptionHardcoded" MaxLen="1" /><Arg Name="CUInvoiceNum" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for Invoice receipt Number.</Desc></Arg><ArgsFormatRaw><![CDATA[ <OptionInvoiceCopy[2]><;><\'I\'><;> <CUInvoiceNum[10]>  ]]></ArgsFormatRaw></Args><Response ACK="true" ACK_PLUS="true" /></Command><Command Name="ReadProxyServerAddress" CmdByte="0x4E"><FPOperation>Provides information about the proxy server address.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'S\'><;><\'P\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Res Name="ParamLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for parameter length</Desc></Res><Res Name="Address" Value="" Type="Text" MaxLen="21"><Desc>21 symbols for address</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'S\'><;><\'P\'><;> <ParamLength[1..3]> <;> <Address[21]>]]></ResFormatRaw></Response></Command><Command Name="ReadServer_UsedComModule" CmdByte="0x4E"><FPOperation>Read device communication usage with server</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="E" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'S\'><;><\'E\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="E" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionModule" Value="" Type="Option" MaxLen="1"><Options><Option Name="GSM" Value="0" /><Option Name="LAN/WiFi" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - GSM   - \'1\' - LAN/WiFi</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'S\'><;><\'E\'><;><Module [1]>]]></ResFormatRaw></Response></Command><Command Name="ReadSpecificMessage" CmdByte="0x4E"><FPOperation>Reads specific message number</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="L" Type="OptionHardcoded" MaxLen="1" /><Arg Name="MessageNum" Value="" Type="Text" MaxLen="2"><Desc>2 symbols for total number of messages</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'L\'><;><MessageNum[2]> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="L" Type="OptionHardcoded" MaxLen="1" /><Res Name="MessageNum" Value="" Type="Text" MaxLen="2"><Desc>2 symbols for total number of messages</Desc></Res><Res Name="DateTime" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>Date Time parameter</Desc></Res><Res Name="Type" Value="" Type="Text" MaxLen="1"><Desc>1 symbol for type</Desc></Res><Res Name="Code" Value="" Type="Text" MaxLen="3"><Desc>3 symbols for code</Desc></Res><Res Name="MessageText" Value="" Type="Text" MaxLen="128"><Desc>Up to 128 symbols for message text</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'L\'><;><MessageNum[2]><;> <DateTime "DD-MM-YYYY HH:MM"> <;><Type[1]><;><Code[3]> <;><MessageText[128]>]]></ResFormatRaw></Response></Command><Command Name="ReadStatus" CmdByte="0x20"><FPOperation>Provides detailed 6-byte information about the current status of the CU.</FPOperation><Response ACK="false"><Res Name="Power_down_in_opened_fiscal_receipt" Value="" Type="Status" Byte="0" Bit="1"><Desc>Power down in opened fiscal receipt</Desc></Res><Res Name="DateTime_not_set" Value="" Type="Status" Byte="0" Bit="3"><Desc>DateTime not set</Desc></Res><Res Name="DateTime_wrong" Value="" Type="Status" Byte="0" Bit="4"><Desc>DateTime wrong</Desc></Res><Res Name="RAM_reset" Value="" Type="Status" Byte="0" Bit="5"><Desc>RAM reset</Desc></Res><Res Name="Hardware_clock_error" Value="" Type="Status" Byte="0" Bit="6"><Desc>Hardware clock error</Desc></Res><Res Name="Reports_registers_Overflow" Value="" Type="Status" Byte="1" Bit="1"><Desc>Reports registers Overflow</Desc></Res><Res Name="Opened_Fiscal_Receipt" Value="" Type="Status" Byte="2" Bit="1"><Desc>Opened Fiscal Receipt</Desc></Res><Res Name="Receipt_Invoice_Type" Value="" Type="Status" Byte="2" Bit="2"><Desc>Receipt Invoice Type</Desc></Res><Res Name="SD_card_near_full" Value="" Type="Status" Byte="2" Bit="5"><Desc>SD card near full</Desc></Res><Res Name="SD_card_full" Value="" Type="Status" Byte="2" Bit="6"><Desc>SD card full</Desc></Res><Res Name="CU_fiscalized" Value="" Type="Status" Byte="3" Bit="5"><Desc>CU fiscalized</Desc></Res><Res Name="CU_produced" Value="" Type="Status" Byte="3" Bit="6"><Desc>CU produced</Desc></Res><Res Name="Paired_with_TIMS" Value="" Type="Status" Byte="4" Bit="0"><Desc>Paired with TIMS</Desc></Res><Res Name="Unsent_receipts" Value="" Type="Status" Byte="4" Bit="1"><Desc>Unsent receipts</Desc></Res><Res Name="No_Sec_IC" Value="" Type="Status" Byte="5" Bit="0"><Desc>No Sec.IC</Desc></Res><Res Name="No_certificates" Value="" Type="Status" Byte="5" Bit="1"><Desc>No certificates</Desc></Res><Res Name="Service_jumper" Value="" Type="Status" Byte="5" Bit="2"><Desc>Service jumper</Desc></Res><Res Name="Missing_SD_card" Value="" Type="Status" Byte="5" Bit="4"><Desc>Missing SD card</Desc></Res><Res Name="Wrong_SD_card" Value="" Type="Status" Byte="5" Bit="5"><Desc>Wrong SD card</Desc></Res><Res Name="Update_is_available" Value="" Type="Status" Byte="5" Bit="6"><Desc>Update is available</Desc></Res><ResFormatRaw><![CDATA[<StatusBytes[6]>]]></ResFormatRaw></Response></Command><Command Name="ReadTcpPortNumber" CmdByte="0x4E"><FPOperation>Provides information about device\'s TCP port number.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'Z\'><;><\'P\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Res Name="TcpPortNumber" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for TCP port in format #####</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'Z\'><;><\'P\'><;><TcpPortNumber[5]>]]></ResFormatRaw></Response></Command><Command Name="ReadTCP_AutoStartStatus" CmdByte="0x4E"><FPOperation>Provides information about if the TCP connection autostart when the device enter in Line/Sale mode.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="2" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'Z\'><;><\'2\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="2" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionTCPAutoStart" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol for TCP auto start option  - \'0\' - No   - \'1\' - Yes</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'Z\'><;><\'2\'><;><TCPAutoStart[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadTCP_MACAddress" CmdByte="0x4E"><FPOperation>Provides information about device\'s MAC address.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="6" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'T\'><;><\'6\' > ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="6" Type="OptionHardcoded" MaxLen="1" /><Res Name="MACAddress" Value="" Type="Text" MaxLen="12"><Desc>12 symbols for the device\'s MAC address</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'T\'><;><\'6\'><;><MACAddress[12]>]]></ResFormatRaw></Response></Command><Command Name="ReadTCP_Password" CmdByte="0x4E"><FPOperation>Provides information about device\'s TCP password.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'Z\'><;><\'1\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><Res Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the password length</Desc></Res><Res Name="Password" Value="" Type="Text" MaxLen="100"><Desc>(Password) Up to 100 symbols for the TCP password</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'Z\'><;><\'1\'><;><PassLength[1..3]><;><Password[100]>]]></ResFormatRaw></Response></Command><Command Name="ReadTCP_UsedModule" CmdByte="0x4E"><FPOperation>Provides information about which module the device is in use: LAN or WiFi module. This information can be provided if the device has mounted both modules.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="U" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'Z\'><;><\'U\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="U" Type="OptionHardcoded" MaxLen="1" /><Res Name="OptionUsedModule" Value="" Type="Option" MaxLen="1"><Options><Option Name="LAN module" Value="1" /><Option Name="WiFi module" Value="2" /></Options><Desc>1 symbol with value:   - \'1\' - LAN module   - \'2\' - WiFi module</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'Z\'><;><\'U\'><;><UsedModule[1]>]]></ResFormatRaw></Response></Command><Command Name="ReadTimeThreshold_Minutes" CmdByte="0x4E"><FPOperation>Read time threshold minutes</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'S\'><;><\'T\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Res Name="Value" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for value</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'S\'><;><\'T\'><;><Value[1..5]>]]></ResFormatRaw></Response></Command><Command Name="ReadTotalMessagesCount" CmdByte="0x4E"><FPOperation>Reads all messages from log</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="L" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="0" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'L\'><;><\'0\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="L" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="0" Type="OptionHardcoded" MaxLen="1" /><Res Name="Count" Value="" Type="Text" MaxLen="3"><Desc>3 symbols for the messages count</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'L\'><;><\'0\'><;><Count[3]>]]></ResFormatRaw></Response></Command><Command Name="ReadVATrates" CmdByte="0x62"><FPOperation>Provides information about the current VAT rates (the last value stored in FM).</FPOperation><Response ACK="false"><Res Name="VATrateA" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>(VAT rate A) Up to 7 symbols for VATrates of VAT class A in format ##.##%</Desc></Res><Res Name="VATrateB" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>(VAT rate B) Up to 7 symbols for VATrates of VAT class B in format ##.##%</Desc></Res><Res Name="VATrateC" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>(VAT rate C) Up to 7 symbols for VATrates of VAT class C in format ##.##%</Desc></Res><Res Name="VATrateD" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>(VAT rate D) Up to 7 symbols for VATrates of VAT class D in format ##.##%</Desc></Res><Res Name="VATrateE" Value="" Type="Decimal_with_format" MaxLen="7" Format="00.00%"><Desc>(VAT rate E) Up to 7 symbols for VATrates of VAT class E in format ##.##%</Desc></Res><ResFormatRaw><![CDATA[<VATrateA[1..7]> <;> <VATrateB[1..7]> <;> <VATrateC[1..7]> <;> <VATrateD[1..7]> <;> <VATrateE[1..7]>]]></ResFormatRaw></Response></Command><Command Name="ReadVersion" CmdByte="0x21"><FPOperation>Provides information about the device version.</FPOperation><Response ACK="false"><Res Name="Version" Value="" Type="Text" MaxLen="30"><Desc>Up to 30 symbols for Version name and Check sum</Desc></Res><ResFormatRaw><![CDATA[<Version[30]>]]></ResFormatRaw></Response></Command><Command Name="ReadWiFi_NetworkName" CmdByte="0x4E"><FPOperation>Provides information about WiFi network name where the device is connected.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'W\'><;><\'N\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><Res Name="WiFiNameLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the WiFi name length</Desc></Res><Res Name="WiFiNetworkName" Value="" Type="Text" MaxLen="100"><Desc>(Name) Up to 100 symbols for the device\'s WiFi network name</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'W\'><;><\'N\'><;><WiFiNameLength[1..3]><;><WiFiNetworkName[100]>]]></ResFormatRaw></Response></Command><Command Name="ReadWiFi_Password" CmdByte="0x4E"><FPOperation>Providing information about WiFi password where the device is connected.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'W\'><;><\'P\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Res Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the WiFi password length</Desc></Res><Res Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s WiFi password</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'W\'><;><\'P\'><;><PassLength[1..3]><;><Password[100]>]]></ResFormatRaw></Response></Command><Command Name="Read_IdleTimeout" CmdByte="0x4E"><FPOperation>Provides information about device\'s idle timeout. This timeout is seconds in which the connection will be closed when there is an inactivity. This information is available if the device has LAN or WiFi. Maximal value - 7200, minimal value 1. 0 is for never close the connection.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="I" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'Z\'><;><\'I\'> ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Res Name="" Value="I" Type="OptionHardcoded" MaxLen="1" /><Res Name="IdleTimeout" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for password in format ####</Desc></Res><ResFormatRaw><![CDATA[<\'R\'><;><\'Z\'><;><\'I\'><;><IdleTimeout[4]>]]></ResFormatRaw></Response></Command><Command Name="SaveNetworkSettings" CmdByte="0x4E"><FPOperation>After every change on Idle timeout, LAN/WiFi/GPRS usage, LAN/WiFi/TCP/GPRS password or TCP auto start networks settings this Save command needs to be execute.</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="A" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'A\'> ]]></ArgsFormatRaw></Args></Command><Command Name="ScanWiFiNetworks" CmdByte="0x4E"><FPOperation>The device scan out the list of available WiFi networks.</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'W\'><;><\'S\'> ]]></ArgsFormatRaw></Args></Command><Command Name="SellPLUfromExtDB" CmdByte="0x31"><FPOperation>Register the sell (for correction use minus sign in the price field) of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction.</FPOperation><Args><Arg Name="NamePLU" Value="" Type="Text" MaxLen="36"><Desc>36 symbols for article\'s name</Desc></Arg><Arg Name="OptionVATClass" Value="" Type="Option" MaxLen="1"><Options><Option Name="VAT Class A" Value="A" /></Options><Desc>1 symbol for article\'s VAT class with optional values:"   - \'A\' - VAT Class A</Desc></Arg><Arg Name="Price" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for article\'s price with upto 5 digits after decimal point</Desc></Arg><Arg Name="MeasureUnit" Value="" Type="Text" MaxLen="3"><Desc>3 symbols for measure unit</Desc></Arg><Arg Name="HSCode" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for HS Code in format XXXX.XX.XX</Desc></Arg><Arg Name="HSName" Value="" Type="Text" MaxLen="20"><Desc>20 symbols for HS Name</Desc></Arg><Arg Name="VATGrRate" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for programmable VAT rate</Desc></Arg><Arg Name="Quantity" Value="" Type="Decimal" MaxLen="10"><Desc>1 to 10 symbols for quantity</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="*" /></Arg><Arg Name="DiscAddP" Value="" Type="Decimal" MaxLen="7"><Desc>1 to 7 for percentage of discount/addition</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="," /></Arg><ArgsFormatRaw><![CDATA[ <NamePLU[36]> <;> <OptionVATClass[1]> <;> <Price[1..15]> <;> <MeasureUnit[3]> <;><HSCode[10]> <;> <HSName[20]> <;> <VATGrRate[1..5]>  {<\'*\'> <Quantity[1..10]>} {<\',\'> <DiscAddP[1..7]>}  ]]></ArgsFormatRaw></Args></Command><Command Name="SellPLUfromExtDB_HS" CmdByte="0x31"><FPOperation>Register the sell (for correction use minus sign in the price field) of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction.</FPOperation><Args><Arg Name="NamePLU" Value="" Type="Text" MaxLen="36"><Desc>36 symbols for article\'s name</Desc></Arg><Arg Name="reserved" Value=" " Type="OptionHardcoded" MaxLen="1" /><Arg Name="Price" Value="" Type="Decimal" MaxLen="15"><Desc>Up to 15 symbols for article\'s price with upto 5 digits after decimal point</Desc></Arg><Arg Name="reserved" Value="   " Type="OptionHardcoded" MaxLen="3" /><Arg Name="HSCode" Value="" Type="Text" MaxLen="10"><Desc>10 symbols for HS Code in format XXXX.XX.XX</Desc></Arg><Arg Name="reserved" Value="                    " Type="OptionHardcoded" MaxLen="20" /><Arg Name="reserved" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Quantity" Value="" Type="Decimal" MaxLen="10"><Desc>1 to 10 symbols for quantity</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="*" /></Arg><Arg Name="DiscAddP" Value="" Type="Decimal" MaxLen="7"><Desc>1 to 7 for percentage of discount/addition</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="," /></Arg><ArgsFormatRaw><![CDATA[ <NamePLU[36]> <;> <reserved[\' \']> <;> <Price[1..15]> <;> <reserved[\'   \']> <;><HSCode[10]> <;> <reserved[\'                    \']> <;> <reserved[\'0\']>  {<\'*\'> <Quantity[1..10]>} {<\',\'> <DiscAddP[1..7]>}  ]]></ArgsFormatRaw></Args></Command><Command Name="SetDateTime" CmdByte="0x48"><FPOperation>Sets the date and time and current values.</FPOperation><Args><Arg Name="DateTime" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yy HH:mm"><Desc>Date Time parameter in format: DD-MM-YY HH:MM</Desc></Arg><ArgsFormatRaw><![CDATA[ <DateTime "DD-MM-YY HH:MM"> ]]></ArgsFormatRaw></Args></Command><Command Name="SetDeviceNTP_Address" CmdByte="0x4E"><FPOperation>Program device\'s NTP address . To apply use - SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><Arg Name="AddressLen" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the address length</Desc></Arg><Arg Name="NTPAddress" Value="" Type="Text" MaxLen="50"><Desc>50 symbols for the device\'s NTP address</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'S\'><;><\'N\'> <;><AddressLen[1..3]><;><NTPAddress[50]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetDeviceTCP_Addresses" CmdByte="0x4E"><FPOperation>Program device\'s network IP address, subnet mask, gateway address, DNS address. To apply use -SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionAddressType" Value="" Type="Option" MaxLen="1"><Options><Option Name="DNS address" Value="5" /><Option Name="Gateway address" Value="4" /><Option Name="IP address" Value="2" /><Option Name="Subnet Mask" Value="3" /></Options><Desc>1 symbol with value:   - \'2\' - IP address   - \'3\' - Subnet Mask   - \'4\' - Gateway address   - \'5\' - DNS address</Desc></Arg><Arg Name="DeviceAddress" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for the selected address</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'T\'><;><AddressType[1]> <;><DeviceAddress[15]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetDeviceTCP_MACAddress" CmdByte="0x4E"><FPOperation>Program device\'s MAC address . To apply use - SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="6" Type="OptionHardcoded" MaxLen="1" /><Arg Name="MACAddress" Value="" Type="Text" MaxLen="12"><Desc>12 symbols for the MAC address</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'T\'><;><\'6\'> <;><MACAddress[12]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetDHCP_Enabled" CmdByte="0x4E"><FPOperation>Program device\'s TCP network DHCP enabled or disabled. To apply use -SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionDHCPEnabled" Value="" Type="Option" MaxLen="1"><Options><Option Name="Disabled" Value="0" /><Option Name="Enabled" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - Disabled   - \'1\' - Enabled</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'T\'><;><\'1\'><;><DHCPEnabled[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetGPRS_APN" CmdByte="0x4E"><FPOperation>Program device\'s GPRS APN. To apply use -SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="A" Type="OptionHardcoded" MaxLen="1" /><Arg Name="gprsAPNlength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the APN len</Desc></Arg><Arg Name="APN" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s GPRS APN</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'G\'><;><\'A\'><;><gprsAPNlength[1..3]><;><APN[100]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetGPRS_AuthenticationType" CmdByte="0x4E"><FPOperation>Programs GPRS APN authentication type</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionAuthenticationType" Value="" Type="Option" MaxLen="1"><Options><Option Name="CHAP" Value="2" /><Option Name="None" Value="0" /><Option Name="PAP" Value="1" /><Option Name="PAP or CHAP" Value="3" /></Options><Desc>1 symbol with value:  - \'0\' - None  - \'1\' - PAP  - \'2\' - CHAP  - \'3\' - PAP or CHAP</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'G\'><;><\'N\'><;><AuthenticationType[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetGPRS_Password" CmdByte="0x4E"><FPOperation>Program device\'s GPRS password. To apply use - SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the GPRS password len</Desc></Arg><Arg Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s GPRS password</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'G\'><;><\'P\'><;><PassLength[1..3]><;><Password[100]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetHTTPS_Address" CmdByte="0x4E"><FPOperation>Programs server HTTPS address.</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="H" Type="OptionHardcoded" MaxLen="1" /><Arg Name="ParamLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for parameter length</Desc></Arg><Arg Name="Address" Value="" Type="Text" MaxLen="50"><Desc>50 symbols for address</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'S\'><;><\'H\'><;><ParamLength[1..3]><;><Address[50]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetIdle_Timeout" CmdByte="0x4E"><FPOperation>Program device\'s idle timeout setting. Set timeout for closing the connection if there is an inactivity. Maximal value - 7200, minimal value 1. 0 is for never close the connection. This option can be used only if the device has LAN or WiFi. To apply use - SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="I" Type="OptionHardcoded" MaxLen="1" /><Arg Name="IdleTimeout" Value="" Type="Decimal_with_format" MaxLen="4" Format="0000"><Desc>4 symbols for Idle timeout in format ####</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'Z\'><;><\'I\'><;><IdleTimeout[4]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetInvoice_ThresholdCount" CmdByte="0x4E"><FPOperation>Programs invoice threshold count</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="I" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Value" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for value</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'S\'><;><\'I\'><;><Value[1..5]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetPINnumber" CmdByte="0x41"><FPOperation>Stores PIN number in operative memory.</FPOperation><Args><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6-symbols string</Desc></Arg><Arg Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="PINnum" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for PIN registration number</Desc></Arg><ArgsFormatRaw><![CDATA[ <Password[6]> <;> <\'1\'> <;> <PINnum[11]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetSerialNum" CmdByte="0x40"><FPOperation>Stores the Manufacturing number into the operative memory.</FPOperation><Args><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6-symbols string</Desc></Arg><Arg Name="SerialNum" Value="" Type="Text" MaxLen="20"><Desc>20 symbols Manufacturing number</Desc></Arg><ArgsFormatRaw><![CDATA[ <Password[6]> <;> <SerialNum[20]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetServer_UsedComModule" CmdByte="0x4E"><FPOperation>Program device used to talk with the server . To apply use - SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="E" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionModule" Value="" Type="Option" MaxLen="1"><Options><Option Name="GSM" Value="0" /><Option Name="LAN/WiFi" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - GSM   - \'1\' - LAN/WiFi</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'S\'><;><\'E\'><;><Module[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetTcpPortNumber" CmdByte="0x4E"><FPOperation>Program TCP port of the device.</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="TcpPortNumber" Value="" Type="Decimal_with_format" MaxLen="5" Format="00000"><Desc>5 symbols for TCP port number in format #####</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'Z\'><;><\'P\'><;><TcpPortNumber[5]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetTCP_ActiveModule" CmdByte="0x4E"><FPOperation>Selects the active communication module - LAN or WiFi. This option can be set only if the device has both modules at the same time. To apply use - SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="U" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionUsedModule" Value="" Type="Option" MaxLen="1"><Options><Option Name="LAN module" Value="1" /><Option Name="WiFi module" Value="2" /></Options><Desc>1 symbol with value:   - \'1\' - LAN module   - \'2\' - WiFi module</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'Z\'><;><\'U\'><;><UsedModule[1]><;> ]]></ArgsFormatRaw></Args></Command><Command Name="SetTCP_AutoStart" CmdByte="0x4E"><FPOperation>Program device\'s autostart TCP conection in sale/line mode. To apply use -SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="2" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionTCPAutoStart" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol with value:   - \'0\' - No   - \'1\' - Yes</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'Z\'><;><\'2\'><;><TCPAutoStart[1]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetTCP_Password" CmdByte="0x4E"><FPOperation>Program device\'s TCP password. To apply use - SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="Z" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="1" Type="OptionHardcoded" MaxLen="1" /><Arg Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the password len</Desc></Arg><Arg Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the TCP password</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'Z\'><;><\'1\'><;><PassLength[1..3]><;><Password[100]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetTime_ThresholdMinutes" CmdByte="0x4E"><FPOperation>Programs time threshold minutes</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="S" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="Value" Value="" Type="Decimal" MaxLen="5"><Desc>Up to 5 symbols for value</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'S\'><;><\'T\'><;><Value[1..5]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetWiFi_NetworkName" CmdByte="0x4E"><FPOperation>Program device\'s TCP WiFi network name where it will be connected. To apply use -SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="N" Type="OptionHardcoded" MaxLen="1" /><Arg Name="WiFiNameLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the WiFi network name len</Desc></Arg><Arg Name="WiFiNetworkName" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s WiFi ssid network name</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'W\'><;><\'N\'><;><WiFiNameLength[1..3]><;><WiFiNetworkName[100]> ]]></ArgsFormatRaw></Args></Command><Command Name="SetWiFi_Password" CmdByte="0x4E"><FPOperation>Program device\'s TCP WiFi password where it will be connected. To apply use -SaveNetworkSettings()</FPOperation><Args><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="P" Type="OptionHardcoded" MaxLen="1" /><Arg Name="PassLength" Value="" Type="Decimal" MaxLen="3"><Desc>Up to 3 symbols for the WiFi password len</Desc></Arg><Arg Name="Password" Value="" Type="Text" MaxLen="100"><Desc>Up to 100 symbols for the device\'s WiFi password</Desc></Arg><ArgsFormatRaw><![CDATA[ <\'P\'><;><\'W\'><;><\'P\'><;><PassLength[1..3]><;><Password[100]> ]]></ArgsFormatRaw></Args></Command><Command Name="SoftwareReset" CmdByte="0x3F"><FPOperation>Restore default parameters of the device.</FPOperation><Args><Arg Name="Password" Value="" Type="Text" MaxLen="6"><Desc>6-symbols string</Desc></Arg><ArgsFormatRaw><![CDATA[ <Password[6]>  ]]></ArgsFormatRaw></Args></Command><Command Name="StartDeviceUpdate" CmdByte="0x7C"><FPOperation>Start a device update procedure if a new update is available.</FPOperation><Args><Arg Name="" Value="U" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'U\'>  ]]></ArgsFormatRaw></Args></Command><Command Name="StartGPRStest" CmdByte="0x4E"><FPOperation>Start GPRS test on the device the result</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="G" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'G\'><;><\'T\'> ]]></ArgsFormatRaw></Args></Command><Command Name="StartLANtest" CmdByte="0x4E"><FPOperation>Start LAN test on the device the result</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'T\'><;><\'T\'> ]]></ArgsFormatRaw></Args></Command><Command Name="StartWiFiTest" CmdByte="0x4E"><FPOperation>Start WiFi test on the device the result</FPOperation><Args><Arg Name="" Value="R" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="W" Type="OptionHardcoded" MaxLen="1" /><Arg Name="" Value="T" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <\'R\'><;><\'W\'><;><\'T\'> ]]></ArgsFormatRaw></Args></Command><Command Name="StoreEJ" CmdByte="0x7C"><FPOperation>Store whole Electronic Journal report to External SD card.</FPOperation><Args><Arg Name="OptionReportStorage" Value="" Type="Option" MaxLen="2"><Options><Option Name="Storage in External SD card memory" Value="J4" /><Option Name="Storage in External SD card memory for JSON" Value="JX" /></Options><Desc>2 symbols for destination:   - \'J4\' - Storage in External SD card memory   - \'JX\' - Storage in External SD card memory for JSON</Desc></Arg><Arg Name="" Value="*" Type="OptionHardcoded" MaxLen="1" /><ArgsFormatRaw><![CDATA[ <OptionReportStorage[2]><;><\'*\'> ]]></ArgsFormatRaw></Args></Command><Command Name="StoreEJByCUInvoiceNum" CmdByte="0x7C"><FPOperation>Store Electronic Journal Report by CU Invoice Number (Multiple invoices) to External SD card.</FPOperation><Args><Arg Name="OptionReportStorage" Value="" Type="Option" MaxLen="2"><Options><Option Name="Storage in External SD card memory" Value="J4" /><Option Name="Storage in External SD card memory for JSON" Value="JX" /></Options><Desc>2 symbols for destination:   - \'J4\' - Storage in External SD card memory   - \'JX\' - Storage in External SD card memory for JSON</Desc></Arg><Arg Name="OptionInvoiceReportFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief EJ" Value="n" /><Option Name="Detailed EJ" Value="N" /></Options><Desc>1 character with value   - \'N\' - Detailed EJ   - \'n\' - Brief EJ</Desc></Arg><Arg Name="StartCUInvoiceNum" Value="" Type="Decimal_with_format" MaxLen="10" Format="0000000000."><Desc>10 symbols for start CU invoice number in format: ##########.</Desc></Arg><Arg Name="EndCUInvoiceNum" Value="" Type="Decimal_with_format" MaxLen="10" Format="0000000000."><Desc>10 symbols for end CU invoice number in format: ##########.</Desc></Arg><ArgsFormatRaw><![CDATA[<OptionReportStorage[2]> <;> <InvoiceReportFormat[1]> <;> <StartCUInvoiceNum[10]> <;> <EndCUInvoiceNum[10]> ]]></ArgsFormatRaw></Args></Command><Command Name="StoreEJByDate" CmdByte="0x7C"><FPOperation>Store Electronic Journal Report from report from date to date to External USB, External SD card.</FPOperation><Args><Arg Name="OptionReportStorage" Value="" Type="Option" MaxLen="2"><Options><Option Name="Storage in External SD card memory" Value="J4" /><Option Name="Storage in External SD card memory for JSON" Value="JX" /></Options><Desc>2 symbols for destination:   - \'J4\' - Storage in External SD card memory   - \'JX\' - Storage in External SD card memory for JSON</Desc></Arg><Arg Name="" Value="D" Type="OptionHardcoded" MaxLen="1" /><Arg Name="StartRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for initial date in the DDMMYY format</Desc></Arg><Arg Name="EndRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="ddMMyy"><Desc>6 symbols for final date in the DDMMYY format</Desc></Arg><ArgsFormatRaw><![CDATA[<OptionReportStorage[2]> <;> <\'D\'> <;> <StartRepFromDate "DDMMYY"> <;> <EndRepFromDate "DDMMYY"> ]]></ArgsFormatRaw></Args></Command><Command Name="StoreEJByDateTime" CmdByte="0x7C"><FPOperation>Store Electronic Journal Report from report from datetime to datetime to External SD card.</FPOperation><Args><Arg Name="OptionReportStorage" Value="" Type="Option" MaxLen="2"><Options><Option Name="Storage in External SD card memory" Value="J4" /><Option Name="Storage in External SD card memory for JSON" Value="JX" /></Options><Desc>2 symbols for destination:   - \'J4\' - Storage in External SD card memory   - \'JX\' - Storage in External SD card memory for JSON</Desc></Arg><Arg Name="OptionReportFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief EJ" Value="t" /><Option Name="Detailed EJ" Value="T" /></Options><Desc>1 character with value   - \'T\' - Detailed EJ   - \'t\' - Brief EJ</Desc></Arg><Arg Name="StartRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>16 symbols for initial date in the DD-MM-YYYY</Desc></Arg><Arg Name="EndRepFromDate" Value="" Type="DateTime" MaxLen="10" Format="dd-MM-yyyy HH:mm"><Desc>16 symbols for final date in the DD-MM-YYYY</Desc></Arg><ArgsFormatRaw><![CDATA[<OptionReportStorage[2]> <;> <ReportFormat[1]> <;> <StartRepFromDate "DD-MM-YYYY HH:MM"> <;> <EndRepFromDate "DD-MM-YYYY HH:MM"> ]]></ArgsFormatRaw></Args></Command><Command Name="StoreEJByPINofBuyer" CmdByte="0x7C"><FPOperation>Store Electronic Journal Report by PIN number of buyer to External SD card.</FPOperation><Args><Arg Name="OptionReportStorage" Value="" Type="Option" MaxLen="2"><Options><Option Name="Storage in External SD card memory" Value="J4" /><Option Name="Storage in External SD card memory for JSON" Value="JX" /></Options><Desc>2 symbols for destination:   - \'J4\' - Storage in External SD card memory   - \'JX\' - Storage in External SD card memory for JSON</Desc></Arg><Arg Name="OptionPINReportFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief EJ" Value="p" /><Option Name="Detailed EJ" Value="P" /></Options><Desc>1 character with value   - \'P\' - Detailed EJ   - \'p\' - Brief EJ</Desc></Arg><Arg Name="PINnumber" Value="" Type="Text" MaxLen="11"><Desc>11 symbols for PIN number</Desc></Arg><ArgsFormatRaw><![CDATA[<OptionReportStorage[2]> <;> <PINReportFormat[1]> <;> <PINnumber[11]> ]]></ArgsFormatRaw></Args></Command><Command Name="StoreEJByTraderSystemInvNum" CmdByte="0x7C"><FPOperation>Store Electronic Journal Report by Trader System Invoice Number (Single Invoice) to External SD card.</FPOperation><Args><Arg Name="OptionReportStorage" Value="" Type="Option" MaxLen="2"><Options><Option Name="Storage in External SD card memory" Value="J4" /><Option Name="Storage in External SD card memory for JSON" Value="JX" /></Options><Desc>2 symbols for destination:   - \'J4\' - Storage in External SD card memory   - \'JX\' - Storage in External SD card memory for JSON</Desc></Arg><Arg Name="OptionTraderSystemReportFormat" Value="" Type="Option" MaxLen="1"><Options><Option Name="Brief EJ" Value="s" /><Option Name="Detailed EJ" Value="S" /></Options><Desc>1 character with value   - \'S\' - Detailed EJ   - \'s\' - Brief EJ</Desc></Arg><Arg Name="TraderSystemInvNum" Value="" Type="Text" MaxLen="15"><Desc>15 symbols for trader system invoice  number</Desc></Arg><ArgsFormatRaw><![CDATA[<OptionReportStorage[2]> <;> <TraderSystemReportFormat[1]> <;> <TraderSystemInvNum[15]> ]]></ArgsFormatRaw></Args></Command><Command Name="Subtotal" CmdByte="0x33"><FPOperation>Calculate the subtotal amount with printing and display visualization options. Provide information about values of the calculated amounts. If a percent or value discount/addition has been specified the subtotal and the discount/addition value will be printed regardless the parameter for printing.</FPOperation><Args><Arg Name="OptionPrinting" Value="0" Type="OptionHardcoded" MaxLen="1" /><Arg Name="OptionDisplay" Value="" Type="Option" MaxLen="1"><Options><Option Name="No" Value="0" /><Option Name="Yes" Value="1" /></Options><Desc>1 symbol with value:   - \'1\' - Yes   - \'0\' - No</Desc></Arg><Arg Name="DiscAddV" Value="" Type="Decimal" MaxLen="13"><Desc>Up to 13 symbols for the value of the  discount/addition. Use minus sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence=":" /></Arg><Arg Name="DiscAddP" Value="" Type="Decimal" MaxLen="7"><Desc>Up to 7 symbols for the percentage value of the  discount/addition. Use minus sign \'-\' for discount</Desc><Meta MinLen="1" Compulsory="false" ValIndicatingPresence="," /></Arg><ArgsFormatRaw><![CDATA[ <OptionPrinting[\'0\']> <;> <OptionDisplay[1]> {<\':\'> <DiscAddV[1..13]>} {<\',\'> <DiscAddP[1..7]>} ]]></ArgsFormatRaw></Args><Response ACK="false"><Res Name="SubtotalValue" Value="" Type="Decimal" MaxLen="13"><Desc>Up to 13 symbols for the value of the subtotal amount</Desc></Res><ResFormatRaw><![CDATA[<SubtotalValue[1..13]>]]></ResFormatRaw></Response></Command></Defs>';
	return this.ServerSendDefs(defs);
}

Tremol.Enums = Tremol.Enums || {
	/**
	 * @typedef {Tremol.Enums.OptionTaxable} Tremol.Enums.OptionTaxable
	 * @readonly
	 * @enum
	 */
	OptionTaxable: {
		Exempted: '1',
		Taxable: '0'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionReceiptFormat} Tremol.Enums.OptionReceiptFormat
	 * @readonly
	 * @enum
	 */
	OptionReceiptFormat: {
		Brief: '0',
		Detailed: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionVATClass} Tremol.Enums.OptionVATClass
	 * @readonly
	 * @enum
	 */
	OptionVATClass: {
		VAT_Class_A: 'A'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionIsReceiptOpened} Tremol.Enums.OptionIsReceiptOpened
	 * @readonly
	 * @enum
	 */
	OptionIsReceiptOpened: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionClientReceipt} Tremol.Enums.OptionClientReceipt
	 * @readonly
	 * @enum
	 */
	OptionClientReceipt: {
		invoice_client_receipt: '1',
		standard_receipt: '0'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionPowerDownInReceipt} Tremol.Enums.OptionPowerDownInReceipt
	 * @readonly
	 * @enum
	 */
	OptionPowerDownInReceipt: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionLAN} Tremol.Enums.OptionLAN
	 * @readonly
	 * @enum
	 */
	OptionLAN: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionWiFi} Tremol.Enums.OptionWiFi
	 * @readonly
	 * @enum
	 */
	OptionWiFi: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionGPRS} Tremol.Enums.OptionGPRS
	 * @readonly
	 * @enum
	 */
	OptionGPRS: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionBT} Tremol.Enums.OptionBT
	 * @readonly
	 * @enum
	 */
	OptionBT: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionAddressType} Tremol.Enums.OptionAddressType
	 * @readonly
	 * @enum
	 */
	OptionAddressType: {
		DNS_address: '5',
		Gateway_address: '4',
		IP_address: '2',
		Subnet_Mask: '3'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionDHCPEnabled} Tremol.Enums.OptionDHCPEnabled
	 * @readonly
	 * @enum
	 */
	OptionDHCPEnabled: {
		Disabled: '0',
		Enabled: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionDeviceType} Tremol.Enums.OptionDeviceType
	 * @readonly
	 * @enum
	 */
	OptionDeviceType: {
		A_Type: '1',
		B_Type: '2'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionInvoiceReportFormat} Tremol.Enums.OptionInvoiceReportFormat
	 * @readonly
	 * @enum
	 */
	OptionInvoiceReportFormat: {
		Brief_EJ: 'n',
		Detailed_EJ: 'N'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionReportFormat} Tremol.Enums.OptionReportFormat
	 * @readonly
	 * @enum
	 */
	OptionReportFormat: {
		Brief_EJ: 't',
		Detailed_EJ: 'T'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionPINReportFormat} Tremol.Enums.OptionPINReportFormat
	 * @readonly
	 * @enum
	 */
	OptionPINReportFormat: {
		Brief_EJ: 'p',
		Detailed_EJ: 'P'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionTraderSystemReportFormat} Tremol.Enums.OptionTraderSystemReportFormat
	 * @readonly
	 * @enum
	 */
	OptionTraderSystemReportFormat: {
		Brief_EJ: 's',
		Detailed_EJ: 'S'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionAuthenticationType} Tremol.Enums.OptionAuthenticationType
	 * @readonly
	 * @enum
	 */
	OptionAuthenticationType: {
		CHAP: '2',
		None: '0',
		PAP: '1',
		PAP_or_CHAP: '3'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionServerResponse} Tremol.Enums.OptionServerResponse
	 * @readonly
	 * @enum
	 */
	OptionServerResponse: {
		At_send_EOD: 'Z',
		At_send_receipt: 'R'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionTransactionType} Tremol.Enums.OptionTransactionType
	 * @readonly
	 * @enum
	 */
	OptionTransactionType: {
		Error_Code: 'c',
		Error_Message: 'm',
		Exception_Message: 'e',
		Response_Code: 'r',
		Status: 's'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionInvoiceCopy} Tremol.Enums.OptionInvoiceCopy
	 * @readonly
	 * @enum
	 */
	OptionInvoiceCopy: {
		Reading: 'J0',
		Storage_in_External_SD_card_memory: 'J4'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionModule} Tremol.Enums.OptionModule
	 * @readonly
	 * @enum
	 */
	OptionModule: {
		GSM: '0',
		LANWiFi: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionTCPAutoStart} Tremol.Enums.OptionTCPAutoStart
	 * @readonly
	 * @enum
	 */
	OptionTCPAutoStart: {
		No: '0',
		Yes: '1'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionUsedModule} Tremol.Enums.OptionUsedModule
	 * @readonly
	 * @enum
	 */
	OptionUsedModule: {
		LAN_module: '1',
		WiFi_module: '2'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionReportStorage} Tremol.Enums.OptionReportStorage
	 * @readonly
	 * @enum
	 */
	OptionReportStorage: {
		Storage_in_External_SD_card_memory: 'J4',
		Storage_in_External_SD_card_memory_for_JSON: 'JX'
	},
	
	/**
	 * @typedef {Tremol.Enums.OptionDisplay} Tremol.Enums.OptionDisplay
	 * @readonly
	 * @enum
	 */
	OptionDisplay: {
		No: '0',
		Yes: '1'
	}
};

export default Tremol;