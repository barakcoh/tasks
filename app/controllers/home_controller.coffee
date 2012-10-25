class App.HomeController extends App.ApplicationController
  routingKey: 'home'
  task: null
  user: null
  list_id: null
  tasks: []

  index: ->
    Trello.authorize interactive: false, success: @auth_success

    @set 'task', new App.Task    
    App.List.load =>
    App.Task.load (err, tasks) =>
      @set 'tasks', tasks


  create: ->    
    @task.save()
    @set 'task', new App.Task


  select_list: ->
    @set 'tasks', App.Task.get('loaded.indexedBy.idBoard').get(@list_id)
    #@set 'tasks', App.List.get('loaded').indexedByUnique('id').get(@list_id).get('tasks')

  auth: ->
    Trello.authorize type: "popup", success: @auth_success
    

  auth_success: ->
    Trello.members.get "me", (user) =>
      App.get('controllers.home').set 'user', user


  sync: ->
    Trello.get "members/me/boards", (boards) =>
      $.each boards, (ix, board) =>
        console.log board
        App.List.createOrSync(board)

      Trello.get "members/me/cards", (cards) =>
        $.each cards, (ix, card) =>
          App.Task.createOrSync(card)    