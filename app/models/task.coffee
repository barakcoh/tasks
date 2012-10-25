class App.Task extends Batman.Model
  serializeAsForm: false

  @resourceName: 'task'  
  @storageKey: 'tasks'  
  @primaryKey: '_id'

  @encode 'name'

  @belongsTo 'list', foreignKey: 'idBoard'

  @persist Batman.JSONRestStorage

  @createOrSync: (card)->    
    task = App.Task.get('loaded.indexedByUnique.id').get(card.id) || new App.Task

    task.mixin card
    task.save()

  #
  # or over a REST endpoint with
  #
  # @persist Batman.RestStorage

  # Add a computed property to this model with
  #
  # @accessor 'someKey',
  #   get: -> ...
  #   set: -> ...
  #
  # and whenever any of the properties accessed in the getter/setters change,
  # someKey will be recomputed and cached.

  # Observe a property or an event on this model with
  #
  # @observe 'someKey', (newValue, oldValue) ->
  #
  # and be notified of any changes to someKey on this model, or use
  #
  # @observeAll 'someKey', (newValue, oldValue) ->
  #
  # to be notified of any changes to someKey on any instance of the model.

  # Add an event to instances of this model with
  #
  # someEvent: @event -> ... # return value of event, passed to observers
  #
  # and fire it with
  #
  # modelInstance.someEvent()
