import { TaskStatuses, TaskPriorities, todolistsAPI } from './../api/todolistsAPI';

import {TaskStateType } from '../App';
import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer';
import { TaskType } from '../api/todolistsAPI';
import { act } from 'react-dom/test-utils';
import { Dispatch } from 'redux';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    todoListID: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    todoListID: string
    status: TaskStatuses
}

export type SetTasksActionType = {
    type: 'SET_TASKS',
    tasks: Array<TaskType>,
    todolistId: string
}

export type ActionTaskType = RemoveTaskActionType | SetTasksActionType |
AddTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType | AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType

export const RemoveTaskAC = (taskID: string, todoListID: string):RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: taskID, todoListID: todoListID}
}
export const AddTaskAC = (title: string, todoListID: string):AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todoListID: todoListID}
}

export const ChangeTaskTitleAC = (taskID: string, title: string, todoListID: string):ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID: taskID, todoListID: todoListID, title: title}
}

export const ChangeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string):ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID: taskID, todoListID: todoListID,  status: status}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return { type: 'SET_TASKS', tasks, todolistId }
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
         todolistsAPI.getTasks(todolistId).then(res => {
             dispatch(setTasksAC(res.data.items, todolistId))
         })
     }
 }

let initialState = {}

export const tasksReducer = (tasks: TaskStateType = initialState, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let copyState = {...tasks}
            copyState[action.todoListID] = copyState[action.todoListID].filter( t => t.id !== action.taskID)
            return copyState
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate:'',
                todoListId: action.todoListID,
                addedDate:'',
                deadline: '',
                order: 0
            }
            return {...tasks,
                [action.todoListID]: [newTask, ...tasks[action.todoListID]]}
        case 'CHANGE-TASK-TITLE':
            return {
                ...tasks,
                [action.todoListID]: [...tasks[action.todoListID].map(t => t.id === action.taskID ? { ...t, title: action.title} : t)]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...tasks,
                [action.todoListID]: [...tasks[action.todoListID].map(t => t.id === action.taskID ? {...t, status: action.status} : t)]
            }
        case 'ADD-TODOLIST':
            return {
                ...tasks,
            [action.todoListID]: []}
        case 'REMOVE-TODOLIST':
            let copyTask = {...tasks}
            delete copyTask[action.todoListID]
            return copyTask
        case 'SET_TODOLISTS': {
            const copyState = {...tasks}
            action.todolists.forEach( tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET_TASKS': {
            const copyState = {...tasks}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return tasks
    }
}


