import React, { useReducer, useState } from 'react'
import './App.css'
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { AddTodoListAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodoListAC, todolistsReducer } from './store/todolists-reducer';
import { AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer } from './store/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = () => {

    const todolists = useSelector<AppRootStateType, Array<TodoListsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = (todolistsID: string, taskID: string) => {
        dispatch(RemoveTaskAC(taskID, todolistsID))
    }

    const addTask = (todolistsID: string, title: string) => {
        dispatch(AddTaskAC(title, todolistsID))
    }

    const changeTaskStatus = (todolistsID: string, taskID: string, isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(taskID, isDone, todolistsID))
    }

    const changeTaskTitle = (todolistsID: string, taskID: string, title: string) => {
        dispatch(ChangeTaskTitleAC(taskID, title, todolistsID))
    }

    const addTodoList = (title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }

    const changeTodoListFilter = (todolistsID: string, nextFilter: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(todolistsID, nextFilter))
    }

    const changeTodoListTitle = (todolistsID: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(todolistsID, title))
    }

    const removeTodoList = (todolistsID: string) => {
        let action = RemoveTodoListAC(todolistsID)
        dispatch(action)
    }

    const getTasksForRender = (todoList: TodoListsType): TaskType[] => {
        switch (todoList.filter) {
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListComponents = todolists.map(tl => {
        return (
            <Grid item key={tl.id} >
                <Paper style={{ padding: "10px" }} elevation={5} >
                    <TodoList
                        id={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={getTasksForRender(tl)}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeTodoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        addTodoList={addTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar>
                <Toolbar style={{ justifyContent: "space-between" }} >
                    <IconButton edge="start" color="inherit" aria-label="menu" >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button
                        variant="outlined"
                        color="inherit">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "80px 0" }} >
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={5} >
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;