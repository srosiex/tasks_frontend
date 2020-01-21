class LoginPage extends PageManager{

    constructor(container, adapter){
        super(container)
        this.adapter = new LoginAdapter(adapter)
    }
    
    initBindingsAndEventListeners(){
        this.form = this.container.querySelector('form#login-form')
        this.form.addEventListener('submit', this.handleSubmit.bind(this))
    }

    async handleSubmit(e){
        e.preventDefault()
        const [email, password] = Array.from(e.target.querySelectorAll('input')).map(i => i.value)
        const params = {
            user: {email, password}
        }
        try{
            await this.adapter.login(params)
            this.redirect('profile')
          }
          catch(err){
            alert(err)
          }

    }

    get staticHTML(){

        return (`
        
        <form id="login-form">
        <div class="form-group">
        
  <div class="form-group">
    <label for="email">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required >
  </div>
  
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" id="password" placeholder="Password" required >
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        
        
        
        `)


    }


}