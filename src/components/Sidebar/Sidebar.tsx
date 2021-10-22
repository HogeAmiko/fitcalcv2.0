import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Link } from 'react-scroll';

import style from './Sidebar.module.scss';
import Switch from '@mui/material/Switch';


type themeType = {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
  setScroll: Dispatch<SetStateAction<boolean>>
};

export function Sidebar(props: themeType) {

  const locale = 'en';
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  const [purpose, setPurpose] = useState(false);
  const [calculation, setCalculation] = useState(true);

//code for scroll v1.
  // useEffect(() => {
  //   window.addEventListener('scroll', listenScrollEvent);
  //   return () =>
  //     window.removeEventListener('scroll', listenScrollEvent);
  // }, []);

  // const listenScrollEvent = () => {
  //   if (window.scrollY < 550) {
  //     setPurpose(false)
  //     setCalculation(true)
  //   } else {
  //     setCalculation(!calculation)
  //     setPurpose(!purpose)
  //   }
  // };

  const hightScroll = () => {
    setPurpose(false)
    setCalculation(true)
  }

  const upScroll = () => {
    setPurpose(true)
    setCalculation(false)
    props.setScroll(true)
  }


  const day = today.toLocaleDateString(locale, {weekday: 'long'});
  const time = today.toLocaleTimeString(locale, {hour: 'numeric', hour12: false, minute: 'numeric'});
  const date = `${day},  ${today.toLocaleDateString(locale, {month: 'long'})}\n\n ${today.getDate()}`;

  return (
    <div>
      <div className={style.sidebar}>
        <div>
          <Switch onChange={() => props.setTheme(!props.theme)}/>
        </div>
        <div className={style.time}>
          <div className={style.clock}>{time}</div>
          <div className={style.date}>{date}</div>
        </div>
        <div className={style.navigation}>
          <div className={!purpose ? style.purpose : style.purposeScroll}>
            <Link to={'instruction'} smooth={true} onClick={() => hightScroll()}>
              <div
                className={!purpose ? style.purposeContent : style.purposeContentScroll && props.theme ? style.purposeContentScroll : style.purposeContentScrollDark}>
                <div className={props.theme ? style.circle : style.circleDark}/>
                <div className={style.purposeText}>
                  С чего начать
                  <div>Цель</div>
                </div>
              </div>
            </Link>
          </div>
          <div className={calculation ? style.calculation : style.calculationScroll}>
            <Link to={'calculator'} smooth={true} onClick={() => upScroll()}>
              <div className={props.theme ? style.calculationContent : style.calculationContentDark}>
                <div className={style.circle}/>
                <div className={style.purposeText}>
                  Рацион питания
                  <div>Расчёт</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}