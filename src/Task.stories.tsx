import { AddItemForm } from "./AddItemForm";
import React from 'react'
import {action} from '@storybook/addon-actions'
import { Task } from "./Task";
import { TaskPriorities, TaskStatuses } from "./api/todolistsAPI";

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
        task={{id: '1', title: 'CSS', status: TaskStatuses.Completed, todoListId: 'todolist1', description: '', startDate:'', deadline: '', addedDate:'', order: 0, priority: TaskPriorities.Low}}
        id={'todolist1'}
        />
        <Task 
        removeTask={removeTaskCallback}
        changeTaskTitle={changeTaskTitleCallback}
        changeTaskStatus={changeTaskStatusCallback}
        task={{id: '2', status: TaskStatuses.New, title: 'JS',todoListId: 'todolist2', description: '', startDate:'', deadline: '', addedDate:'', order: 0, priority: TaskPriorities.Low}}
        id={'todolist2'}
        />
  </>
}