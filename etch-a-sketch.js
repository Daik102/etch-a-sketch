const container = document.querySelector('.container');
let num;

function createGrid(num) {
  if (!num) {
    num = 16;
  }
  const squareNum = num * num;
  for (let i = 0; i < squareNum; i++) {
    const block = document.createElement('div');
    block.className = 'block';
    block.style.width = `calc(40px * (16 / ${num})`;
    block.style.height = `calc(40px * (16 / ${num})`;
    container.appendChild(block);
  }

  const blocks = document.querySelectorAll('.block');

  blocks.forEach(block => {
    block.addEventListener('mouseenter', () => {
      block.classList.add('hovering');
    });
  });

  const clear = document.querySelector('.clear');

  clear.addEventListener('click', () => {
    blocks.forEach(block => {
      block.classList.remove('hovering');
    });
});
}

createGrid();

const adjust = document.querySelector('.adjust');

adjust.addEventListener('click', () => {
  const input = Number(prompt('Number of squares per side? (Max: 100)'));
  if (isNaN(input)) {
    alert('Please input number');
    return;
  } else if (!input) {
    return;
  } else if (input > 100) {
    alert('Max number is 100');
    return;
  } else if (input < 1) {
    alert('Min number is 1');
    return;
  }  else if (!Number.isInteger(input)) {
    alert('Please input integer');
    return;
  }
  container.textContent = '';
  createGrid(input);
});