import React from 'react'
import {action} from '@storybook/addon-actions'
import AppWithRedux from './AppWirhRedux'
import { ReduxStoreProviderDecorator } from './store/ReduxStoreProviderDecorator'

export default {
  title: 'EditableSpan Component',
  component: AppWithRedux,
  decorators: [ ReduxStoreProviderDecorator ]
} 

export const AppWithReduxStories = () => {
  return <AppWithRedux />
}