class User{
    constructor(user){
        const { id, email, name, username, tasks } = user
        this.id = id
        this.email = email
        this.name = name
        this.username = username
        this.tasks = tasks.map(t => new Task(t))
    }

    get profileHTML(){
        return (`
            <h2>Welcome ${this.name}! </h2>
            <form id="new-task-form">
            <input type="text" id="new-task-body" />
            <input type="submit" />
        </form>
            <h3>Your tasks: </h3>
            <div id="tasks-container"> <ul>
                ${this.tasks.map(t => t.liAndLinkHTML).join('')}
               
            </ul></div>
        `)
    }
}