export function getUserIdFromLocalStorage() {
	let user = localStorage.getItem('user')
	if (!user) return -1
	user = JSON.parse(user)
	return user.id
}
