// Projeto real está em repositório privado
// Aqui apenas demonstração do funcionamento da câmera

//==================================================
//===================CAMERA SCRIPT==================
//==================================================
let cameraStream = null;


function startCamera() {
  const video = document.getElementById("camera-feed");
  if (!video || cameraStream) return;

  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" },
    audio: false
  })
  .then(stream => {
    cameraStream = stream;
    video.srcObject = stream;

    video.muted = true;
    video.playsInline = true;

    // Garante que a tela já foi renderizada
    requestAnimationFrame(() => {
      setTimeout(() => {
        video.play().catch(err => {
          console.error("Falha no play:", err);
        });
      }, 50);
    });
  })
  .catch(err => {
    console.error("Erro ao acessar câmera:", err);
  });
}


function stopCamera() {
  if (!cameraStream) return;

  cameraStream.getTracks().forEach(track => track.stop());
  cameraStream = null;
}

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetClass = btn.dataset.target;

    const current = document.querySelector(".screen.active");
    const target = document.querySelector(`.${targetClass}`);

    if (!target || target === current) return;

    /* troca de telas */
    current.classList.remove("active");
    current.classList.add("exit");

    target.classList.add("active");

    /* controle da câmera */
    if (target.classList.contains("screen-base")) {
      startCamera();
    } else {
      stopCamera();
    }

    setTimeout(() => {
      current.classList.remove("exit");
    }, 250);
  });
});
