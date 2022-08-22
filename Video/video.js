const button = document.querySelector('button');
const vid = document.querySelector('video');
const rec = document.getElementById('rec-btn');
const Junks = [];

navigator.mediaDevices
  .getUserMedia({
    audio: {
      echoCancellation: true,
    },
    video: {
      frameRate: 48,
    },
  })
  .then((stream) => {
    button.addEventListener('click', () => {
      vid.srcObject = stream;
      var records = new MediaRecorder(stream);
      records.start();
      console.log(records.state);
      records.ondataavailable = (tracks) => {
        console.log(tracks);
        Junks.push(tracks.data);
      };
      rec.addEventListener('click', () => {
        records.stop();
        console.log(records.state);
        records.onstop = (tracks) => {
          let buff = new Blob(Junks, {
            type: 'video/webm',
          });
          console.log(buff);
          console.log(buff.size);
          const showvideo = document.createElement('video');
          showvideo.src = window.URL.createObjectURL(buff);
          showvideo.controls = true;
          showvideo.autoplay = true;
          document.body.appendChild(showvideo);
        };
      });
    });
  })
  .catch(console.error);
