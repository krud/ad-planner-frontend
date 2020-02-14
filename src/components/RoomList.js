import React from 'react'
import RoomCard from './RoomCard'

export default function RoomList({rooms, children, addRoom, deleteRoom, updateRoom}) {

    const showRooms = rooms.map((room, i) => {
    return <RoomCard key={i} {...room} deleteRoom={deleteRoom} updateRoom={updateRoom}/>
    })

    return (
        <div className="room-list">
            {/* {children} */}
            {showRooms}
        </div>
    )
}


