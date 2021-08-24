import { Button, IconButton, Checkbox } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, {KeyboardEvent, ChangeEvent, useState} from 'react'
import { AddItemForm } from './AddItemForm';
import {FilterValuesType} from "./App";
import { EditableSpan } from './EditableSpan';

type TodoListPropsType = {
    id: string
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    addTask: (todolistsID:string ,title: string) => void
    removeTask: (todolistsID:string ,taskID: string) => void
    changeFilter: (todolistsID:string ,nextFilter: FilterValuesType) => void
    changeTaskStatus:(todolistsID:string ,taskID: string, isDone: boolean) => void
    removeTodoList: (todolistsID:string) => void
    addTodoList: (title: string) => void
    changeTodoListTitle:(todolistsID:string ,title: string) => void
    changeTaskTitle: (todolistsID:string , taskID: string,title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => props.removeTask(props.id,t.id)
        const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>)=>
            props.changeTaskStatus(props.id, t.id, event.currentTarget.checked)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(props.id, t.id, title)    
        return (
            <li key={t.id}>
                <Checkbox
                    color={"primary"}
                    size={"small"}
                  checked={t.isDone}
                  onChange={changeTaskStatus}/>
                <EditableSpan changeTitle={changeTaskTitle} title={t.title}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={removeTask}>х</button>*/}
            </li>
        )
    })

    const onAllClickHandler = () => props.changeFilter(props.id, "all")
    const onActiveClickHandler = () => props.changeFilter(props.id, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")
    const removeTodoList = () => props.removeTodoList(props.id)
    const addTask = (title: string) => props.addTask(props.id, title)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(props.id, title)

    return (
        <div>
            <h3>
            <EditableSpan changeTitle={changeTodoListTitle} title={props.title}/>
            <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            {/*<button onClick={removeTodoList}>X</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle:"none"}} >
                {tasksJSXElements}
            </ul>
            <div>
                <Button
                    size={"small"}
                    style={{margin: "0 3px", padding: "0px"}}
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    //className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</Button>
                <Button
                    size={"small"}
                    style={{margin: "0 3px"}}
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    //className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button
                    size={"small"}
                    style={{margin: "0 3px"}}
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    //className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}

export default TodoList

