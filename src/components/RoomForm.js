import React, {Component} from 'react'

export default class RoomForm extends Component {

    state = {
        name: '',
        maxCapacity: '',
    }

    componentDidMount(){
        this.setState({
            name: this.props.name,
            maxCapacity: this.props.maxCapacity,
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
            maxCapacity: ''
        })
        return this.props.closeForm ? this.props.closeForm(false) : null
    }

    
    render(){
        return (
            <form className={this.props.formName} onSubmit={this.handleSubmit}>
                <h2>{this.props.label}</h2>
                <input name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name"/>
                <input name="maxCapacity" value={this.state.maxCapacity} onChange={this.handleChange} placeholder="Max-Capacity"/>
                <input type="submit" className="submit-button"/>
            </form>
        )
    }
}