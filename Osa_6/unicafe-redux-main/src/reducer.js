const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changedGood  = {...state, good: state.good+1}
      return changedGood
    case 'OK':
      const changedOk = {...state, ok: state.ok+1}
      return changedOk
    case 'BAD':
      const changedBad = {...state, bad: state.bad+1}
      return changedBad
    case 'ZERO':
      const changedAll  = {good: 0, ok: 0, bad: 0}
      return changedAll
    default: return state
  }
  
}

export default counterReducer
