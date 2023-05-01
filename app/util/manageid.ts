export function getFirstAndLastID(data):{minId: string|number|null, maxId: string|number|null} {
    if (data.length > 0) {
        // Blueskyの場合はcursorを使う
        if (data[data.length - 1] && data[data.length - 1].cursor) {
            return {
                minId: data[data.length - 1].cursor,
                maxId: null
            };
        }

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
