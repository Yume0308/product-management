const pagination =document.querySelector("#pagination");
if(pagination) {
    let url = new URL(window.location.href);
    const listPage = pagination.querySelectorAll(".page-item");
    listPage.forEach(item=>{
        const buttonPage = item.querySelector('button[button-pagination]')
        if(buttonPage) {
            buttonPage.addEventListener("click",()=>{
                url.searchParams.set("page",buttonPage.getAttribute("button-pagination"));
                location.href=url;
            })
        }
    })
}