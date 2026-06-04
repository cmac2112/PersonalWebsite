import React from 'react'

interface ToolProps {
    text: string
}

const Tool: React.FC<ToolProps> = ({ text }) => {
  return (
    <div className="bg-[#cdac25] rounded-lg flex items-center justify-center border-b-[5px] border-b-[#a81013]
      min-w-10 min-h-1.5 max-h-8 p-0.5
      md:min-w-14 md:min-h-2.5
      lg:min-w-16 lg:min-h-3 lg:max-h-10
      transition-[width] duration-300
      hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(205,172,37,0.3)] hover:cursor-default">
      <p className="text-center text-[12px] p-0.5 m-0
        max-[480px]:text-[10px]
        md:text-[13px]
        lg:text-[14px] lg:p-1">{text}</p>
    </div>
  )
}

export default Tool
