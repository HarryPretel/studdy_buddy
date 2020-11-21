import React from 'react';
import { get_messages, get_conversations, get_username, get_all_usernames, send_message, username_to_pk } from './HelperFunctions'
import './Messenger.css'
import Conversation from './Conversation'


class Messenger extends React.Component {
    constructor(props) { // usually only use constructor for setting state and binds.
        super(props)
        this.state = {
            view: null,
            conversations: [],
            username: this.props.username,
            convo: [],
            allusers: [],
            users: {},
            addconvoparam: '',
            recipients: [],
            messagecontents: '',
            message: {
                content: '',
                sender: props.pk,
                receivers: [],
            }
        }
    }

    async componentDidMount() {
        this.setState({ conversations: await get_conversations(this.props.pk) })
        this.setState({ allusers: await get_all_usernames() })
        /*
        for (let i = 0; i < this.state.allusers.length; i++) {
            let u = this.state.allusers[i]
            console.log(u)
            let un = u["username"]
            console.log(un)
            let users = this.state.users
            users[un.toString()] = u
            this.setState({ users: { ...users } })
            console.log(this.state.users)
        }
        */
    }

    setView = (v) => {
        console.log('view: ' + v)
        this.setState({ view: v })
    }

    addRecipient = (recipient) => {
        this.setState({ recipients: [...this.state.recipients, recipient] })
    }

    dynamicUserSearch = () => {
        return this.state.allusers.filter(name => name.toLowerCase().includes(this.state.addconvoparam.toLowerCase()))
    }

    editUserSearchTerm = (e) => {
        this.setState({ addconvoparam: e.target.value, recipients: [e.target.value] })
    }

    editMessageContents = (e) => {
        this.setState({ messagecontents: e.target.value })
    }

    handleSend = async (e) => {
        this.setState({ message: { ...this.state.message, content: this.state.messagecontents, receivers: [await username_to_pk(this.state.recipients[0])] } })
        await send_message(this.state.message)
        e.preventDefault()
    }



    renderNewMessage() {
        return (
            <newmessage>

                <form onSubmit={this.handleSend}>
                    <input type='text' value={this.state.addconvoparam} onChange={this.editUserSearchTerm} placeholder='recipient' />
                    <br />
                    <input type='text' value={this.state.messagecontents} onChange={this.editMessageContents} placeholder='message' />
                    <br />
                    <input type='submit' value='Send' />
                    {/* names */}
                </form >
            </newmessage>
        )
    }

    renderConversationList() {
        return (
            <conversationlist>

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
                            <li onClick={() => this.setView(group[0])}>
                                <group>
                                    {group_str}:
                                </group>
                                <lastmessage>
                                    {content}
                                </lastmessage>
                            </li>

                        )
                    })}
                </ul>
            </conversationlist>
        )
    }

    render() {
        var view;
        switch (this.state.view) {
            case null:
                view = this.renderConversationList()
                break
            case 'newMessage':
                view = this.renderNewMessage()
                break
            default:
                view = <Conversation username={this.props.username} pk={this.props.pk} pkb={this.state.view} />
        }
        return (
            <messenger>
                <t>
                    <h1 onClick={() => this.setView(null)}>Messages</h1>
                    <add onClick={() => this.setView('newMessage')}>+</add>
                </t>
                { view}
            </messenger >
        )
    }
}


export default Messenger