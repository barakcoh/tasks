class App.TrelloController extends App.ApplicationController
  routingKey: 'trello'
  user: null


  auth: ->
    Trello.authorize type: "popup", success: @auth_success
    

  auth_success: ->
    Trello.members.get "me", (user) =>
      App.get('controllers.trello').set 'user', user


  sync: ->
    Trello.get "members/me/cards", (cards) =>
      $.each cards, (ix, card) =>
        App.Task.createOrSync(card)