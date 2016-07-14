import React from 'react'
import { connect, disconnect, pushChatData } from './../domain/db'
import date from './../domain/util/date'

export default class Room extends React.Component {

  constructor(props) {
    super(props)
    this.pushChat = this.pushChat.bind(this)
  }

  pushChat(e) {
    e.preventDefault()
    const value = this.input.value
    if (!value) return
    pushChatData(value)
    this.input.value = ''
  }

  fixScrollPos() {
    if (!(this.timeline || this.chatroom)) return
    const rect = this.timeline.getClientRects()
    this.chatroom.scrollTop = rect[0].height
  }

  componentDidMount() {
    this.input.focus()
  }

  componentDidUpdate() {
    this.fixScrollPos()
  }

  componentWillMount() {
    connect()
  }

  componentWillUnmount() {
    disconnect()
  }

  render() {
    return (
      <div className="ui-client__body">

        <div className="ui-client__navi">
          <div className="ui-client__navi__section">
          <div className="ui-client__navi__section__caption">USER LIST</div>
            <ul className="ui-client__navi__section__list">
              {
                this.props.userList.map((v, i) => (
                  <li key={i} className="ui-client__navi__section__list__body">
                    <i className="icon icon--login"></i>
                    <span>{v.name}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <div className="ui-client__contents">
          <div ref={v => this.chatroom = v} className="chatroom">
            <div ref={v => this.timeline = v} className="timeline">
              <ul className="timeline__day">
                {
                  this.props.chat.map((v, i) => (
                    (() => {
                      if (v.type === 1) {
                        return (
                          <li key={i} className="timeline__list">
                            <div className="timeline__thumb"></div>
                            <div className="timeline__body">
                              <div className="timeline__info">
                                <div className="timeline__name">{v.name}</div>
                                <div className="timeline__date">{date(v.time, 'hh:mm')}</div>
                              </div>
                              <div className="timeline__text">{v.text}</div>
                            </div>
                          </li>
                        )
                      } else if(v.type === 2) {
                        return (
                          <li key={i} className="timeline__list">
                            <div className="timeline__sys">{v.name} {v.state ? 'login' : 'logout'}.</div>
                          </li>
                        )
                      }
                    })()
                  ))
                }
              </ul>
            </div>

            <div className="ui-chatInput">
              <form onSubmit={this.pushChat} className="ui-chatInput__input">
                <input ref={v => this.input = v} type="text" />
              </form>
            </div>

          </div>

        </div>

      </div>
    )
  }

}

