Backbone.InfiniteCollection
===========================

This is a tiny extension for Backbone Collections which provides methods for infinite paging through the collection
in either direction.

An infinite collection is instantiated just like a normal collection, and all the methods of normal collections are
available to it.

```
var myCollection = new Backbone.InfiniteCollection(myModels);
```

The infinite collection is divided into "pages", which is just a convenient way of returning more than one model
at once. By default, the page size is 1, so each page has one model in it. Pages are always returned as standard
Backbone Collections.

* ```getPage()``` returns the current page of the collection, from left to right.
* ```previous()``` will return the previous page of the collection, and move the cursor backwards. Because the 
collection is infinite, it will wrap around the end of the collection transparently.
* ```next()``` will return the next page of the collection, and move the cursor forwards. Note that the *next* page
is **NOT** the same thing as the *current* page. If the cursor is at 0 and the page size is 3, next() will return
a collection of three models starting from position 3.

You can change the page size at any time by setting the pageSize property directly: ```collection.pageSize = 4```

Additional methods:

* ```retreat()``` and ```advance()``` move the cursor backward or forward by one page, wrapping around the end if 
needed.
* ```behind()``` and ```ahead()``` will return the previous or next page, but *without* retreating or advancing
the cursor.

When cursor will always be set to 0 when the collection receives the ```reset``` event.

```
var collection = new Backbone.InfiniteCollection([
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
collection.getPage(); // [{value: 1},{value: 2},{value: 3}]
collection.previous();  // [{value: 10},{value: 9},{value: 8}]
collection.next(); // [{value: 4},{value: 5},{value: 6}]

// Unlike previous() and next(), previous() and ahead() do not advance the cursor
collection.ahead(); // [{value: 4},{value: 5},{value: 6}]
collection.getPage(); // [{value: 1},{value: 2},{value: 3}]

// next() and previous() are shorthand versions of these
collection.advance().getPage(); // [{value: 4},{value: 5},{value: 6}]
collection.retreat().getPage(); // [{value: 10},{value: 9},{value: 8}]
```