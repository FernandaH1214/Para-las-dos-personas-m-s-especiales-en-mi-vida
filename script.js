const envelope = document.getElementById('envelope');
const reveal = document.getElementById('reveal');
const tapHint = document.getElementById('tapHint');
const envelopeWrap = document.getElementById('envelopeWrap');
let revealTimer = null;
envelope.addEventListener('click', () => {
  const opened = envelope.classList.toggle('open');
  envelope.setAttribute('aria-expanded', String(opened));
  if (opened) {
    envelopeWrap.classList.add('launched');
    reveal.classList.remove('visible');
    tapHint.textContent = 'Una noticia que merece celebrarse juntas';
    // Deja que la cigüeña complete su vuelo antes de mostrar el anuncio.
    // No desplazamos la página automáticamente: quien mira puede seguir bajando cuando quiera.
    clearTimeout(revealTimer);
    revealTimer = setTimeout(() => {
      if (envelope.classList.contains('open')) reveal.classList.add('visible');
    }, 3200);
  } else {
    clearTimeout(revealTimer);
    envelopeWrap.classList.remove('launched');
    reveal.classList.remove('visible');
    tapHint.textContent = 'Toca el sobre para descubrir la sorpresa';
  }
});
document.getElementById('goDetails').addEventListener('click', () => document.getElementById('details').scrollIntoView({behavior:'smooth'}));
// A soft original tone pattern uses the browser audio engine; it does not fetch external music.

const backgroundMusic = document.getElementById('backgroundMusic');
const musicButton = document.getElementById('musicButton');
const musicState = document.getElementById('musicState');

backgroundMusic.volume = 0.35;

musicButton.addEventListener('click', async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      musicButton.textContent = 'Ⅱ Pausar música';
      musicState.textContent = 'Reproduciendo música de ambiente.';
    } catch (error) {
      musicState.textContent = 'No se pudo reproducir la canción. Revisa el archivo de audio.';
    }
  } else {
    backgroundMusic.pause();
    musicButton.textContent = '♫ Escuchar música';
    musicState.textContent = 'Música pausada.';
  }
});

backgroundMusic.addEventListener('ended', () => {
  musicButton.textContent = '♫ Escuchar música';
  musicState.textContent = 'La música ha terminado.';
});

// Galería: permite previsualizar imágenes elegidas desde el dispositivo.
document.getElementById('photoUpload').addEventListener('change', event => {
  const files = Array.from(event.target.files || []).filter(file => file.type.startsWith('image/'));
  const cards = Array.from(document.querySelectorAll('#gallery .photo'));
  files.slice(0, cards.length).forEach((file, index) => {
    const card = cards[index];
    let img = card.querySelector('img');
    if (!img) { img = document.createElement('img'); img.alt = file.name; card.prepend(img); }
    img.src = URL.createObjectURL(file); card.classList.add('has-image');
    card.querySelector('strong').textContent = file.name.replace(/\.[^.]+$/, '').slice(0, 32);
    card.querySelector('small').textContent = 'Recuerdo de mi embarazo';
  });
});
// Event details are intentionally unset. Countdown and map activate when real details are entered.
const EVENT_DATE = '';
const MAP_URL = '';
function updateCountdown() {
  if (!EVENT_DATE) return;
  const diff = new Date(EVENT_DATE).getTime() - Date.now();
  if (Number.isNaN(diff)) return;
  if (diff <= 0) { document.getElementById('dateText').textContent = '¡Hoy nos encontramos!'; ['days','hours','minutes','seconds'].forEach(id => document.getElementById(id).textContent = '0'); return; }
  const values = {days:Math.floor(diff/86400000),hours:Math.floor(diff%86400000/3600000),minutes:Math.floor(diff%3600000/60000),seconds:Math.floor(diff%60000/1000)};
  Object.entries(values).forEach(([id,value]) => document.getElementById(id).textContent = String(value).padStart(2,'0'));
}
if (EVENT_DATE) { updateCountdown(); setInterval(updateCountdown, 1000); document.getElementById('dateText').textContent = new Date(EVENT_DATE).toLocaleString('es-CL',{dateStyle:'long',timeStyle:'short'}); }
if (MAP_URL) { const mapButton = document.getElementById('mapButton'); mapButton.disabled = false; mapButton.addEventListener('click', () => window.open(MAP_URL, '_blank', 'noopener')); }
