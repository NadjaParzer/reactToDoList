import React, {useEffect, useState} from 'react'
import { todolistsAPI, UpdateTaskModellType } from '../api/todolistsAPI'


export default {
   title: 'API'
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    todolistsAPI.getTodolists().then((res) => {
         setState(res.data)
       })

   }, [])
   return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
     todolistsAPI.createTodolists('NEW TODOLIST').then((res) => {
            setState(res.data)
           })
   }, [])
   return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    const todolistID = 'f41858c2-fd71-42b6-a70d-ce3a6f8c13ea'
    todolistsAPI.deleteTodolist(todolistID).then((res) => {
     setState(res.data)
    })
   }, [])
   return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    const todolistID = 'f40fcefb-dabb-48e7-9d61-7c79cb9c68f5'
    todolistsAPI.updateTodolistTitle(todolistID, "HELLO LLLLLL").then((res) => {
     setState(res.data)
    })
   }, [])
   return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
   useEffect(() => {
    const todolistID = '04e9ef27-46b9-447a-9f6e-59434c532fc3'
    todolistsAPI.getTasks(todolistID).then((res) => {
         setState(res.data)
       })

   }, [])
   return <div> {JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null)
   useEffect(() => {
    const todolistID = '6d50c225-0e73-4b98-9ce9-c28b558aa340'
    const taskID = 'b504f33f-c147-48eb-bb55-791b8f19420c'
    todolistsAPI.deleteTask(todolistID, taskID).then((res) => {
         setState(res.data)
       })

   }, [])
   return <div> {JSON.stringify(state)}
   </div>

}
export const PostTasks = () => {
  const [state, setState] = useState<any>(null)
   useEffect(() => {
    const todolistID = '04e9ef27-46b9-447a-9f6e-59434c532fc3'
    const taskTitle = 'TASK 1!!!!'
    todolistsAPI.postTask(todolistID, taskTitle).then((res) => {
         setState(res.data)
       })

   }, [])
   return <div> {JSON.stringify(state)}</div>
}

export const UpdateTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoListId = '6d50c225-0e73-4b98-9ce9-c28b558aa340'
    const taskID = '9d89afd1-8c2a-4c0d-9cd3-172dae2614f2'
    let model: UpdateTaskModellType = {
      title: 'NEW NEW',
      description: 'here is some descrieption',
      status: 1,
      priority: 1,
      startDate: null,
      deadline: null,
    }
    todolistsAPI.updateTask(todoListId, taskID, model).then((res) => {
      setState(res.data)
    })

  }, [])
  return <div> {JSON.stringify(state)}</div>
}


