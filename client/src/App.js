import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'

import { Container } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'


import { Provider } from 'react-redux'
import { createStore } from 'redux'


//Pages
import home from './pages/home'
import cart from './pages/cart'
import login from './pages/login'
import categoryView from './pages/categoryView'
import signUp from './pages/signUp'
import Navbar from './components/navbar'
import overview from './pages/categoryOverview';
import store from './redux/store';

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
    }
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
    }
  }
})

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
                    <Route exact path='/cart' component={cart} />
                    <Route exact path='/products/:key' component={categoryView} />
                    <Route exact path='/categoryView/:productId' component={overview} />
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
