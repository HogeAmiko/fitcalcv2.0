import { Dispatch } from 'redux';
import { profileAPI } from '../api/api';

export type FoodType = {
  id: number,
  name: string
}

export type UsersType = {
  id: number,
  photos: {
    small: string,
    large: string
  },
  followed: boolean,
  name: string,
  status: string,
  location: LocationUsersType
}

export type LocationUsersType = {
  city: string,
  country: string
}

export type productType = {
  id: number;
  name: string;
}

export type outputDataType = {
  height: number
  weight: number
  sex: string
  age: number
  activity: string
  nutrition: string
  purpose: string
  selectProducts: string[]
}

export type foodCaloriesType = {
  product: string
  calories: string
}

export type stateType = {
  outputFoodList: UsersType[]
  inputFoodList: UsersType[]
  outputData: outputDataType[]
  foodCalories: foodCaloriesType[]
  isFatching: boolean,
}

const initialState = {
  outputFoodList: [],
  inputFoodList: [],
  outputData: [],
  foodCalories: [{product: '', calories: ''}],
  isFatching: false
}

export const foodsReducer = (state: stateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'GET_FOODS_LIST': {
      return {
        ...state,
        inputFoodList: action.foodList
      }
    }
    case 'SEARCH_PRODUCT': {
      return {
        ...state,
        inputFoodList: [...state.inputFoodList.filter(f => {
            return (
              f.name.toLowerCase().includes(action.productName.toLowerCase())
            )
          }
        )]
      }
    }
    case 'REPLACE_FOOD': {
      return {
        ...state,
        outputFoodList: [...state.outputFoodList, {id: action.id, name: action.foodTitle}]
      }
    }
    case 'DELETE_FOOD': {
      return {
        ...state,
        outputFoodList: [...state.outputFoodList.filter(f => f.id !== action.foodId)]
      }
    }
    case 'FOOD_CALORIES': {
      return {
        ...state,
        foodCalories: [...state.foodCalories, {product: action.productName, calories: '223кКал'}]
      }
    }
    case 'IS_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    default:
      return state;
  }
}

type ActionsType = getFoodsListActionType
  | replaceFoodActionType
  | deleteFoodActionType
  | searchProductActionType
  | getFoodCaloriesActionType
  | toggleIsFatchingActionType;

export interface getFoodsListActionType {
  type: 'GET_FOODS_LIST',
  foodList: UsersType[]
}

export interface searchProductActionType {
  type: 'SEARCH_PRODUCT',
  productName: string
}

export interface replaceFoodActionType {
  type: 'REPLACE_FOOD',
  foodTitle: string,
  id: number
}

export interface deleteFoodActionType {
  type: 'DELETE_FOOD',
  foodId: number
}

export interface getFoodCaloriesActionType {
  type: 'FOOD_CALORIES',
  productName: string
}

export interface toggleIsFatchingActionType {
  type: 'IS_FETCHING',
  isFetching: boolean
}

export const getFoodsList = (inputFoodList: UsersType[]): getFoodsListActionType => {
  return {type: 'GET_FOODS_LIST', foodList: inputFoodList}
};

export const searchProduct = (productName: string): searchProductActionType => {
  return {type: 'SEARCH_PRODUCT', productName}
};

export const replaceFood = (foodTitle: string, id: number): replaceFoodActionType => {
  return {
    type: 'REPLACE_FOOD',
    foodTitle,
    id
  } as const
};

export const deleteFood = (foodId: number): deleteFoodActionType => {
  return {
    type: 'DELETE_FOOD',
    foodId
  } as const
};

export const getFoodCalories = (productName: string): getFoodCaloriesActionType => {
  return {type: 'FOOD_CALORIES', productName}
};

export const toggleIsFatching = (isFetching: boolean): toggleIsFatchingActionType => {
  return {type: 'IS_FETCHING', isFetching}
};

export const getUsers = (currentPage: number, pageSize: number) => {
  return async (dispatch: Dispatch) => {
    let data = await profileAPI.getUsers(currentPage, pageSize)
    dispatch(getFoodsList(data.items))
  }
}

// export const outputData = (outputData: outputDataType) => {
//   return async (dispatch: Dispatch) => {
//     let data = await outputAPI.putData(outputData)
//     dispatch(getFoodsList(data.items))
//   }
// }
