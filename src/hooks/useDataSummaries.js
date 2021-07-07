import { min, max, uniq } from 'lodash';

const useDataSummaries = (data, xVar, yVar, xMaxOverride, xMinOverride, yMaxOverride, yMinOverride) => {

    const xs = data.map(d => d[xVar]);
    const ys = data.map(d => d[yVar]);


    const minX = xMinOverride || min(xs)
    const maxX = xMaxOverride || max(xs)
    const minY = yMinOverride || min(ys)
    const maxY = yMaxOverride || max(ys)
    const uniqX = uniq(xs)
    const uniqY = uniq(ys)

    return { minX, maxX, minY, maxY, uniqX, uniqY}
}

export default useDataSummaries;