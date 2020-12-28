import React, { useEffect, useState } from 'react'

import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import {Avatar, IconButton} from '@material-ui/core';

import "./Sidebar.css"
import SidebarChat from './SidebarChat';
import db from './firebase'
import { useStateValue } from './StateProvider';

function Sidebar() {

    const [rooms, setRooms] = useState([])
    const [{user}, dispatch] = useStateValue()
    
    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => 
            setRooms(
                snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                }))
            )
        )
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__info">
                    <h2>{user?.displayName}</h2>
                </div>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input placeholder="Search or start a new chat"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => {
                    return (
                        <SidebarChat 
                        key={room.id} 
                        id={room.id} 
                        name={room.data.name} />
                    )
                })}
            </div>

        </div>
    )
}

export default Sidebar
