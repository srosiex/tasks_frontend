class ProfilePage extends PageManager{

    constructor(container, adapter){
        super(container)
        this.adapter = new ProfileAdapter(adapter)
        this.user = null
    }

    initBindingsAndEventListeners(){
        return null
    }

    profileBindingsAndEventListeners(){
        this.body = document.querySelector('body')
        const taskList = this.container.querySelector('ul')
        taskList.addEventListener('click', this.handleTaskClick.bind(this))
        const tasksContainer = document.getElementById('tasks-container')
        tasksContainer.addEventListener('click', this.removeTask.bind(this))
        tasksContainer.addEventListener('dblclick', this.handleTaskDblClick.bind(this))
        this.newTaskBody = document.getElementById('new-task-body')
        this.body.addEventListener('blur', this.taskUpdate.bind(this), true)
        this.taskForm = document.getElementById('new-task-form')
        this.taskForm.addEventListener('submit', this.createTask.bind(this))
    }


    async createTask(e){
        e.preventDefault()
        const taskValue = this.newTaskBody.value
        console.log(taskValue)
       try{
        await this.adapter.createTask(taskValue)
        this.renderUser()
       }catch(err){
           this.handleError(err)
       }
     
    }

    taskBindingsAndEventListeners(){
        const formButton = this.container.querySelector('button')
        formButton.addEventListener('click', this.formalizeTask.bind(this))
    }

    taskFormBindingsAndEventListeners(){
        const form = this.container.querySelector('form')
        form.addEventListener('submit', this.handleUpdateTask.bind(this))
    }


    handleTaskClick(e){
        if(e.target.tagName === "A"){
            const taskId = e.target.dataset.id
            const task = this.getTaskById(taskId)
           this.renderTask(task)
        }
    }

    formalizeTask(e){
        const id = e.target.dataset.id
        const task = this.user.tasks.find(t => t.id == id)
        if(task){
            this.container.innerHTML = task.formHTML
            this.taskFormBindingsAndEventListeners()
        }else{
            this.handleError({
                type: "404 Not Found",
                msg: "Task not found"
            })
        }
    }

    async handleUpdateTask(e){
        e.preventDefault()
        const [id] = Array.from(e.target.querySelectorAll('input')).map(i => i.value)
        const content = e.target.querySelector('textarea').value

        const params = { content, id}
        const task = this.getTaskById(id)
        const oldTask = new Task({id, content})
        task.content = content
        this.renderTask(task)
        try{
            const {id, content} = await this.adapter.updateTask(params)
        }catch(err){
            task.content = oldTask.content
            this.renderTask(task)
            this.handleError(err)
        }

    
    }

    async fetchAndRenderPageResources(){
        try{
            const userObj = await this.adapter.getUser()
            this.user = new User(userObj)
            this.renderUser()
        }catch(err){
        this.handleError(err)}
    }

    getTaskById(id){
        return this.user.tasks.find(t => t.id == id)
    }

    get staticHTML(){
        return (`
        <div class="loader"></div>
        `)
    }

      async removeTask(e) {
       if(e.target.tagName === "INPUT"){
           const taskId = e.target.dataset.id
           try{
            await this.adapter.deleteTask(taskId)
            this.user.tasks = this.user.tasks.filter(task => task.id != taskId)
            this.renderUser()
           }catch(err){
            this.handleError(err)
            }
       }
    }
     handleTaskDblClick(e) {
        const li = e.target
        li.contentEditable = true
     }

     async taskUpdate(e){
        //  const taskValue = e.target
        //  taskValue.contentEditable = false
        //  const content = taskValue.innerText
        //  const taskId = taskValue.dataset.id
        //  const params = {taskId, content}
        //  console.log(taskId)
        //  try{
        //     await this.adapter.updateTask(params)
        //     console.log('here')
        //     this.user.tasks = this.user.tasks.filter(task => task.id != taskId)
        //     // console.log(this.user.tasks)
        //     this.renderUser()
        //  }catch(err){
        //     this.handleError(err)
        //  }
     }


    renderTask(task){
        if(task){
            this.container.innerHTML = task.showHTML
            this.taskBindingsAndEventListeners()
        }else{
            this.handleError({
                type: "404 Not Found",
                msg: "Task not found"
            })
        }
    }

    renderUser(){
        this.container.innerHTML = this.user.profileHTML
        this.profileBindingsAndEventListeners()
    }

}