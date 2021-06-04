import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Prompt, useHistory } from 'react-router-dom'
import FileBase from 'react-file-base64';

import { postEvent, updateEvent, setCurrentId } from '../../../actions/eventActions'

import useStyles from './styles';
import ImageInput from '../../../presentational/ImageInput';
// import { createPost, updatePost } from '../../actions/posts';

const Form = () => {
  // const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const [eventData, setEvent] = useState({title: '', message: '', selectedFile: ''});
  const {user, currentEvent} = useSelector((state) => {
    return {
      currentEvent: state.events.currentEvent,
      user: state.user.userInfo
    }
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  // useEffect(() => {
  //   if (post) setPostData(post);
  // }, [post]);

  useEffect(() => {
    console.log('form history-------', history);
    const comingFromLogin = history?.location?.state?.from?.pathname;
    if(currentEvent) {
      if(comingFromLogin !== '/login') {
        return setEvent(currentEvent)
      }
      if(comingFromLogin === '/login' && currentEvent._id) {
        dispatch(updateEvent(currentEvent));
      } else {
        dispatch(postEvent(currentEvent));
      }
    }
  },[currentEvent]);

  const clear = () => {
    setEvent({ title: '', message: '', selectedFile: ''});
    if(currentEvent) dispatch(setCurrentId(null));
  };
  const onChangedata = (e) => {
    setEvent({
      ...eventData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!user) {
      // history.location is telling the previous url but history.pathname is telling the current url
      dispatch(setCurrentId(eventData));
      return history.push('/login', { from: history?.location });
    }
    if(currentEvent) {
      dispatch(updateEvent(eventData));
      clear();
    } else {
      debugger;
      dispatch(postEvent(eventData));
      clear();
    }
    // if (currentId === 0) {
    //   dispatch(createPost(postData));
    //   clear();
    // } else {
    //   dispatch(updatePost(currentId, postData));
    //   clear();
    // }
  };

  // const uploadImage = (data) => {
  //   const { base64, size } = data;
  //   const imageSize = size.split(' ')[0];
  //   if( imageSize < 990) {
  //     setEvent({ ...eventData, selectedFile: base64 });
  //   } else {
  //     prompt('image Size is exceeded 990 kb',imageSize)
  //   }
  // }

  const onChangeImage = (image) => {
    console.log('image', image)
    setEvent({ ...eventData, selectedFile: image });
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{'Creating a Event'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={eventData.title} onChange={onChangedata} />
        <TextField name="message" variant="outlined" label="Message" fullWidth value={eventData.message} onChange={onChangedata} />
        <div className={classes.fileInput}>
          {/* filebase component is used to store images inline in base64 blob
        <FileBase type="file" multiple={false} onDone={uploadImage} />  */}
        <ImageInput onChangeImage={onChangeImage} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        <Prompt
        when={false}
        message={location =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />
      </form>
    </Paper>
  //   <Paper className={classes.paper}>
  //   <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
  //     <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
  //     <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
  //     <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
  //     <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
  //     <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
  //     <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
      // <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      // <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
  //   </form>
  // </Paper>
  );
};

export default Form;