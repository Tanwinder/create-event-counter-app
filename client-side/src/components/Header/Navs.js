import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, useLocation } from 'react-router-dom'

import {navsArr} from '../../Routes';

export default function Navs() {
  const {pathname} = useLocation();
  let tabval = pathname.split('/')[1] || 'events';
  const tabArr = {
    events: 0,
    counter: 1,
    employees: 2,
    uploadimages: 3,
    login: 0
  }
  const [value, setValue] = React.useState(tabArr[tabval.toLowerCase()]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Paper>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="inherit"
        className='navs'
        onChange={handleChange}
        aria-label=""
      >
        {
          navsArr && navsArr.map(item => <Tab key={item.name} label={<Link to={item.path} label="Events" >{item.name}</Link>}></Tab>)
        }
      </Tabs>
    // </Paper>
  );
}