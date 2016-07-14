import { combineReducers } from 'redux'
import * as actions from './action'
import im from 'immutable'

const info = (state = {}, action) => {
  const _state = im.Map(state)
  switch (action.type) {
  case actions.INFO:
    return _state
      .set('uid', action.info.uid)
      .set('name', action.info.name).toJS()
  default:
    return _state.toJS()
  }
}

const userList = (state = [], action) => {
  switch (action.type) {
  case actions.ULIST:
    return state = action.ulist
  default:
    return state
  }
}

const chat = (state = [], action) => {
  switch (action.type) {
  case actions.CHAT:
    return state = action.data
  default:
    return state
  }
}

const rootReducer = combineReducers({ chat, info, userList })

export default rootReducer
