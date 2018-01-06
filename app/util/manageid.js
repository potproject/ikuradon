export function getMinMaxId(lowest, highest, data) {
    lowest = lowest === null ? Number.POSITIVE_INFINITY : lowest;
    highest = highest === null ? Number.NEGATIVE_INFINITY : highest;
    let tmp;
    for (let i = data.length - 1; i >= 0; i--) {
        tmp = data[i].id;
        if (tmp < lowest) { lowest = tmp }
        if (tmp > highest) { highest = tmp }
    }
    return {
        minId: lowest,
        maxId: highest
    };
}