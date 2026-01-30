const openEnvelope = document.getElementById("openEnvelope");
const envelope = document.querySelector(".envelope");
const letters = document.querySelectorAll(".letter");
let zIndexCounter = 10;

// Hide letters initially
letters.forEach(letter => letter.style.display = "none");

// Shuffle letters function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Open envelope
openEnvelope.addEventListener("click", () => {
  envelope.classList.add("active");
  openEnvelope.style.display = "none";

  const shuffledLetters = Array.from(letters);
  shuffle(shuffledLetters);

  shuffledLetters.forEach((letter, index) => {
    setTimeout(() => {
      letter.style.display = "block";
      letter.style.zIndex = zIndexCounter++;
      const center = document.querySelector(".cssletter").offsetWidth / 2 - letter.offsetWidth / 2;
      letter.style.left = `${center}px`;
    }, index * 100);
  });
});

// Drag letters
letters.forEach(letter => {
  let offsetX, offsetY;

  letter.addEventListener("mousedown", e => {
    if (e.target.tagName !== "BUTTON") {
      const rect = letter.getBoundingClientRect();
      letter.style.position = "fixed";
      letter.style.left = `${rect.left}px`;
      letter.style.top = `${rect.top}px`;
      letter.style.zIndex = zIndexCounter++;

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      const moveAt = (pageX, pageY) => {
        letter.style.left = `${pageX - offsetX}px`;
        letter.style.top = `${pageY - offsetY}px`;
      };

      const onMouseMove = e => moveAt(e.clientX, e.clientY);
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  });
});

// Close letters
document.querySelectorAll(".closeLetter").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const letter = e.target.closest(".letter");
    if (letter) letter.style.display = "none";
  });
});
