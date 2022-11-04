/* eslint-disable radix */
const colors = document.querySelectorAll('.color');
colors[0].style.background = 'black';

const colorGenerate = () => {
  const red = parseInt(Math.random() * 255);
  const green = parseInt(Math.random() * 255);
  const blue = parseInt(Math.random() * 255);

  return `rgba(${red}, ${green}, ${blue}, ${1})`;
};

console.log(colorGenerate());

for (let item = 1; item < colors.length; item += 1) {
  colors[item].style.background = colorGenerate();
}
