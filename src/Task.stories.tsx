import { AddItemForm } from "./AddItemForm";
import React from 'react'
import {action} from '@storybook/addon-actions'
import { Task } from "./Task";

export default {
  title: 'Task Component',
  component: Task,
} 

const changeTaskTitleCallback = action('Title changed')
const changeTaskStatusCallback = action('Status changed')
const removeTaskCallback = action('Task removed')

export const TaskBaseExample = (props: any) => {
  return <>
    <Task 
        removeTask={removeTaskCallback}
        changeTaskTitle={changeTaskTitleCallback}
        changeTaskStatus={changeTaskStatusCallback}
        task={{id: '1', isDone: true, title: 'CSS'}}
        id={'todolist1'}
        />
        <Task 
        removeTask={removeTaskCallback}
        changeTaskTitle={changeTaskTitleCallback}
        changeTaskStatus={changeTaskStatusCallback}
        task={{id: '2', isDone: false, title: 'JS'}}
        id={'todolist2'}
        />
  </>
}