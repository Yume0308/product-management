// check-box multi

const checkBoxMulti = document.querySelector('[checkbox-multi]');
if(checkBoxMulti) {
    const buttonCheckBoxAll = checkBoxMulti.querySelector("input[name='checkbox-all']");
    const buttonCheckBoxItem = checkBoxMulti.querySelectorAll('input[name="checkbox-item"]');
    
    // button-check-all
    if(buttonCheckBoxItem.length > 0 && buttonCheckBoxAll ) {
        buttonCheckBoxAll.addEventListener("click",event=>{
            if(buttonCheckBoxAll.checked) {
                buttonCheckBoxItem.forEach(button=>{
                    button.checked=true;
                })
            } else {
                buttonCheckBoxItem.forEach(button=>{
                    button.checked=false;
                })
            }
        })
    }

    //button-item
    if(buttonCheckBoxItem.length>0) {
        const length = buttonCheckBoxItem.length;
        buttonCheckBoxItem.forEach(button=>{
            button.addEventListener("click",event=>{
                const countChecked = checkBoxMulti.querySelectorAll('input[name="checkbox-item"]:checked').length;
                if(countChecked === length) buttonCheckBoxAll.checked=true;
                else buttonCheckBoxAll.checked=false;
            })
        })
    }
}

// form-change-multi
const formChangeMulti = document.querySelector("#form-change-multi");
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit",event=>{
        const inputChecked = checkBoxMulti.querySelectorAll('input[name=checkbox-item]:checked');
        
        if(inputChecked.length > 0 ) {
            let ids = [];
            const inputListIds = formChangeMulti.querySelector('input[name="ids"]');
            if(event.target.elements.type.value == "delete-all") {
                const isConfirm= confirm(`Bạn có chắc muốn xoá mềm ${inputChecked.length} này không`);
                if(isConfirm == false) {
                    return;
                }
            }
            inputChecked.forEach(item=>{
                ids.push(item.getAttribute("value"));
                inputListIds.setAttribute("value",ids.join(", "));
            })
            formChangeMulti.submit();
        } 
        else {
            alert("Vui lòng chọn ít nhất 1 mục")
        }
    })
}