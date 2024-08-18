import { configureStore} from "@reduxjs/toolkit";
import UserSlice from "../Feature/Userslice";
export const store=configureStore({
    reducer:{
user:UserSlice,
    }
})