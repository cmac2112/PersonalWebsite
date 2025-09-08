import React from 'react'
import './Tool.css'
//this will be a simple tool component with no functionalty except to scale and look good, 

interface ToolProps{
    text: string
}
const Tool:React.FC<ToolProps> = ({text}) => {
  return (
    
    <div className="tool-container">  
      <p className='tool-label'>{text}</p>
    </div>
  
  )
}
export default Tool
