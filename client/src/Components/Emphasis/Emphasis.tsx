import React, { type ReactNode } from 'react'

interface EmphasisProps {
    children: ReactNode
}

const Emphasis: React.FC<EmphasisProps> = ({ children }) => {
  return (
    <span className="text-[#ffd700] font-bold">{children}</span>
  )
}

export default Emphasis
