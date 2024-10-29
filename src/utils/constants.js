// Labels

export const ZFP_LAB_SERVER_CONNECTION = "ZFPLabServer Connection";

export const FISCAL_DEVICE_CONNECTION = "Fiscal Device Connection";

export const FISCAL_RECEIPTS = "Receipts";

export const REPORTS = "Reports";

export const INFORMATION = "Information";

export const SERIAL_PORT_OR_USB_CONNECTION_MOBILE_TAB_LABEL = "Serial Port / USB";

export const SERIAL_PORT_OR_USB_CONNECTION_TAB_LABEL = "Connection by Serial Port / USB";

export const LAN_OR_WIFI_CONNECTION_MOBILE_TAB_LABEL = "LAN/WiFi";

export const LAN_OR_WIFI_CONNECTION_TAB_LABEL = "Connection by LAN / WiFi";

// Loading Messages

export const DEFAULT_LOADING_MESSAGE = "Loading...";

export const CONNECTING_TO_ZFP_LAB_SERVER_LOADING_MESSAGE = "Connecting to ZFPLabServer...";

export const SEARCHING_FOR_FISCAL_DEVICE_LOADING_MESSAGE = "Searching for a fiscal device...";

export const CONNECTING_TO_FISCAL_DEVICE_LOADING_MESSAGE = "Connecting to a fiscal device...";

export const FISCAL_RECEIPT_OPENING_LOADING_MESSAGE = "Opening fiscal receipt...";

export const FISCAL_RECEIPT_AUTOMATIC_CLOSURE_LOADING_MESSAGE = "Closing the fiscal receipt automatically in cash...";

export const PRINT_DAILY_X_REPORT_LOADING_MESSAGE = "Printing daily report without zeroing...";

export const PRINT_DAILY_Z_REPORT_LOADING_MESSAGE = "Printing daily report with zeroing...";

export const READING_ELECTRONIC_JOURNAL_REPORT_BY_Z_REPORT_NUMBERS_LOADING_MESSAGE = "Reading electronic journal report by Z report numbers...";

export const READING_STATUS_ENTRIES_LOADING_MESSAGE = "Reading status entries...";

// UI

export const SELECT_MENU_ITEM_HEIGHT = 48;

export const SELECT_MENU_ITEM_PADDING_TOP = 8;

// Connection

export const DEFAULT_ZFP_LAB_SERVER_ADDRESS = "http://localhost:4444";

export const ZFP_LAB_SERVER_ADDRESS_KEY = "zfpLabServerAddress";

export const DEFAULT_SERIAL_PORT = "COM1";

export const BAUD_RATES = [9600, 19200, 38400, 57600, 115200];

export const SERIAL_PORT_CONNECTION = "Serial";

export const TCP_CONNECTION = "TCP";

export const FISCAL_DEVICE_CONNECTION_SETTINGS_KEY = "fiscalDeviceConnectionSettings";

// Validation Messages

export const REQUIRED_ZFP_LAB_SERVER_ADDRESS_ERROR_MESSAGE = "The ZFPLabServer address is required";

export const INVALID_ZFP_LAB_SERVER_ADDRESS_URL_ERROR_MESSAGE = "The ZFPLabServer address must be a valid URL";

export const REQUIRED_FISCAL_DEVICE_IP_ADDRESS_ERROR_MESSAGE = "The fiscal device IP address is required";

export const INVALID_FISCAL_DEVICE_IP_ADDRESS_ERROR_MESSAGE = "The fiscal device IP address must be valid";

export const REQUIRED_NETWORK_PASSWORD_ERROR_MESSAGE = "The network password is required";

export const REQUIRED_OPERATOR_NUMBER_ERROR_MESSAGE = "The operator number is required";

export const OPERATOR_NUMBER_VALUE_NOT_A_NUMBER_ERROR_MESSAGE = "The provided operator number value must be a number";

export const OPERATOR_NUMBER_NOT_AN_INTEGER_ERROR_MESSAGE = "The operator number must be an integer";

export const MIN_OPERATOR_NUMBER_ERROR_MESSAGE = "The minimum operator number is 1";

export const MAX_OPERATOR_NUMBER_ERROR_MESSAGE = "The operator maximum operator number is 20";

export const REQUIRED_OPERATOR_PASSWORD_ERROR_MESSAGE = "The operator password is required";

export const OPERATOR_PASSWORD_MAX_LENGTH_ERROR_MESSAGE = "The operator's password can't be longer than 6 characters";

export const REQUIRED_ARTICLE_NAME_ERROR_MESSAGE = "The article name is required";

export const ARTICLE_NAME_MAX_LENGTH_ERROR_MESSAGE = "The article name can't be longer than 36 characters";

