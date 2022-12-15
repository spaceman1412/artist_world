import {combineReducers, configureStore, Reducer} from '@reduxjs/toolkit';
import counterReducer from './counter/reducer';
import profileReducer, {ProfileActions} from './profile/reducer';
import matchReducer from './match/reducer';

export const combinedReducer = combineReducers({
  counter: counterReducer,
  profile: profileReducer,
  match: matchReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof combinedReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === ProfileActions.logOut.type) {
    state = {} as RootState;
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
