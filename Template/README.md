## Getting started

First, install the dependencies using `npm install` or `yarn install`.

Then, run the development server:

```bash
yarn start
# OR
npm run start
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result (if it doesn't open automatically).

You can start editing pages or components. The page auto-updates as you edit and save a file.

### List of commands:

MedUX is based on [Create-React-App](https://create-react-app.dev) template.

### `craco start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `craco build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `react-scripts eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them.

### How to customize icon font

You can import *selection.json* back to the [IcoMoon app](https://icomoon.io/app) using the *Import Icons* button (or via Main Menu → Manage Projects) to retrieve icon selection.

------

## File structure

    .
    ├── public                  # static files
    │   ├── favicon             # favicon files
    │   ├── index.html          # main HTML file
    ├── src                     # source files
    │   ├── assets              # media
    │   ├── components          # reusable components shared across the app
    │   ├── constants           
    │   ├── contexts            # context providers
    │   ├── db                  # dummy data
    │   ├── fonts               # local fonts (including icomoon)
    │   ├── hooks               
    │   ├── layout              # app layout components (sidebar, grid, etc.)
    │   ├── pages               
    │   ├── store               # redux store (main store file, features)
    │   ├── styles              # global app styles, keyframes, variables
    │   ├── UI                  # UI components (buttons, inputs, etc.)
    │   ├── utils               # helper functions (dates formatting, etc.)
    │   ├── widgets             
    │   ├── App.jsx             # main app component
    │   ├── AppLayout.jsx       
    │   ├── index.js            # main entry point
    │   ├── layouts.js          # app layouts
    │   └── ...
    ├── babel-plugin-macros.config.js   # babel macros config (for styled-components)
    ├── craco.config.js                 # Create React App config overrides (aliases, etc.)
    ├── jsconfig.json                   # IDE config
    └── ...

## Libraries

- [Redux](https://redux.js.org/) - state management
- [react-router](https://reactrouter.com/) - routing
- [Create React App Configuration Override](https://github.com/dilanx/craco)
- [styled-components](https://styled-components.com/)  -  CSS-in-JS
- [polished](https://polished.js.org/) - CSS helper functions
- [Material UI](https://material-ui.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - animation library
- [Recharts](http://recharts.org/en-US/) - charts library
- [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout) - draggable grid layout
- [dnd-kit](https://dndkit.com/) - drag and drop library
- [lodash](https://lodash.com/) - utility library
- [wavesurfer.js](https://wavesurfer-js.org/) - audio player
- [use-mobile-detect-hook](https://github.com/haldarmahesh/use-mobile-detect-hook) - device detection hook
- [swipeable-views](https://react-swipeable-views.com/)
- [swiper](https://swiperjs.com/) - carousel
- [rtl-detect](https://github.com/shadiabuhilal/rtl-detect)
- [@fontsource](https://github.com/fontsource/fontsource) - fonts library
- [nanoid](https://github.com/ai/nanoid) - unique ID generator
- [prop-types](https://reactjs.org/docs/typechecking-with-proptypes.html) - type checking
- [moment](https://momentjs.com/) - date formatting
- [react-countup]() - animated number counter
- [react-select](https://react-select.com/home) - select component
- [notistack](https://iamhosseindhv.com/notistack) - notifications
- [react-calendar](https://projects.wojtekmaj.pl/react-calendar/)
- [react-big-calendar](https://projects.wojtekmaj.pl/react-calendar/) - scheduler
- [react-bootstrap](https://react-bootstrap.github.io/) - bootstrap components
- [react-helmet](https://github.com/nfl/react-helmet) - document head manager
- [lottie-react](https://lottiefiles.com) - Lottie animations
- [react-rating](https://github.com/dreyescat/react-rating)
- [@south-paw/react-vector-maps](https://react-vector-maps.netlify.app)
- [country-state-city](https://github.com/harpreetkhalsagtbit/country-state-city) - country, state, city data
- [react-portal](https://github.com/tajo/react-portal)
- [react-dropzone](https://react-dropzone.js.org/) - drag and drop file upload
- [react-transition-group](https://reactcommunity.org/react-transition-group/) - animation transitions
- [react-datepicker](https://reactdatepicker.com/) - date picker
- [react-d3-speedometer](https://palerdot.in/react-d3-speedometer/?path=/story/reactspeedometer--default-with-no-config) - speedometer chart
- [react-sizeme](https://github.com/ctrlplusb/react-sizeme) - responsiveness helper
- [react-cardiogram](https://github.com/dmitriy-kudelko/react-cardiogram) - heart rate chart
- [react-indiana-drag-scroll](https://norserium.github.io/react-indiana-drag-scroll/) - draggable scroll
- [react-lines-ellipsis](https://xiaody.github.io/react-lines-ellipsis/) - text ellipsis
- [react-number-format](https://github.com/s-yadav/react-number-format) - number formatting
- [react-select-country-list](https://github.com/Chun-Lin/react-select-country-list)



"@dnd-kit/core": "^6.0.5",
    "@dnd-kit/modifiers": "^6.0.0",
    "@dnd-kit/sortable": "^7.0.1",
    "@dnd-kit/utilities": "^3.2.0",
    "@emotion/cache": "^11.10.3",
    "@emotion/react": "^11.9.3",
    "@emotion/styled": "^11.9.3",
    "@fontsource/roboto": "^4.5.8",
    "@fontsource/rubik": "^4.5.11",
    "@mui-treasury/styles": "^1.13.1",
    "@mui/base": "^5.0.0-beta.11",
    "@mui/icons-material": "^5.10.14",
    "@mui/lab": "^5.0.0-alpha.108",
    "@mui/material": "^5.10.14",
    "@mui/system": "^5.10.14",
    "@mui/x-date-pickers": "^5.0.8",
    "@reduxjs/toolkit": "^1.8.3",
    "@south-paw/react-vector-maps": "^3.1.0",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^13.0.0",
    "@testing-library/user-event": "^13.2.1",
    "chart.js": "^3.9.1",
    "country-state-city": "^3.0.1",
    "framer-motion": "^6.4.3",
    "fscreen": "^1.2.0",
    "lottie-react": "^2.3.1",
    "moment": "^2.29.4",
    "nanoid": "^4.0.0",
    "notistack": "^2.0.5",
    "polished": "^4.2.2",
    "prop-types": "^15.8.1",
    "react": "^18.2.0",
    "react-big-calendar": "^1.3.3",
    "react-bootstrap": "^2.4.0",
    "react-calendar": "^3.7.0",
    "react-cardiogram": "^1.0.0-beta.7",
    "react-chartjs-2": "^4.2.0",
    "react-countup": "^6.3.0",
    "react-d3-speedometer": "^1.0.2",
    "react-datepicker": "^4.8.0",
    "react-dom": "^18.2.0",
    "react-dropzone": "^14.2.2",
    "react-grid-layout": "^1.3.4",
    "react-helmet": "^6.1.0",
    "react-indiana-drag-scroll": "^2.2.0",
    "react-lines-ellipsis": "^0.15.3",
    "react-number-format": "^5.0.0",
    "react-portal": "^4.2.2",
    "react-rating": "^2.0.5",
    "react-redux": "^8.0.2",
    "react-router": "^6.4.1",
    "react-scripts": "5.0.1",
    "react-select": "^5.4.0",
    "react-select-country-list": "^2.2.3",
    "react-sizeme": "^3.0.2",
    "react-swipeable-views": "^0.14.0",
    "react-transition-group": "^4.4.5",
    "react-use": "^17.4.0",
    "recharts": "^2.1.12",
    "rtl-detect": "^1.0.4",
    "styled-components": "^5.3.5",
    "styled-theming": "^2.2.0",
    "stylis-plugin-rtl": "^1",
    "swiper": "^8.3.0",
    "use-mobile-detect-hook": "^1.0.5",
    "wavesurfer-react": "^2.2.2",
    "wavesurfer.js": "^6.2.0",
    "web-vitals": "^2.1.0"