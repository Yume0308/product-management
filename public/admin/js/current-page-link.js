const path =  location.pathname.split("/");
const sider= document.querySelector("sider");
if(sider){
    const linkPage = sider.querySelectorAll('a[page]');
    if(linkPage.length > 0 ) {
        linkPage.forEach(item=>{
            const page = item.getAttribute("page")
            if(path[2] == page) {
                item.classList.add("active");
            }
        })
    }
}