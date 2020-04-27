import {closestFromArray, createLabel} from './Helpers';

const tmpdata = [1, 100, 1000];
const interval = closestFromArray(tmpdata);

test('The return function of closestFromArray should return 100 when passed 99', () => {
    expect(interval(99)).toBe(100);
})

test('The return function should round down if less than half way to next nearest value', () => {
    expect(interval(49.9)).toBe(1);
})

test('createLabel should join strings', () => {
    expect(createLabel('james', 'bain', 1)).toBe('james-bain-1');
})