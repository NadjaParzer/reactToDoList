import {IconButton, Checkbox } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback} from 'react'

import { EditableSpan } from './EditableSpan';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TaskPropsType = {
  removeTask: (todolistsID:string ,taskID: string) => void
  changeTaskTitle: (todolistsID:string , taskID: string,title: string) => void
  changeTaskStatus:(todolistsID:string ,taskID: string, isDone: boolean) => void
  task: TaskType
  id: string
}

export const Task = React.memo((props: TaskPropsType) => {
  console.log('Task is called')
  const removeTask = () => props.removeTask(props.id, props.task.id)
  const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>)=>
      props.changeTaskStatus(props.id, props.task.id, event.currentTarget.checked)
  const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.id, props.task.id, title) , [props.changeTaskTitle, props.id, props.task.id])   
  return (
      <li key={props.task.id}>
          <Checkbox
              color={"primary"}
              size={"small"}
            checked={props.task.isDone}
            onChange={changeTaskStatus}/>
          <EditableSpan changeTitle={changeTaskTitle} title={props.task.title}/>
          <IconButton onClick={removeTask}>
              <Delete/>
          </IconButton>
          {/*<button onClick={removeTask}>х</button>*/}
      </li>
  )
})