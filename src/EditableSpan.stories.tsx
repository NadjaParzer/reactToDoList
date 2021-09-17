
import React from 'react'
import {action} from '@storybook/addon-actions'
import { EditableSpan } from "./EditableSpan";

export default {
  title: 'EditableSpan Component',
  component: EditableSpan,
} 

const callback = action('value changed ')

export const EditableSpanBaseExample = (props: any) => {
  return <EditableSpan changeTitle={callback} title={'Start value'}/>
}