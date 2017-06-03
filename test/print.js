'use strict';

describe('isUrl()', function(){
  it('should return true for a string starting with http://', function(){
    expect(isUrl('http://url')).to.be.true;
  });

  it('should return true for a string starting with https://', function(){
    expect(isUrl('https://url')).to.be.true;
  });

  it('should return false for a string starting with ftp://', function(){
    expect(isUrl('ftp://url')).to.be.false;
  });

  it('should return false for a string starting with https:', function(){
    expect(isUrl('https:url')).to.be.false;
  });

  it('should return false for a string starting with http:', function(){
    expect(isUrl('http:url')).to.be.false;
  });

  it('should return false for a string starting with data:', function(){
    expect(isUrl('data:url')).to.be.false;
  });
});

describe('toUrl()', function(){
  var baseUrl = 'https://spdx.org/licenses/';

  it('should make no changes if passed a URL', function(){
    expect(toUrl('http://url')).to.equal('http://url');
  });

  it('should treat passed string as a SPDX license and return a URL to it', function(){
    expect(toUrl('GPL-3.0')).to.equal(baseUrl + 'GPL-3.0' + '.html');
  });

  it('should remove the last character if it is a +', function(){
    expect(toUrl('GPL-3.0+')).to.equal(baseUrl + 'GPL-3.0' + '.html');
  });
});

describe('createEntryHtml()', function(){
  it('should should return an entry div element', function(){
    var div = createEntryHtml({
      name: 'testName',
      keywords: [],
    });

    expect(div.className).to.equal('entry');
    expect(div.querySelector('div.left-column > h3').textContent).to.equal('testName');
    expect(div.querySelector('div.left-column > div').innerHTML).to.be.empty;
    expect(div.querySelector('div.right-column').innerHTML).to.be.empty;
  });

  it('should include a description <p> element if the entry has a description', function(){
    var div = createEntryHtml({
      name: 'testName',
      keywords: [],
      description: 'example',
    });

    expect(div.querySelector('div.left-column > p').textContent).to.equal('example');
  });

  it('should include sorted keyword elements if passed an entry with keywords', function(){
    var div = createEntryHtml({
      name: 'testName',
      keywords: ['foo', 'bar'],
    });

    var keywordsDiv = div.querySelector('div.left-column > div');
    expect(keywordsDiv.children.length).to.equal(2);

    var keyword1 = keywordsDiv.firstElementChild;
    expect(keyword1.tagName).to.equal('SPAN');
    expect(keyword1.className).to.equal('keyword');
    expect(keyword1.querySelector('span.octicon.octicon-tag')).to.not.be.undefined;
    expect(keyword1.lastChild.nodeName).to.equal('#text');
    expect(keyword1.lastChild.textContent).to.equal('bar');

    var keyword2 = keywordsDiv.lastElementChild;
    expect(keyword2.tagName).to.equal('SPAN');
    expect(keyword2.className).to.equal('keyword');
    expect(keyword2.querySelector('span.octicon.octicon-tag')).to.not.be.undefined;
    expect(keyword2.lastChild.nodeName).to.equal('#text');
    expect(keyword2.lastChild.textContent).to.equal('foo');
  });

  it('should include a homepage link if the entry has a homepage', function(){
    var div = createEntryHtml({
      name: 'testName',
      keywords: [],
      homepage: 'https://www.example.com',
    });

    var a = div.querySelector('div.right-column > a');
    expect(a.href).to.equal('https://www.example.com/');
    expect(a.target).to.equal('_blank');
    expect(a.className).to.equal('home');
    expect(a.textContent).to.equal('Home Page');
  });

  it('should include a repository link if the entry has a repository', function(){
    var div = createEntryHtml({
      name: 'testName',
      keywords: [],
      repository: 'https://www.example.com',
    });

    var a = div.querySelector('div.right-column > a');
    expect(a.href).to.equal('https://www.example.com/');
    expect(a.target).to.equal('_blank');
    expect(a.className).to.equal('source');
    expect(a.textContent).to.equal('Source Code');
  });

  it('should include a labelled license link if the entry has a license', function(){
    var div = createEntryHtml({
      name: 'testName',
      keywords: [],
      license: 'GPL-3.0',
    });

    var a = div.querySelector('div.right-column > a');
    expect(a.href).to.equal(toUrl('GPL-3.0'));
    expect(a.target).to.equal('_blank');
    expect(a.className).to.equal('license');
    expect(a.textContent).to.equal('GPL-3.0');
  });

  it('should include an unlabelled license link if the entry has a license link', function(){
    var div = createEntryHtml({
      name: 'testName',
      keywords: [],
      license: 'https://www.example.com',
    });

    var a = div.querySelector('div.right-column > a');
    expect(a.href).to.equal('https://www.example.com/');
    expect(a.target).to.equal('_blank');
    expect(a.className).to.equal('license');
    expect(a.textContent).to.equal('License');
  });
});

