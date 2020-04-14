import {unique, returnRelevantParams, filterDataByParams, closestFromArray, removeParams, leftJoinByAttr} from './DataHelpers';

const tmpdata = [{name: 'jennifer', age: 29}, {name: 'james', age: 29}, {name: 'james', age: 29, hair: 'brown'}];
const selectedParams = {name: 'james', age: 29, badparam: 'real bad'};
const rightData = [{name: 'james', badparam: 'real bad', eye_color: 'purple'}, {name: 'jennifer', badparam: 'okay bad', eye_color: 'magenta'}];

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

test('removeParams() should removed specified array of params', () => {
    expect(removeParams(selectedParams, ['badparam', 'age'])).toStrictEqual({name: 'james'});
})

test('leftJoinByAttr() should join single attribute', () => {
    expect(leftJoinByAttr(tmpdata, rightData, ['name'], {badparam: 'badparam'})).toStrictEqual([{name: 'jennifer', age: 29, badparam: 'okay bad'}, {name: 'james', age: 29, badparam: 'real bad'}, {name: 'james', age: 29, hair: 'brown', badparam: 'real bad'}]);
})

test('leftJoinByAttr() should join multiple attributes', () => {
    expect(leftJoinByAttr(tmpdata, rightData, ['name'], {badparam: 'badparam', eye_color: 'eye_color'})).toStrictEqual([{name: 'jennifer', age: 29, badparam: 'okay bad', eye_color: 'magenta'}, {name: 'james', age: 29, badparam: 'real bad', eye_color: 'purple'}, {name: 'james', age: 29, hair: 'brown', badparam: 'real bad', eye_color: 'purple'}]);
})

test('leftJoinByAttr() should map new attribute name properly', () => {
    expect(leftJoinByAttr(tmpdata, rightData, ['name'], {eyes: 'eye_color'})).toStrictEqual([{name: 'jennifer', age: 29, eyes: 'magenta'}, {name: 'james', age: 29, eyes: 'purple'}, {name: 'james', age: 29, hair: 'brown', eyes: 'purple'}]);
})

