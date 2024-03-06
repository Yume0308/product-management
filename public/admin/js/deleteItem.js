const buttonDeleteItem=document.querySelectorAll("a[button-delete-item]");
if(buttonDeleteItem) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonDeleteItem.forEach(button=>{
        button.addEventListener("click",event=>{
            const dataId = button.getAttribute("data-id");
            formDeleteItem.action = `${path}/${dataId}?_method=PATCH`;
            const isConfirm= confirm(`Bạn có chắc muốn xoá mềm sản phẩm này không`);
            if(isConfirm == true) {
                formDeleteItem.submit();
            } 
        })
    })
    
}