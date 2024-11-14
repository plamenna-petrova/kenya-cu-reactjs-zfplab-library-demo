declare module './fp.js' {
  export enum OptionVATClass {
    VAT_Class_A = 'A',
    VAT_Class_B = 'B',
    VAT_Class_C = 'C',
    VAT_Class_D = 'D',
    VAT_Class_E = 'E',
    VAT_Class_F = 'F',
    VAT_Class_G = 'G',
    VAT_Class_H = 'H',
  }

  export interface Tremol {
    FP: {
      timeStamp: number;
      /**
       * Opens the cash drawer.
       */
      CashDrawerOpen(): void;
      /**
       * Paying the exact amount in cash and close the fiscal receipt.
       */
      CashPayCloseReceipt(): void;
      /**
       * Paying the exact amount in cash and close the fiscal receipt.
       */
      CashPayCloseTaxiReceipt(TAXIcount: number): void;
      /**
       * Clears the external display.
       */
      ClearDisplay(): void;
      /**
       * Closes the non-fiscal receipt.
       */
      CloseNonFiscReceipt(): void;
      /**
       * Close the fiscal receipt (Fiscal receipt, or Non-fical receipt). When the payment is finished.
       */
      CloseReceipt(): void;
      /**
       * Close the taxi fiscal receipt.
       */
      CloseTaxiReceipt(TAXIcount: number): void;
      /**
       * Start paper cutter. The command works only in fiscal printer devices.
       */
      CutPaper(): void;
      /**
       * Executes the direct command .
       */
      DirectCommand(Input: string): string;
      /**
       * Shows the current date and time on the external display.
       */
      DisplayDateTime(): void;
      /**
       * Shows a 20-symbols text in the upper external display line.
       */
      DisplayTextLine1(Text: string): void;
      /**
       * Shows a 20-symbols text in the lower external display line.
       */
      DisplayTextLine2(Text: string): void;
      /**
       * Shows a 20-symbols text in the first line and last 20-symbols text in the second line of the external display lines.
       */
      DisplayTextLines1and2(Text: string): void;
      /**
       * Erase all articles in PLU database.
       */
      EraseAllPLUs(Password: string): void;
      /**
       * Temporary enable/disable short receipts sending
       */
      ManageShortReceiptSending(OptionActivationRS: Tremol.Enums.OptionActivationRS): void;
      /**
       * Opens a non-fiscal receipt assigned to the specified operator
       */
      OpenNonFiscalReceipt(OperNum: number, OperPass: string): void;
      /**
       * Opens a fiscal receipt assigned to the specified operator
       */
      OpenReceipt(OperNum: number, OperPass: string, OptionPrintType: Tremol.Enums.OptionPrintType): void;
      /**
       * Feeds one line of paper.
       */
      PaperFeed(): void;
      /**
       * Register the payment in the receipt with specified type of payment and exact amount received.
       */
      PayExactSum(OptionPaymentType: Tremol.Enums.OptionPaymentType): void;
      /**
       * Registers the payment in the receipt with specified type of payment and amount received.
       */
      Payment(OptionPaymentType: Tremol.Enums.OptionPaymentType, OptionChange: Tremol.Enums.OptionChange, Amount: number, OptionChangeType?: Tremol.Enums.OptionChangeType): void;
      /**
       * Prints an article report with or without zeroing ('Z' or 'X').
       */
      PrintArticleReport(OptionZeroing: Tremol.Enums.OptionZeroing): void;
      /**
       * Prints barcode from type stated by CodeType and CodeLen and with data stated in CodeData field.
       */
      PrintBarcode(OptionCodeType: Tremol.Enums.OptionCodeType, CodeLen: number, CodeData: string, OptionCenter?: Tremol.Enums.OptionCenter): void;
      /**
       * Print a brief FM report by initial and end date.
       */
      PrintBriefFMReportByDate(StartDate: Date, EndDate: Date): void;
      /**
       * Print a brief FM report by initial and end FM report number.
       */
      PrintBriefFMReportByNum(StartNum: number, EndNum: number): void;
      /**
       * Print current headers and Fiscal Memory operative header
       */
      PrintCurrentHeader(): void;
      /**
       * Depending on the parameter prints:  − daily fiscal report with zeroing and fiscal memory record, preceded by Electronic Journal report print ('Z'); − daily fiscal report without zeroing ('X');
       */
      PrintDailyReport(OptionZeroing: Tremol.Enums.OptionZeroing): void;
      /**
       * Print a department report with or without zeroing ('Z' or 'X').
       */
      PrintDepartmentReport(OptionZeroing: Tremol.Enums.OptionZeroing): void;
      /**
       * Prints a detailed FM report by initial and end date.
       */
      PrintDetailedFMReportByDate(StartDate: Date, EndDate: Date): void;
      /**
       * Print a detailed FM report by initial and end FM report number.
       */
      PrintDetailedFMReportByNum(StartNum: number, EndNum: number): void;
      /**
       * Prints out a diagnostic receipt.
       */
      PrintDiagnostics(): void;
      /**
       * Print or store Electronic Journal report with all documents.
       */
      PrintEJ(): void;
      /**
       * Printing Electronic Journal Report from Report initial date to report Final date.
       */
      PrintEJByDate(StartRepFromDate: Date, EndRepFromDate: Date): void;
      /**
       * Printing Electronic Journal Report from receipt number to receipt number.
       */
      PrintEJByReceiptNumFromZrep(StartReceiptNum: number, EndReceiptNum: number): void;
      /**
       * Print or store Electronic Journal Report from by number of Z report blocks.
       */
      PrintEJByZBlocks(StartZNum: number, EndZNum: number): void;
      /**
       * Print or store Electronic Journal Report from by number of Z report blocks of current receipt.
       */
      PrintEJByZBlocksWithoutReceipts(StartZNum: number, EndZNum: number): void;
      /**
       * Print a copy of the last receipt document issued
       */
      PrintLastReceiptDuplicate(): void;
      /**
       * Prints the programmed graphical logo with the stated number.
       */
      PrintLogo(Number: number): void;
      /**
       * Prints an operator's report for a specified operator (0 = all operators) with or without zeroing ('Z' or 'X'). When a 'Z' value is specified the report should include all operators.
       */
      PrintOperatorReport(OptionZeroing: Tremol.Enums.OptionZeroing, Number: number): void;
      /**
       * Prints out SD card, crypto modul and FM diagnostic receipt.
       */
      PrintOptionalDiagnostics(OptionDiagnostics: Tremol.Enums.OptionDiagnostics): void;
      /**
       * Print whole special FM events report.
       */
      PrintSpecialEventsFMreport(): void;
      /**
       * Print a free text. The command can be executed only if receipt is opened (Fiscal receipt or Non-fical receipt). In the beginning and in the end of line symbol '#' is printed.
       */
      PrintText(Text: string): void;
      /**
       * Stores a block containing the number format into the fiscal memory. Print the current status on the printer.
       */
      ProgDecimalPointPosition(Password: string, OptionDecimalPointPosition: Tremol.Enums.OptionDecimalPointPosition): void;
      /**
       * Set data for the state department number from the internal FD database.
       */
      ProgDepartment(Number: number, Name: string, OptionVATClass: Tremol.Enums.OptionVATClass, Price: number, FlagsPrice: string): void;
      /**
       * Set data for the state department number and different name.
       */
      ProgDepartmentDifferentName(Number: number, NameAlbanian: string, NameSerbian: string, NameEnglish: string): void;
      /**
       * Set data for the state department number and name
       */
      ProgDepartmentName(Number: number, Name: string): void;
      /**
       * Set data for the state department number from the internal FD database.
       */
      ProgDepartmentOption1(Number: number, Name: string, OptionVATClass: Tremol.Enums.OptionVATClass, Price: number, FlagsPrice: string): void;
      /**
       * Program the contents of a Display Greeting message.
       */
      ProgDisplayGreetingMessage(DisplayGreetingText: string): void;
      /**
       * Programs the external display.
       */
      ProgExtDisplay(Password: string): void;
      /**
       * Program the contents of a footer lines.
       */
      ProgFooter(OptionFooterLine: Tremol.Enums.OptionFooterLine, FooterText: string): void;
      /**
       * Program the contents of a header lines.
       */
      ProgHeader(OptionHeaderLine: Tremol.Enums.OptionHeaderLine, HeaderText: string): void;
      /**
       * Programs the operator's name and password.
       */
      ProgOperator(Number: number, Name: string, Password: string): void;
      /**
       * Programs the number of POS, printing of logo, cash drawer opening, cutting permission, external display management mode, sending receipts, enable or disable currency in receipt and working operators counter.
       */
      ProgParameters(POSNum: number, OptionPrintLogo: Tremol.Enums.OptionPrintLogo, OptionAutoOpenDrawer: Tremol.Enums.OptionAutoOpenDrawer, OptionAutoCut: Tremol.Enums.OptionAutoCut, OptionExternalDispManagement: Tremol.Enums.OptionExternalDispManagement, OptionWorkOperatorCount: Tremol.Enums.OptionWorkOperatorCount): void;
      /**
       * Program the name of the payment types.
       */
      ProgPayment(OptionPaymentNum: Tremol.Enums.OptionPaymentNum, Name: string, Rate?: number): void;
      /**
       * Program the Barcode number for a certain article (item) from the internal database.
       */
      ProgPLUbarcode(PLUNum: number, Barcode: string): void;
      /**
       * Programs the general data for a certain article in the internal FD database. The price may have variable length, while the name field is fixed.
       */
      ProgPLUgeneral(PLUNum: string, PLUName: string, Price: number, FlagsPriceQty: string, OptionVATClass: Tremol.Enums.OptionVATClass, BelongToDepNum: number, AvailableQuantity: number, Barcode: string): void;
      /**
       * Program the price for a certain article and name.
       */
      ProgPLUName(PLUNum: number, PLUName: string): void;
      /**
       * Program the price for a certain article and specific name.
       */
      ProgPLUNameDifferent(PLUNum: number, PLUNameAlbanian: string, PLUNameSerbian: string, PLUNameEnglish: string): void;
      /**
       * Program the price for a certain article from the internal database.
       */
      ProgPLUprice(PLUNum: number, Price: number, OptionPrice: Tremol.Enums.OptionPrice): void;
      /**
       * Programs available quantity and quantiy type for a certain article in the internal database.
       */
      ProgPLUqty(PLUNum: number, AvailableQuantity: number, OptionQuantityType: Tremol.Enums.OptionQuantityType): void;
      /**
       * Program the language of the device
       */
      ProgramLanguage(OptionLanguage: Tremol.Enums.OptionLanguage): void;
      /**
       * Programs receipt view parameter
       */
      ProgramReceiptViewParameter(OptionReceiptView: Tremol.Enums.OptionReceiptView): void;
      /**
       * Program the language of the device
       */
      ProgramTempLanguage(OptionLanguage: Tremol.Enums.OptionLanguage): void;
      /**
       * Program the number of symbols per line.
       */
      ProgSymbolsPerLine(Password: string, OptionLineSymbols: Tremol.Enums.OptionLineSymbols): void;
      /**
       * Programs the general data for a certain taxi service in the internal FD database. The name field is fixed.
       */
      ProgTaxiServiceGeneral(ServiceNum: string, Tariff: string, ServiceNameAL: string, ServiceNameSR: string, ServiceNameEN: string, OptionVATClass: Tremol.Enums.OptionVATClass): void;
      /**
       * Stores a block containing the values of the VAT rates into the fiscal memory. Print the values on the printer.
       */
      ProgVATrates(Password: string, VATrateC: number, VATrateD: number, VATrateE: number, VATrateF: number, VATrateG: number, VATrateH: number): void;
      /**
       *  Reads raw bytes from FP.
       */
      RawRead(Count: number, EndChar: string): Uint8Array;
      /**
       *  Writes raw bytes to FP 
       */
      RawWrite(Bytes: Uint8Array): void;
      /**
       * Provides information about device's Bluetooth password.
       */
      ReadBluetooth_Password(): Bluetooth_PasswordRes;
      /**
       * Providing information about if the device's Bluetooth module is enabled or disabled.
       */
      ReadBluetooth_Status(): Tremol.Enums.OptionBTstatus;
      /**
       * Store a brief FM report by initial and end date.
       */
      ReadBriefFMReportByDate(StartDate: Date, EndDate: Date): void;
      /**
       * Store a brief FM report by initial and end FM report number.
       */
      ReadBriefFMReportByNum(StartNum: number, EndNum: number): void;
      /**
       * Read CM info
       */
      ReadCMinfo(): CMinfoRes;
      /**
       * Read the current status of the receipt.
       */
      ReadCurrentRecInfo(): CurrentRecInfoRes;
      /**
       * Provides information about the total fiscal counters and last Z- report date and time.
       */
      ReadDailyCounters(): DailyCountersRes;
      /**
       * Read the last operator's report number and date and time.
       */
      ReadDailyCountersByOperator(OperNum: number): DailyCountersByOperatorRes;
      /**
       * Read the total number of customers, discounts, additions, corrections and accumulated amounts by specified operator.
       */
      ReadDailyGeneralRegistersByOperator(OperNum: number): DailyGeneralRegistersByOperatorRes;
      /**
       * Provides information about the PO amounts by type of payment and the total number of operations.
       */
      ReadDailyPO(): DailyPORes;
      /**
       * Provides information about the PO and the total number of operations by specified operator.
       */
      ReadDailyPObyOperator(OperNum: number): DailyPObyOperatorRes;
      /**
       * Provides information about the RA amounts by type of payment and the total number of operations.
       */
      ReadDailyRA(): DailyRARes;
      /**
       * Provides information about the RA and the total number of operations by specified operator.
       */
      ReadDailyRAbyOperator(OperNum: number): DailyRAbyOperatorRes;
      /**
       * Provides information about the amounts received from sales.
       */
      ReadDailyReceivedSalesAmounts(): DailyReceivedSalesAmountsRes;
      /**
       * Read the amounts received from sales by type of payment and specified operator.
       */
      ReadDailyReceivedSalesAmountsByOperator(OperNum: number): DailyReceivedSalesAmountsByOperatorRes;
      /**
       * Provides information about the amounts returned as sales change.
       */
      ReadDailyReturned(): DailyReturnedRes;
      /**
       * Read information about the amounts returned
       */
      ReadDailyReturnedAmounts(OperNum: number): DailyReturnedAmountsRes;
      /**
       * Provides information about the accumulated amount by VAT group.
       */
      ReadDailySaleAmountsByVAT(): DailySaleAmountsByVATRes;
      /**
       * Provides information about the current date and time.
       */
      ReadDateTime(): Date;
      /**
       * Provides information about the current (the last value stored into the FM) decimal point format.
       */
      ReadDecimalPoint(): Tremol.Enums.OptionDecimalPointPosition;
      /**
       * Provides information for the programmed data, the turnover from the stated department number
       */
      ReadDepartment(DepNum: number): DepartmentRes;
      /**
       * Read data for the state department number and different names.
       */
      ReadDepartmentDifferentName(Number: number): DepartmentDifferentNameRes;
      /**
       * Read data for the state department number and name
       */
      ReadDepartmentName(Number: number): DepartmentNameRes;
      /**
       * Read data for the state department number from the internal FD database.
       */
      ReadDepartmentOption1(Number: number): DepartmentOption1Res;
      /**
       * Storage a detailed FM report by initial and end date.
       */
      ReadDetailedFMReportByDate(StartDate: Date, EndDate: Date): void;
      /**
       * Storage a detailed FM report by initial and end FM report number.
       */
      ReadDetailedFMReportByZNum(StartNum: number, EndNum: number): void;
      /**
       * Provides information about TCP device MAC address
       */
      ReadDeviceMAC_Address(): string;
      /**
       * Provide an information about modules supported by the device.
       */
      ReadDeviceModuleSupport(): DeviceModuleSupportRes;
      /**
       * Provide an information about modules supported by device's firmware.
       */
      ReadDeviceModuleSupportByFirmware(): DeviceModuleSupportByFirmwareRes;
      /**
       * Provides information about device's DHCP status
       */
      ReadDHCP_Status(): Tremol.Enums.OptionDhcpStatus;
      /**
       * Provide information about the display greeting message.
       */
      ReadDisplayGreetingMessage(): string;
      /**
       * Provides information about active profile date - date from which the account is valid or date from which we return to account 1 in case of mReset.
       */
      ReadECRprofileActiveDate(): Date;
      /**
       * Provides information about period in which the sending attempt is made.
       */
      ReadECRprofileConnectionPeriod(): number;
      /**
       * Provides information about device's profile type.
       */
      ReadECRprofileType(): Tremol.Enums.OptionProfileType;
      /**
       * Provides information about sending of Z report to server automatically after Z report or not.
       */
      ReadECRprofileZreportSending(): Tremol.Enums.OptionSendAfterZ;
      /**
       * Read Electronic Journal report with all documents.
       */
      ReadEJ(): void;
      /**
       * Read Electronic Journal Report from Report initial date to report Final date.
       */
      ReadEJByDate(StartRepFromDate: Date, EndRepFromDate: Date): void;
      /**
       * Read Electronic Journal Report from by number of Z report blocks.
       */
      ReadEJByZBlocks(StartZNum: number, EndZNum: number): void;
      /**
       * Read Electronic Journal Report from by number of Z report blocks only of the current receipt .
       */
      ReadEJByZBlocksWithoutReceipts(StartZNum: number, EndZNum: number): void;
      /**
       * Read Electronic Journal Report from receipt number to receipt number.
       */
      ReadEJFromReceiptToReceipt(StartReceiptNum: number, EndReceiptNum: number): void;
      /**
       * Select type of display
       */
      ReadExternalDisplay(): Tremol.Enums.OptionExternalType;
      /**
       * Read the number of the remaining free records for Z-report in the Fiscal Memory and check sum, resets, header, tax, sd card and registration changes of FM MCU flash memory.
       */
      ReadFMfreeRecords(): FMfreeRecordsRes;
      /**
       * Provides the content of the footer lines.
       */
      ReadFooter(OptionFooterLine: Tremol.Enums.OptionFooterLine): FooterRes;
      /**
       * Provides information about the number of customers (number of fiscal receipt issued), number of discounts, additions and corrections made and the accumulated amounts.
       */
      ReadGeneralDailyRegisters(): GeneralDailyRegistersRes;
      /**
       * Provides information about device's GRPS APN.
       */
      ReadGPRS_APN(): GPRS_APNRes;
      /**
       * Provides information about device's GPRS password.
       */
      ReadGPRS_Password(): GPRS_PasswordRes;
      /**
       * Provides information about device's GPRS signal.
       */
      ReadGPRS_Signal(): string;
      /**
       * Provides information about device's GPRS username.
       */
      ReadGPRS_Username(): GPRS_UsernameRes;
      /**
       * Provides the content of the header lines.
       */
      ReadHeader(OptionHeaderLine: Tremol.Enums.OptionHeaderLine): HeaderRes;
      /**
       * Provides information about interruption counters for TAXI
       */
      ReadInterruptCounters(): InterruptCountersRes;
      /**
       * Read the language of the device
       */
      ReadLanguage(): Tremol.Enums.OptionLanguage;
      /**
       * Read date and number of last Z-report and last RAM reset event.
       */
      ReadLastDailyReportInfo(): LastDailyReportInfoRes;
      /**
       * Provides information about the number of the last issued receipt.
       */
      ReadLastReceiptNum(): number;
      /**
       * Read last taxi receipt info .
       */
      ReadLastTaxiReceiptInfo(): LastTaxiReceiptInfoRes;
      /**
       * Provides information about an operator's name and password.
       */
      ReadOperatorNamePassword(Number: number): OperatorNamePasswordRes;
      /**
       * Provides information about the programmed number of POS and the current values of the logo, cutting permission, display mode, enable/disable currency in receipt.
       */
      ReadParameters(): ParametersRes;
      /**
       * Provides information about all programmed payment types.
       */
      ReadPayments(): PaymentsRes;
      /**
       * Provides information about the barcode of the specified article.
       */
      ReadPLUbarcode(PLUNum: number): PLUbarcodeRes;
      /**
       * Provides information about the price and different name of the specified article.
       */
      ReadPLUDifferentName(PLUNum: number): PLUDifferentNameRes;
      /**
       * Provides information about the general registers of the specified.
       */
      ReadPLUgeneral(PLUNum: number): PLUgeneralRes;
      /**
       * Provides information about the price and name of the specified article.
       */
      ReadPLUName(PLUNum: number): PLUNameRes;
      /**
       * Provides information about the price and price type of the specified article.
       */
      ReadPLUprice(PLUNum: number): PLUpriceRes;
      /**
       * Provides information about the quantity registers of the specified article.
       */
      ReadPLUqty(PLUNum: number): PLUqtyRes;
      /**
       * Read receipt view parameter
       */
      ReadReceiptViewParameter(): Tremol.Enums.OptionReceiptView;
      /**
       * Provides information about the owner's numbers and registration date time.
       */
      ReadRegistrationInfo(): RegistrationInfoRes;
      /**
       * Provides information about the manufacturing number of the fiscal device, FM number and ECR Unique number.
       */
      ReadSerialAndFiscalNums(): SerialAndFiscalNumsRes;
      /**
       * Provides information about the ECR's password
       */
      ReadServerAddress(): ServerAddressRes;
      /**
       * Provides information about the ECR's password
       */
      ReadServerPasswordECRS(): ServerPasswordECRSRes;
      /**
       * Read Service mode status
       */
      ReadServiceMode(): Tremol.Enums.OptionServiceMode;
      /**
       * Read info for enable/disable short receipts
       */
      ReadShortReceiptSending(): Tremol.Enums.OptionActivationRS;
      /**
       * Provides detailed 7-byte information about the current status of the fiscal device.
       */
      ReadStatus(): StatusRes;
      /**
       * Read the number of symbols per line.
       */
      ReadSymbolsPerLine(): number;
      /**
       * Reads taxi receipt info by receipt number.
       */
      ReadTaxiReceiptInfoByReceipt(ReceiptNumber: number): TaxiReceiptInfoByReceiptRes;
      /**
       * Provides information about the general registers of the specified.
       */
      ReadTaxiServiceGeneral(ServiceNum: string, Tariff: string): TaxiServiceGeneralRes;
      /**
       * Provides information about device's IP address, subnet mask, gateway address, DNS address.
       */
      ReadTCP_Addresses(OptionAddressType: Tremol.Enums.OptionAddressType): TCP_AddressesRes;
      /**
       * Read device TCP Auto Start status
       */
      ReadTCP_AutoStartStatus(): Tremol.Enums.OptionTCPAutoStart;
      /**
       * Provides information about device's TCP password.
       */
      ReadTCP_Password(): TCP_PasswordRes;
      /**
       * Read the used TCP module for communication - Lan or WiFi. Command is available if the device support both modules only.
       */
      ReadTCP_UsedModule(): Tremol.Enums.OptionUsedModule;
      /**
       * Read temporary header language
       */
      ReadTempLanguage(): Tremol.Enums.OptionLanguage;
      /**
       * Provides information about the total fiscal accumulative sums from sales
       */
      ReadTotalFiscalSums(): TotalFiscalSumsRes;
      /**
       * Provides information about the communication module, used for talking with the server
       */
      ReadUsedComModule(): Tremol.Enums.OptionCommunicationModule;
      /**
       * Provides information about the current VAT rates which are the last values stored into the FM.
       */
      ReadVATrates(): VATratesRes;
      /**
       * Provides information about the device model and version.
       */
      ReadVersion(): VersionRes;
      /**
       * Read device's connected WiFi network name
       */
      ReadWiFi_NetworkName(): WiFi_NetworkNameRes;
      /**
       * Read device's connected WiFi network password
       */
      ReadWiFi_Password(): WiFi_PasswordRes;
      /**
       * Provides information about device's idle timeout. This timeout is for closing the connection if there is an inactivity. Maximal value - 7200, minimal value 1. 0 is for never close the connection. This option can be used only if the device has LAN or WiFi.
       */
      Read_IdleTimeout(): number;
      /**
       * Registers cash received on account or paid out.
       */
      ReceivedOnAccount_PaidOut(OperNum: number, OperPass: string, Amount: number, Text?: string): void;
      /**
       * Register the refund of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction.
       */
      RefundPLUwithSpecifiedVAT(NamePLU: string, OptionVATClass: Tremol.Enums.OptionVATClass, Price: number, Quantity?: number, DiscAddP?: number, DiscAddV?: number, DepNum?: number): void;
      /**
       * Restore previous header if current header is not saved into fiscal memory.
       */
      RestorePreviousHeader(): void;
      /**
       * After every change on Idle timeout, LAN/WiFi/GPRS usage, LAN/WiFi/TCP/GPRS password or TCP auto start networks settings this Save command needs to be execute.
       */
      SaveNetworkSettings(): void;
      /**
       * Scan and print all available WiFi networks
       */
      ScanAndPrintWiFiNetworks(): void;
      /**
       * Select type of display
       */
      SelectExternalDisplay(OptionExternalDisplay: Tremol.Enums.OptionExternalDisplay): void;
      /**
       * Register the sell of department.
       */
      SellPLUfromDep(NamePLU: string, DepNum: number, Price: number, Quantity?: number, DiscAddP?: number, DiscAddV?: number): void;
      /**
       * Register the sell with specified quantity of article from the internal FD database.
       */
      SellPLUFromFD_DB(OptionSign: Tremol.Enums.OptionSign, PLUNum: number, Price?: number, Quantity?: number, DiscAddP?: number, DiscAddV?: number): void;
      /**
       * Register the sell of article with specified name, price, quantity, VAT class and/or discount/addition on the transaction.
       */
      SellPLUwithSpecifiedVAT(NamePLU: string, OptionVATClass: Tremol.Enums.OptionVATClass, Price: number, Quantity?: number, DiscAddP?: number, DiscAddV?: number, DepNum?: number): void;
      /**
       * Register the specified service from the internal FD DB.
       */
      SellTaxiService(OptionSign: Tremol.Enums.OptionSign, ServiceNum: string, Tariff: string, StartTime: Date, EndTime: Date, Duration: number, Distance: number, InitialSUM: number, TransportSUM: number, StaySeconds: number, StaySUM: number, DiscAddP?: number, DiscAddV?: number): void;
      /**
       * Stores in the memory the graphic file under stated number. Prints information about loaded in the printer graphic files.
       */
      SetActiveLogo(LogoNumber: string): void;
      /**
       * Program device's Bluetooth password.
       */
      SetBluetooth_Password(PassLength: number, Password: string): void;
      /**
       * Program device's Bluetooth module to be enabled or disabled.
       */
      SetBluetooth_Status(OptionBTstatus: Tremol.Enums.OptionBTstatus): void;
      /**
       * Sets the date and time and prints out the current values.
       */
      SetDateTime(DateTime: Date): void;
      /**
       * Provides information about TCP device MAC address
       */
      SetDeviceMAC_Address(DeviceMAC: string): void;
      /**
       * Program device's network IP address, subnet mask, gateway address, DNS address. To apply use - 4Eh / N - Save network settings
       */
      SetDeviceTCP_Addresses(OptionAddressType: Tremol.Enums.OptionAddressType, DeviceAddress: string): void;
      /**
       * Program device's TCP network DHCP enabled or disabled. To apply use - 4Eh / N - Save network settings
       */
      SetDHCP_Enabled(OptionDhcpStatus: Tremol.Enums.OptionDhcpStatus): void;
      /**
       * Program device's GPRS APN. To apply use - SaveNetworkSettings()
       */
      SetGPRS_APN(GPRS_APN_Len: number, APN: string): void;
      /**
       * Program device's GPRS password. To apply use - SaveNetworkSettings()
       */
      SetGPRS_Password(PassLength: number, Password: string): void;
      /**
       * Program device's GPRS user name. To apply use - SaveNetworkSettings()
       */
      SetGPRS_Username(GPRS_Username_Len: number, Username: string): void;
      /**
       * Sets device's idle timeout setting. Set timeout for closing the connection if there is an inactivity. Maximal value - 7200, minimal value 1. 0 is for never close the connection. This option can be used only if the device has LAN or WiFi. To apply use - 4Eh / N - Save network settings
       */
      SetIdle_Timeout(IdleTimeout: number): void;
      /**
       * Program the communication module, which used to talk with the server
       */
      SetServerCommunicationModule(OptionCommunicationModule: Tremol.Enums.OptionCommunicationModule): void;
      /**
       * Program ECRS password
       */
      SetServerPasswordECRS(ParamLength: number, ServerPassword: string): void;
      /**
       * Program device's TCP password. To apply use - 4Eh / N - Save network settings
       */
      SetTCPpassword(PassLength: number, Password: string): void;
      /**
       * Sets the used TCP module for communication - Lan or WiFi. To apply use - 4Eh / N - Save network settings
       */
      SetTCP_ActiveModule(OptionUsedModule: Tremol.Enums.OptionUsedModule): void;
      /**
       * Set device's TCP autostart . To apply use - 4Eh / N - Save network settings
       */
      SetTCP_AutoStart(OptionTCPAutoStart: Tremol.Enums.OptionTCPAutoStart): void;
      /**
       * Program device's WiFi network name where it will connect. To apply use - 4Eh / N - Save network settings
       */
      SetWiFi_NetworkName(WiFiNameLength: number, WiFiNetworkName: string): void;
      /**
       * Program device's WiFi network password where it will connect. To apply use - 4Eh / N - Save network settings
       */
      SetWiFi_Password(PassLength: number, Password: string): void;
      /**
       * Restore default parameters of the device.
       */
      SoftwareReset(Password: string): void;
      /**
       * Start Bluetooth test on the device and print out the result
       */
      StartTest_Bluetooth(): void;
      /**
       * Start GPRS test on the device and print out the result
       */
      StartTest_GPRS(): void;
      /**
       * Start LAN test on the device and print out the result
       */
      StartTest_Lan(): void;
      /**
       * Start WiFi test on the device and print out the result
       */
      StartTest_WiFi(): void;
      /**
       * Store the header into fiscal memory.
       */
      StoreCurrentHeaderInFM(Password: string): void;
      /**
       * Calculate the subtotal amount with printing and display visualization options. Provide information about values of the calculated amounts. If a percent or value discount/addition has been specified the subtotal and the discount/addition value will be printed regardless the parameter for printing.
       */
      Subtotal(OptionPrinting: Tremol.Enums.OptionPrinting, OptionDisplay: Tremol.Enums.OptionDisplay, DiscAddV?: number, DiscAddP?: number): number;
      /**
       * Removes all paired devices.
       */
      UnpairAllDevices(): void;
    };
    Enums: {
      // declare enum OptionActivationRS {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionPrintType {
      //   Postponed_printing = '2',
      //   Step_by_step_printing = '0',
      // }
      // declare enum OptionPaymentType {
      //   Card = '1',
      //   Cash = '0',
      //   Credit = '3',
      //   Currency = '4',
      //   Voucher = '2',
      // }
      // declare enum OptionChange {
      //   With_Change = '0',
      //   Without_Change = '1',
      // }
      // declare enum OptionChangeType {
      //   Change_In_Cash = '0',
      //   Change_In_Currency = '2',
      //   Same_As_The_payment = '1',
      // }
      // declare enum OptionZeroing {
      //   Without_zeroing = 'X',
      //   Zeroing = 'Z',
      // }
      // declare enum OptionCodeType {
      //   CODABAR = '6',
      //   CODE_128 = 'I',
      //   CODE_39 = '4',
      //   CODE_93 = 'H',
      //   EAN_13 = '2',
      //   EAN_8 = '3',
      //   ITF = '5',
      //   UPC_A = '0',
      //   UPC_E = '1',
      // }
      // declare enum OptionCenter {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionDiagnostics {
      //   Crypto_modul = 'C',
      //   FM = 'F',
      //   SD_card = 'S',
      // }
      // declare enum OptionDecimalPointPosition {
      //   Fractions = '2',
      //   Whole_numbers = '0',
      // }
      OptionVATClass: typeof OptionVATClass
      // declare enum OptionFooterLine {
      //   Footer_1 = 'F1',
      //   Footer_2 = 'F2',
      //   Footer_3 = 'F3',
      // }
      // declare enum OptionHeaderLine {
      //   Header_1 = '1',
      //   Header_2 = '2',
      //   Header_3 = '3',
      //   Header_4 = '4',
      //   Header_5 = '5',
      //   Header_6 = '6',
      //   Header_7 = '7',
      //   Header_8 = '8',
      // }
      // declare enum OptionPrintLogo {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionAutoOpenDrawer {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionAutoCut {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionExternalDispManagement {
      //   Auto = '0',
      //   Manual = '1',
      // }
      // declare enum OptionWorkOperatorCount {
      //   More = '0',
      //   One = '1',
      // }
      // declare enum OptionPaymentNum {
      //   Payment_0 = '0',
      //   Payment_1 = '1',
      //   Payment_2 = '2',
      //   Payment_3 = '3',
      //   Payment_4 = '4',
      // }
      // declare enum OptionPrice {
      //   Free_price_is_disable_valid_only_programmed_price = '0',
      //   Free_price_is_enable = '1',
      //   Limited_price = '2',
      // }
      // declare enum OptionQuantityType {
      //   Availability_of_PLU_stock_is_not_monitored = '0',
      //   Disable_negative_quantity = '1',
      //   Enable_negative_quantity = '2',
      // }
      // declare enum OptionLanguage {
      //   Albanian = '0',
      //   English = '2',
      //   Serbian = '1',
      // }
      // declare enum OptionReceiptView {
      //   Shortened_view_of_receipt = '1',
      //   Standart_view = '0',
      // }
      // declare enum OptionLineSymbols {
      //   Symbols_per_line_32 = '0',
      //   Symbols_per_line_48 = '1',
      // }
      // declare enum OptionBTstatus {
      //   Disabled = '0',
      //   Enabled = '1',
      // }
      // declare enum OptionIsReceiptOpened {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionInitiatedPayment {
      //   initiated_payment = '1',
      //   not_initiated_payment = '0',
      // }
      // declare enum OptionFinalizedPayment {
      //   finalized_payment = '1',
      //   not_finalized_payment = '0',
      // }
      // declare enum OptionPowerDownInReceipt {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionLAN {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionWiFi {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionGPRS {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionBT {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionDhcpStatus {
      //   Disabled = '0',
      //   Enabled = '1',
      // }
      // declare enum OptionProfileType {
      //   Profile_0 = '0',
      //   Profile_1 = '1',
      // }
      // declare enum OptionSendAfterZ {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionExternalType {
      //   Others = '0',
      //   Tremol_display = '1',
      // }
      // declare enum OptionServiceMode {
      //   Sales_mode = '0',
      //   Service_mode = '1',
      // }
      // declare enum OptionAddressType {
      //   DNS_address = '5',
      //   Gateway_address = '4',
      //   IP_address = '2',
      //   Subnet_Mask = '3',
      // }
      // declare enum OptionTCPAutoStart {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionUsedModule {
      //   LAN = '1',
      //   WiFi = '2',
      // }
      // declare enum OptionCommunicationModule {
      //   GSM = '0',
      //   LAN = '1',
      // }
      // declare enum OptionExternalDisplay {
      //   Others = '0',
      //   Tremol_display = '1',
      // }
      // declare enum OptionSign {
      //   Correction = '-',
      //   Sale = '+',
      // }
      // declare enum OptionPrinting {
      //   No = '0',
      //   Yes = '1',
      // }
      // declare enum OptionDisplay {
      //   No = '0',
      //   Yes = '1',
      // }
    }
  }

  const Tremol: Tremol;

  export default Tremol;
}