const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const toggleBtn = document.getElementById('toggle-vid')
const toggleBtn2 = document.getElementById('toggle-audio')
const myPeer = new Peer()
let userStream;
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}


navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  userStream = stream;
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })





  socket.on('user-connected', userId => {
    setTimeout(connectToNewUser,1000,userId,stream);

  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close();
  // do something when user leaves

})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

// toggle video
toggleBtn.addEventListener('click', () => {
  const videoTrack = userStream.getTracks().find(track => track.kind === 'video');
  if (videoTrack.enabled) {
      videoTrack.enabled = false;
      toggleBtn.innerHTML = `<i class="bi bi-camera-video-off-fill fs-5"></i>`
  } else {
      videoTrack.enabled = true;
      toggleBtn.innerHTML = `<i class="bi bi-camera-video-fill fs-5"></i>`
  }
});

// toggle audio
toggleBtn2.addEventListener('click', () => {
  const videoTrack = userStream.getTracks().find(track => track.kind === 'audio');
  if (videoTrack.enabled) {
      videoTrack.enabled = false;
      toggleBtn2.innerHTML = `<i class="bi bi-mic-mute-fill fs-5"></i>`
  } else {
      videoTrack.enabled = true;
      toggleBtn2.innerHTML = `<i class="bi bi-mic-fill fs-5"></i>`
  }
});