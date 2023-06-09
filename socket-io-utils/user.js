const users = [];

// Join user to chat
function userJoin(id, email, username) {
    const user = { id, email, username };

    users.push(user);

    return user;
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function getUserByEmail(email) {
    return users.find(user => user.email === email);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getAllUsers() {
    return users;
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getAllUsers,
    getUserByEmail
}