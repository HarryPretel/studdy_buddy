import React from 'react';
import PropTypes from 'prop-types';
import App from '../App'
import { get_messages } from '../functions/messaging/HelperFunctions'


class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = get_messages()
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        console.log('hangle change event target')
        console.log(event.value)
        this.setState({ outgoing_message: event.target.value })
        console.log('state after handling change')
        console.log(this.state)
    }

    handleSubmit(event) {
        alert('message sent')
        event.preventDefault()
    }

    renderTableData() {
        return this.state.messages.map((message, index) => {
            const { pk, sender, receiver, content } = message //destructuring
            return (
                <tr key={pk}>
                    <td>{sender}</td>
                    <td>{receiver}</td>
                    <td>{content}</td>
                </tr>
            )
        })
    }

    render() {
        console.log('state upon  message ender:')
        console.log(this.state)
        return (
            < div >
                <h1>
                    yoyoyo
                </h1>
                <table id='messages'>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        sender:
                        <input type="text" value={this.state.outgoing_message ? this.state.outgoing_message.sender : ''} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        receiver:
                        <input type="text" value={this.state.outgoing_message ? this.state.outgoing_message.receiver : ''} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <label>
                        content:
                        <input type="text" value={this.state.outgoing_message ? this.state.outgoing_message.content : ''} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <input type="submit" value="SEND" />

                </form>
            </div >
        )
    }
}

export default MessageForm