import React from 'react'
import { get_messages, send_message, username_to_pk } from './HelperFunctions'

class Conversation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            message: {
                content: '',
                sender: props.pk,
                receivers: [],
            }
        }
    }

    load_messages = async () => {
        this.setState({ messages: await get_messages(this.props.pk, this.props.pkb) })
        this.setState({ message: { ...this.state.message, receivers: [await username_to_pk(this.props.pkb)] } })
    }

    async componentDidMount() {
        this.load_messages();
    }

    handleSubmit = async (e) => {
        await send_message(this.state.message)
        this.load_messages();
        this.setState({ message: { ...this.state.message, content: '' } })
        e.preventDefault()
    }

    editContent = (e) => {
        this.setState({ message: { ...this.state.message, content: e.target.value } })
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
            <convopage>
                <h3>
                    {this.props.pkb}
                </h3>
                <convo>
                    {this.renderMessages()}
                </convo>
                < form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.message.content} onChange={this.editContent} placeholder='message' />
                    <input type="submit" value='Send' />
                </form >
            </convopage>

        )
    }
}

export default Conversation