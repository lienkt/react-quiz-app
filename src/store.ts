import { configureStore } from '@reduxjs/toolkit'

import { questionsReducer } from './redux/questions.slice'
import { scoreReducer } from './redux/score.slice'

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    score: scoreReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch