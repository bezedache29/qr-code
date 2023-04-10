const wrapper = document.querySelector('.wrapper')
qrInput = wrapper.querySelector('.form input')
generateBtn = wrapper.querySelector('.form button')
qrImg = wrapper.querySelector('.qr-code img')
dlLink = document.querySelector('.dl-link')

generateBtn.addEventListener('click', () => {
  let qrValue = qrInput.value
  if (!qrValue) return
  generateBtn.innerText = 'Génération du QR Code ...'
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`
  qrImg.addEventListener('load', () => {
    wrapper.classList.add('active')
    generateBtn.innerText = 'Générer le QR Code'
    dlLink.style.display = 'flex'
  })
})

qrInput.addEventListener('keyup', () => {
  if (!qrInput.value) {
    wrapper.classList.remove('active')
    dlLink.style.display = 'none'
  }
})

dlLink.addEventListener('click', (e) => {
  e.preventDefault()
  downloadImage(qrImg.getAttribute('src'), getRandomInt(1, 100))
})

// Télécharger le QR code
function downloadImage(url, name){
  fetch(url)
    .then(resp => resp.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(() => alert('An error sorry'));
}

// Random pour nom du QR code
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}