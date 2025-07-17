const checkUsername = (value: any) => {
	//console.log('Validating username:', value)
	return value.value.length > 3
}

export const validationFns = {
	checkUsername,
}

export const validationMessages = {
	checkUsername: 'Username must be longer than 3 characters',
}
