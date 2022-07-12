function leaveAlert() {
    Swal.fire({
        title:" You're about to leave this session ",
        html:"Are u sure?",
        icon:'question',
        confirmButtonColor: '#a18883',
        showCancelButton: true,
        cancelButtonColor: '#a18883',
        showClass: {
           popup: 'animate__animated animate__fadeInDown'
         },
         hideClass: {
           popup: 'animate__animated animate__fadeOutUp'
         },
        backdrop: `
        rgba(239, 200, 177, 0.6)`,
         heightAuto:'false',
         confirmButtonText: 'Yes !',
         cancelButtonText: 'No, go back !',
         allowOutsideClick: false ,
         allowEscapeKey:false,
         allowEnterKey:false,
         keydownListenerCapture:true,

    }).then((result) => {
        if(result.isConfirmed) {
            window.location.href = '/chatapp'
        }
    })
}

function homeAlert() {
    Swal.fire({
        title:" You're about to leave this session and return home ",
        html:"Are u sure?",
        icon:'question',
        confirmButtonColor: '#a18883',
        showCancelButton: true,
        cancelButtonColor: '#a18883',
        showClass: {
           popup: 'animate__animated animate__fadeInDown'
         },
         hideClass: {
           popup: 'animate__animated animate__fadeOutUp'
         },
        backdrop: `
        rgba(239, 200, 177, 0.6)`,
         heightAuto:'false',
         confirmButtonText: 'Yes !',
         cancelButtonText: 'No, go back !',
         allowOutsideClick: false ,
         allowEscapeKey:false,
         allowEnterKey:false,
         keydownListenerCapture:true,

    }).then((result) => {
        if(result.isConfirmed) {
            window.location.href = '/'
        }
    })
}

