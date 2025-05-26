import upperCase from 'lodash/upperCase'

export function sayHello(message = 'World') {
  alert(`Hello ${upperCase(message)}!`)
}
