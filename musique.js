function loadAudio(id, filePath) {
  const audioElement = document.getElementById(id);
  const sourceElement = document.getElementById(id + "Source");

  sourceElement.src = filePath;
  audioElement.load(); // Charge le nouveau fichier audio

  return audioElement;
}
