import React from 'react';
import { get_messages, get_conversations, get_username } from '../functions/messaging/HelperFunctions'
import './Messenger.css'


class Messenger extends React.Component {
    constructor(props) { // usually only use constructor for setting state and binds.
        super(props)
        this.state = {
            view: null,
            conversations: [],
            username: this.props.username,
            convo: [],
        }
    }

    async componentDidMount() {
        this.setState({ conversations: await get_conversations(this.props.pk) })
        // this.setState({ username: await get_username(this.props.pk) })
    }

    showSpecificConvo = (pk) => {
        this.setState({ view: pk })
    }
    showConvoList = () => {
        this.setState({ view: null })
    }

    renderConversationList() {
        return (
            <ul>
                {this.state.conversations.map((convo, index) => {
                    var { sender, receivers, content, timestamp, pk } = convo
                    let group = []
                    if (sender != this.state.username) group.push(sender)
                    for (let i in receivers) {
                        if (receivers[i] != this.state.username) group.push(receivers[i])
                    }
                    var group_str = ''
                    if (group.length == 0) group_str = 'Me2Me'
                    else if (group.length == 1) group_str = group[0]
                    else {
                        group_str = group[0] + ', '
                        for (let i = 0; i < group.length; i++) {
                            if (i == group_str.length - 1) group_str += 'and ' + group[i]
                            else group_str += group[i] + ', '
                        }
                    }
                    return (
                        <li onClick={() => this.showSpecificConvo(pk)}>
                            <group>
                                {group_str}:
                            </group>
                            <lastmessage>
                                {content}
                            </lastmessage>
                            <br />
                        </li>

                    )
                })}
            </ul>)
    }

    // this renders sender receiver and content, sender will be changed when log in is fixed
    render() {
        return (
            <messenger>
                <h3 onClick={this.showConvoList}>
                    {this.state.username}
                </h3>
                <br />
                <body>
                    {this.state.view == null ? this.renderConversationList() : <Conversation username={this.props.username} pk={this.props.pk} pkb={this.state.view} />}
                </body>
            </messenger >
        )
    }
}

class Conversation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    async componentDidMount() {
        this.setState({ messages: await get_messages(this.props.pk, this.props.pkb) })
    }

    renderMessages() {
        return this.state.messages.map((message, index) => {
            if (message["sender"] == this.props.username) {
                return (
                    <message>
                        <sentmessage>
                            {message["content"]}
                            <br />
                        </sentmessage>
                    </message>
                )
            }
            else return (
                <message>

                    <receivedmessage>
                        {message["content"]}
                        <br />
                    </receivedmessage>
                </message>
            )
        })
    }

    render() {
        return (
            this.renderMessages()
        )
    }
}

export default Messenger