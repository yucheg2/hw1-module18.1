import { taskDeleted, taskUpdated } from "./actionTypes";

function taskReducer(state=[], action) {
    switch (action.type) {
      case taskUpdated: {
        const newArray = [...state]
        const elIndex = newArray.findIndex((el) => el.id === action.payload.id)
        newArray[elIndex]= {...newArray[elIndex], ...action.payload}
        return newArray
      }
      case taskDeleted: {
        const filteredArray = state.filter(
          (el) => el.id !== action.payload.id
        )
        return filteredArray
      }
  
      default:
        return state
    }
}

export { taskReducer }