import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';

import moment from 'moment';
import 'moment/locale/fr';

import "./index.css";
import { AppContainer } from "./containers";

import store from "./store";

import * as serviceWorker from "./serviceWorker";

moment.locale('fr');

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
  typography: { useNextVariants: true },
});

ReactDOM.render(
  <Provider store={store()}>
    <MuiThemeProvider theme={theme}>
      <AppContainer />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
