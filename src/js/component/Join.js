import React from 'react'
import { Link } from 'react-router'
import lStorage from 'store'
import store from './../domain/store/store'
import action from './../domain/store/action'

import { reLogin, setUser, disconnect, subscribeUserData } from './../domain/db'

export default class Join extends React.Component {

  constructor(props) {
    super(props)
    this.join = this.join.bind(this)
    this.reset = this.reset.bind(this)
    this.state = {
      name: lStorage.get('name')
    }
  }

  join(e) {
    e.preventDefault()
    const username = this.input.value.trim()
    if (username) return setUser(username).then(() => {
      this.props.history.push('room')
    })
    alert('Please input NAME.')
  }

  reset() {
    lStorage.set('name', '')
    lStorage.set('uid', '')
    this.setState({
      name: null
    })
  }

  componentWillMount() {
    this.setState({
      name: lStorage.get('name')
    })
  }

  render() {
    return (
      <div className="ui-client__body">
        <div className="ui-client__container">
          <div className="ui-client__board">

            {
              (() => {
                if (this.state.name) {
                  return (
                    <div>
                      <section className="ui-client__section">
                        <h2 className="ui-client__caption">Hello {this.state.name}.</h2>
                        <Link to="room" className="ui-client__link">Let's go to the chat room!</Link>
                        　
                        <a onClick={this.reset} className="ui-client__link">or join as a new user?</a>
                      </section>
                    </div>
                  )
                }
              })()
            }

            {
              (() => {
                if (!this.state.name) {
                  return (
                    <div>
                      <form onSubmit={this.join}>
                        <section className="ui-client__section">
                          <h2 className="ui-client__caption">NAME</h2>
                          <input className="ui-client__input" ref={v => this.input = v} type="text" />
                        </section>
                      </form>

                      <section className="ui-client__section">
                        <a onClick={this.join} className="ui-client__link">Join!</a>
                      </section>
                    </div>
                  )
                }
              })()
            }

          </div>
        </div>
      </div>
    )
  }

}
