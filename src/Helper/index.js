
const sortByName = (sortBy) => (a, b) => {
    return a[1].userInfo?.[sortBy] > b[1].userInfo?.[sortBy].low ? 1 : -1;
};

const catId = (a, b) => {
    const combinedId = a > b ? a + b : b + a;
    return combinedId;
}
export { sortByName ,catId}

