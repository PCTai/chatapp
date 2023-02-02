
const sortByName = (sortBy) => (a, b) => {
    return a[1].userInfo?.[sortBy] > b[1].userInfo?.[sortBy].low ? 1 : -1;
};


export {sortByName}