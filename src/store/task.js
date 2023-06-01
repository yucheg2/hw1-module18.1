import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"
import todosService from "../services/todos.service"
import { setError } from "./errors"

// const update = createAction("task/updated")
// const remove = createAction("task/removed")

// const initialState =   [
//     {id:1, title:"Task 1", completed: false },
//     {id:2, title:"Task 2", completed: false }
//   ] //заменили api

// function taskReducer(state=[], action) {
//     switch (action.type) {
//       case update.type: {
//         const newArray = [...state]
//         const elIndex = newArray.findIndex((el) => el.id === action.payload.id)
//         newArray[elIndex]= {...newArray[elIndex], ...action.payload}
//         return newArray
//       }
//       case remove.type: {
//         const filteredArray = state.filter(
//           (el) => el.id !== action.payload.id
//         )
//         return filteredArray
//       }
  
//       default:
//         return state
//     }
// }
// способ создания reducer на js

const initialState = {
    entities: [],
    isLoading:true,
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers:{
        recived (state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        update (state, action) {
            const elIndex = state.entities.findIndex((el) => 
            el.id === action.payload.id
            )
            state.entities[elIndex] = { 
                ...state.entities[elIndex], 
                ...action.payload
            }
        },
        remove (state, action) {
            state.entities = state.entities.filter(
                (el) => el.id !== action.payload.id
            )
        },
        created (state, action) {
            state.entities.unshift(action.payload)
        },
        taskRequested (state) {
            state.isLoading = true
        },
        requestFailed (state) {
            state.isLoading = false
        }

    }
})

const {actions, reducer: taskReducer } = taskSlice

const { remove, update, recived, created } = actions

const taskRequested = createAction("task/requested")
const taskRequestFailed = createAction("task/requestFailed")

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(recived(data))
    } catch (error) {
        dispatch(taskRequestFailed(error.message))
        dispatch(setError(error.message))
    }
}

export const completeTask = (id) => (dispatch, getState) => {
    dispatch(update({id, completed:true}))
}

export const createTask = () => async (dispatch) => {
    try {
        const data = await todosService.create()
        dispatch(created(data))
    } catch (error) {
        dispatch(setError(error.message))
    }
}

// export function taskCompleted (id) {
//     return update({id, completed:true}) 
// }

export function titleChanged (id) {
    return update({id, title:`new title for task ${id}`})
}

export function taskRemoved(id) {
    return remove({id})
}

export const getTasks = () => (state) => {
    return state.tasks.entities
}

export const getTasksLoadingStatus = () => (state) => {
    return state.tasks.isLoading
}


// const taskReducer = createReducer(initialState,(builder)=>{
//     builder
//         .addCase(update,(state,action)=>{
//             const elIndex = state.findIndex((el) => 
//                 el.id === action.payload.id
//             )
//             state[elIndex] ={...state[elIndex], ...action.payload}
//         })
//         .addCase(remove,(state,action)=>{
//             return state.filter(
//                 (el) => el.id !== action.payload.id
//             )
//         })
// }) 
// использование createReducer

export default taskReducer
