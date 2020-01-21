class Navbar extends PageManager{

    constructor(container, adapter){
        super(container)
        this.adapter = adapter
    }

    get is_authenticated(){
        return !!this.adapter.token
    }

    initBindingsAndEventListeners(){
       this.container.addEventListener('click', this.handleClick.bind(this))
    }

    handleClick(e){
        if(e.target.tagName === "A"){
            e.preventDefault()
            const route = e.target.id.split('-')[0]
            if(route !== this.currentPage()) { this.redirect(route)}
        }
    }

    get staticHTML(){

        if(this.is_authenticated){
            return (`
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">TASKS</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" id="profile-link" href="#">Profile <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="tasks-link" href="#">Tasks</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" id="tasks2-link" href="#">Tasks2</a>
    </li>
    </ul>
  </div>
</nav>
            `)
        }else{
            return (`
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">TASKS</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" id="welcome-link" href="#">Welcome <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="login-link" href="#">Login</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" id="signup-link" href="#">Signup</a>
              </li>
              </ul>
            </div>
          </nav>
            `)
        }
    }

}