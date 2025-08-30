import rawUsers from '../assets/users.json'
let users = {...rawUsers};
const storedUsers = localStorage.getItem('users');
if (storedUsers) {
	users = JSON.parse(storedUsers);
}

/**
 * Check if the user given exists
 *
 * @param {string} compUsername - The username of the user that we want to check
 * exists
 *
 * @return {boolean} Whether the user exists
 */
export function userExists(compUsername) {
	return Object.prototype.hasOwnProperty.call(users, compUsername);
}

/**
 * Gets the password of a user.
 *
 * @param {string} compUsername - The username of the user whose password we
 * seek
 *
 * @returns {string} the password
 */
export function getPassword(compUsername) {
	return users[compUsername] || null;
}

/**
 * Add a new user from login
 *
 * @param {string} compUsername - The username of the user to add
 * @param {string} password - The new user's password
 */
export function addUser(compUsername, password) {
	users[compUsername] = password;
	localStorage.setItem('users', JSON.stringify(users));
}
