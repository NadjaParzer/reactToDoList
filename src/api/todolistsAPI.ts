import { title } from 'process';

import axios from 'axios'

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
   "API-KEY": "0953c110-2e83-40a7-8c09-25e99de87d0b"
  }
})

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

type ResponseType<D={}> = {
  resultCode: number
  messages: Array<string>
  data: D
}

export type TaskType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModellType = {
title: string
description: string
status: number
priority: number
startDate: string | null
deadline: string | null
}

type GetTasksREsponseType = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>("todo-lists")
  },
  createTodolists(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", { title: title })
  },
  deleteTodolist(todolistID: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
  },
  updateTodolistTitle(todolistID: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistID}`, { title: title })
  },
  getTasks(todolistID: string) {
    return instance.get<GetTasksREsponseType>(`todo-lists/${todolistID}/tasks`)
  },
  deleteTask(todolistID: string, taskID: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
  },
  postTask(todolistID: string, taskTitle: string) {
    return instance.post<ResponseType>(`todo-lists/${todolistID}/tasks/`, {title:taskTitle})
  },
  updateTask(todoListId: string, taskID: string, model: UpdateTaskModellType) {
    return instance.put<ResponseType>(`todo-lists/${todoListId}/tasks/${taskID}`, {...model})
  }

}