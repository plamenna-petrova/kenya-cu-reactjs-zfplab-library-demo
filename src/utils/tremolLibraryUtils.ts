import Tremol from "../assets/js/fp.js";

type ServerErrorTypeValues = typeof Tremol.ServerErrorType[keyof typeof Tremol.ServerErrorType];

export const handleZFPLabServerError = (error: unknown): string | undefined => {
  if (isZFPLabServerError(error)) {
    const errorType = error.type as unknown as ServerErrorTypeValues;

    // Here are the most important error cases
    switch (errorType) {
      /*
          Overall, the error types are split into three major categories :
              1) Errors, related to the ZFPLabServer's configuration / activity
              2) Errors, related to the usage of the library
              3) Errors, related to the fiscal device's setup or command processing
      */
      //#region "ZFPLabServer Errors"
      case Tremol.ServerErrorType.ServerAddressNotSet:
        /*
           The error of type 'ServerAddressNotSet' occurs,
           when the url of the ZFPLabServer is not set. The url is composed of the IP Address and TCP Port of the server
           along with the prefixes of HTTP/HTTPS protocols.
           The demo is using 'http://LocalHost:4444/' as default ZFPLabServer address.
           Nevertheless, the value of the ServerAddress property
           can be changed according to the location where the ZFPLabServer is installed.
        */
        // TODO: Example user-friendly exception message : Please specify the ServerAddress property.
        return "Please specify the ServerAddress property.";
      case Tremol.ServerErrorType.ServerConnectionError:
        /*
            The error of type 'ServerConnectionError' occurs,
            when the ZFPLabServer's settings are not set correctly set -
            (check the validity of the ServerAddress property / a corresponding method,
            responsible for the configuration of the ZFPLabServer's IP Address and TCP Port)
            and consequently the connection from the application to the ZFPLabServer is not established.
        */
        // TODO: Example user-friendly exception message: Could not establish connection from this application to the server.
        return "Could not establish connection from this application to the server.";
      case Tremol.ServerErrorType.ServSockConnectionFailed:
        /*
            The error of type 'ServSockConnectionFailed' occurs,
            when the ZFPLabServer cannot communicate with the fiscal device.
            Example occurrence: if the ZFPLabServer is running on an Android
            device the fiscal device's communication settings are configured via Bluetooth pairing.
            It may take a few attempts, until the ZFPLabServer recognises the paired fiscal device
            and completes the Bluetooth settings setup.
            Hence, it is advisable to recheck and test the ZFPLabServer's connection to the fiscal device.
        */
        // TODO: Example user-friendly exception message: The server cannot connect with the fiscal device.
        return "The server cannot connect with the fiscal device.";
      case Tremol.ServerErrorType.ServTCPAuth:
        /*
            The error of type 'ServTCPAuth' occurs,
            when the TCP password of the fiscal device is incorrect.
            In the event of an unsuccessful TCP authentication, please verify the current TCP password.
        */
        // TODO: Example user-friendly exception message: The TCP password of the fiscal device is not properly configured.
        return "The TCP password of the fiscal device is not properly configured.";
      case Tremol.ServerErrorType.ServWrongTcpConnSettings:
        // TODO: Example user-friendly exception message: The TCP connection settings are not properly configured.
        return "The TCP connection settings are not properly configured.";
      case Tremol.ServerErrorType.ServWrongSerialPortConnSettings:
        // TODO: Example user-friendly exception message: The serial port connection settings are not properly configured.
        return "The serial port connection settings are not properly configured.";
      case Tremol.ServerErrorType.ServWaitOtherClientCmdProcessingTimeOut:
        /*
            The error of type 'ServWaitOtherClientCmdProcessingTimeOut' occurs,
            when a client command is triggered, but its completion is prevented from the unfinished processing of another client command.
            Please, wait the respective command to be processed and don't force the triggering of additional commands,
            because this will hinder
            the work of both the ZFPLabServer and the fiscal device, which might result in the interruption / abort of the command/s.
        */
        // TODO: Example user-friendly exception message: The processing of another client's command is taking too long.
        return "The processing of another client's command is taking too long.";
      case Tremol.ServerErrorType.ServerResponseMissing:
        // TODO: Example user-friendly exception message: Missing response from the server.
        return "Missing response from the server.";
      case Tremol.ServerErrorType.ServerResponseError:
        // TODO: Example user-friendly exception message: Error found in the server's response.
        return "Error found in the server's response.";
      //#region "Internal ZFPLabServer errors"
      case Tremol.ServerErrorType.ServDefMissing:
        // TODO: Example user-friendly exception message: Missing server definitions.
        return "Missing server definitions.";
      case Tremol.ServerErrorType.ServArgDefMissing:
        // TODO: Example user-friendly exception message: Missing server argument definition.
        return "Missing server argument definition.";
      case Tremol.ServerErrorType.ServCreateCmdString:
        // TODO: Example user-friendly exception message: Failure at creating the corresponding command.
        return "Failure at creating the corresponding command.";
      case Tremol.ServerErrorType.ServUndefined:
        // TODO: Example user-friendly exception message: Undefined error.
        return error.message;
      case Tremol.ServerErrorType.ServDisconnectOtherClientErr:
        // TODO: Example user-friendly exception message: The server has failed at disconnecting another client, who is currently occupying it.
        return "The server has failed at disconnecting another client, who is currently occupying it.";
      case Tremol.ServerErrorType.ClientArgDefMissing:
      case Tremol.ServerErrorType.ClientAttrDefMissing:
      case Tremol.ServerErrorType.ClientArgValueWrongFormat:
      case Tremol.ServerErrorType.ClientSettingsNotInitialized:
      case Tremol.ServerErrorType.ClientInvalidGetFormat:
      case Tremol.ServerErrorType.ClientInvalidPostFormat:
      case Tremol.ServerErrorType.ClientXMLCanNotParse:
        return error.message;
      //#endregion "Internal ZFPLabServer errors"
      //#endregion "ZFPLabServer Errors"
      //#region "Library Errors"
      case Tremol.ServerErrorType.ServerDefsMismatch:
        /*
            The error of type 'ServerDefsMismatch' occurs,
            when there is a mismatch between the version of the TREMOL library, utilized by the codebase
            and the library definitions, which the ZFPLabServer currently makes use of.
        */
        // TODO: Example user-friendly exception message: The current version of the used library and the server definitions version do not match.
        return "The current version of the used library and the server definitions version do not match.";
      case Tremol.ServerErrorType.ServMismatchBetweenDefinitionAndFPResult:
        /*
            The error of type 'ServMismatchBetweenDefinitionAndFPResult' occurs,
            when there is a mismatch between the version of the library, utilized by the codebase,
            and the firmware, integrated into the fiscal device.
        */
        // TODO: Example user-friendly exception message: The current version of the used library and the firmware of the fiscal device do not match.
        return "The current version of the used library and the fiscal device firmware are not matching.";
      //#endregion "Library Errors"
      //#region "Fiscal Device Errors"
      case Tremol.ServerErrorType.FPException:
        // The error of type 'FPException' occurs, when the fiscal device is angry about the last executed command :)
        /*
            This conditional statement is related to the current value of the fpLibError code,
            returned as a part of the response from the ZFPLabServer, regarding the caught exception.
            If the value of the fpLibError code is less than or equal to 0x100 (hex) or 256 (converted to an integer),
            then errors in the fiscal device in terms of illegal / failed operations and command error codes are analyzed.
            Else, the error analysis focuses on the current value of the fpLibError code itself and additionally
            the observed errors refer to the setup of / communication with the fiscal device,
            for instance cable connection, timeout occurrences, paper deficiency, misconfigured network settings, etc.
            In the both sides of the statement potential causes are interpreted. Last but not least, the key difference between
            the two divided FPException scenarios consists of the retrieved values of ste1 and ste2,
            which are non-zero (the fiscal device returns a hex response) in the first case and zero in the second
            (the fiscal device doesn't return a hex response).
            Therefore, there is no necessity for a ste1 and ste2 values check in the latter case.
        */
        if (error.fpLibError <= 0x100) {
          // Potential causes:
          /*
                  error.ste1 =                                               error.ste2 =
               30 OK                                                   30 OK
               31 Out of paper, printer failure                        31 Invalid command
               32 Registers overflow                                   32 Illegal command
               33 Clock failure or incorrect date&time                 33 Z daily report is not zero
               34 Opened fiscal receipt                                34 Syntax error
               35 Payment residue account                              35 Input registers overflow
               36 Opened non-fiscal receipt                            36 Zero input registers
               37 Registered payment but receipt is not closed         37 Unavailable transaction for correction
               38 Fiscal memory failure                                38 Insufficient amount on hand
               39 Incorrect password                                   3A No access
               3a Missing external display
               3b 24hours block – missing Z report
               3c Overheated printer thermal head.
               3d Interrupt power supply in fiscal receipt (one time until status is read)
               3e Overflow EJ
               3f Insufficient conditions
          */
          /*
              The above listed causes are relevant to the ZFPLab protocol for the country of Romania.
              However, it must be noted that the values of ste1 and ste2 might differ for other countries.
              For more information, please refer to the section '. MESSAGE FORMAT FROM THE FD TO THE SOFTWARE APPLICATION'
              of the attached protocol description pdf (located in the same package
              for your country), where the corresponding status bytes (ste1 and ste2) tables are placed.
          */
          if (error.ste1 === 0x30 && error.ste2 === 0x32) {
            /*
                In this case the fiscal device recognises the command as correct, but it is not executed in the right context.
                In other words, the fiscal device has found an error / errors
                in the sequence of the execution of the triggered commands. For example, such exception
                will be caught, when the closing of a fiscal receipt is triggered, but one hasn't been opened beforehand.
            */
            // TODO: Example user-friendly exception message: The command is OK, but illegal in the current context.
            return "The command is OK, but illegal in the current context.";
          } else if (error.ste1 === 0x30 && error.ste2 === 0x33) {
            /*
                In this case the fiscal device recognises the command as correct, but the command is not processed, because
                a Z report is not made for the necessary time period.
            */
            // TODO: Example user-friendly exception message: The command is OK, but a Z report must be made in order to proceed.
            return "The Command is OK, but a Z report must be made in order to proceed.";
          } else if (error.ste1 === 0x34 && error.ste2 === 0x32) {
            /*
                In this case an opened fiscal receipt prevents the current command from processing.
                To complete the command execution, the fiscal receipt must be closed / cancelled.
            */
            // TODO: Example user-friendly exception message: Opened fiscal receipt and the command is illegal in the current context.
            return "Opened fiscal receipt and the command is illegal in the current context.";
          } else if (error.ste1 === 0x39 && error.ste2 === 0x32) {
            /*
                In this case a wrong password prevents the current command from processing.
                For instance, when there is an attempt at opening a fiscal receipt with wrong operator credentials.
            */
            // TODO: Example user-friendly exception message: Wrong password and the command is illegal in the current context.
            return "Wrong password and the command is illegal in the current context.";
          } else {
            return error.message;
          }
        } else {
          switch (error.fpLibError) {
            case 0x109:
              // TODO: Example user-friendly exception message: The fiscal device is missing.
              return "The fiscal device is missing.";
            case 0x10A:
              // TODO: Example user-friendly exception message: The fiscal device is busy.
              return "The fiscal device is busy.";
            case 0x102:
              // TODO: Example user-friendly exception message: A timeout occurred while reading data from the fiscal device.
              return "A timeout occurred while reading data from the fiscal device.";
            case 0x10F:
              // TODO: Example user-friendly exception message: The connection with the fiscal device is not available.
              return "The connection with the fiscal device is not available.";
            case 0x110:
              // TODO: Example user-friendly exception message: The fiscal device ran out of paper / Paper not correctly placed in the fiscal device.
              return "The fiscal device ran out of paper / Paper not correctly placed in the fiscal device.";
            case 0x111:
              // TODO: Example user-friendly exception message: The fiscal device has already opened connection from another client.
              return "The fiscal device has already opened connection from another client.";
            case 0x112:
              // TODO: Example user-friendly exception message: Wrong ZFP network password.
              return "Wrong ZFP network password.";
            case 0x113:
              // TODO: Example user-friendly exception message: The fiscal device is waiting for a network password.
              return "The fiscal device is waiting for network password.";
            default:
              return error.message;
          }
        }
      //#endregion "Fiscal Device Errors"
      default:
        return error.message;
    }
  } else if(error instanceof Error) {
    console.log("An error occurred", error);
    return `An error occurred ${error.message}`;
  } else {
    console.log("An unknown error occurred", error);
    return `An unknown error occurred`;
  }
}

const isZFPLabServerError = (error: unknown): error is InstanceType<typeof Tremol.ServerError> => {
  return error instanceof Tremol.ServerError;
};