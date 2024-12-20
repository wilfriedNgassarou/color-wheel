import clsx from "clsx";
import { useMemo, useState } from "react";
import { colors } from "./colors";
import { ColorItem } from "./components/color-item";
import { ArrowRight } from "./components/arrow-right";
import { Credits } from "./components/credits";

function App() {
  const [activeIndex, setActiveIndex] = useState<null | number>(null)
  const [showWheel, setShowWheel] = useState(false)

  const gradient = useMemo(() => {
    const value = colors.reduce((a, b) => {
      const angle = (180 / Math.PI) * b.angle
  
      return a + `${b.color} ${angle}deg, `
    }, '').slice(0, -2)
    
    return value
  }, [colors])


  return (
    <section className="w-full h-dvh flex flex-col gap-2 justify-center items-center">
      <Credits />
      <h1
        className={clsx(
          "transition-all duration-300 ease-in-out relative top-14 text-xl font-medium",
          activeIndex ? 'opacity-30' : 'opacity-100',
          showWheel ? '-translate-y-16' : 'translate-y-0'
        )}
      >
        Select your color
      </h1>
      <section className="w-80 h-80 relative flex justify-center items-center rounded-full">
        <div 
          className={clsx(
            "absolute inset-0 flex items-center justify-center duration-300 ease-out",
            showWheel ? 'scale-100' : 'scale-50'
          )}
        >
          {
            colors.map((item, index) => (
              <ColorItem 
                key={index} 
                color={item}
                index={index}
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex} 
              />
            ))
          }
        </div>
        <div
          onClick={() => setShowWheel(!showWheel)} 

          className="relative w-44 h-44 rounded-full cursor-pointer"
          style={{ background: `repeating-conic-gradient(${gradient})`, transform: 'rotate(70deg)' }}
        >
          <div 
            className={clsx(
              "w-full h-full rounded-full transition-opacity flex justify-center items-center",
              activeIndex == null ? 'bg-opacity-0' : 'bg-opacity-100'
            )}
            style={{ background: activeIndex ? colors[activeIndex - 1].color : undefined }}
          >
            <div className="w-14 h-14 bg-white rounded-full flex justify-center items-center">
              <ArrowRight />
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default App
