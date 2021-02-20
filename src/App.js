import React,{useState,useEffect} from 'react';
import './App.css';
import { FormControl, Input } from '@material-ui/core';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import ForumIcon from '@material-ui/icons/Forum';
import {IconButton} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {

  // Used for getting the message from input field and storing it
  const [input,setInput] = useState('');

  // Used for storing a list of messages
  const [messages, setMessages] = useState([]);

  // Username
  const [username,setUserName] = useState('');

  useEffect(()=>{
    db.collection('messages').orderBy('stamp').onSnapshot(snapshot =>{
      let dbsnap = snapshot.docs.map(doc => ({data: doc.data(), id: doc.id}))
      setMessages(dbsnap);
      window.scrollTo(0,document.body.scrollHeight);
      // console.log(dbsnap);
    })
  },[]);
  useEffect(() => {
    setUserName(prompt('Please Enter your Name: '));
  }, []);

  // Using this function to modify the array
  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({message: input,
      username: username,
      stamp: firebase.firestore.FieldValue.serverTimestamp()});
    setInput('');
  }

  /* Testing */
  // console.log(input);
  // console.log(messages);

  return (
    <div className="App">
    <AppBar position="static">
      <Toolbar  className="toolbar">
        <Typography variant="h4" >
          Hello {username}
        </Typography>
      </Toolbar>
  </AppBar>
    <h1>Welcome to Public Messenger</h1>
    <ForumIcon className="public_icon" color="primary" />
    <FlipMove>
      {
        messages.map(msg => (
          <Message message={msg.data} username={username} key={msg.id}/>
        ))
      }
    </FlipMove>
    <FormControl className="messagecard">
      <Input placeholder = "Enter a message.." value={input} onChange={event => setInput(event.target.value)} className="messagecard_input"/>
      <IconButton disabled={!input} variant="contained" color="primary" type= 'submit' onClick={sendMessage} className="messagecard_btn">
        <SendIcon/>
      </IconButton>
    </FormControl>
    </div>
  );
}

export default App;
