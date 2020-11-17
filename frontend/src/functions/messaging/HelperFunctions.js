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

export { get_messages, get_conversations, get_username };
