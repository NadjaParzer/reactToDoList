import { TodoListsType, FilterValuesType, TaskStateType } from '../App';
import { v1 } from "uuid";
import { TaskType } from '../TodoList';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

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
    status: boolean
}

export type ActionTaskType = RemoveTaskActionType |
AddTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType | AddTodolistActionType | RemoveTodolistActionType

export const RemoveTaskAC = (taskID: string, todoListID: string):RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: taskID, todoListID: todoListID}
}
export const AddTaskAC = (title: string, todoListID: string):AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todoListID: todoListID}
}

export const ChangeTaskTitleAC = (taskID: string, title: string, todoListID: string):ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID: taskID, todoListID: todoListID, title: title}
}

export const ChangeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string):ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID: taskID, todoListID: todoListID,  status: isDone}
}

export const tasksReducer = (tasks: TaskStateType, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let copyState = {...tasks}
            copyState[action.todoListID] = copyState[action.todoListID].filter( t => t.id !== action.taskID)
            return copyState
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
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
                [action.todoListID]: [...tasks[action.todoListID].map(t => t.id === action.taskID ? {...t, isDone: action.status} : t)]
            }
        case 'ADD-TODOLIST':
            return {
                ...tasks,
            [action.todoListID]: []}
        case 'REMOVE-TODOLIST':
            let copy = {...tasks}
            delete tasks[action.todoListID]
            return copy
        default:
            return tasks
    }
}
