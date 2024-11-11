# Kosovo React.js ZFPLab Library Demo

## List of Contents

- [Idea and Implementation](#idea-and-implementation)
- [Startup](#startup)
- [Tremol Libraries](#tremol-libraries)
- [Features and installed modules](#features-and-installed-modules)

## Idea and Implementation

The developed demo application with React.js features functionalities for connecting to the ZFPLabServer by specifying a server address, connecting to the fiscal device
either via Serial Port/USB or LAN/WiFi. For a Serial Port/USB connection, an active serial port and baud rate must be set, whereas
the connection via LAN/WiFi requires the obtained IP address of the fiscal device and network password for LAN/WiFi communication. The navigation between the different sections of the 
application occurs by subsequently connecting to the ZFPLabServer and the fiscal device - automatically on application startup or manually by selecting the connection options. 
A successful connection enables the additional sections of the application and more specifically: Receipts, Reports and Information. In the Receipts section operations for
setting the data of the current operator, selling or correcting an article from an external database, as well as fiscal receipt operations like opening a fiscal receipt, subtotal calculation,
paying an exact sum for the receipt, closing the receipt or closing the receipt in cash can be executed. The Reports section handles operations such as printing a daily report with or without zeroing
and reading an electronic journal report by Z report numbers (the content of which can be displayed and saved to a .txt file). The Information section contains details about the fiscal device, which
can be viewed by executing the following operations: reading a status, printing diagnostics, reading the version of the fiscal device, reading the set date and time on the fiscal device, reading GS info for special
parameters and reading library definitions. In addition, direct commands can be sent and the resulting status entries can be filtered, based on a search term and their boolean values. The application's logic
is built using React JSX components with Redux state management, Material UI is used for the UI elements, the forms are made with Formik and are validated with Yup. A Tremol library utility is integrated for
better handling of server errors. Overall, most of the functions of the codebase have detailed JSDoc comments, describing their designation. 

## Startup

```
npm install
npm run dev
```

## Tremol Libraries

- fp_core.js
- fp.js

## Features and installed modules

- JavaScript
- React
- vite
- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/material
- @reduxjs/toolkit
- clsx
- formik
- react-dom
- react-draggable
- react-icons
- react-redux
- react-router-dom
- react-toastify
- yup
