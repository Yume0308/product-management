module.exports.pagination = (req,countTotalItems) => {
    let pagination = {
        limitItems:4,
        currentPage:1
    };
    pagination.totalPages = Math.ceil(countTotalItems/pagination.limitItems);
    if(req.query.page) {
        const page = parseInt(req.query.page);
        if(page<=pagination.totalPages && page>=1){ 
            pagination.currentPage = page;
        }
    }   
    pagination.skipItems = (pagination.currentPage-1)*pagination.limitItems;
    return pagination;
}