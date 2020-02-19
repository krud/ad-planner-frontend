import React, {Component} from 'react'

export default class RoomForm extends Component {

    state = {
        name: '',
        max_capacity: '',
        id: null
    }

    componentDidMount(){
        this.setState({
            name: this.props.name,
            max_capacity: this.props.max_capacity,
            id: this.props.id
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.roomAction(this.state)
        this.setState({
            name: '',
            max_capacity: '',
            id: null
        })
        return this.props.closeForm ? this.props.closeForm(false) : null
    }

    
    render(){
        return (
            <form className={this.props.formName} onSubmit={this.handleSubmit}>
                <h2>{this.props.label}</h2>
                <input name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name"/>
                <input name="max_capacity" value={this.state.max_capacity} onChange={this.handleChange} placeholder="Max-Capacity"/>
                <input type="submit" className="submit-button"/>
            </form>
        )
    }
}