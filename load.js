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

function sortByLowercasedStrings(a, b) {
  if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) {
    return -1;
  } else if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) {
    return 1;
  }

  return 0;
}

function sortByName(a, b) {
  return sortByLowercasedStrings(a.name, b.name);
}

function createEntryHtml(entry) {
  var li = document.createElement('li');
  li.className = 'list-group-item';

  var h3 = document.createElement('h3');
  h3.textContent = entry.name;
  li.appendChild(h3);

  if (entry.homepage) {
    var homepageLink = document.createElement('a');

    homepageLink.href = entry.homepage;
    homepageLink.className = 'btn btn-default';
    homepageLink.textContent = 'Home Page';

    li.appendChild(homepageLink);
  }

  if (entry.repository) {
    var repositoryLink = document.createElement('a');

    repositoryLink.href = entry.repository;
    repositoryLink.className = 'btn btn-default';
    repositoryLink.textContent = 'Source Code';

    li.appendChild(repositoryLink);
  }

  if (entry.description) {
    var p = document.createElement('p');
    p.textContent = entry.description;
    li.appendChild(p);
  }

  return li;
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

function createKeywordHtml(keyword) {
  var div = document.createElement('div');
  var span = document.createElement('span');

  div.className = 'keyword';

  span.className = 'badge';
  span.textContent = keyword.count;

  var text = document.createTextNode(keyword.name);
  div.appendChild(text);
  div.appendChild(span);

  return div;
}

function printKeywords(keywords) {
  var keywordList = document.getElementById('keywordList');

  keywords.forEach(function(keyword) {
    keywordList.appendChild(createKeywordHtml(keyword));
  });
}

function clearResults() {
  var results = document.getElementById('results');
  while(results.firstElementChild) {
    results.removeChild(results.firstElementChild);
  }
}

function splitSearchString(searchString) {
  return searchString.match(/"[^"]*"|[^\s"]+/g).map(function(term) {
    return term.replace(/"/g, '');
  });
}

function stringContains(haystack, needles) {
  var lowercasedHaystack = haystack.toLocaleLowerCase();

  return needles.some(function(needle) {
    return lowercasedHaystack.indexOf(needle) !== -1;
  });
}

function searchEntry(entry, terms) {
  var found = stringContains(entry.name, terms);

  if (!found) {
    found = entry.keywords.some(function(keyword) {
      return stringContains(keyword, terms);
    });
  }

  return found;
}

function search(evt) {
  clearResults();

  if (evt.target.value.length === 0) {
    return;
  }

  var terms = splitSearchString(evt.target.value.toLocaleLowerCase());

  var container = document.getElementById('results');
  entries.sort(sortByName).forEach(function(entry) {
    if (searchEntry(entry, terms)) {
      container.appendChild(createEntryHtml(entry));
    }
  });
}

function searchByKeyword(evt) {
  if (evt.target.className !== 'keyword') {
    return;
  }

  var search = document.getElementById('search');
  search.value = '"' + evt.target.firstChild.textContent + '"';
  search.dispatchEvent(new Event('input'));
}

function setEntries(loadedEntries) {
  entries = loadedEntries;

  printKeywords(getKeywords(entries));

  document.getElementById('search').addEventListener('input', search);
  document.getElementById('keywordList').addEventListener('click', searchByKeyword);
}

var entries = [];
loadData(setEntries);
