import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import component from '../component/Join'

function mapStateToProps(state) {
  return { me: state.me }
}

export default connect(mapStateToProps)(component)
