import { useState } from 'react';

import { Sidebar } from '../Sidebar/Sidebar';
import { Instruction } from '../Instruction/Instruction';
import { Calculator } from '../Calculator/Calculator';

import style from './Main.module.css';
import s from '../../styles/Container.module.css';


export function Main() {

  const [theme, setTheme] = useState(true);
  const [scroll, setScroll] = useState(false);

  return (
    <div className={theme ? style.main : style.mainDark}>
      <div className={s.wrapper}>
        <div className={s.container}>
          <Sidebar theme={theme} setTheme={setTheme} setScroll={setScroll}/>
          <div>
            <Instruction theme={theme}/>
            {scroll
              ? <Calculator theme={theme}/>
              : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}