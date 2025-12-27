const playBtn = document.querySelector('.btn.play');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const currentTimeEl = document.querySelector('.time.current');
const totalTimeEl = document.querySelector('.time.total');
const volumeRange = document.getElementById('volumeRange');
const volumeLevel = document.querySelector('.volume-level');

let duration = 180; // demo duration in seconds (3:00)
let current = 0;
let interval = null;
let playing = false;

function formatTime(t){
  const m = Math.floor(t/60);
  const s = Math.floor(t%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

totalTimeEl.textContent = formatTime(duration);
volumeLevel.style.width = (volumeRange.value * 100) + '%';

function updateProgress(){
  current = Math.min(duration, current + 0.5);
  const pct = (current / duration) * 100;
  progress.style.width = pct + '%';
  currentTimeEl.textContent = formatTime(current);
  if (current >= duration) {
    clearInterval(interval);
    playing = false;
    playBtn.classList.remove('paused');
    playBtn.innerHTML = '<span class="icon">▶</span>';
  }
}

playBtn.addEventListener('click', ()=>{
  if (!playing) {
    interval = setInterval(updateProgress, 500);
    playing = true;
    playBtn.classList.add('paused');
    playBtn.innerHTML = '<span class="icon">⏸</span>';
  } else {
    clearInterval(interval);
    playing = false;
    playBtn.classList.remove('paused');
    playBtn.innerHTML = '<span class="icon">▶</span>';
  }
});

progressContainer.addEventListener('click', (e)=>{
  const rect = progressContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const pct = x / rect.width;
  current = Math.round(pct * duration);
  progress.style.width = (pct * 100) + '%';
  currentTimeEl.textContent = formatTime(current);
});

volumeRange.addEventListener('input', ()=>{
  const v = volumeRange.value;
  volumeLevel.style.width = (v * 100) + '%';
});

// keyboard space toggles play/pause
document.addEventListener('keydown', (e)=>{
  if (e.code === 'Space') { e.preventDefault(); playBtn.click(); }
});