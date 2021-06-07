import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
// import { Avatar } from '../presentational/Blob'

import { likeEvent, deleteEvent, setCurrentId } from '../../actions/eventActions';
import useStyles from './styles';

const Event = ({ event }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);
  const classes = useStyles();

  const onClickDelete= () => {
    dispatch(deleteEvent(event))
  }

  const onClickLike = () => {
    dispatch(likeEvent(event._id));
  }

  const onClickUpdate = () => {
    dispatch(setCurrentId(event));
  }
  console.log('Event inner is rendered 1');
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={event?.selectedFile && `http://localhost:5000/file/${event?.selectedFile}`} title={event.title} />
      {/* <img src={event.selectedFile}></img> */}
      {/* <Avatar src={event.selectedFile} alt="alt image---" /> */}
      <div className={classes.overlay}>
        <Typography variant="h6">{event.creator}</Typography>
        {/* <Typography variant="body2">{moment(event.createdAt).fromNow()}</Typography> */}
      </div>
      <div className={classes.overlay2}>
        <Button disabled={!user || user?.result?.email !== event.creatorEmail} style={{ color: 'white' }} size="small" onClick={onClickUpdate}><MoreHorizIcon fontSize="default" /></Button>
      </div>
      {/* <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{event.tags.map((tag) => `#${tag} `)}</Typography>
      </div> */}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{event.tags.map((tag) => `${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{event.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{event.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" disabled={!user} color="primary" onClick={onClickLike}><ThumbUpAltIcon fontSize="small" /> Like {event.likes.length} </Button>
        <Button size="small" disabled={!user || user?.result?.email !== event.creatorEmail} color="primary" onClick={onClickDelete}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
    // <Card className={classes.card}>
    //   <CardMedia className={classes.media} image={event.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={event.title} />
    //   <div className={classes.overlay}>
    //     <Typography variant="h6">{event.creator}</Typography>
    //     <Typography variant="body2">{moment(event.createdAt).fromNow()}</Typography>
    //   </div>
    //   <div className={classes.overlay2}>
    //     <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(event._id)}><MoreHorizIcon fontSize="default" /></Button>
    //   </div>
      // <div className={classes.details}>
      //   <Typography variant="body2" color="textSecondary" component="h2">{event.tags.map((tag) => `#${tag} `)}</Typography>
      // </div>
    //   <Typography className={classes.title} gutterBottom variant="h5" component="h2">{event.title}</Typography>
    //   <CardContent>
    //     <Typography variant="body2" color="textSecondary" component="p">{event.message}</Typography>
    //   </CardContent>
    //   <CardActions className={classes.cardActions}>
    //     <Button size="small" color="primary" onClick={() => dispatch(likeevent(event._id))}><ThumbUpAltIcon fontSize="small" /> Like {event.likes.length} </Button>
    //     <Button size="small" color="primary" onClick={() => dispatch(deleteevent(event._id))}><DeleteIcon fontSize="small" /> Delete</Button>
    //   </CardActions>
    // </Card>
  );
};

export default Event;