describe('createKeywordHtml()', function(){
  it('should create a div element for the given keyword', function(){
    var div = createKeywordHtml({
      name: 'key',
      count: 1,
    });

    expect(div.className).to.equal('keyword');
    expect(div.firstChild.nodeName).to.equal('#text');
    expect(div.firstChild.textContent).to.equal('key');
    expect(div.firstElementChild.tagName).to.equal('SPAN');
    expect(div.firstElementChild.className).to.equal('badge');
    expect(div.firstElementChild.textContent).to.equal('1');
  });
});

describe('printAllEntries()', function(){
  before(function(){
    var div = document.createElement('div');
    div.id = 'results';
    document.body.appendChild(div);

    delete window.entries;
  });

  after(function(){
    document.body.removeChild(document.getElementById('results'));
    delete window.entries;
  });

  it('should append an element to the results div for each entry in the passed list', function(){
    expect(document.getElementById('results').children.length).to.equal(0);

    window.entries = [{
      name: 'entry1',
      keywords: [],
    }, {
      name: 'entry2',
      keywords: [],
    }];
    printAllEntries();

    var entryDivs = document.getElementById('results').children;
    expect(entryDivs.length).to.equal(2);
    expect(entryDivs[0].querySelector('h3').textContent).to.equal('entry1');
    expect(entryDivs[1].querySelector('h3').textContent).to.equal('entry2');
  });
});

describe('printKeywords()', function(){
  before(function(){
    var div = document.createElement('div');
    div.id = 'keywordList';
    document.body.appendChild(div);

    delete window.entries;
  });

  after(function(){
    document.body.removeChild(document.getElementById('keywordList'));
    delete window.entries;
  });

  it('should append an element to the keywordList div for each unique keyword in the passed entry list', function(){
    expect(document.getElementById('keywordList').children.length).to.equal(0);

    window.entries = [{
      name: 'entry1',
      keywords: ['foo', 'bar'],
    }, {
      name: 'entry2',
      keywords: ['foo'],
    }];
    printKeywords();

    var entryDivs = document.getElementById('keywordList').children;
    expect(entryDivs.length).to.equal(2);
    expect(entryDivs[0].firstChild.textContent).to.equal('foo');
    expect(entryDivs[1].firstChild.textContent).to.equal('bar');
  });
});

describe('clearResults()', function(){
  before(function(){
    var div = document.createElement('div');
    div.id = 'results';
    document.body.appendChild(div);

    div.appendChild(document.createElement('div'));
    div.appendChild(document.createElement('div'));
  });

  after(function(){
    document.body.removeChild(document.getElementById('results'));
  });

  it('should remove all children of the "results" element', function(){
    expect(document.getElementById('results').children.length).to.not.equal(0);

    clearResults();

    expect(document.getElementById('results').children.length).to.equal(0);
  });
});
