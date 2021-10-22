import { AppRootStateType } from '../../redux/store';
import { replaceFood, UsersType } from '../../redux/reducers';

import { useDispatch, useSelector } from 'react-redux';

import style from './FoodList.module.scss';

type themeFoodListType = {
  theme: boolean
  productName: string
  setErrorSearch: (value: string) => void
  errorSearch: string
}

export function FoodList({theme, productName, setErrorSearch, errorSearch}: themeFoodListType) {

  const dispatch = useDispatch();

  // @ts-ignore
  const foodList = useSelector<AppRootStateType, UsersType[]>(state => state.foods.inputFoodList);

  const filteredFoodList = foodList.filter(f => {
    return (
      f.name.toLowerCase().includes(productName.toLowerCase()))
  });

  if (filteredFoodList.length === 0 && errorSearch !== 'initial') {
    setErrorSearch('Не найдено')
  }

  return (
    <div className={style.scrollBlock}>
      {filteredFoodList.map(f => (
        <div key={f.id} onClick={() => dispatch(replaceFood(f.name, f.id))}
             className={theme ? style.foodTitle : style.foodTitleDark}>{f.name}</div>
      ))
      }
    </div>
  )
}

