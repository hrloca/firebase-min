import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import component from '../component/App'

function mapStateToProps(state) {
  return { info: state.info }
}

export default connect(mapStateToProps)(component)
