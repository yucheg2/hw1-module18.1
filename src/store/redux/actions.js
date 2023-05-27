import * as actionTypes from '../actionTypes';

function taskCompleted (id) {
    return {
        type: actionTypes.taskUpdated, 
        payload: {id, completed:true}
    }
}

function titleChanged (id) {
    return {
        type: actionTypes.taskUpdated,
        payload:{id, title:`new title for task ${id}`}
    }
}

function taskDeleted(id) {
    return {
        type: actionTypes.taskDeleted,
        payload: { id }
    }
}

export {titleChanged, taskCompleted, taskDeleted}