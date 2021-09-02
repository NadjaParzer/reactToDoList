import { IconButton, TextField } from '@material-ui/core'
import { AddBox } from '@material-ui/icons'
import React, {KeyboardEvent, ChangeEvent, useState} from 'react'
import { convertTypeAcquisitionFromJson } from 'typescript'

type AddItemPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemPropsType) => {
    console.log('Add item form')
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {if (e.key === "Enter") addItem()}

    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

   {/* const errorMessage = error
        ? <div className={"error-text"}>Title is required!</div>
        : null */} 

        const errorMessage = "Title is required!"

    return (
        <div>
            <TextField value={title}
                    onChange={onTitleChangeHandler}
                    onKeyPress={onKeyHandler}
                    variant={"outlined"}
                    size={"small"}
                    label={"Title"} 
                    error={error}
                    helperText={error && errorMessage}

                    />
                 <IconButton 
                    size={"small"}
                    color={"primary"}
                    onClick={addItem}>
                    <AddBox/>
                </IconButton>
                {/*<button onClick={addItem}>+</button>
                {errorMessage}
                */}
                
            </div>
    )
})