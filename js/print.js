'use strict';
function isUrl(license) {
  var regex = /https?:\/\//;
  return regex.test(license);
}
function toUrl(license) {
  if (isUrl(license)) {
    return license;
  }

  if (license[license.length - 1] === '+') {
    license = license.substring(0, license.length - 1);
  }

  return 'https://spdx.org/licenses/' + license + '.html';
}

function createEntryHtml(entry) {
  var entryDiv = document.createElement('div');
  entryDiv.className = 'entry';

  var leftColumn = document.createElement('div');
  leftColumn.className = 'left-column';

  var h3 = document.createElement('h3');
  h3.textContent = entry.name;
  leftColumn.appendChild(h3);

  if (entry.description) {
    var p = document.createElement('p');
    p.textContent = entry.description;
    leftColumn.appendChild(p);
  }

  var div = document.createElement('div');
  entry.keywords.sort().forEach(function(keyword) {
    var keywordSpan = document.createElement('span');
    keywordSpan.className = 'keyword';

    var icon = document.createElement('img');
    icon.src = './octicons/tag.svg';
    icon.className = 'octicon octicon-tag';

    var text = document.createTextNode(keyword);

    keywordSpan.appendChild(icon);
    keywordSpan.appendChild(text);
    div.appendChild(keywordSpan);
  });
  leftColumn.appendChild(div);

  entryDiv.appendChild(leftColumn);

  var rightColumn = document.createElement('div');
  rightColumn.className = 'right-column';

  if (entry.homepage) {
    var homepageLink = document.createElement('a');

    homepageLink.href = entry.homepage;
    homepageLink.target = '_blank';
    homepageLink.className = 'home';
    homepageLink.textContent = 'Home Page';

    rightColumn.appendChild(homepageLink);
  }

  if (entry.repository) {
    var repositoryLink = document.createElement('a');

    repositoryLink.href = entry.repository;
    repositoryLink.target = '_blank';
    repositoryLink.className = 'source';
    repositoryLink.textContent = 'Source Code';

    rightColumn.appendChild(repositoryLink);
  }

  if (entry.license) {
    if (!Array.isArray(entry.license)) {
      entry.license = [ entry.license ];
    }

    entry.license.forEach(function(license) {
      var link = document.createElement('a');
      link.className = 'license';
      if (isUrl(license)) {
        link.textContent = 'License';
      } else {
        link.textContent = license;
      }
      link.href = toUrl(license);
      link.target = '_blank';

      rightColumn.appendChild(link);
    });
  }

  entryDiv.appendChild(rightColumn);

  return entryDiv;
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

function printAllEntries() {
  var container = document.getElementById('results');
  entries.forEach(function(entry) {
    container.appendChild(createEntryHtml(entry));
  });
}

function printKeywords(evt) {
  var keywordList = document.getElementById('keywordList');
  getKeywords(entries).forEach(function(keyword) {
    keywordList.appendChild(createKeywordHtml(keyword));
  });
}

function clearResults() {
  var results = document.getElementById('results');
  while(results.firstElementChild) {
    results.removeChild(results.firstElementChild);
  }
}
