import React from 'react';
import PropTypes from 'prop-types';
import App from '../App'
import { get_messages } from '../functions/messaging/HelperFunctions'
import './MessageForm.css'


class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        let messages = get_messages()
        this.state = { ...messages, un: 'harrisonp' }
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

    renderMessages() {
        return this.state.messages.map((message, index) => {
            const { pk, sender, receiver, content } = message //destructuring
            let ret;
            if (sender == this.state.un) {
                ret = (
                    <message>
                        <sentmessage>
                            {sender}<br />
                            {receiver}<br />
                            {content}<br />

                        </sentmessage>
                    </message>
                )
            }
            else ret = (
                <message>
                    <receivedmessage>
                        {sender} <br />
                        {receiver}<br />
                        {content}<br />
                    </receivedmessage>
                </message>

            )
            return ret
        })
    }
    // this renders sender reciever and content, sender will be changed when log in is fixed
    render() {
        console.log('state upon  message ender:')
        console.log(this.state)
        return (
            < div className="MessageForm">
                <h1>
                    Conversations
                </h1>
                <div>

                    {this.renderMessages()}
                </div>
                <br />
                <div>

                    <form onSubmit={this.handleSubmit}>
                        <post>
                            sender:
                        <input type="text" value={this.state.outgoing_message ? this.state.outgoing_message.sender : ''} onChange={this.handleChange} />
                            <br />
                            <label>
                                receiver:<input type="text" value={this.state.outgoing_message ? this.state.outgoing_message.receiver : ''} onChange={this.handleChange} />
                            </label>
                            <br />

                            <label>
                                content:
                        <input type="text" value={this.state.outgoing_message ? this.state.outgoing_message.content : ''} onChange={this.handleChange} />
                            </label>
                            <br />


                        </post>
                        <input type="submit" value="SEND" />

                    </form >
                </div>
            </div >
        )
    }
}

export default MessageForm