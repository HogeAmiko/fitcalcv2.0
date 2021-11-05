import { createContext, useEffect, useState } from 'react';
// @ts-ignore
import { Route, Switch } from 'react-router-dom';

import { Sidebar } from '../Sidebar/Sidebar';
import { Instruction } from '../Instruction/Instruction';
import { Calculator } from '../Calculator/Calculator';

import style from './Main.module.css';
import s from '../../styles/Container.module.css';

export const ThemContext = createContext(false);

export function Main() {

  const [theme, setTheme] = useState(true);
  const [cover, setCover] = useState(true);

  return (
      <div className={theme ? `${cover ? style.main : style.mainCalcBlock}` : `${cover ? style.mainDark : style.mainCalcBlockDark}`}>

          <Switch>
            <div className={s.wrapper}>
              <div className={s.container}>
                <Sidebar theme={theme} setTheme={setTheme} setCover={setCover} cover={cover}/>
                <ThemContext.Provider value={theme}>
                  <Route exact path='/' component={Instruction}/>
                  <Route path='/calc' component={Calculator}/>
                </ThemContext.Provider>
              </div>
            </div>
          </Switch>

      </div>
  )
}