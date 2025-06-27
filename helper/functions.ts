export const onInputFn = {
  logText: (text: string) => {
    console.log(`Log: ${text}`)
  },
  shoutText: (text: string) => {
    console.log(text.toUpperCase())
  }
}