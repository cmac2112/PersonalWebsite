import React from 'react'
import "./Simplebutton.css"

interface SimpleButtonProps{
    label: string;
    onClickCallback: () => void;

}
const SimpleButton:React.FC<SimpleButtonProps> = ({
    label,
    onClickCallback
}
) => {
  return (
    <button className='simple-button' onClick={onClickCallback}>{label}</button>
  )
}

export default SimpleButton
