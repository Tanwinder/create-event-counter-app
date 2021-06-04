import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Routes from '../Routes';
import Header from './Header/Header';
import SessionTimeout from '../components/sessionTimeOut/sessionTimeOut'

const useStyles = makeStyles((theme) => ({
  rootcontainer: {
    flexGrow: 1,
    margin: '1rem'
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className="app">
      <CssBaseline />
      <Header />
      <SessionTimeout />
      <div className={classes.rootcontainer}>
          <Routes />
      </div>
    </div>
  );
}

export default App;
