import React, { useEffect, useState } from 'react';

import style from './Slider.module.scss';

type SliderContentType = {
  content: string[]
  theme: boolean
  setValue: (value: string) => void
}

export function Slider({content, theme, setValue}: SliderContentType) {

  const [current, setCurrent] = useState(0);
  const length = content.length;

  useEffect(() => {
    setValue(content[0])
  }, [])

  const nextSlide = () => {
    setCurrent((prev) => {
      if (prev === length - 1) {
        setValue(content[0])
        return 0
      }
      setValue(content[prev + 1])
      return prev + 1
    });
  };

  const prevSlide = () => {
    setCurrent((prev) => {
      if (prev === 0) {
        setValue(content[prev])
        return length - 1
      }
      setValue(content[length - 1])
      return prev - 1
    });
  };

  if (!Array.isArray(content) || content.length <= 0) {
    return null;
  }

  return (
    <div>
      {content.map((slide, index) => {
        return (
          <div key={index}>
            {index === current && (
              <input disabled={true} className={theme ? style.input : style.inputDark} value={slide}/>
            )}
          </div>
        );
      })}
      <label onClick={nextSlide} className={theme ? style.labelNext : style.labelNextDark}/>
      <label onClick={prevSlide} className={theme ? style.labelPrev : style.labelPrevDark}/>
    </div>
  );
}