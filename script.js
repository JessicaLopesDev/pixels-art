/* eslint-disable radix */
const colors = document.querySelectorAll('.color');
colors[0].style.background = 'black';
colors[0].classList.add('selected');

const randomColorButton = document.createElement('button');
randomColorButton.id = 'button-random-color';
randomColorButton.innerText = 'Cores aleatórias';

const clearPixelsButton = document.createElement('button');
clearPixelsButton.id = 'clear-board';
clearPixelsButton.innerText = 'Limpar';

const clearButtonContainer = document.querySelector('#clear-button-container');
clearButtonContainer.appendChild(clearPixelsButton);

const header = document.getElementsByTagName('header')[0];
header.appendChild(randomColorButton);

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

randomColorButton.addEventListener('click', randomColors);

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

const pixels = document.querySelectorAll('.pixel');

const paintPixel = ({ target }) => {
  const selectedElement = document.querySelector('.selected');
  const colorSelected = selectedElement.style.background;
  target.style.background = colorSelected;
};

for (let item = 0; item < pixels.length; item += 1) {
  pixels[item].addEventListener('click', paintPixel);
}

const handleClearPixels = () => {
  for (let item = 0; item < pixels.length; item += 1) {
    pixels[item].style.background = 'rgb(255, 255, 255)';
  }
};

clearPixelsButton.addEventListener('click', handleClearPixels);
