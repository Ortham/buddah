'use strict';
function createEntryHtml(entry) {
  var li = document.createElement('li');
  li.className = 'list-group-item entry';

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
  entry.keywords.forEach(function(keyword) {
    var keywordSpan = document.createElement('span');
    keywordSpan.className = 'entry-keyword';

    var icon = document.createElement('span');
    icon.className = 'glyphicon glyphicon-tag';

    var text = document.createTextNode(keyword);

    keywordSpan.appendChild(icon);
    keywordSpan.appendChild(text);
    div.appendChild(keywordSpan);
  });
  leftColumn.appendChild(div);

  li.appendChild(leftColumn);

  var rightColumn = document.createElement('div');
  rightColumn.className = 'right-column';

  if (entry.homepage) {
    var homepageLink = document.createElement('a');

    homepageLink.href = entry.homepage;
    homepageLink.className = 'btn btn-default';
    homepageLink.textContent = 'Home Page';

    rightColumn.appendChild(homepageLink);
  }

  if (entry.repository) {
    var repositoryLink = document.createElement('a');

    repositoryLink.href = entry.repository;
    repositoryLink.className = 'btn btn-default';
    repositoryLink.textContent = 'Source Code';

    rightColumn.appendChild(repositoryLink);
  }

  li.appendChild(rightColumn);

  return li;
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
