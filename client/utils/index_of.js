export const indexOf = function (id, items) {
    for (let i = 0; i < items.length; i++) {
        if (id === items[i].id) {
            return i;
        }
    }
    return -1;
};