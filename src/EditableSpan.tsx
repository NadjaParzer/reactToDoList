import { TextField } from '@material-ui/core'
import React, { KeyboardEvent, ChangeEvent, useState } from 'react'

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode ] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    } 

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode 
        ? <TextField value={title} autoFocus={true} onChange={onTitleChangeHandler} onBlur={offEditMode}/> :
        <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}