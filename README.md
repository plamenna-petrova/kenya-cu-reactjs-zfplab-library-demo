# Medieval-Scenery-ThreeJS-Coursework

## List of Contents

- [Idea and Implementation](#idea-and-implementation)
- [Startup](#startup)
- [Tremol Libraries](#tremol-libraries)
- [Features and installed modules](#features-and-installed-modules)

## Idea and Implementation

The developed demo application with React.js features functionalities for connecting to the ZFPLabServer by specifying a server address, connecting to the fiscal device
either via Serial Port / USB or LAN / WiFi. In the former case of establishing a connection to the fiscal device an active serial port and baud rate must be set, whereas
the latter case requires the obtained IP address of the fiscal device and network password for LAN / WiFi communication. The navigation between the different sections of the 
application occurs by consequently connecting to the ZFPLabServer and the fiscal device - automatically on application startup or manually by selecting the connection options from
the upper toolbar. A successful connection enables the additional sections of the applications and namely - Receipts, Reports and Information. In the Receipts section can be executed operations for
setting the data of the current operator, sale / correction of an article from an external database, as well as fiscal operations like opening a fiscal receipt, subtotal calculation,
paying an exact sum for the receipt, closing the receipt or closing the receipt in cash. The Reports section handles operations such as printing a Daily report with / without zeroing
and reading an electronic journal report by Z report numbers (the content which can be visualised and saved to a .txt file). The Information section contains informative details about the fiscal device
in the form of the following operations: reading a status, printing diagnostics, reading the version of the fiscal device, reading the set date and time on the fiscal device, reading gs info for special
parameters and reading library definitions. In addition, direct commands can be sent and the resulting status entries can be filtered, based on a search term and their boolean values. The application's logic
is based on React JSX components with Redux state management, Material UI is used for the UI elements, the forms are made using Formik and are validated with Yup. A tremol library utitlity is integrated for
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
