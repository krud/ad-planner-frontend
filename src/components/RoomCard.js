import React, {useState, useEffect} from 'react'
import RoomForm from './RoomForm'

export default function Room({id, name, max_capacity, deleteRoom, updateRoom}) {

    const [isClicked, setisClicked] = useState(false)

    useEffect(() => {
        setisClicked(false)
    }, [name, max_capacity]);

    const handleDelete = (event) => {
        return event.target.id === "edit" ? setisClicked(true) : deleteRoom(id)
    }
 
    const roomSpecs = () => (
        <div className="room-specs">
            <div className="room-header">
                <h2>{name ? name : "Default Name"}</h2>
                <span>
                    <i className="fa fa-pencil" id="edit" onClick={handleDelete}></i>
                    <i className="fa fa-times-circle" id="delete" onClick={handleDelete}></i>
                </span>
            </div>
            <p>{max_capacity ? `${max_capacity}` : "Default Max Capacity"}</p>
        </div>
    )

    return (
        <div className="room">
            {isClicked 
                ? (
                    <>
                    <i className="fa fa-times-circle" id="da-button" onClick={() => setisClicked(false)}></i>
                    <RoomForm 
                        id={id} 
                        name={name} 
                        max_capacity={max_capacity} 
                        roomAction={updateRoom} 
                        closeForm={setisClicked}
                        label="Update Room"
                        formName="form-card"
                    />
                    {/* <button 
                        className="button delete-button" 
                        onClick={() => setisClicked(false)}>Close
                    </button> */}
                    </>
                )
                : roomSpecs()}
        </div>
    )
}
