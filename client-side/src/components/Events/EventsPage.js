import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, CircularProgress } from '@material-ui/core';
import Events from './Events'
import Forms from './Form/Form'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '1rem 0'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function EventsPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Events />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Forms />
        </Grid>
      </Grid>
    </div>
  );
}