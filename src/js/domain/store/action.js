export const DECREMENT = Symbol()
export const INCREMENT = Symbol()
export const INFO = Symbol()
export const CHAT = Symbol()
export const ULIST = Symbol()

export const increment = url => ({ type: INCREMENT, url })
export const decrement = url => ({ type: INCREMENT, url })

export const setINFO = info => ({ type: INFO, info })
export const setCHAT = data => ({ type: CHAT, data })
export const setUList = ulist => ({ type: ULIST, ulist })

