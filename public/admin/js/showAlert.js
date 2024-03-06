const message = document.querySelector(".message.info");
if(message) {
    const showAlert = message.querySelector("[show-alert]");
    const time = showAlert.getAttribute("data-time");
    const buttonClose = message.querySelector(".close-alert")

    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    },time);

    buttonClose.addEventListener("click",event=>{
        showAlert.classList.add("alert-hidden");
    })
}