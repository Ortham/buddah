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

function getSections(entries) {
  var sections = [];

  entries.forEach(function(entry) {
    entry.sections.forEach(function(keyword) {
      if (sections.indexOf(keyword) === -1) {
        sections.push(keyword);
      }
    })
  });

  return sections.sort(sortByLowercasedStrings);
}

function sortByLowercasedStrings(a, b) {
  if (a.toLowerCase() < b.toLowerCase()) {
    return -1;
  } else if (a.toLowerCase() > b.toLowerCase()) {
    return 1;
  }

  return 0;
}

function sortByName(a, b) {
  return sortByLowercasedStrings(a.name, b.name);
}

function toTitleCase(str) {
  /* From Stack Overflow: <http://stackoverflow.com/a/196991> */
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
}

function createSection(keyword) {
  var section = document.createElement('section');
  var h2 = document.createElement('h2');
  var ul = document.createElement('ul');
  h2.textContent = toTitleCase(keyword);

  section.appendChild(h2);
  section.appendChild(ul);
  document.body.appendChild(section);

  return ul;
}

function createEntryHtml(entry) {
  var li = document.createElement('li');
  var a = document.createElement('a');

  if (entry.repository) {
    a.href = entry.repository;
  } else if (entry.homepage) {
    a.href = entry.homepage;
  }

  a.textContent = entry.name;
  li.appendChild(a);

  if (entry.description) {
    var p = document.createElement('p');
    p.textContent = entry.description;
    li.appendChild(p);
  }

  return li;
}

function listEntries(entries) {
  var sections = getSections(entries);

  entries.sort(sortByName);

  sections.forEach(function(keyword) {
    var ul = createSection(keyword);

    entries.forEach(function(entry) {
      if (entry.sections.indexOf(keyword) !== -1) {
        ul.appendChild(createEntryHtml(entry));
      }
    });
  });
}

loadData(listEntries);
