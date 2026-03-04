import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';

import sourcesReducer from './sources/reducer';
import userReducer from './user/reducer';

const rootReducer = combineReducers({
  sources: sourcesReducer,
  user: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
