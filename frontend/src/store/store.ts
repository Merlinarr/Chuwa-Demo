import { configureStore } from '@reduxjs/toolkit'
import settingReducer from "./setting/settingSlice"
import userReducer from "./users/userSlice"
import shoppingReducer from './shopping'
export const store = configureStore({
  reducer: {
    settings: settingReducer,
    user: userReducer,
    shopping: shoppingReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch