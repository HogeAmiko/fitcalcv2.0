import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import { NavLink} from 'react-router-dom';

import style from './Sidebar.module.scss';
import Switch from '@mui/material/Switch';
import { ThemContext } from "../Main/Main";


type themeType = {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
  setCover: Dispatch<SetStateAction<boolean>>;
  cover: boolean;
};

export function Sidebar(props: themeType) {

  const lightTheme = useContext(ThemContext);

  const locale = 'en';
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  const [purpose, setPurpose] = useState(false);
  const [calculation, setCalculation] = useState(true);
  // this code for one-page version
  // useEffect(() => {
  //   window.addEventListener('scroll', listenScrollEvent);
  //   return () =>
  //     window.removeEventListener('scroll', listenScrollEvent);
  // }, []);
  //
  // const listenScrollEvent = () => {
  //   if (window.scrollY < 550) {
  //     setPurpose(false)
  //     setCalculation(true)
  //   } else {
  //     setCalculation(!calculation)
  //     setPurpose(!purpose)
  //   }
  // };

  const purposeIsActive = () => {
    setPurpose(false)
    setCalculation(true)
    props.setCover(true)
  };

  const calculationIsActive = () => {
    setCalculation(false)
    setPurpose(true)
    props.setCover(false)
  };

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
            <NavLink to='/' className={style.navLink} onClick={purposeIsActive}>
              <div className={!purpose ? style.purposeContent : style.purposeContentScroll && props.theme ? style.purposeContentScroll : style.purposeContentScrollDark}>
                <div className={props.theme ? style.circleFirst : style.circleFirstDark}/>
                <div className={props.theme ? style.purposeText : style.purposeTextDark}>
                  С чего начать
                  <div>Цель</div>
                </div>
              </div>
            </NavLink>
          </div>
          <div className={calculation ? style.calculation : style.calculationScroll}>
            <NavLink to='/calc' className={style.navLink} onClick={calculationIsActive}>
              <div className={props.theme ? style.calculationContent : style.calculationContentDark}>
                <div className={props.theme ? style.circleSecond : style.circleSecondDark}/>
                <div className={props.theme ? style.purposeText : style.purposeTextDark}>
                  Рацион питания
                  <div>Расчёт</div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}