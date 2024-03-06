const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", (event) => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.delete("page");
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      const date = new Date();
      console.log(date.toISOString());
      location.href = url;
    });
  });
}
