'use strict';

var entries = [];
var index = lunr(initIndex);
loadData('data.json', initSearchHandling);
