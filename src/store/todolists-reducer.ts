import { title } from 'process';
import { todolistsAPI, TodolistType } from './../api/todolistsAPI';
import { v1 } from "uuid";
import { Dispatch } from 'redux';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
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
export type SetTodolistsActionType = {
    type: "SET_TODOLISTS",
    todolists: Array<TodolistType>
}
export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type ActionType = RemoveTodolistActionType |
AddTodolistActionType | ChangeTodolistFilterActionType |ChangeTodolistTitleActionType | SetTodolistsActionType

export const RemoveTodoListAC = (todoListID: string):RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todoListID: todoListID}
}

export const AddTodoListAC = (todolist: TodolistType):AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}

export const ChangeTodolistTitleAC = (todoListID: string, title: string):ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListID: todoListID, title: title}
}

export const ChangeTodolistFilterAC = (todoListID: string, nextFilter: FilterValuesType):ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoListID: todoListID, nextFilter: nextFilter}
}

export const SetTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET_TODOLISTS', todolists: todolists }
}

export const fetchTodoListsTC = () => {
   return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists().then(res => {
            dispatch(SetTodolistsAC(res.data))
        })
    }
}

export const removeTodolistTC = (todolistID: string ) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistID).then(res => {
            dispatch(RemoveTodoListAC(todolistID))
        })
    }
}

export const addTodolistTC = (title: string ) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolists(title).then(res => {
            dispatch(AddTodoListAC(res.data.data.item))
        })
    }
}
export const changeTodolistTitleTC = (todoListID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolistTitle(todoListID, title).then(res => {
            dispatch(ChangeTodolistTitleAC(todoListID, title))
        })
    }
}


let initialState: Array <TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType):Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListID ? { ...tl, title: action.title } : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoListID ? { ...tl, filter: action.nextFilter } : tl)
        case 'SET_TODOLISTS': {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all'}
            })
        }
        default:
            return state
    }
}

