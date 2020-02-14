import React, { Component } from 'react'
import './styles/App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login'
import Signup from './components/Signup'

export default class App extends Component {

  state = {
    rooms: []
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
      ? this.setState({rooms: result.user.rooms})
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
              deleteRoom={this.deleteRoom} 
              updateRoom={this.updateRoom} 
              roomAction={this.addRoom} 
              />
            <Route path='/signup' render={(routerprops) => <Signup {...routerprops} signup={this.signup}/>}/>
            <Route path='/login' render={(routerprops) => <Login {...routerprops} login={this.login}/>}/>
          </Switch>
        </div>
      </Router>
    )
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
    .then(({user, user: {rooms}, jwt}) => {
      localStorage.setItem('token', jwt)
      this.setState({rooms})
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
    .then(({user, user: {rooms}, jwt}) => {
      localStorage.setItem('token', jwt)
      this.setState({rooms})
      history.push('/')
    })
  }

  addRoom = (newRoom) => {
    this.setState({
      rooms: [...this.state.rooms, newRoom]
    })
  }

  deleteRoom = (id) => {
    const rooms = this.state.rooms.filter(room => {
      return room.id !== id 
    })

    this.setState({rooms})
  }

  updateRoom = (updatedRoom) => {
    const rooms = this.state.rooms.map(room => {
      return room.id !== updatedRoom.id ? room : updatedRoom
    })
    this.setState({rooms})
  }
}
