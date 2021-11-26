import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'

import campaignReducer from './components/Campaigns/redux'

const rootReducers = combineReducers({
    campReducer: campaignReducer
})

export default rootReducers;