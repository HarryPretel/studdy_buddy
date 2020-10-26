import React from 'react';
import PropTypes from 'prop-types';
import App from '../App'


class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                { pk: 1, sender: 'hp', receiver: 'ek', content: 'waddup bro' },
                { pk: 2, sender: 'hp', receiver: 'ek', content: 'waddup bro x2' },
                { pk: 3, sender: 'ek', receiver: 'hp', content: 'waddup bro x3' },
            ],
            outgoing_message: {
                sender: '',
                receiver: '',
                content: '',
            }

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
            </div >
        )
    }
}

export default MessageForm