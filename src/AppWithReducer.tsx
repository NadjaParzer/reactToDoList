import React, { useReducer, useState } from 'react'
import './App.css'
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { AddTodoListAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodoListAC, todolistsReducer } from './store/todolists-reducer';
import { AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer } from './store/tasks-reducer';

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const AppWithReducer = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "HTML&CSS2", isDone: true },
            { id: v1(), title: "JS2", isDone: true },
            { id: v1(), title: "ReactJS2", isDone: false },
            { id: v1(), title: "Rest API2", isDone: true },
            { id: v1(), title: "GraphQL2", isDone: false },
        ]
    });

    const removeTask = (todolistsID: string, taskID: string) => {
        // tasks[todolistsID] = tasks[todolistsID].filter(t => t.id !== taskID)
        // setTasks({ ...tasks })
        dispatchTasks(RemoveTaskAC(taskID, todolistsID))
    }

    const addTask = (todolistsID: string, title: string) => {
        // const newTask: TaskType = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // tasks[todolistsID] = [newTask, ...tasks[todolistsID]]
        // setTasks({ ...tasks })
        dispatchTasks(AddTaskAC(title, todolistsID))
    }

    const changeTaskStatus = (todolistsID: string, taskID: string, isDone: boolean) => {
        // tasks[todolistsID] = tasks[todolistsID].map(t => t.id === taskID ? { ...t, isDone: isDone } : t)
        // setTasks({ ...tasks })
        dispatchTasks(ChangeTaskStatusAC(taskID, isDone, todolistsID))
    }

    const changeTaskTitle = (todolistsID: string, taskID: string, title: string) => {
        // tasks[todolistsID] = tasks[todolistsID].map(t => t.id === taskID ? { ...t, title: title } : t)
        // setTasks({ ...tasks })
        dispatchTasks(ChangeTaskTitleAC(taskID, title, todolistsID))
    }

    //const [filter, setFilter] = useState<FilterValuesType>("all")

    const addTodoList = (title: string) => {
        // const todoListID = v1()
        // const newTodoList: TodoListsType = {
        //     id: todoListID,
        //     title: title,
        //     filter: "all"
        // }
        // setTodolists([...todolists, newTodoList])
        // setTasks({...tasks, [todoListID]: []})
        let action = AddTodoListAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const changeTodoListFilter = (todolistsID: string, nextFilter: FilterValuesType) => {
        // let currentTodoList = todolists.find(t => t.id === todolistsID)
        // if (currentTodoList) {
        //     currentTodoList.filter = nextFilter
        //     setTodolists(todolists.map(tl => tl.id === todolistsID ? { ...tl, filter: nextFilter } : tl))
        // }
        dispatchTodolists(ChangeTodolistFilterAC(todolistsID, nextFilter))
    }

    const changeTodoListTitle = (todolistsID: string, title: string) => {
        // setTodolists(todolists.map(tl => tl.id === todolistsID ? { ...tl, title: title } : tl))
        dispatchTodolists(ChangeTodolistTitleAC(todolistsID, title))
    }

    const removeTodoList = (todolistsID: string) => {
        // setTodolists(todolists.filter(tl => tl.id !== todolistsID))
        // const copyTask = { ...tasks }
        // delete copyTask[todolistsID]
        // setTasks(copyTask)
        let action = RemoveTodoListAC(todolistsID)
        dispatchTodolists(action)
        dispatchTasks(action)
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

export default AppWithReducer;
