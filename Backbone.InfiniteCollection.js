Backbone.InfiniteCollection = Backbone.Collection.extend({

  _index: 0,

  pageSize: 1,

  initialize: function(undefined, options) {
    _.extend(this, options);
    this.on('reset', function() { this._index = 0; }, this);
  },

  getPage: function() {
    var slice = this.slice(this._index, this._index + this.pageSize);
    if (slice.length < this.pageSize) {
      slice = slice.concat(this.slice(0, this.pageSize - slice.length));
    }
    return new Backbone.Collection(slice);
  },

  retreat: function() {
    this._index -= this.pageSize;
    if (this._index < 0) {
      this._index += this.length;
    }
    return this;
  },

  behind: function() {
    var slice = this.retreat().getPage();
    this.advance();
    return slice;
  },
  
  previous: function() {
    return this.retreat().getPage();
  }

  advance: function() {
    this._index += this.pageSize;
    if (this._index >= this.length) {
      this._index -= this.length;
    }
    return this;
  },

  ahead: function() {
    var slice = this.advance().getPage();
    this.retreat();
    return slice;
  },
  
  next: function() {
    return this.advance().getPage();
  }

});
