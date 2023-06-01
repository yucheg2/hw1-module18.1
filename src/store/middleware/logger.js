
export function logger ({getState, dispatch}) {
    return function wrapDispatch (next) {
        return function handleAction (action) {

            // if (action.type === "task/update") {
            //     return dispatch({...action, type: "task/remove"})
            // } поменяли событие

            return next(action)
        }
    }
}