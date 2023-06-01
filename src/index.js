import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {compose, pipe} from "lodash/fp"
import configureStore from './store/redux/store';
import {taskCompleted, titleChanged, taskRemoved, completeTask, loadTasks, getTasks, getTasksLoadingStatus, createTask} from './store/task';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { getErrors } from './store/errors';

const store = configureStore()

const App = (params) => {
  // const [state, setState] = useState( store.getState())
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getErrors())
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadTasks())
    // store.subscribe(()=>{setState(store.getState())})
    // слушатели необходимые для ререндера компонентов без react-redux
  },[])

  const handleChangeTitle = (id) => {
    // store.dispatch(titleChanged(id)) передача в reducer action без react-redux
    dispatch(titleChanged(id))
  }

  const handleTaskDelete = (id) => {
    dispatch(taskRemoved(id))
  }
  if (isLoading) {
    return <h1> Loading </h1>
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
  <>
    <h1>App</h1>
    <button onClick={()=>{ dispatch(createTask()) }}>Create Task</button>
    <ul>
      {state.map((task)=>{
        return (
          <li key={task.id}>
            <p>{task.title}</p>
            <p>{`Completed: ${task.completed}`}</p>
            <button onClick={()=>{ dispatch(completeTask(task.id)) }}>complete</button>
            <button onClick={()=>{ handleChangeTitle(task.id) }}>change title</button>
            <button onClick={()=>{ handleTaskDelete(task.id) }}>delete</button>
            <hr/>
          </li>
        )
      })}
    </ul>
  </>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
