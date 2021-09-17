import { Button, IconButton, Checkbox } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, {useCallback} from 'react'

import { AddItemForm } from './AddItemForm';
import {FilterValuesType, TodoListsType} from "./App";
import { EditableSpan } from './EditableSpan';
import { Task, TaskType } from './Task';


type TodoListPropsType = {
    id: string
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    addTask: (todolistsID:string ,title: string) => void
    
    changeFilter: (todolistsID:string ,nextFilter: FilterValuesType) => void
    changeTaskStatus:(todolistsID:string ,taskID: string, isDone: boolean) => void
    removeTodoList: (todolistsID:string) => void
    addTodoList: (title: string) => void
    removeTask: (todolistsID:string ,taskID: string) => void
    changeTodoListTitle:(todolistsID:string ,title: string) => void
    changeTaskTitle: (todolistsID:string , taskID: string,title: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log('Todolist is called')
    // const todo = useSelector<AppRootStateType, TodoListsType>(state => 
    //     state.todolists.filter(todo => todo.id === props.id)[0])

    // const dispatch = useDispatch()

    
    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    } else
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }
   

    const tasksJSXElements = tasksForTodolist.map(t => <Task 
        removeTask={props.removeTask}
        changeTaskTitle={props.changeTaskTitle}
        changeTaskStatus={props.changeTaskStatus}
        task={t}
        id={props.id}
        key={t.id}
        />)


    const onAllClickHandler = useCallback( () => props.changeFilter(props.id, "all"), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback( () => props.changeFilter(props.id, "active"), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback( () => props.changeFilter(props.id, "completed"), [props.changeFilter, props.id])

    const removeTodoList = () => props.removeTodoList(props.id)
    const addTask = useCallback((title: string) => props.addTask(props.id, title), [props.addTask, props.id])
    const changeTodoListTitle =useCallback((title: string) => props.changeTodoListTitle(props.id, title), [props.changeTodoListTitle, props.id])



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
})

export default TodoList