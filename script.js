// BOX GRID COLUMN ROWS INPUT CONTROLLER
const input = document.getElementById("size");
const sizeValue = document.getElementById("size-value");
const canvas = document.querySelector(".grid");

input.addEventListener("input", function () {
  const selectedOption = document.querySelector(
    `#sizes option[value="${this.value}"]`
  );
  const selectedOptionText = selectedOption.textContent;
  sizeValue.textContent = selectedOptionText;

  // creating boxes according to ?x?
  const creatingDiv = function (num, items) {
    const childs = document.querySelectorAll(".grid__items");
    childs.forEach((e) => {
      e.remove();
    });
    canvas.style.setProperty("grid-template-rows", `repeat(${items}, 1fr)`);
    canvas.style.setProperty("grid-template-columns", `repeat(${items}, 1fr)`);

    for (let i = 0; i < num; i++) {
      const box = document.createElement("div");
      box.classList.add("grid__items");
      canvas.appendChild(box);
    }
  };
  const size = +input.value;

  if (size == 1) {
    creatingDiv(64, 8);
  } else if (size == 2) {
    creatingDiv(256, 16);
  } else if (size == 3) {
    creatingDiv(1024, 32);
  } else if (size == 4) {
    creatingDiv(4096, 64);
  } else if (size == 5) {
    creatingDiv(16384, 128);
  }

  // update boxes
  update();
});

// ACTIVE BUTTONS
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((otherButton) => {
      otherButton.classList.remove("active");
    });
    button.classList.add("active");
  });
});

// CANVAS DRAWING
let isDrawing = false;
let colorFull = false;

const grid = document.querySelector(".grid");

grid.addEventListener("mousedown", () => {
  isDrawing = true;
});
grid.addEventListener("mouseup", () => {
  isDrawing = false;
});

// COLOR PICKER RGB
let colorPixel = undefined;
const inputRgb = document.querySelector(".controller__input_rgb");
inputRgb.disabled = true;
inputRgb.addEventListener("input", function (e) {
  colorPixel = this.value;
  colorFull = false;
});

// CLEAR BUTTON
const clear = document.querySelector(".controller__clear");
clear.addEventListener("click", (e) => {
  inputRgb.disabled = true;
  const items = document.querySelectorAll(".grid__items");
  items.forEach((e) => {
    e.style.backgroundColor = "white";
  });
  colorFull = false;
});

// ERASER BUTTON
const eraser = document.querySelector(".controller__eraser");
eraser.addEventListener("click", (e) => {
  inputRgb.disabled = true;
  colorPixel = "white";
  colorFull = false;
});

// RAINBOW BUTTON
const rainbow = document.querySelector(".controller__rainbow");
rainbow.addEventListener("click", (e) => {
  inputRgb.disabled = true;
  colorFull = true;
});

// RGB BUTTON
const rgbBtn = document.querySelector(".controller__rgb");
rgbBtn.addEventListener("click", (e) => {
  inputRgb.disabled = false;
  colorFull = false;
  colorPixel = inputRgb.value;
});

// painting pixels
function update() {
  const items = document.querySelectorAll(".grid__items");
  items.forEach((e) => {
    e.addEventListener("mousemove", () => {
      if (isDrawing) {
        // RAINBOW BUTTON
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        if (colorFull) {
          colorPixel = `rgb(${r}, ${g}, ${b})`;
        }
        e.style.backgroundColor = colorPixel;
      }
    });
  });
}
update();
