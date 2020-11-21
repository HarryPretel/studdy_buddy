

async function get_messages(pka, pkb) {
    var endpoint = 'http://localhost:8000/api/messaging/conversations/user/' + pka + '/user2/' + pkb
    var messages = await fetch(endpoint).catch(error => {
        console.log('ERROR: ' + error)
        return []
    })
    messages = await messages.json()
    return messages
}

async function get_conversations(pk) {
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

async function get_username(pk) {
    var endpoint = 'http://localhost:8000/api/userprofiles/' + pk
    var user = await fetch(endpoint).catch(error => {
        console.log("ERROR: " + error)
        return ['no user found']
    })
    user = await user.json()
    console.log('get_username: ' + JSON.stringify(user))
    return [user]
}

async function get_all_usernames() {
    var endpoint = 'http://localhost:8000/api/messaging/allusers/'
    var users = await fetch(endpoint).catch(error => {
        console.log("ERROR: " + error)
        return ['error']
    })
    users = await users.json()
    return users
}

async function send_message(message) {
    var endpoint = 'http://localhost:8000/api/messaging/sendmessage/'
    var response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
    }).catch(error => {
        console.log("ERROR: " + error)
        return 'error'
    })
    response = await response.json()
    console.log('RESPONSE: ' + response)
    return 'all good'
}

async function username_to_pk(username) {
    var endpoint = 'http://localhost:8000/api/messaging/username_to_pk/' + username
    var pk = await fetch(endpoint).catch(error => {
        console.log("ERROR: " + error)
        return 0
    })
    pk = await pk.json()
    return pk
}

export { get_messages, get_conversations, get_username, get_all_usernames, send_message, username_to_pk };
