import { combineReducers } from 'redux';
import FeaturesReducer from './reducer_features';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  features: FeaturesReducer,
  form: formReducer
});

export default rootReducer;
