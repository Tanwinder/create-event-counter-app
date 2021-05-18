import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
// import { GoogleLogin } from 'react-google-login';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// import Icon from './icon';
import { signin, signup, logOut } from '../../actions/authActions';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isAuth, setIsAuth] = useState(false);
  const stateUser = useSelector(state => state?.user?.userInfo);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsAuth((prevIsAuth) => !prevIsAuth);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAuth) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

//   const googleSuccess = async (res) => {
//     const result = res?.profileObj;
//     const token = res?.tokenId;

//     try {
//       dispatch({ type: AUTH, data: { result, token } });

//       history.push('/');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
// const handleChange = () => {}

  const loggedOut = () => {
    dispatch(logOut());
  }

  return (
    <Container component="main" maxWidth="xs">
      {
        !stateUser ?
        <Paper className={classes.paper} elevation={3}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">{ !!isAuth ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { !!isAuth && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { !!isAuth && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { !!isAuth ? 'Sign Up' : 'Sign In' }
          </Button>
          {/* <GoogleLogin
            clientId="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          /> */}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { !!isAuth ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
        :
        <div>
          User is already loggedin
          <Button type="button" onClick={loggedOut}> LogOut </Button>
        </div>
      }
    </Container>
  );
};

export default Auth;