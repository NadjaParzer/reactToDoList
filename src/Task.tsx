import {IconButton, Checkbox } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback} from 'react'
import { TaskStatuses, TaskType } from './api/todolistsAPI';

import { EditableSpan } from './EditableSpan';




type TaskPropsType = {
  removeTask: (todolistsID:string ,taskID: string) => void
  changeTaskTitle: (todolistsID:string , taskID: string,title: string) => void
  changeTaskStatus:(todolistsID:string ,taskID: string, status: TaskStatuses) => void
  task: TaskType
  id: string
}

export const Task = React.memo((props: TaskPropsType) => {
  console.log('Task is called')
  const removeTask = () => props.removeTask(props.id, props.task.id)
  const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>)=>
      props.changeTaskStatus(props.id, props.task.id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
  const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.id, props.task.id, title) , [props.changeTaskTitle, props.id, props.task.id])   
  return (
      <li key={props.task.id}>
          <Checkbox
              color={"primary"}
              size={"small"}
            checked={props.task.status === TaskStatuses.Completed}
            onChange={changeTaskStatus}/>
          <EditableSpan changeTitle={changeTaskTitle} title={props.task.title}/>
          <IconButton onClick={removeTask}>
              <Delete/>
          </IconButton>
          {/*<button onClick={removeTask}>х</button>*/}
      </li>
  )
})