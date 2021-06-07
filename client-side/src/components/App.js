import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Routes from '../Routes';
import Header from './Header/Header';
import ServiceError from '../components/errors/ServiceError';
import SessionTimeout from '../components/sessionTimeOut/sessionTimeOut'
import {useSelector, useDispatch} from 'react-redux';
// import {SERVICE_ERROR} from '../actions/actionTypes'

const useStyles = makeStyles((theme) => ({
  rootcontainer: {
    flexGrow: 1,
    margin: '1rem'
  }
}));

const App = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  // const handleClose = (val) => {
  //   // alert('close');
  //   dispatch({type:SERVICE_ERROR, payload: null })
  // }
  console.log('App is rendered 1');
  return (
    <div className="app">
      <CssBaseline />
      <Header />
      {/* {
        !!error ?
        <ServiceError error={error} handleClose={handleClose} />
        :
        ""
      } */}
      <ServiceError />
      {
        userInfo ?
        <SessionTimeout />
        :
        ""
      }
      
      <div className={classes.rootcontainer}>
          <Routes />
      </div>
    </div>
  );
}

export default App;
