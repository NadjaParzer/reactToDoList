import React from 'react'
import { Provider } from "react-redux"
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses } from '../api/todolistsAPI'
import { AppRootStateType, store } from "./store"
import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const initialState = {
  todolists: [
    {id: 'todolistId1', title: "What to learn", filter: "all", addedDate: '', order: 0  },
    {id: 'todolistId2', title: "What to buy", filter: "all", addedDate: '', order: 0  },
  ],
  tasks: {
    ["todolistId1"]: [
      {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate:'', deadline: '', addedDate:'', order: 0, priority: TaskPriorities.Low },
      {id: v1(), title: "JS", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate:'', deadline: '', addedDate:'', order: 0, priority: TaskPriorities.Low },
    ],
    ["todolistId2" ]: [
      {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate:'', deadline: '', addedDate:'', order: 0, priority: TaskPriorities.Low },
      {id: v1(), title: "React Book", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate:'', deadline: '', addedDate:'', order: 0, priority: TaskPriorities.Low },
    ]
  }
}

export const storyBookStore = createStore(rootReducer, initialState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>
    {storyFn()}
  </Provider> 
}