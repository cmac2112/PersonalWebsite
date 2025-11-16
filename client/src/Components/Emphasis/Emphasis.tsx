import React, { type ReactNode } from 'react'
import "./Emphasis.css"

interface EmphasisProps{
    children: ReactNode
}
const Emphasis:React.FC<EmphasisProps> = ({children}) => {
  return (
    <span className='emphasis'>{children}</span>
  )
}

export default Emphasis
