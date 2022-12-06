import { combineReducers } from 'redux';
import nav from './slices/navSlice';

const rootReducer = combineReducers({
  nav,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
