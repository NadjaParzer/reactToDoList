import { AppRootStateType } from './store';
import { title } from 'process';
import { TaskStatuses, todolistsAPI, UpdateTaskModellType, TaskPriorities } from './../api/todolistsAPI';
import {TaskStateType } from '../App';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer';
import { TaskType } from '../api/todolistsAPI';
import { Dispatch } from 'redux';


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskID: string
    todoListID: string
    model: UpdateTaskDomainModelType
}

export type SetTasksActionType = {
    type: 'SET_TASKS',
    tasks: Array<TaskType>,
    todolistId: string
}

export type ActionTaskType = RemoveTaskActionType | SetTasksActionType |
AddTaskActionType | UpdateTaskActionType | AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType

export const RemoveTaskAC = (taskID: string, todoListID: string):RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: taskID, todoListID: todoListID}
}
// export const AddTaskAC = (title: string, todoListID: string):AddTaskActionType => {
//     return {type: 'ADD-TASK', title: title, todoListID: todoListID}
// }

export const AddTaskAC = (task: TaskType):AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const updateTaskAC = (taskID: string, model: UpdateTaskDomainModelType, todoListID: string):UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', taskID, todoListID, model}
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

 export const removeTaskTC = (todolistId: string, taskId: string) => {
     return (dispatch: Dispatch) => {
         todolistsAPI.deleteTask(todolistId, taskId).then(res => {
             const action = RemoveTaskAC(taskId, todolistId)
             dispatch(action)
         })

     }
 }

export const addTaskTC = (todolistsID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.postTask(todolistsID, title).then(res => {
            dispatch(AddTaskAC(res.data.data.item))
        })
    }
}
 type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null
}
  
export const updateTaskTC = (taskID: string, domainModel: UpdateTaskDomainModelType, todoListID: string) => {
    return (dispatch: Dispatch, getState: ()=> AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todoListID].find(t => t.id === taskID)
        if (!task) {
            console.log('WARNING')
            // throw new Error
            return
        }
        const apiModel: UpdateTaskModellType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        todolistsAPI.updateTask(todoListID, taskID, apiModel).then(res => {
            dispatch(updateTaskAC(taskID, domainModel, todoListID))
        })
    }
}


let initialState = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todoListID] = copyState[action.todoListID].filter( t => t.id !== action.taskID)
            return copyState
        }
        case 'ADD-TASK': {
            let copyState = {...state}
            const newTask = action.task
            const tasks = copyState[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            copyState[newTask.todoListId] = newTasks
            return copyState
        }
        case 'UPDATE-TASK':
            return  {
                ...state,
                [action.todoListID]: [...state[action.todoListID].map(t => t.id === action.taskID ? { ...t, ...action.model} : t)]
            }
        // case 'CHANGE-TASK-STATUS':
        //     return {
        //         ...state,
        //         [action.todoListID]: [...state[action.todoListID].map(t => t.id === action.taskID ? {...t, status: action.status} : t)]
        //     }
        case 'ADD-TODOLIST':
            return {
                ...state,
            [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            let copyTask = {...state}
            delete copyTask[action.todoListID]
            return copyTask
        case 'SET_TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach( tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET_TASKS': {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}


