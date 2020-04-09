import {unique, returnRelevantParams, filterDataByParams} from './DataHelpers';

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