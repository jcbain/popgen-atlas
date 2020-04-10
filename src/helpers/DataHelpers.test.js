import {unique, returnRelevantParams, filterDataByParams, closestFromArray, removeParams} from './DataHelpers';

const tmpdata = [{name: 'jennifer', age: 29}, {name: 'james', age: 29}, {name: 'james', age: 29, hair: 'brown'}];
const selectedParams = {name: 'james', age: 29, badparam: 'real bad'};

test('unique [1, 2, 3, 3] should return [1, 2, 3]', () => {
    expect([1, 2, 3, 3].filter(unique)).toStrictEqual([1, 2, 3]);
});

test ('returnRelevantParams() should return only params with keys in data', () => {
    expect(returnRelevantParams(tmpdata, selectedParams)).toStrictEqual({name: 'james', age: 29});
});

test('filterDataByParams() should return data where parameters are exactly equal to a specific value', () => {
    expect(filterDataByParams(tmpdata, selectedParams)).toStrictEqual([{name: 'james', age: 29}, {name: 'james', age: 29, hair: 'brown'}]);
});

test('closestToArray([1, 100, 1000])(5) should return 1', () => {
    expect(closestFromArray([1, 100, 1000])(5)).toBe(1);
});

test('removeParams() shhould removed specified array of params', () => {
    expect(removeParams(selectedParams, ['badparam', 'age'])).toStrictEqual({name: 'james'});
})