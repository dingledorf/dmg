import React from 'react'
import { OriginalProps } from 'react-modal'

declare module 'react-modal' {
  interface Props extends OriginalProps {
    children?: React.ReactNode
  }
}