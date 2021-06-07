import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Navs from './Navs'
import { useSelector, useDispatch } from 'react-redux'
import { signin, logOut } from '../../actions/authActions';

import './header.scss'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: '5px'

  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const auth = useSelector((state) => state.user.userInfo);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch= useDispatch();
  const history = useHistory();
  console.log('header auth-------', auth)

  useEffect(() => {
    // const localSorageUser = JSON.parse(localStorage.getItem('profile'));
    // if(localSorageUser && !auth) {
    //   dispatch(signin(localSorageUser, history, null, true))
    // }
    // return () => {
      
    // }
  }, [])

  const handleChange = (event) => {
    if(!event.target.checked) {
      dispatch(logOut());
    } else {
      history.push('/login')
    }
    // setAuth(null);
    // history.push('/login')
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log('Header is rendered 2');
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Modern App
          </Typography>
          <Navs />
          <div className="authClass">
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
                <Typography className={classes.userName} >{auth?.result.firstName}</Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
          <FormGroup>
            <FormControlLabel
            control={<Switch checked={auth ? true : false} onChange={handleChange} aria-label="login switch" />}
            label={auth ? 'Logout' : 'Login'}
            />
        </FormGroup>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
