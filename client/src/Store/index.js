import { createStore } from "redux";
import reducers from "../Reducers";

const initialState = {
    users: [],
    user: {}
}

const store = createStore(reducers, initialState);


export default store;
