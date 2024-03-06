const formUploadImage=document.querySelectorAll("[upload-image]");
if(formUploadImage) {
    formUploadImage.forEach(uploadImage=> {
        const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
        const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
        uploadImageInput.addEventListener("change",event=>{
            const [file] = event.target.files;
            if(file) {
                uploadImagePreview.src = URL.createObjectURL(file);
            }
            else {
                uploadImagePreview.src="";
            }
        })
    })
}