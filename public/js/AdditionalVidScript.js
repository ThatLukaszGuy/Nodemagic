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
        confirmButtonColor: '#a18883',
        html: `You can also copy it manually here: <br> <div class="url-alert">${url}</div>`,
        showClass: {
           popup: 'animate__animated animate__fadeInDown'
         },
         hideClass: {
           popup: 'animate__animated animate__fadeOutUp'
         },
        backdrop: `
        rgba(239, 200, 177, 0.6)`,
         heightAuto:'false',
         confirmButtonText: 'Ok',
         cancelButtonText: 'No, go back !',
         allowOutsideClick: false ,
         allowEscapeKey:false,
         allowEnterKey:false,
         keydownListenerCapture:true,

    })
}