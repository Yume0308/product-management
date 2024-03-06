const formSortItem = document.querySelector("#form-sort-item");
if(formSortItem) {
    const formSelect = formSortItem.querySelector(".form-select");
    let url = new URL(location.href);
    formSelect.addEventListener("change",event=>{
        const [sortKey,sortValue] = event.target.value.split("-");
        
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);
        
        location.href=url;
    })
}