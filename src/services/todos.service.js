import httpService from "./http.service"

const todosEndPoint = "todos/"

const todosService = {
    fetch: async () => {
        const  { data }  = await httpService.get(todosEndPoint, {
            params: {
                _page: 1,
                _limit: 10
            }
        }
        )
        return data
    },
    create: async () => {
        const { data } = await httpService.post(todosEndPoint,{
            title: "Оджаться 1000 раз 0_о",
            completed: false
        })
        return data
    }
}

export default todosService