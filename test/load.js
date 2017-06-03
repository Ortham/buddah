'use strict';

describe('loadData()', function(){
  it('should load the given URL, parse its contents as JSON, and pass it to the given callback function', function(done){
    var callback = function(json) {
      expect(json).to.be.a('Array');
      expect(json[0].name).to.equal('ba2extract');
      done();
    };

    loadData('../data.json', callback);
  });
});

describe('sortByCount()', function(){
  it('should return -1 if the count of the first argument is greater than that of the second', function(){
    var first = { count: 1 };
    var second = { count: 0 };

    expect(sortByCount(first, second)).to.equal(-1);
  });

  it('should return 0 if the count of the first argument is equal to that of the second', function(){
    var first = { count: 1 };
    var second = { count: 1 };

    expect(sortByCount(first, second)).to.equal(0);
  });

  it('should return 1 if the count of the first argument is less than that of the second', function(){
    var first = { count: 0 };
    var second = { count: 1 };

    expect(sortByCount(first, second)).to.equal(1);
  });
});

describe('getKeywords()', function(){
  it('should return an empty list if passed an empty list', function(){
    expect(getKeywords([])).to.deep.equal([]);
  });

  it('should return an empty list if passed a list of entries with no keywords', function(){
    var entries = [{
      keywords: [],
    }, {
      keywords: [],
    }];

    expect(getKeywords(entries)).to.deep.equal([]);
  });

  it('should return a list of lowercased keywords sorted by the number of times they occur', function(){
    var entries = [{
      keywords: [
        'elephant',
        'KanGaRoo',
      ],
    }, {
      keywords: [
        'kangaroo',
      ],
    }];

    expect(getKeywords(entries)).to.deep.equal([{
      name: 'kangaroo',
      count: 2,
    }, {
      name: 'elephant',
      count: 1,
    }]);
  })
});