export const REQUIRED_PRICE_ERROR_MESSAGE = "The price is required";

export const PRICE_VALUE_NOT_A_NUMBER_ERROR_MESSAGE = "The provided price value must be a number";

export const PRICE_MAX_LENGTH_ERROR_MESSAGE = "The price can't be longer than 10 characters";

export const QUANTITY_VALUE_NOT_A_NUMBER_ERROR_MESSAGE = "The provided quantity value must be a number";

export const QUANTITY_MAX_LENGTH_ERROR_MESSAGE = "The quantity can't be longer than 10 characters";

export const DISCOUNT_OR_ADDITION_VALUE_NOT_A_NUMBER_ERROR_MESSAGE = "The provided discount or addition value must be a number";

export const DISCOUNT_OR_ADDITION_PERCENTAGE_MAX_LENGTH_ERROR_MESSAGE = "The discount or addition percentage can't be longer than 7 characters";

export const DISCOUNT_OR_ADDITION_VALUE_MAX_LENGTH_ERROR_MESSAGE = "The discount or addition value can't be longer than 8 characters";

export const DEPARTMENT_NUMBER_VALUE_NOT_A_NUMBER_ERROR_MESSAGE = "The provided department number value must be a number";

export const DEPARTMENT_NUMBER_MAX_LENGTH_ERROR_MESSAGE = "The department number can't be longer than two characters";

export const FISCAL_RECEIPT_OPENING_ERROR_MESSAGE = "Cannot open receipt";

export const FISCAL_RECEIPT_ALREADY_OPENED_ERROR_MESSAGE = "A fiscal receipt has already been opened";

export const FISCAL_RECEIPT_NOT_OPENED_ERROR_MESSAGE = "A fiscal receipt hasn't been opened";

export const REQUIRED_ELECTRONIC_JOURNAL_REPORT_STARTING_Z_REPORT_NUMBER_ERROR_MESSAGE = "The starting Z report number is required";

export const ELECTRONIC_JOURNAL_REPORT_STARTING_Z_REPORT_NUMBER_NOT_A_NUMBER_ERROR_MESSAGE = "The provided starting Z report value must be a number";

export const ELECTRONIC_JOURNAL_REPORT_STARTING_Z_REPORT_NUMBER_MAX_LENGTH_ERROR_MESSAGE = "The starting Z report number can't be longer than 4 characters";

export const ELECTRONIC_JOUNRAL_REPORT_STARTING_Z_REPORT_NUMBER_NOT_POSITIVE_ERROR_MESSAGE = "The starting Z report number must have a postive value";

export const REQUIRED_ELECTRONIC_JOURNAL_REPORT_ENDING_Z_REPORT_NUMBER_ERROR_MESSAGE = "The ending Z report number is required";

export const ELECTRONIC_JOURNAL_REPORT_ENDING_Z_REPORT_NUMBER_NOT_A_NUMBER_ERROR_MESSAGE = "The provided ending Z report value must be a number";

export const ELECTRONIC_JOURNAL_REPORT_ENDING_Z_REPORT_NUMBER_MAX_LENGTH_ERROR_MESSAGE = "The ending Z report number can't be longer than 4 characters";

export const ELECTRONIC_JOUNRAL_REPORT_ENDING_Z_REPORT_NUMBER_NOT_POSITIVE_ERROR_MESSAGE = "The ending Z report number must have a postive value";

export const ELECTRONIC_JOURNAl_REPORT_STARTING_Z_REPORT_NUMBER_GREATER_THAN_ENDING_NUMBER_ERROR_MESSAGE = "The starting Z report number is greater than the ending Z report number";

export const NO_REPORT_CONTENT_ERROR_MESSAGE = "No report content";

// Success Messages

export const CONNECTED_TO_FISCAL_DEVICE_SUCCESS_MESSAGE = "Successfully connected to the fiscal device";

// Operation Error / Warning Messages

export const ZFP_LAB_SERVER_CONNECTION_NOT_ESTABLISHED_ERROR_MESSAGE = "A connection with ZFPLabServer is not established";

export const FISCAL_DEVICE_NOT_CONNECTED_ERROR_MESSAGE = "A fiscal device is not connected";

export const FISCAL_DEVICE_NOT_FOUND_WARNING_MESSAGE = "A fiscal device couldn't be found";

export const FISCAL_DEVICE_NOT_FOUND_ERROR_MESSAGE = "An error occurred while trying to find a fiscal device";

export const NOT_CONNECTED_TO_FISCAL_DEVICE_ERROR_MESSAGE = "Couldn't connect to a fiscal device";