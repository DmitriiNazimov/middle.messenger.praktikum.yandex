import { isEqual, cloneDeep, isObject } from './myDash';

describe('utils/myDash/isEqual', () => {
  it('should return false if receive null', () => {
    // @ts-expect-error because passed data with wrong types
    expect(isEqual(null, null)).toBe(false);
  });
  it('should return false if receive not Object or Array', () => {
    expect(isEqual('123', '123')).toBe(false);
  });

  it('should return false if receive items with different length', () => {
    expect(isEqual([1, 2, 3], [1])).toBe(false);
  });

  it('should return false if arrays not equal', () => {
    expect(isEqual([1, 2, 3], [3, 4, 5])).toBe(false);
  });

  it('should return false if objects not equal', () => {
    expect(isEqual({ id: 4 }, { id: 5 })).toBe(false);
  });

  it('should return false if inner property of objects not equal', () => {
    const obj1 = { id: 4, data: { prop: 1, prop1: { prop2: 2, prop3: [1, 2, 3] } } };
    const obj2 = { id: 4, data: { prop: 1, prop1: { prop2: 2, prop3: [1, 2, 4] } } };
    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it('should return true if objects is equal', () => {
    const obj1 = { id: 4, data: { prop: 1, prop1: { prop2: 2, prop3: [1, 2, 3] } } };
    const obj2 = { id: 4, data: { prop: 1, prop1: { prop2: 2, prop3: [1, 2, 3] } } };
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('should return true if arrays is equal', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });
});

describe('utils/myDash/cloneDeep', () => {
  it('should return truthy if passed data has correct type', () => {
    expect(cloneDeep([1, 2, 3])).toBeTruthy();
    expect(cloneDeep(new Map())).toBeTruthy();
    expect(cloneDeep(new Set())).toBeTruthy();
    expect(cloneDeep({})).toBeTruthy();
  });

  it('should return cloned array', () => {
    const arr = [1, 2, 3];
    const clonedArr = cloneDeep(arr);

    expect(isEqual(arr, clonedArr)).toBe(true);

    arr.push(4, 5, 6);
    expect(isEqual(arr, clonedArr)).toBe(false);
  });

  it('should return cloned object', () => {
    const obj = { prop: { id: 1 } };
    const clonedObj = cloneDeep(obj);

    expect(isEqual(obj, clonedObj)).toBe(true);

    obj.prop.id = 123;
    expect(isEqual(obj, clonedObj)).toBe(false);
  });
});

describe('utils/myDash/isObject', () => {
  it('should return false if passed not object', () => {
    expect(isObject([1, 2, 3])).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject('123')).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(Symbol('id'))).toBe(false);
    expect(isObject(alert)).toBe(false);
    expect(isObject(new Map())).toBe(false);
    expect(isObject(new Set())).toBe(false);
  });

  it('should return true if passed object', () => {
    expect(isObject({ id: 1 })).toBe(true);
  });
});
