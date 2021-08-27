import { TodoListsType, FilterValuesType } from './../App';
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListID: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoListID: string
    nextFilter: FilterValuesType
}

export type ActionType = RemoveTodolistActionType |
AddTodolistActionType | ChangeTodolistFilterActionType |ChangeTodolistTitleActionType

export const RemoveTodoListAC = (todoListID: string):RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todoListID: todoListID}
}
export const AddTodoListAC = (title: string):AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}

export const ChangeTodolistTitleAC = (todoListID: string, title: string):ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListID: todoListID, title: title}
}

export const ChangeTodolistFilterAC = (todoListID: string, nextFilter: FilterValuesType):ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoListID: todoListID, nextFilter: nextFilter}
}

export const todolistsReducer = (todolists: Array<TodoListsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            const todoListID = v1()
            const newTodoList: TodoListsType = {
                id: todoListID,
                title: action.title,
                filter: "all"
            }
            return [...todolists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.todoListID ? { ...tl, title: action.title } : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.todoListID ? { ...tl, filter: action.nextFilter } : tl)
        default:
            return todolists
    }
}

