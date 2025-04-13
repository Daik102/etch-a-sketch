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
}

createGrid();

const blocks = document.querySelectorAll('.block');
blocks.forEach(block => {
  block.addEventListener('mouseenter', () => {
    block.classList.add('hovering');
  });
});

const adjust = document.querySelector('.adjust');

adjust.addEventListener('click', () => {
  const input = prompt('Number of squares per side? (Max: 100)');
  container.textContent = '';
  createGrid(input);
});