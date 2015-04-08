describe("Query", function() {
  var Query = require('../lib/query.js'),
      query,
      url = "/test";

  beforeEach(function() {
    query = new Query(url, {});
  });

  describe("init", function() {
    it('ensures required options', function() {
      expect(query.url).toEqual(url);
    });
  });
  
  describe("find", function() {
    it('does something', function() {});
  });

  describe("sort", function() {
    it('sets the sort property', function() {
      spyOn(query, "find");
      query.sort('name');
      expect(query.find).toHaveBeenCalled();
      expect(query.sortBy).toEqual('name');
    });
    it('toggles the property if no dirction passed', function() {
      spyOn(query, "find");
      query.sort('name');
      expect(query.sortAsc).toBeTruthy();
      query.sort('name');
      expect(query.sortAsc).toBeFalsy();
    });
  });

  describe("movePage", function() {
    beforeEach(function() {
      query.pages = 5;
    });
    it('sets the page of query', function() {
      spyOn(query, "find");
      expect(query.page).toEqual(1);
      query.movePage(3);
      expect(query.page).toEqual(3);
    });
    it('resets to page 1 if requested out of range page', function() {
      spyOn(query, "find");
      query.movePage(7);
      expect(query.page).toEqual(1);
    });
  });

  describe("next", function() {
    it('increments page', function() {
      spyOn(query, "find");
      query.pages = 5;
      query.next();
      expect(query.page).toEqual(2);
    });
  });

  describe("prev", function() {
    it('does something', function() {
      spyOn(query, "find");
      query.pages = 5;
      query.page = 3;
      query.prev();
      expect(query.page).toEqual(2);
    });
  });

  describe("getPages", function() {
    it('does something', function() {});
  });

});