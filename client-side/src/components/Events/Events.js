import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { getEvents } from '../../actions/eventActions'

import Event from './Event'


// import Post from './Post';
import useStyles from './styles';

const Events = () => {
  const {eventLoader, events, currentEvent} = useSelector((state) => ({
    eventLoader: state.events.eventLoader,
    events: state.events.allEvents,
    currentEvent: state.events.currentEvent

  }));
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!currentEvent) dispatch(getEvents());
  }, [dispatch])

  return (
    eventLoader ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {events && events.length > 0 ? events.map((event) => (
          <Grid key={event._id} item xs={12} sm={6} md={4} lg={3}>
            <Event event={event}/>
          </Grid>
          )) :
          <Typography variant="h5" className={classes.fullWidth} align="center">
            No Events Found!
          </Typography>
        }
      </Grid>
    )
  );
};

export default Events;