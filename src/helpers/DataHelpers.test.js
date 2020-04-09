import {returnRelevantParams} from './DataHelpers';

test ('this something', () => {
    expect(returnRelevantParams([{hanes: 'hello', name: 'james'}, {item: 'name', name: 'jennifer', blog: 'somethin'}], {hanes: 'hello', name: 'james', blog: 'yes'})).toStrictEqual({hanes: 'hello', name: 'james', blog: 'yes'})
})
// returnRelevantParams([{hanes: 'hello', name: 'james'}, {item: 'name', name: 'jennifer', blog: 'somethin'}], {hanes: 'hello', name: 'james', blog: 'yes'})