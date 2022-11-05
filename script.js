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

const input = document.createElement('input');
input.id = 'board-size';
input.placeholder = 'Número de pixels';
input.setAttribute('type', 'number');
input.setAttribute('min', '1');

const pixelsSizeButton = document.createElement('button');
pixelsSizeButton.id = 'generate-board';
pixelsSizeButton.innerText = 'VQV';

const inputContainer = document.querySelector('#input-container');
inputContainer.appendChild(input);
inputContainer.appendChild(pixelsSizeButton);

const header = document.getElementsByTagName('header')[0];
header.appendChild(randomColorButton);

const createPixels = (quantity) => {
  const gridContainer = document.querySelector('#pixel-board');

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
  localStorage.setItem('boardSize', quantity);
};

const settingPaletteStorage = (key, value) => {
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

const settingPixelsStorage = (color, index) => {
  const pixelsValues = JSON.parse(localStorage.getItem('pixelBoard'));

  const pixelSavedColor = {
    color,
    index,
  };

  if (pixelsValues) {
    localStorage.setItem('pixelBoard', JSON.stringify([
      ...pixelsValues,
      pixelSavedColor,
    ]));
  } else {
    localStorage.setItem('pixelBoard', JSON.stringify([pixelSavedColor]));
  }
};

const colorGenerate = () => {
  const red = parseInt(Math.random() * 255, 10);
  const green = parseInt(Math.random() * 255, 10);
  const blue = parseInt(Math.random() * 255, 10);

  return `rgba(${red}, ${green}, ${blue}, ${1})`;
};

const randomColors = () => {
  for (let item = 1; item < colors.length; item += 1) {
    colors[item].style.background = colorGenerate();
    settingPaletteStorage(`colorPalette${item}`, colors[item].style.background);
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

// const validatePixelSize = () => {
//   const boardSizeValue = localStorage.getItem('boardSize');

//   if (boardSizeValue) {
//     createPixels(Number(boardSizeValue));
//   } else {
//   }
// };

// validatePixelSize();

const selectColor = ({ target }) => {
  const selectedElement = document.querySelector('.selected');
  selectedElement.classList.remove('selected');
  target.classList.add('selected');
};

for (let item = 0; item < colors.length; item += 1) {
  colors[item].addEventListener('click', selectColor);
}

const pixels = document.querySelectorAll('.pixel');

const paintPixel = (target, index) => {
  const pixel = target;
  const selectedElement = document.querySelector('.selected');
  const colorSelected = selectedElement.style.background;
  pixel.style.background = colorSelected;

  settingPixelsStorage(colorSelected, index);
};

for (let index = 0; index < pixels.length; index += 1) {
  pixels[index].addEventListener('click', ({ target }) => paintPixel(target, index));
}

const handleClearPixels = () => {
  for (let item = 0; item < pixels.length; item += 1) {
    pixels[item].style.background = 'rgb(255, 255, 255)';
  }

  localStorage.removeItem('pixelBoard');
};

clearPixelsButton.addEventListener('click', handleClearPixels);

const handleSavedPixelsColors = () => {
  const pixelsValues = JSON.parse(localStorage.getItem('pixelBoard'));

  if (pixelsValues) {
    for (let index = 0; index < pixels.length; index += 1) {
      for (let index2 = 0; index2 < pixelsValues.length; index2 += 1) {
        if (index === pixelsValues[index2].index) {
          pixels[index].style.background = pixelsValues[index2].color;
        }
      }
    }
  }
};

handleSavedPixelsColors();

const handlePixelsSize = () => {
  const gridContainer = document.querySelector('#pixel-board');

  if (input.value < 1) {
    alert('Board inválido!');
    return;
  }

  gridContainer.innerHTML = '';
  localStorage.removeItem('pixelBoard');

  if (input.value < 5) {
    createPixels(5);
  } else if (input.value > 50) {
    createPixels(50);
  } else {
    createPixels(input.value);
  }
};

pixelsSizeButton.addEventListener('click', handlePixelsSize);
