module.exports.sort = (req) => {
    const [sortKey,sortValue] = [req.query.sortKey,req.query.sortValue]
    let sort = {};
    if(sortKey && sortValue) {
        sort[sortKey] = sortValue;
    }
    else {
        sort.position = "desc";
    }
    return sort ;
}