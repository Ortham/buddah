'use strict';
function loadData(callback) {
  var url = `data.json`;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'text';
  xhr.addEventListener('readystatechange', function(evt) {
    if (evt.target.readyState === 4) {
      /* Status is 0 for local file URL loading. */
      if (evt.target.status >= 200 && evt.target.status < 400) {
        callback(JSON.parse(evt.target.responseText));
      } else {
        throw new Error(evt.target.statusText);
      }
    }
  }, false);
  xhr.send();
}

function sortByCount(a, b) {
  if (a.count < b.count) {
    return 1;
  } else if (a.count > b.count) {
    return -1;
  }

  return 0;
}

function getKeywords(entries) {
  var keywords = [];

  entries.forEach(function(entry) {
    entry.keywords.forEach(function(keyword) {
      var index = 0;
      for (; index < keywords.length; ++index) {
        if (keywords[index].name.indexOf(keyword.toLocaleLowerCase()) !== -1) {
          ++keywords[index].count;
          break;
        }
      }
      if (index === keywords.length) {
        keywords.push({
          name: keyword.toLocaleLowerCase(),
          count: 1,
        });
      }
    })
  });

  return keywords.sort(sortByCount);
}
