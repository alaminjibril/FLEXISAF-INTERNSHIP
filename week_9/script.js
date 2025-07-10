const display = document.getElementById("display");

const playSound = (id) => {
  const audio = document.querySelector(`audio#${id}`);
  const pad = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
    display.textContent = `Playing: ${id}`;
    pad.classList.add("active");
    setTimeout(() => pad.classList.remove("active"), 100);
  }
};

// Mouse click
document.querySelectorAll(".drum-pad").forEach(pad => {
  pad.addEventListener("click", () => {
    playSound(pad.id);
  });
});

// Keyboard press
document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();
  playSound(key);
});
