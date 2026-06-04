import React, { useState } from 'react'
import Tool from '../Tool/Tool';

interface MyExperienceTileProps {
    title: string;
    children: React.ReactNode;
    technologies?: string[];
    subtitle: string;
}

const MyExperienceTile: React.FC<MyExperienceTileProps> = ({
  title,
  children,
  subtitle,
  technologies = [],
}) => {
    const [isOpened, setIsOpened] = useState(false);

    const HandleTileClick = () => {
      setIsOpened(prev => !prev);
    }

    const DropdownIcon = ({ name }: { name: string }) => (
        <span
          className="material-symbols-outlined flex items-center justify-center"
          aria-hidden="true">
            {name}
        </span>
    )

    return (
        <div
          onClick={HandleTileClick}
          className="flex flex-col bg-white/5 border border-white/10 rounded-2xl cursor-grab h-full
            min-w-[70vw] max-w-full mx-2 p-4 min-h-[10px]
            md:max-w-[400px] md:min-h-[200px] md:min-w-[400px] md:mx-0 md:p-0
            min-[850px]:min-h-[300px] min-[850px]:h-auto min-[850px]:self-stretch min-[850px]:box-border min-[850px]:overflow-visible min-[850px]:transition-shadow min-[850px]:duration-300
            min-[1440px]:max-w-[450px] min-[1440px]:min-h-[100px] min-[1440px]:min-w-[500px]
            transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            hover:scale-[1.03] hover:-translate-y-[3px] hover:shadow-[0_10px_40px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.2)] hover:bg-white/[.08]"
        >
          <div className="flex items-center flex-col">
            <h2 className="text-2xl font-semibold mt-0 mb-2 text-white/90 text-center">{title}</h2>
            <p className="text-base m-0 text-white/70 leading-relaxed text-center">{subtitle}</p>
          </div>
          {isOpened && children}
          <div className="w-full flex justify-center">
            <div className="max-w-fit flex flex-wrap gap-2 justify-center items-center m-4">
              {technologies.map((t, index) => <Tool key={index} text={t} />)}
            </div>
          </div>
          <div className="h-full" />
          <DropdownIcon name={isOpened ? 'arrow_drop_up' : 'arrow_drop_down'} />
        </div>
    )
}

export default MyExperienceTile
