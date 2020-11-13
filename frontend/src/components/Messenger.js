import React from 'react';
import { get_messages, get_conversations } from '../functions/messaging/HelperFunctions'
import './Messenger.css'


class Messenger extends React.Component {
    constructor(props) { // usually only use constructor for setting state and binds.
        super(props)
        this.state = {
            username: this.props.username,
            view: {
                sender: this.props.username,
                receivers: null,
            }
        }
    }

    setView(receivers) {
        this.setState({ view: { receivers: receivers } })
    }

    // this renders sender receiver and content, sender will be changed when log in is fixed
    render() {
        return (
            < messenger>
                <h3>
                    {this.state.view.receivers ? this.state.view.receivers : this.state.username + "'s conversations:"}
                </h3>
                <ConversationList username={this.props.username} setView={this.setView} />
                <br />
                <Conversation username={this.props.username} />
                <br />
            </messenger >
        )
    }
}

class ConversationList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: this.props.username, conversations: get_conversations() }
    }

    openConvo(receivers) {
        this.props.setView(receivers)
    }

    render() {
        return this.state.conversations.map((convo, index) => {
            const { sender, receivers, content } = convo //destructuring
            return <ConversationEntry openConvo={this.openConvo} sender={sender} content={content} timestamp={'random timestamp'} receivers={receivers} />
        })
    }
}

class Conversation extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: this.props.username, messages: get_messages() }
    }

    render() {
        return this.state.messages.map((convo, index) => {
            const { sender, receiver, content } = convo //destructuring
            return this.props.username === sender ? <SentMessage content={content} /> : <ReceivedMessage content={content} />
        }).concat(<SendMessageForm />)
    }
}

function ConversationEntry(props) {
    return <conversation_entry onClick={() => props.openConvo(props.receivers)}>
        {props.sender}: {props.content} @ {props.timestamp} <br />
    </conversation_entry>
}

function SentMessage(props) {
    return <message><sentmessage>
        {props.content} <br />
    </sentmessage></message>
}

function ReceivedMessage(props) {
    return <message><receivedmessage>
        {props.content} <br />
    </receivedmessage></message>
}

class SendMessageForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ outgoing_message: event.target.value })
    }

    handleSubmit(event) {
        alert('message sent')
        event.preventDefault()
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
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
    }
}

export default Messenger