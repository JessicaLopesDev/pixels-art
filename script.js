/* eslint-disable radix */
const colors = document.querySelectorAll('.color');
colors[0].style.background = 'black';

const button = document.createElement('button');
button.id = 'button-random-color';
button.innerText = 'Cores aleatórias';

const header = document.getElementsByTagName('header')[0];
header.appendChild(button);

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



window.onload = setConfigurationsStorage;
