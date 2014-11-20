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
      { value: 9 }
    ]);
  },
  teardown: function() {
    delete collection;
  }
});

function _assertPage(assert, page) {
  assert.ok(page instanceof Backbone.Collection);
  assert.equal(page.length, collection.pageSize);
}

QUnit.test('get the first page', function(assert) {

  var page = collection.getPage();
  _assertPage(assert, page);
  assert.equal(collection._index, 0);
  assert.strictEqual(page.at(0), collection.at(0));

});

QUnit.test('increase page size to 3 and get the first page', function(assert) {

  collection.pageSize = 3;
  var page = collection.getPage();
  _assertPage(assert, page);
  assert.equal(collection._index, 0);
  assert.strictEqual(page.at(0), collection.at(0));
  assert.strictEqual(page.at(1), collection.at(1));
  assert.strictEqual(page.at(2), collection.at(2));

});

QUnit.test('go backward', function(assert) {

  assert.equal(collection.goBackward()._index, 8);

});

QUnit.test('look behind', function(assert) {
  
  var page = collection.lookBehind();
  _assertPage(assert, page);
  assert.equal(collection._index, 0);
  assert.strictEqual(page.at(0), collection.at(8));
  
});

QUnit.test('go forward', function(assert) {
  
  assert.equal(collection.goForward()._index, 1);
  
});

QUnit.test('look ahead', function(assert) {

  var page = collection.lookAhead();
  _assertPage(assert, page);
  assert.equal(collection._index, 0);
  assert.strictEqual(page.at(0), collection.at(1));

});
