class App.List extends Batman.Model
  serializeAsForm: false

  @resourceName: 'list'  
  @storageKey: 'lists'  
  @primaryKey: '_id'

  @encode 'name'

  @hasMany 'tasks', saveInline: false 

  @persist Batman.JSONRestStorage

  @createOrSync: (board)->    
    list = App.List.get('loaded.indexedByUnique.id').get(board.id) || new App.List

    list.mixin board
    list.save()