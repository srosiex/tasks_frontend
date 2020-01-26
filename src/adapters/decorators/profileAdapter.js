class ProfileAdapter{

    constructor(baseAdapter){
        this.baseAdapter = baseAdapter
        this.baseURL = this.baseAdapter.baseURL

    }

    get token(){
        return this.baseAdapter.token
    }
    
    get headers(){
        return this.baseAdapter.headers
    }

    createTask(taskValue){
        const url = `${this.baseURL}/tasks`
        const task = {
            content: taskValue
        }
        return fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({task})
        }).then(res => res.json())
    }
    async updateTask(params){
        const { content, id } = params
        const url = `${this.baseURL}/tasks/${id}`
        const body = {
            task: {
                content,
                id
            }
        }
        const res = await fetch(url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(body)
        })
        await this.baseAdapter.checkStatus(res)
        return await res.json()
    }

    async getUser(){
        const res = await fetch(`${this.baseURL}/profile`, {
            headers: this.headers
        })
        await this.baseAdapter.checkStatus(res)
        return await res.json()

    }


    async deleteTask(id){
        const res = await fetch(`${this.baseURL}/tasks/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
        await this.baseAdapter.checkStatus(res)
        return await res.json()
    }



}