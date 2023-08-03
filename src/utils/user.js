const KEY = 'USER'

export function saveUser(user) {
    localStorage.setItem(KEY, JSON.stringify(user))
}

export function getUser() {
    return JSON.parse(localStorage.getItem(KEY)) || {}
}

export function removeUser() {
    localStorage.removeItem(KEY)
}