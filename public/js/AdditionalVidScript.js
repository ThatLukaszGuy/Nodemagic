function reloadPage() {
    window.location.reload()
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    copyAlert()
}

function copyAlert() {
    const url = window.location.href;

    Swal.fire({
        title:"Text Copied to Clipboard!",
        confirmButtonColor: 'rgba(240, 128, 128, 1)',
        html: `You can also copy it manually here: <br> <div class="url-alert">${url}</div>`,
        showClass: {
           popup: 'animate__animated animate__fadeInDown'
         },
         hideClass: {
           popup: 'animate__animated animate__fadeOutUp'
         },
        backdrop: `
            rgba(240, 128, 128, 0.4)`,
         heightAuto:'false',
         confirmButtonText: 'Ok',
         cancelButtonText: 'No, go back !',
         allowOutsideClick: false ,
         allowEscapeKey:false,
         allowEnterKey:false,
         keydownListenerCapture:true,

    })
}