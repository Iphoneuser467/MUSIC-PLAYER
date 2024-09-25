document.addEventListener('DOMContentLoaded', function () {
    const playlist = document.getElementById('playlist-list');
    const playButton = document.getElementById('play-btn');
    const pauseButton = document.getElementById('pause-btn');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const currentTrackTitle = document.getElementById('current-track-title');
    const addTrackForm = document.getElementById('add-track-form');
  
    let currentTrackIndex = 0;
    let audio = new Audio();
    let isPlaying = false;
  
    // Handle Play
    playButton.addEventListener('click', () => {
      if (playlist.children.length > 0) {
        playTrack(currentTrackIndex);
      }
    });
  
    // Handle Pause
    pauseButton.addEventListener('click', () => {
      if (audio && isPlaying) {
        audio.pause();
        isPlaying = false;
      }
    });
  
    // Handle Next Track
    nextButton.addEventListener('click', () => {
      if (currentTrackIndex < playlist.children.length - 1) {
        currentTrackIndex++;
        playTrack(currentTrackIndex);
      }
    });
  
    // Handle Previous Track
    prevButton.addEventListener('click', () => {
      if (currentTrackIndex > 0) {
        currentTrackIndex--;
        playTrack(currentTrackIndex);
      }
    });
  
    // Handle Volume Change
    volumeSlider.addEventListener('input', () => {
      audio.volume = volumeSlider.value / 100;
    });
  
    // Handle Track Click
    playlist.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        currentTrackIndex = Array.from(playlist.children).indexOf(e.target);
        playTrack(currentTrackIndex);
      }
    });
  
    // Handle Adding New Track
    addTrackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('track-title').value;
      const src = document.getElementById('track-src').value;
  
      const newTrack = document.createElement('li');
      newTrack.textContent = title;
      newTrack.setAttribute('data-src', src);
      playlist.appendChild(newTrack);
  
      // Clear form
      e.target.reset();
    });
  
    function playTrack(index) {
      const track = playlist.children[index];
      if (track) {
        const src = track.getAttribute('data-src');
        audio.src = src;
        audio.play();
        isPlaying = true;
        currentTrackTitle.textContent = track.textContent;
      }
    }
  });
  