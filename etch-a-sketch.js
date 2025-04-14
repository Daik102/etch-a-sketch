const container = document.querySelector('.container');
const size = document.querySelector('.size');
const grid = document.querySelector('.grid');
const gradation = document.querySelector('.gradation');
const clear = document.querySelector('.clear');
const sizeDisplay = document.querySelector('.size-display');
let num;
let drawing;
let onGradation;
let onGrid;
let counter = 0;

function createGrid(num) {
  container.innerHTML = '';
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
    if (onGrid) {
      block.classList.add('lining');
    }
  }

  sizeDisplay.textContent = `${num} * ${num}`;

  const blocks = document.querySelectorAll('.block');

  grid.addEventListener('click', () => {
    if (onGrid) {
      onGrid = false;
    } else {
      onGrid = true;
    }
    grid.classList.toggle('active');
    blocks.forEach(block => {
      block.classList.toggle('lining');
    });
  });

  gradation.addEventListener('click', () => {
    if (onGradation) {
      onGradation = false;
    } else {
      onGradation = true;
    }
    gradation.classList.toggle('active');
  });

  blocks.forEach(block => {
    block.addEventListener('mousedown', () => {
      console.log(onGradation);
      if (onGradation) {
        if (block.classList.contains('gradation1')) {
          block.classList.replace('gradation1', 'gradation2');
        } else if (block.classList.contains('gradation2')) {
          block.classList.replace('gradation2', 'gradation3');
        }  else if (block.classList.contains('gradation3')) {
          block.classList.replace('gradation3', 'gradation4');
        }  else if (block.classList.contains('gradation4')) {
          block.classList.replace('gradation4', 'gradation5');
        }  else if (block.classList.contains('gradation5')) {
          block.classList.replace('gradation5', 'gradation6');
        }  else if (block.classList.contains('gradation6')) {
          block.classList.replace('gradation6', 'gradation7');
        }  else if (block.classList.contains('gradation7')) {
          block.classList.replace('gradation7', 'gradation8');
        }  else if (block.classList.contains('gradation8')) {
          block.classList.replace('gradation8', 'gradation9');
        }  else if (block.classList.contains('gradation9')) {
          block.classList.replace('gradation9', 'gradation10');
        }  else if (block.classList.contains('gradation10')) {
          return;
        } else {
          block.classList.add('gradation1');
        }
      } else {
        block.classList.add('gradation10');
      }
      drawing = true;
    });

    document.addEventListener('dragstart', () => {
      drawing = false;
    });
  
    document.addEventListener('mouseup', () => {
      drawing = false;
    });

    block.addEventListener('mouseenter', () => {
      if (drawing) {
        if (onGradation) {
          if (block.classList.contains('gradation1')) {
            block.classList.replace('gradation1', 'gradation2');
          } else if (block.classList.contains('gradation2')) {
            block.classList.replace('gradation2', 'gradation3');
          }  else if (block.classList.contains('gradation3')) {
            block.classList.replace('gradation3', 'gradation4');
          }  else if (block.classList.contains('gradation4')) {
            block.classList.replace('gradation4', 'gradation5');
          }  else if (block.classList.contains('gradation5')) {
            block.classList.replace('gradation5', 'gradation6');
          }  else if (block.classList.contains('gradation6')) {
            block.classList.replace('gradation6', 'gradation7');
          }  else if (block.classList.contains('gradation7')) {
            block.classList.replace('gradation7', 'gradation8');
          }  else if (block.classList.contains('gradation8')) {
            block.classList.replace('gradation8', 'gradation9');
          }  else if (block.classList.contains('gradation9')) {
            block.classList.replace('gradation9', 'gradation10');
          }  else if (block.classList.contains('gradation10')) {
            return;
          } else {
            block.classList.add('gradation1');
          }
        } else {
          block.classList.add('gradation10');
        }
      }
    });
  });

  clear.addEventListener('click', () => {
    blocks.forEach(block => {
      if (onGrid) {
        block.className = 'block lining';
      } else {
        block.className = 'block';
      }
    });
  });
}

createGrid();

size.addEventListener('click', () => {
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
  createGrid(input);
});