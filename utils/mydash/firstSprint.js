function last(list) {
    if (!Array.isArray(list) || !list.length) {
        return undefined;
    }

    return list[list.length - 1];
}


function first(list) {
    if (!Array.isArray(list) || !list.length) {
        return undefined;
    }

    return list[0];
}


function range(start, end, step) {
    let result = [];

    if (typeof step !== 'number') step = 1;

    if (step < 0) step *= -1;

    if (typeof end !== 'number') {
        end = start;
        start = 0;
    }

    if (end < 0) {
        for (let i = start; i > end; i -= step) {
            result.push(i);
        }
        return result;
    }

    if (step === 0) {
        for (let i = start; i < end; i++) {
            result.push(start);
        }
        return result;
    }

    for (let i = start; i < end; i += step) {
        result.push(i);
    }
    return result;
}


function rangeRight(start, end, step) {
    return range(start, end, step).reverse();
}


function isEmpty(value) {
    if (typeof value === 'undefined') return true;
    if (value === null) return true;
    if (typeof value === 'boolean') return true;
    if (value === '') return true;
    if (typeof value === 'number') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === 'object' && value.size === 0) return true;

    if (typeof value === 'object'
        && Object.keys(value).length === 0
        && typeof value.has !== 'function') {
        return true;
    }

    return false;
}