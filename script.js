/* eslint-disable radix */
const colors = document.querySelectorAll('.color');
colors[0].style.background = 'black';
colors[0].classList.add('selected');

const button = document.createElement('button');
button.id = 'button-random-color';
button.innerText = 'Cores aleatórias';

const header = document.getElementsByTagName('header')[0];
header.appendChild(button);

const createPixels = (quantity) => {
  const gridContainer = document.querySelector('#pixel-board');
  console.log('gridContainer');

  for (let item = 0; item < quantity; item += 1) {
    const pixelBox = document.createElement('div');
    pixelBox.className = 'pixel-box';

    for (let index = 0; index < quantity; index += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.style.background = 'rgb(255, 255, 255)';
      pixelBox.appendChild(pixel);
    }

    gridContainer.appendChild(pixelBox);
  }
};

const settingStorage = (key, value) => {
  const paletteValues = JSON.parse(localStorage.getItem('colorPalette'));

  if (paletteValues) {
    localStorage.setItem('colorPalette', JSON.stringify({
      ...paletteValues,
      [key]: value,
    }));
  } else {
    localStorage.setItem('colorPalette', JSON.stringify({
      [key]: value,
    }));
  }
};

const colorGenerate = () => {
  const red = parseInt(Math.random() * 255);
  const green = parseInt(Math.random() * 255);
  const blue = parseInt(Math.random() * 255);

  return `rgba(${red}, ${green}, ${blue}, ${1})`;
};

const randomColors = () => {
  for (let item = 1; item < colors.length; item += 1) {
    colors[item].style.background = colorGenerate();
    settingStorage(`colorPalette${item}`, colors[item].style.background);
  }
};

button.addEventListener('click', randomColors);

const setConfigurationsStorage = () => {
  const paletteValues = JSON.parse(localStorage.getItem('colorPalette'));

  if (paletteValues) {
    for (let item = 1; item < colors.length; item += 1) {
      colors[item].style.background = Object.values(paletteValues)[item - 1];
    }
  } else {
    randomColors();
  }
};

setConfigurationsStorage();
createPixels(5);

const selectColor = ({ target }) => {
  const selectedElement = document.querySelector('.selected');
  selectedElement.classList.remove('selected');
  target.classList.add('selected');
};

for (let item = 0; item < colors.length; item += 1) {
  colors[item].addEventListener('click', selectColor);
}

const paintPixel = ({ target }) => {
  const selectedElement = document.querySelector('.selected');
  const colorSelected = selectedElement.style.background;
  target.style.background = colorSelected;
};

const pixels = document.querySelectorAll('.pixel');

console.log(pixels);
for (let item = 0; item < pixels.length; item += 1) {
  pixels[item].addEventListener('click', paintPixel);
}

