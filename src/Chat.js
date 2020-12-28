import { Avatar, IconButton } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import "./Chat.css"

// import axios from './axios'

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'

function Chat() {

    // Avatar
    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("");
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue()


    // Seed
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    // Input
    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed>> " + input)
        
        db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .add({
                message: input,
                name: user.displayName,
                email: user.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

        setInput('')
    }

    // roomName
    useEffect(() => {
        if (roomId) {
            console.log("RoomID: " + roomId)
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) => 
                setRoomName(
                    snapshot.data().name
                )
            )
            db.collection('rooms')
                .doc(roomId)
                .collection("messages")
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
        }
    }, [roomId]);

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg?mood[]=happy`}/>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen at {""}{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p> 
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon className="AttachFileIcon"/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">

                {messages.map(message => {return(
                    <p className={`chat__message ${(message.email === user.email) && "chat__reciever"}`} >
                        <span className="chat__name">{message.name}</span>

                        {message.message}

                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                )})}

                
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text" />
                    <button onClick={sendMessage} type="submit"> Send a message</button>
                    <IconButton>
                        <SendIcon className="SendIcon" onClick={sendMessage} />
                    </IconButton>
                </form>
                <MicIcon/>
            </div>

        </div>
    )
}

export default Chat
