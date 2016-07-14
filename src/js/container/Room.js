import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import component from '../component/Room'

function mapStateToProps(state) {
  return {
    me: state.me,
    userList: state.userList,
    chat: state.chat,
  }
}

export default connect(mapStateToProps)(component)
