import React from 'react'
import { subscribeChatData, subscribeUserData } from './../domain/db'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    subscribeChatData()
    subscribeUserData()
  }

  render() {
    return (
      <div className="ui-client">
        <div className="ui-client__header">
          <div className="ui-client__header__left"></div>
          <div className="ui-client__header__right"></div>
        </div>
        { this.props.children }
      </div>
    )
  }

}
