import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import { Container } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'


import { Provider } from 'react-redux'
import api from './redux/actions/apiCreate';


//Pages
import home from './pages/home'
import cart from './pages/bag'
import login from './pages/login'
import categoryView from './pages/categoryView'
import signUp from './pages/signUp'
import Navbar from './components/navbar'
import overview from './pages/overview';
import store from './redux/store';
import checkout from './pages/checkout';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types';

// let colorPallete = {
//   "#f5feff",
//   "#bde4f4",
//   "#404969",
//   "#dc552c",
//   "#f3f9fb"
//  }

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#404969"
    },
    secondary: {
      main: "#dc552c"
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 10
      }
    },
  },
  typography: {

    button: {
      borderRadius: 10,
      textTransform: 'none',
      fontSize: 16,
      fontWeight: "600",
      fontFamily: 'Nunito',
    },
    h4: {
      fontFamily: 'Nunito',
      fontWeight: "600",
    },
    h5: {
      fontFamily: 'Montserrat',
      fontWeight: "400",
      letterSpacing: 5
    },
    h6: {
      fontFamily: 'Open Sans',
      fontWeight: "600",
    },
    body2: {
      fontFamily: 'Montserrat',
    },
    body1: {
      fontFamily: 'Montserrat',
    },
    caption: {
      fontFamily: 'Montserrat',
    },
  },
  props: {
    button1: {
      marginTop: 20,
    },
    linkButton: { textAlign: 'center', margin: "20px auto", display: 'block', textDecoration: 'none' },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textField: {
      margin: "10px 0"
    },
    center: {
      position: 'absolute',
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)"
    },
    snackbar: {
      backgroundColor: "#404969",
      borderRadius: 5,
    }
  }
})

let token = localStorage.authToken
if (token) {
  api.defaults.headers.common['Authorization'] = token
  store.dispatch({ type: SET_AUTHENTICATED })
} else {
  store.dispatch({ type: SET_UNAUTHENTICATED })
}

export class App extends Component {

  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>

          <div>
            <Router>
              <Navbar />
              <div className='container'>
                <Container maxWidth='lg'>
                  <Switch>
                    <Route exact path='/' component={home} />
                    <Route exact path='/login' component={login} />
                    <Route exact path='/signUp' component={signUp} />
                    <Route exact path='/bag' component={cart} />
                    <Route exact path='/products/:key' component={categoryView} />
                    <Route exact path='/categoryView/:productId' component={overview} />
                    <Route exact path='/checkout' component={checkout} />
                  </Switch>
                </Container>

              </div>
            </Router>
          </div>
        </Provider>

      </MuiThemeProvider>
    )
  }
}

export default App
