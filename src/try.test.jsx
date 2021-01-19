import forEach from "./try";

test('async test', (done) => {
    expect.assertions(1)
    function fetchData(fn) {
        const data = 'peanut butter';
        setTimeout(callback, 1500, data);
    }
    
    // function callback(data) {
    //   expect(data).toBe('peanut butter');
    // }

    function callback(data) {
        try {
          expect(data).toBe('peanut butter');
          done();
        } catch (error) {
          done(error);
        }
      }
  
    fetchData(callback);
  });

test("addTest", () => {
    const adad = jest.fn(() => 3);
    const num = adad(1, 2);
    expect(adad(1, 2)).toBe(3);
    expect(adad).toHaveBeenCalledTimes(2);
    expect(adad).toHaveBeenCalledWith(1, 2);
});

test("mock test ", () => {
    const mockCallback = jest.fn((x) => 42 + x);
    forEach([0, 1], mockCallback);

    // The mock function is called twice
    expect(mockCallback.mock.calls.length).toBe(2);

    // The first argument of the first call to the function was 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // The first argument of the second call to the function was 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    // The return value of the first call to the function was 42
    expect(mockCallback.mock.results[0].value).toBe(42);

    // This function was instantiated exactly twice
    expect(mockCallback.mock.instances.length).toBe(2);

    // The object returned by the first instantiation of this function
    // had a `name` property whose value was set to 'test'
    // expect(mockCallback.mock.instances[0].name).toEqual('test');

    const myMock = jest.fn();
    console.log(myMock());
    // > undefined

    myMock
        .mockReturnValueOnce(10)
        .mockReturnValueOnce("x")
        .mockReturnValue(true);

    console.log(myMock(), myMock(), myMock(), myMock());
    // > 10, 'x', true, true

    const filterTestFn = jest.fn();

    // Make the mock return `true` for the first call,
    // and `false` for the second call
    filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

    const result = [11, 12].filter((num) => filterTestFn(num));

    console.log(result);
    // > [11]
    console.log(filterTestFn.mock.calls[0][0]); // 11
    console.log(filterTestFn.mock.calls[0][1]); // 12

    // 中途更改mock的行为
    filterTestFn.mockImplementation(() => 22);
    console.log(filterTestFn());

    const myMockFn = jest
        .fn(() => "default")
        .mockImplementationOnce((cb) => cb(null, true))
        .mockImplementationOnce((cb) => cb(null, false));

    myMockFn((err, val) => console.log(val));
    // > true

    myMockFn((err, val) => console.log(val));
    // > false

    const myObj = {
        myMethod: jest.fn().mockReturnThis(),
    };

    // is the same as

    const otherObj = {
        myMethod: jest.fn(function () {
            return this;
        }),
    };

    // 可以被overload
    const myMockFn2 = jest
        .fn()
        .mockReturnValue("default")
        .mockImplementation((scalar) => 42 + scalar)
        .mockName("add42");

    console.log(myMockFn2(1));

    /*
    // The mock function was called at least once
    expect(mockFunc).toHaveBeenCalled();

    // The mock function was called at least once with the specified args
    expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);
    expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

    // The last call to the mock function was called with the specified args
    expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);
    expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
        arg1,
        arg2,
    ]);

    // All calls and the name of the mock is written as a snapshot
    expect(mockFunc).toMatchSnapshot();

    // The first arg of the last call to the mock function was `42`
    // (note that there is no sugar helper for this specific of an assertion)
    expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

    // A snapshot will check that a mock was invoked the same number of times,
    // in the same order, with the same arguments. It will also assert on the name.
    expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
    expect(mockFunc.getMockName()).toBe("a mock name");

    */
});
