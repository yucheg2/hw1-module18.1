import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {compose, pipe} from "lodash/fp"
import { createTaskStore } from './store/redux/store';
import * as actions from './store/redux/actions';

const store = createTaskStore()

const App = (params) => {
  const [state, setState] = useState( store.getState())
  
  useEffect(()=>{
    store.subscribe(()=>{setState(store.getState())})
  },[])

  const handleCompleteTask = (id) => {
    store.dispatch(actions.taskCompleted(id))
  }

  const handleChangeTitle = (id) => {
    store.dispatch(actions.titleChanged(id))
  }

  const handleTaskDelete = (id) => {
    store.dispatch(actions.taskDeleted(id))
  }
  return (
  <>
    <h1>App</h1>
    <ul>
      {state.map((task)=>{
        return (
          <li key={task.id}>
            <p>{task.title}</p>
            <p>{`Completed: ${task.completed}`}</p>
            <button onClick={()=>{ handleCompleteTask(task.id) }}>complete</button>
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
    <App />
  </React.StrictMode>
);
