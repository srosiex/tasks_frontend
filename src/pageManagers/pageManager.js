class PageManager{

    constructor(container){
        this.container = container
     
    }

    fetchAndRenderPageResources(){
        return null
    }

    render(){
        this.container.innerHTML = this.staticHTML
        this.initBindingsAndEventListeners()
        this.fetchAndRenderPageResources()
    }

}