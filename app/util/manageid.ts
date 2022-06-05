export function getFirstAndLastID(data):{minId: string|number|null, maxId: string|number|null} {
    if (data.length > 0) {
        return {
            minId: data[data.length - 1].id,
            maxId: data[0].id,
        };
    }
    return {
        minId: null,
        maxId: null,
    };
}
