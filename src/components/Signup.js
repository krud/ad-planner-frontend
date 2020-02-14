import React, { Component } from 'react'

export default class Signup extends Component {

    state = {
        username: '',
        password: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signup(this.state, this.props.history)
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    render() {
        return (
            <form className='user-form' onSubmit={this.handleSubmit}>
                <h1>Sign Up</h1>
                <input name='username' value={this.state.username} onChange={this.handleChange} placeholder="Username"/>
                <input type='password' name='password' value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
                <input type='submit' value='Sign Up' className="submit-button"/>
            </form>
        )
    }
}