Backbone.InfiniteCollection = Backbone.Collection.extend({

  _index: 0,

  pageSize: 1,

  initialize: function(undefined, options) {
    _.extend(this, options);
    this.on('reset', function() { this._index = 0; }, this);
  },

  /**
   * Returns the current page from left to right, wrapping around to the
   * beginning if needed.
   */
  getPage: function() {
    var slice = this.slice(this._index, this._index + this.pageSize);
    if (slice.length < this.pageSize) {
      slice = slice.concat(this.slice(0, this.pageSize - slice.length));
    }
    return new Backbone.Collection(slice);
  },

  /**
   * Retreats the index by pageSize, wrapping around to the end if needed.
   */
  retreat: function() {
    this._index -= this.pageSize;
    if (this._index < 0) {
      this._index += this.length;
    }
    return this;
  },

  /**
   * Returns the previous page *without* retreating the index.
   */
  behind: function() {
    var slice = this.retreat().getPage();
    this.advance();
    return slice;
  },
  
  /**
   * Returns the previous page, retreating the index.
   */
  previous: function() {
    return this.retreat().getPage();
  },

  /**
   * Advances the index by pageSize, wrapping around to the beginning if needed.
   */
  advance: function() {
    this._index += this.pageSize;
    if (this._index >= this.length) {
      this._index -= this.length;
    }
    return this;
  },

  /**
   * Returns the next page *without* advancing the index.
   */
  ahead: function() {
    var slice = this.advance().getPage();
    this.retreat();
    return slice;
  },

  /**
   * Returns the next page, advancing the index. This is the page *after* the
   * current page (that's what getPage() is for).
   */
  next: function() {
    return this.advance().getPage();
  }

});
