class App extends Batman.App  
  Batman.ViewStore.prefix = 'app/views'

  @resources 'tasks'
  @root 'home#index'  

  @on 'run', ->
    console.log "Running ...."

window.App = App