export const getTotalPages = (total, limit) => {
    return Math.ceil(total / limit);
}

export const getPagesArray = (totalPages) => {
    let array = [];
    for (let i = 1; i <= totalPages; i++) {
        array.push(i);
    }
    return array;
}