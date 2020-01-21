class SignupPage extends PageManager{

    constructor(container, adapter){
        super(container)
        this.adapter = new SignupAdapter(adapter)
    
    }

    initBindingsAndEventListeners(){
        this.form = this.container.querySelector('#signup-form')

        this.form.addEventListener('submit', this.handleSubmit.bind(this))
    }

     async handleSubmit(e){
       e.preventDefault()
        const inputs = Array.from(e.target.querySelectorAll('input'))
        const [username, email, name, password] = inputs.map(input => input.value)
        const params = {
          user: {
            username, email, name, password
          }
        }
        try{
          await this.adapter.signup(params)
          this.redirect('profile')
        }
        catch(err){
          alert(err)
        }

    }



    get staticHTML(){
        return(`
        <h2>Sign up<h2>
        <form id="signup-form">
        <div class="form-group">
        <label for="username">Username</label>
        <input type="username" class="form-control" id="username" placeholder="Enter a username" required >
      </div>
  <div class="form-group">
    <label for="email">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required >
  </div>
  <div class="form-group">
  <label for="name">Name</label>
  <input type="name" class="form-control" id="name" placeholder="Enter name" required >
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