class App{
    
    constructor(){
        this.adapter = new BaseAdapter()
        this.initBindingsAndEventListeners()

        this.router = new Router({
        'welcome': new WelcomePage(this.pageContainer, this.adapter),
        'login': new LoginPage(this.pageContainer, this.adapter),
        'signup': new SignupPage(this.pageContainer, this.adapter),
        'profile': new ProfilePage(this.pageContainer, this.adapter)
        })

        const navbar = new Navbar(this.navBarContainer, this.adapter)
        this.router.assignNavbar(navbar)
        this.router.assignCallback(this.pageManagerRedirect.bind(this))
        this.renderPage('welcome')
        }

        initBindingsAndEventListeners(){
            this.container = document.querySelector('#page-container')
            this.navBarContainer = document.querySelector('#navbar-container')
            this.pageContainer = document.querySelector('#page-container')
            this.alertsContainer = document.querySelector('#alert-container')
        }

        pageManagerRedirect(page){
            this.renderPage(page)
        }
        renderPage(page){
            this.router.render(page)
        }

        // assignCallback(callback){
        //     for(let route in this.routes){
        //         this.routes[route].redirect = callback
        //     }
        // }


}