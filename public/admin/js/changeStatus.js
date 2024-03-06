const buttonChangeStatus=document.querySelectorAll("a[button-change-status]");
if(buttonChangeStatus) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(button=>{
        button.addEventListener("click",event=>{
            const currentStatus = button.getAttribute("current-status");
            const statusChange = (currentStatus=="active" ? "inactive" : "active" );
            
            const dataId = button.getAttribute("data-id");
            
            formChangeStatus.action = `${path}/${statusChange}/${dataId}?_method=PATCH`;
            formChangeStatus.submit();
        })
    })
}