var collection;

QUnit.module('Backbone.InfiniteCollection', {
  setup: function() {
    collection = new Backbone.InfiniteCollection([
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10 }
    ], { pageSize: 3 });
  },
  teardown: function() {
    delete collection;
  }
});

QUnit.test('get current page', function(assert) {

  var page = collection.getPage();
  assert.ok(page instanceof Backbone.Collection);
  assert.equal(page.length, 3);
  assert.strictEqual(page.at(0), collection.at(0));
  assert.strictEqual(page.at(1), collection.at(1));
  assert.strictEqual(page.at(2), collection.at(2));

});

QUnit.test('get current page (wrapped)', function(assert) {

  collection.pageSize = 6;
  var page = collection.advance().getPage();
  assert.ok(page instanceof Backbone.Collection);
  assert.equal(page.length, 6);
  assert.strictEqual(page.at(0), collection.at(6));
  assert.strictEqual(page.at(1), collection.at(7));
  assert.strictEqual(page.at(2), collection.at(8));
  assert.strictEqual(page.at(3), collection.at(9));
  assert.strictEqual(page.at(4), collection.at(0));
  assert.strictEqual(page.at(5), collection.at(1));

});

QUnit.test('retreat', function(assert) {

  collection.pageSize = 6;
  assert.equal(collection._index, 0);
  assert.equal(collection.retreat()._index, 4);
  assert.equal(collection.retreat()._index, 8);

});

QUnit.test('look behind', function(assert) {

  var page = collection.behind();
  assert.ok(page instanceof Backbone.Collection);
  assert.equal(page.length, 3);
  assert.equal(collection._index, 0);
  assert.strictEqual(page.at(0), collection.at(7));
  assert.strictEqual(page.at(1), collection.at(8));
  assert.strictEqual(page.at(2), collection.at(9));
  
});

QUnit.test('get previous page', function(assert) {

  var page = collection.previous();
  assert.ok(page instanceof Backbone.Collection);
  assert.equal(page.length, 3);
  assert.equal(collection._index, 7);
  assert.strictEqual(page.at(0), collection.at(7));
  assert.strictEqual(page.at(1), collection.at(8));
  assert.strictEqual(page.at(2), collection.at(9));
  
});

QUnit.test('advance', function(assert) {

  collection.pageSize = 6;
  assert.equal(collection._index, 0);
  assert.equal(collection.advance()._index, 6);
  assert.equal(collection.advance()._index, 2);

});

QUnit.test('look ahead', function(assert) {

  var page = collection.ahead();
  assert.ok(page instanceof Backbone.Collection);
  assert.equal(page.length, 3);
  assert.equal(collection._index, 0);
  assert.strictEqual(page.at(0), collection.at(3));
  assert.strictEqual(page.at(1), collection.at(4));
  assert.strictEqual(page.at(2), collection.at(5));
  
});

QUnit.test('get next page', function(assert) {

  var page = collection.next();
  assert.ok(page instanceof Backbone.Collection);
  assert.equal(page.length, 3);
  assert.equal(collection._index, 3);
  assert.strictEqual(page.at(0), collection.at(3));
  assert.strictEqual(page.at(1), collection.at(4));
  assert.strictEqual(page.at(2), collection.at(5));
  
});
