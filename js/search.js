'use strict';

function search(evt) {
  clearResults();

  if (evt.target.value.length === 0) {
    return;
  }

  var container = document.getElementById('results');
  index.search(evt.target.value).forEach(function(result) {
    container.appendChild(createEntryHtml(entries[result.ref]));
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

function initSearchHandling(loadedEntries) {
  entries = loadedEntries;

  fillIndex(entries);
  printKeywords(getKeywords(entries));

  document.getElementById('search').addEventListener('input', search);
  document.getElementById('keywordList').addEventListener('click', searchByKeyword);
}

function initIndex() {
  this.field('name');
  this.field('description');
  this.field('keywords');
  this.ref('index');
}

function fillIndex(entries) {
  entries.forEach(function(entry, i) {
    index.add({
      name: entry.name,
      description: entry.description,
      keywords: entry.keywords.join(' '),
      index: i,
    });
  });
}
