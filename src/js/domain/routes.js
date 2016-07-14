import React from "react"
import { Route, Link, IndexRoute } from 'react-router'

import App from './../container/App'
import Room from './../container/Room'
import Join from './../container/Join'

export default [
  { path: '/',
    component: App,
    indexRoute: { component: Join },
    childRoutes: [
      { path: 'room', component: Room },
      { path: '*', component: Join },
    ]
  }
]
