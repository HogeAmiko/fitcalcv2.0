import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../redux/store';
import { foodCaloriesType } from '../../redux/reducers';

import style from './FoodCalories.module.scss';


type themeFoodCaloriesType = {
  theme: boolean
}

export function FoodCalories({theme}: themeFoodCaloriesType) {

  // @ts-ignore
  const foodCalories = useSelector<AppRootStateType, foodCaloriesType[]>(state => state.foods.foodCalories)

  return (
    <div className={theme ? style.scrollBlock : style.scrollBlockDark}>
      {
        foodCalories.map((f, index) => {
            if (f.product !== '') {
              return (
                <div className={theme ? style.title : style.titleDark} key={index}>
                  <div className={style.spanBlock}>
                    <span>{f.product}</span>
                    <div className={style.caloriesCalumn}>
                      <span>{f.calories}</span>
                    </div>
                  </div>
                </div>
              )
            }
          }
        )
      }

    </div>
  )
}
