export function get_messages() {
    return {
        messages: [
            { pk: 1, sender: 'harrisonp', receiver: 'ek', content: 'waddup bro' },
            { pk: 2, sender: 'harrisonp', receiver: 'ek', content: 'waddup bro x2' },
            { pk: 3, sender: 'ek', receiver: 'hp', content: 'waddup bro x3' },
        ],
        outgoing_message: {
            sender: 'harry',
            receiver: 'gurcan',
            content: 'yo',
        }

    }
}