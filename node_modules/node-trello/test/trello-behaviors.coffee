should = require "should"

module.exports =
  aRequest: () ->
    it "should include the key in the query", () ->
      @request.options.query.should.have.property "key"
      @request.options.query.key.should.equal "APIKEY"

    it "should include the token in the query", () ->
      @request.options.query.should.have.property "token"
      @request.options.query.token.should.equal "USERTOKEN"

    it "should pass any query arguments from the 'query' object", () ->
      @request.options.query.should.have.property "type"
      @request.options.query.type.should.equal "any"

    it "should try to contact https://api.trello.com/test", () ->
      @request.url.should.equal "https://api.trello.com/test"