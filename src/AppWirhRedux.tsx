import React, { useEffect, useReducer, useState } from 'react'
import './App.css'
import TodoList from "./TodoList";
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { AddTodoListAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, fetchTodoListsTC, RemoveTodoListAC, TodolistDomainType,} from './store/todolists-reducer';
import { AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from './store/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { useCallback } from 'react';
import { TaskStatuses, TaskType, todolistsAPI} from './api/todolistsAPI';

 type FilterValuesType = "all" | "active" | "completed"
export type TaskStateType = {
    [key: string]: Array<TaskType >
}

const AppWithRedux = () => {
    console.log('App is called')
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsTC)
    }, [])

    const removeTask = useCallback((todolistsID: string, taskID: string) => {
        dispatch(RemoveTaskAC(taskID, todolistsID))
    }, [dispatch])

    const addTask = useCallback((todolistsID: string, title: string) => {
        dispatch(AddTaskAC(title, todolistsID))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistsID: string, taskID: string, status: TaskStatuses) => {
        dispatch(ChangeTaskStatusAC(taskID, status, todolistsID))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistsID: string, taskID: string, title: string) => {
        dispatch(ChangeTaskTitleAC(taskID, title, todolistsID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTodoListFilter = useCallback((todolistsID: string, nextFilter: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(todolistsID, nextFilter))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todolistsID: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(todolistsID, title))
    }, [dispatch])

    const removeTodoList = useCallback((todolistsID: string) => {
        let action = RemoveTodoListAC(todolistsID)
        dispatch(action)
    }, [dispatch])

    // const getTasksForRender = (todoList: TodoListsType): TaskType[] => {
    //     switch (todoList.filter) {
    //         case "completed":
    //             return tasks[todoList.id].filter(t => t.isDone)
    //         case "active":
    //             return tasks[todoList.id].filter(t => !t.isDone)
    //         default:
    //             return tasks[todoList.id]
    //     }
    // }

    const todoListComponents = todolists.map(tl => {
        let  allTodolistTasks =tasks[tl.id]
        return (
            <Grid item key={tl.id} >
                <Paper style={{ padding: "10px" }} elevation={5} >
                    <TodoList
                        id={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        //tasks={getTasksForRender(tl)}
                        tasks = {allTodolistTasks}
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