'use strict';

describe('search()', function(){
  beforeEach(function(){
    var div = document.createElement('div');
    div.id = 'results';
    document.body.appendChild(div);

    div.appendChild(document.createElement('div'));
    div.appendChild(document.createElement('div'));

    window.entries = [{
      name: 'entry1',
      keywords: ['foo', 'bar'],
    }, {
      name: 'entry2',
      keywords: ['foo'],
    }];

    window.index = {
      search: function(text) {
        var matches = [];
        for (var i = 0; i < entries.length; i += 1) {
          if (entries[i].keywords.indexOf(text) !== -1) {
            matches.push({ ref: i });
          }
        }
        return matches;
      },
    };
  });

  afterEach(function(){
    document.body.removeChild(document.getElementById('results'));
    delete window.entries;
    delete window.index;
  });

  it('should remove any existing children of the results div', function(){
    expect(document.getElementById('results').children.length).to.not.equal(0);

    window.entries = [];
    search({ target: { value: '' } });

    expect(document.getElementById('results').children.length).to.equal(0);
  });

  it('should list all entries if the search string is empty', function(){
    expect(document.getElementById('results').children.length).to.not.equal(0);

    search({ target: { value: '' } });

    var entryDivs = document.getElementById('results').children;
    expect(entryDivs.length).to.equal(2);
    expect(entryDivs[0].querySelector('h3').textContent).to.equal('entry1');
    expect(entryDivs[1].querySelector('h3').textContent).to.equal('entry2');
  });

  it('should only list matching entries if the search string is not empty', function(){
    expect(document.getElementById('results').children.length).to.not.equal(0);

    search({ target: { value: 'bar' } });

    var entryDivs = document.getElementById('results').children;
    expect(entryDivs.length).to.equal(1);
    expect(entryDivs[0].querySelector('h3').textContent).to.equal('entry1');
  });
});

describe('searchByKeyword()', function(){
  before(function(){
    var search = document.createElement('input');
    search.id = 'search';
    document.body.appendChild(search);
  });

  beforeEach(function(){
    document.getElementById('search').value = '';
  });

  after(function(){
    document.body.removeChild(document.getElementById('search'));
  });

  it('should do nothing if the event target and its parent does not have the class "keyword"', function(){
    searchByKeyword({ target: {
      className: '',
      parentElement: {
        className: '',
      },
    }});

    expect(document.getElementById('search').value).to.be.empty;
  });

  it('should set the search input\'s value to the target keyword\'s name in double quotes', function(){
    searchByKeyword({ target: {
      className: 'keyword',
      firstElementChild: {
        classList: {
          contains: function(text) {
            return true;
          },
        },
      },
      textContent: 'foo',
    }});

    expect(document.getElementById('search').value).to.equal('"foo"');

    searchByKeyword({ target: {
      className: '',
      parentElement: {
        className: 'keyword',
        firstElementChild: {
          classList: {
            contains: function(text) {
              return true;
            },
          },
        },
        textContent: 'bar',
      }
    }});

    expect(document.getElementById('search').value).to.equal('"foo" "bar"');

    searchByKeyword({ target: {
      className: 'keyword',
      firstElementChild: {
        classList: {
          contains: function(text) {
            return false;
          },
        },
      },
      firstChild: {
        textContent: 'foobar',
      },
    }});

    expect(document.getElementById('search').value).to.equal('"foo" "bar" "foobar"');
  });
});

describe('sortByLowercasedName()', function(){
  it('should return -1 if the first parameter\'s name is lexicographically less than the second\'s', function(){
    var first = { name: 'Ab' };
    var second = { name: 'bA' };

    expect(sortByLowercasedName(first, second)).to.equal(-1);
  });

  it('should return 1 if the first parameter\'s name is lexicographically greater than the second\'s', function(){
    var first = { name: 'bb' };
    var second = { name: 'bA' };

    expect(sortByLowercasedName(first, second)).to.equal(1);
  });

  it('should return 0 if the first parameter\'s name is lexicographically equal to the second\'s', function(){
    var first = { name: 'bB' };
    var second = { name: 'Bb' };

    expect(sortByLowercasedName(first, second)).to.equal(0);
  });
});

describe('toggleKeywordList()', function(){
  before(function(){
    var div = document.createElement('div');
    div.id = 'keywordList';
    document.body.appendChild(div);
  });

  beforeEach(function(){
    document.getElementById('keywordList').hidden = false;
  });

  after(function(){
    document.body.removeChild(document.getElementById('keywordList'));
  });

  it('should blur the event target', function(done){
    toggleKeywordList({ target: { blur: function(){ done(); } } });
  });

  it('should toggle the keywordList element\'s hidden state', function(){
    toggleKeywordList({ target: { blur: function(){} } });

    expect(document.getElementById('keywordList').hidden).to.be.true;

    toggleKeywordList({ target: { blur: function(){} } });

    expect(document.getElementById('keywordList').hidden).to.be.false;
  });
});

describe('initIndex()', function(){

  it('should set the name, description and keywords fields and the index ref', function(){
    var fieldNames = [];
    var refName = '';
    var obj = {
      field: function(name) {
        fieldNames.push(name);
      },
      ref: function(name) {
        refName = name;
      },
    };

    initIndex.call(obj);

    expect(fieldNames).to.deep.equal(['name', 'description', 'keywords']);
    expect(refName).to.equal('index');
  });
});

describe('fillIndex()', function(){
  after(function(){
    delete window.index;
  });

  it('should add entries to the index', function(){
    var items = [];
    window.index = {
      add: function(item) {
        items.push(item);
      },
    };

    fillIndex([{
      name: 'entry1',
      description: 'example1',
      keywords: [ 'foo', 'bar' ],
    }, {
      name: 'entry2',
      description: 'example2',
      keywords: [ 'eggs', 'milk' ],
    }]);

    expect(items.length).to.equal(2);
    expect(items[0].name).to.equal('entry1');
    expect(items[0].description).to.equal('example1');
    expect(items[0].keywords).to.equal('foo bar');
    expect(items[0].index).to.equal(0);
    expect(items[1].name).to.equal('entry2');
    expect(items[1].description).to.equal('example2');
    expect(items[1].keywords).to.equal('eggs milk');
    expect(items[1].index).to.equal(1);
  });
});
