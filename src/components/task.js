class Task{

    static formHTML(task){
        return (`
        <form id="${task ? 'edit' : 'new'}-task-form">
            ${task ? '<input type="hidden" value="' + task.id + '">' : '' }
  <div class="form-row">
    <div class="form-group col-md-6">
    <label for="content">Content</label>
    <textarea class="form-control" id="content" rows="3"> ${task ? task.content : ''} </textarea>
  </div>
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        
        `)
    }



    constructor(task){
        const { id, content, created_at } = task

        this.id = id
        this.content = content
        this.created_at = created_at
    }


get showHTML(){
 return  (`
    <h3>${this.created_at}</h3>
    <h2>${this.content}</h2>
    <button data-id=${this.id} id="edit-task">Edit</button>
    <button data-id=${this.id} id="add-note">Add Note</button>
    `)

}

get formHTML(){
    return Task.formHTML(this)
}

get liAndLinkHTML(){
    return `<li class="task-li" data-id="${this.id}"><a href="#" data-id="${this.id}">${this.content}</a> <input type="button" aria-label="delete-button" data-id="${this.id}" value=&times; /></li>`
}

}  