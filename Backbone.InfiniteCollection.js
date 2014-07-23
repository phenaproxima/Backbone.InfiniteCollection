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

    return slice;
  },

  goBackward: function() {
    this._index -= this.pageSize;

    if (this._index < 0) {
      this._index += this.length;
    }

    return this;
  },

  lookBehind: function() {
    var slice = this.goBackward().getPage();

    this.goForward();

    return slice;
  },

  goForward: function() {
    this._index += this.pageSize;
    
    if (this._index >= this.length) {
      this._index -= this.length;
    }

    return this;
  },

  lookAhead: function() {
    var slice = this.goForward().getPage();

    this.goBackward();

    return slice;
  }

});
