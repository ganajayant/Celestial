import { combineReducers } from "redux"
import axios from "axios"

const add_user = (state = [], action) => {
    switch (action.TYPE) {
        case "ADD_USER":
            axios.post("http://localhost:3001/users", action.payload)
            break;
        default:
            return state;
    }
}

const reducers = combineReducers({
    add_user
})

export default reducers;