import clsx from "clsx";
import { colors } from "../colors";
import { Dispatch, SetStateAction } from "react";

interface Props {
  color: typeof colors[number],
  index: number,
  activeIndex: number | null,
  setActiveIndex: Dispatch<SetStateAction<number | null>>
}

export function ColorItem({ index, color, activeIndex, setActiveIndex }: Props) {
  const circleWidth = 320
  const boxWidth = 40 ;

  let opacity = 100 ;

  if(activeIndex) {
    opacity = 0 ;

    if(activeIndex == (index + 1)) {
      opacity = 100
    }
  }

  const x = Math.cos(color.angle) * ((circleWidth / 2) - (  boxWidth / 2 ))
  const y = Math.sin(color.angle) * ((circleWidth / 2) - (  boxWidth / 2 ))

  return (
    <div 
      key={index + 1}
      onMouseEnter={() => setActiveIndex(index + 1)}
      onMouseLeave={() => setActiveIndex(null)}
      className="w-10 h-10 group absolute"
      style={{ transform: `translate(${x}px, ${y}px)` }}
      >
      <div
        style={{ 
          backgroundColor: color.color,
          transform: activeIndex == (index + 1) ? 'scale(1.3)' : 'scale(1)'
        }}
        className={clsx(
          "w-10 h-10 rounded-full bg-lime-400 duration-200",
          opacity == 100 ? 'opacity-100' : 'opacity-30'
        )}
      />

      <h1 
        className={clsx(
        "text-white font-medium whitespace-nowrap", 
        "-translate-x-1/3 text-xs w-auto group-hover:text-black", 
        "duration-150 group-hover:duration-200 text-center mt-2"
        )}
      >
        {color.name}
      </h1>

    </div>
  )
}