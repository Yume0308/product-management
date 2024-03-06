module.exports.filterStatus = (req) => {
    const filterStatus = 
    [
        {
            className:"",
            status:"",
            name:"Tất cả"
        },
        {
            className:"",
            status:"active",
            name:"Đang hoạt động"
        },
        {
            className:"",
            status:"inactive",
            name:"Đã dừng hoạt động"
        }
    ]
    let index;
    if(req.query.status) {
        index = filterStatus.findIndex((item)=>item.status == req.query.status);
    }
    else {
        index = filterStatus.findIndex((item)=>item.status=="") ;
    }
    filterStatus[index].className="active";
    return filterStatus;
}