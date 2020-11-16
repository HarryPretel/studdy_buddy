export function get_messages() {
    return [
        { pk: 1, sender: 'harrisonp', receiver: 'ek', content: 'waddup bro' },
        { pk: 2, sender: 'harrisonp', receiver: 'ek', content: 'waddup bro x2' },
        { pk: 3, sender: 'ek', receiver: 'hp', content: 'waddup bro x3' },
    ]
}

export async function get_conversations(pk) {
    console.log('get_conversations ' + pk)
    var endpoint = 'http://localhost:8000/api/messaging/conversations/user/' + pk
    console.log(endpoint)
    var conversations = await fetch(endpoint
    ).catch(error => {
        console.log("ERROR: " + error)
        return []
    })
    conversations = await conversations.json()
    console.log('helper func')
    console.log('convos: ' + JSON.stringify(conversations))
    return conversations
}

export async function get_username(pk) {
    var endpoint = 'http://localhost:8000/api/userprofiles/' + pk
    var user = await fetch(endpoint).catch(error => {
        console.log("ERROR: " + error)
        return ['no user found']
    })
    user = await user.json()
    console.log('get_username: ' + JSON.stringify(user))
    return [user]
}