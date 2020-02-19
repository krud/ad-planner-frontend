import React, { Component } from 'react'
import './styles/App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login'
import Signup from './components/Signup'

export default class App extends Component {

  state = {
    rooms: [],
    username: "",
    id: "",
  }

  componentDidMount(){
    let {token} = localStorage
    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(result => {
      return result.user 
      ? this.setState({rooms: result.user.rooms, username: result.user.username, id: result.user.id })
      : null
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <PrivateRoute exact 
              path='/' 
              rooms={this.state.rooms}
              username={this.state.username}
              deleteRoom={this.deleteRoom} 
              updateRoom={this.updateRoom} 
              roomAction={this.addRoom}
              logout={this.logout}
              />
            <Route path='/signup' render={(routerprops) => <Signup {...routerprops} signup={this.signup}/>}/>
            <Route path='/login' render={(routerprops) => <Login {...routerprops} login={this.login}/>}/>
          </Switch>
        </div>
      </Router>
    )
  }

  logout = () => {
    localStorage.clear()
    this.setState({
      rooms: [],
      username: "",
      id: "",
    })
  }

  login = (user, history) => {
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then(({user, user: {rooms, username, id}, jwt}) => {
      localStorage.setItem('token', jwt)
      this.setState({rooms, username, id})
      history.push('/')
    })
  }

  signup = (user, history) => {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then(({user, user: {rooms, username, id}, jwt}) => {
      localStorage.setItem('token', jwt)
      this.setState({rooms, username, id})
      history.push('/')
    })
  }

  addRoom = (newRoom) => {
    this.setState({
      rooms: [...this.state.rooms, newRoom]
    })
    newRoom["user_id"] = this.state.id
    let token = localStorage.getItem('token')
    fetch('http://localhost:3000/api/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify({room: newRoom})
    })
  }

  deleteRoom = (id) => {
    const rooms = this.state.rooms.filter(room => {
      return room.id !== id 
    })
    this.setState({rooms})
    let token = localStorage.getItem('token')
    fetch(`http://localhost:3000/api/v1/rooms/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }

  updateRoom = (updatedRoom) => {
    console.log(updatedRoom)
    const rooms = this.state.rooms.map(room => {
      return room.id !== updatedRoom.id ? room : updatedRoom
    })
    this.setState({rooms})
    let token = localStorage.getItem('token')
    fetch(`http://localhost:3000/api/v1/rooms/${updatedRoom.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify(updatedRoom)
    })
  }
}
