import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../Componenets/CreatSLice'
export const Store=configureStore({
    reducer:{
        weathercitydata:weatherReducer,
    }
})