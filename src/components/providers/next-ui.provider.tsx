import {NextUIProvider as Provider} from '@nextui-org/react'
import { ReactNode } from 'react'

export const NextUiProvider = ({children}:{children:ReactNode}) => {
  return (
  <Provider>{children}</Provider>
  )
}
