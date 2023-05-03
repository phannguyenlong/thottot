import { all /*, takeEvery, put */ } from 'redux-saga/effects'

// DEPRECATED
// import { actionTypes } from './actions'
// import { branchesGet, branchesCount, branchGetByID } from './api/branches'
//
// function* fetchBranches(action) {
//   let data = yield branchesGet(action.payload)
//   yield put({ type: actionTypes.UPDATE_BRANCHES, payload: data.payload })
// }
//
// function* fetchbranchesCount(action) {
//   let data = yield branchesCount(action.payload)
//   yield put({
//     type: actionTypes.UPDATE_COUNT_BRANCHES,
//     payload: data.payload
//   })
// }
//
// function* fetchViewBranch(action) {
//   let data = yield branchGetByID(action.payload)
//   yield put({
//     type: actionTypes.UPDATE_VIEW_BRANCH,
//     payload: data.payload
//   })
// }

function* rootSaga() {
  yield all([
    // takeEvery(actionTypes.FETCH_BRANCHES, fetchBranches),
    // takeEvery(actionTypes.COUNT_BRANCHES, fetchbranchesCount),
    // takeEvery(actionTypes.FETCH_VIEW_BRANCH, fetchViewBranch)
  ])
}

export default rootSaga
