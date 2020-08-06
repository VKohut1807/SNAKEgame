"use strict"
let modal = document.getElementById("modal-window");
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        location.href=location.href;
    }
}