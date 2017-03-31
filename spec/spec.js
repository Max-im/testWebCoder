var test = require('../src/js/main.js')

describe("spec", function() {
  it("testing test function", function() {
  	// prepare
  	var res;

  	// act
  	res = test.myTest("3", "2");
  	// console.log(result);

  	// assert

    expect(res).toBe(9);
  });
});

