import { min, max, uniq } from 'lodash';

const useDataSummaries = (data, xVar, yVar) => {

    const xs = data.map(d => d[xVar]);
    const ys = data.map(d => d[yVar]);


    const minX = min(xs)
    const maxX = max(xs)
    const minY = min(ys)
    const maxY = max(ys)
    const uniqX = uniq(xs)
    const uniqY = uniq(ys)

    return { minX, maxX, minY, maxY, uniqX, uniqY}
}

export default useDataSummaries;