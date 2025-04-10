export function setUserData(data: LoginResponse) {
	localStorage.setItem('user', JSON.stringify(data))
}
