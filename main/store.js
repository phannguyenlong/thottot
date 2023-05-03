// redux
import { createStore, applyMiddleware, combineReducers } from 'redux'
// saga
import rootSaga from './saga'
import createSagaMiddleware from 'redux-saga'
// reducers
import authReducer, { authInitialState } from './redux/reducers/auth.reducer'
import userReducer, { userInitialState } from './redux/reducers/user.reducer'
import workerReducer, {
  workerInitialState
} from './redux/reducers/worker.reducer'

const initialState = {
  auth: authInitialState,
  user: userInitialState,
  worker: workerInitialState
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  worker: workerReducer
})

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore(state = initialState) {
  const store = createStore(
    rootReducer,
    state,
    bindMiddleware([sagaMiddleware])
  )

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  store.runSagaTask()
  return store
}

export default configureStore
