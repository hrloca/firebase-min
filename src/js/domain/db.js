import store from './store/store'
import * as action from './../domain/store/action'
import lStorage from 'store'

const db = firebase.database()

const getTime = () => new Date().getTime()

export const subscribeChatData = (name) => {
  const ref = db.ref('chat')
  ref.on('value', (snapshot) => {
    const data = snapshot.val()
    if (!data) return
    const chatList = Object.keys(data).map((v) => data[v])
    store.dispatch(action.setCHAT(chatList))
  })
}

export const subscribeUserData = (name) => {
  const ref = db.ref('users')
  ref.on('value', (snapshot) => {
    const data = snapshot.val()
    if (!data) return
    const users = Object.keys(data).map((v) => data[v])
    store.dispatch(action.setUList(users))
  })
}

export const reLogin = () => {
  const name = lStorage.get('name')
  const uid = lStorage.get('uid')
  const ref = db.ref('users/' + uid)
  return ref.set({
    name,
  }).then(() => {
    ref.onDisconnect().remove()
  }).then(() => {
    store.dispatch(action.setINFO({uid, name}))
  }).then(() => {
    pushState({uid, name}, 1)
  })
}

export const setUser = (name) => {
  const uid = db.ref().child('users').push().key
  const ref = db.ref('users/' + uid)
  return ref.set({
    name,
  }).then(() => {
    ref.onDisconnect().remove()
  }).then(() => {
    store.dispatch(action.setINFO({uid, name}))
    lStorage.set('uid', uid)
    lStorage.set('name', name)
  }).then(() => {
    pushState({uid, name}, 1)
  })
}

export const pushState = (info, state) => {
  const uid = db.ref().child('chat').push().key
  const ref = db.ref('chat/' + uid)
  return ref.set({
    type: 2,
    state,
    name: info.name,
    time: getTime()
  })
}

export const pushChatData = (text) => {
  const info = store.getState().info;
  const uid = db.ref().child('chat').push().key
  const ref = db.ref('chat/' + uid)
  return ref.set({
    type: 1,
    name: info.name,
    text,
    time: getTime()
  })
}

export const connect = () => {
  const uid = store.getState().info.uid
  if (!uid) return reLogin()
  const name = store.getState().info.name
  const ref = db.ref('users/' + uid)
  ref.once('value', (snapshot) => {
    const val = snapshot.val()
    val ? null : ref.update({ name }).then(() => {
      pushState({uid, name}, 1)
    })
  })
}

export const disconnect = () => {
  const uid = store.getState().info.uid;
  if (!uid) return
  const ref = db.ref('users/' + uid)
  return ref.remove()
}

export default db
