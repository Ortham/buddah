'use strict';

function search(evt) {
  clearResults();

  if (evt.target.value.length === 0) {
    printAllEntries();
    return;
  }

  var container = document.getElementById('results');
  index.search(evt.target.value).forEach(function(result) {
    container.appendChild(createEntryHtml(entries[result.ref]));
  });
}

function searchByKeyword(evt) {
  var target = evt.target;
  if (target.className !== 'keyword') {
    target = target.parentElement;
  }
  if (target.className !== 'keyword') {
    return;
  }

  var search = document.getElementById('search');
  if (search.value.length > 0) {
    search.value += ' ';
  }
  if (target.firstElementChild.classList.contains('octicon')) {
    search.value += '"' + target.textContent + '"';
  } else {
    search.value += '"' + target.firstChild.textContent + '"';
  }
  search.dispatchEvent(new Event('input'));
}

function sortByLowercasedName(a, b) {
  if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
    return -1;
  } else if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
    return 1;
  }

  return 0;
}

function toggleKeywordList(evt) {
  evt.target.blur();

  var keywordList = document.getElementById('keywordList');
  keywordList.hidden = !keywordList.hidden;
}

function initSearchHandling(loadedEntries) {
  entries = loadedEntries.sort(sortByLowercasedName);

  fillIndex(entries);

  printKeywords();

  document.getElementById('search').addEventListener('input', search);
  document.body.addEventListener('click', searchByKeyword);
  document.getElementById('showKeywords').addEventListener('click', toggleKeywordList);

  printAllEntries();
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
