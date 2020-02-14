import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import RoomList from './RoomList';
import RoomForm from './RoomForm'

export default class PrivateRoute extends Component {

    state= {
        show: "",
        showForm: false,
    }

    loginClicked = (event) => {
        event.preventDefault();
        this.setState({show:"login"})
      }
    
    signupClicked = (event) => {
        event.preventDefault();
        this.setState({show:"signup"})
    }

    toggleForm = () => {
        console.log("hit")
        this.setState({showForm:true})
        // return <RoomForm {...routerprops} roomAction={addRoom} />
        // this.setState({showForm: !this.state.showForm})
    }

    render() {
    return (
        <Route render={(routerprops) => {
            const {rooms, addRoom, deleteRoom, updateRoom} = this.props

            return localStorage.token
                ? (
                    <div className="profile">
                        <header>
                            <h1>Welcome, </h1>
                            <i class="far fa-plus-square" onClick={this.toggleForm}></i>
                        </header>
                        { this.state.showForm 
                            ? <RoomForm {...routerprops} roomAction={addRoom} label="Add A New Room" formName="room-form"/>
                            : null
                        }
                        {/* <RoomForm {...routerprops} roomAction={addRoom} />  */}
                        <RoomList {...routerprops} rooms={rooms} deleteRoom={deleteRoom} updateRoom={updateRoom}/>
                    </div>
                )
                : <>
                    { this.state.show !== ""
                        ? this.state.show === "login"
                            ? <Redirect to='/login' />
                            : <Redirect to='/signup' />
                        : <main>
                            <h1>AD Planner</h1>
                            <span>
                                <button onClick={this.signupClicked}>Sign Up</button>
                                <button onClick={this.loginClicked}>Login</button>
                            </span>
                        </main>
                    })
                    </>
        }}
        />
    )
    }
}