//export const validationFns = {
//  checkUsername: (value: string) => {
//    return value.length > 3 || 'Username too short'
//  }
//}


//export function checkUsername(value: string): true | string {
//  return value.length > 3 || 'Username too short'
//}

//export function isEmail(value: string): true | string {
//  return value.includes('@') || 'Invalid email address'
//}

export const validationFns = {
  checkUsername: (value: string) => {
		console.log('Validating username:', value)
    return value.length > 3 || 'Username too short'
  },
  isEmail: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) || 'Invalid email'
  }
}

