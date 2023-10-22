import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'
import {combineReducers, legacy_createStore, AnyAction, applyMiddleware} from 'redux'
import thunk, {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatchType>()

// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store


// _____________________________________________________________________________________________________________________
const FrootReducer = combineReducers({
    counter: tasksReducer
})

type AppStateType = ReturnType<typeof FrootReducer>

const store_2 = legacy_createStore(FrootReducer)

type AppStoreType = typeof store_2

// @ts-ignore
window.store_2 = store_2

// _____________________________________________________________________________________________________________________
const getValue = () => {
    return { value: 1000 };
};

type ReturnTypeOfGetValue = ReturnType<typeof getValue>;

const initialState = {
    value: 1000
}

type initialStateType = typeof initialState

