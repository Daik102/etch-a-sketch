const container = document.querySelector('.container');
const size = document.querySelector('.size');
const grid = document.querySelector('.grid');
const gradation = document.querySelector('.gradation');
const erase = document.querySelector('.erase');
const clear = document.querySelector('.clear');
const sizeDisplay = document.querySelector('.size-display');
let num = 16;
let blocks;
let drawing;
let onGradation;
let onGrid;
let erasing;

function createGrid() {
  const squareNum = num * num;
  container.innerHTML = '';

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
  blocks = document.querySelectorAll('.block');
  paintGrid();
}

createGrid();

function addGradation(block) {
  if (onGradation) {
    if (block.classList.contains('gr1')) {
      block.classList.replace('gr1', 'gr2');
    } else if (block.classList.contains('gr2')) {
      block.classList.replace('gr2', 'gr3');
    }  else if (block.classList.contains('gr3')) {
      block.classList.replace('gr3', 'gr4');
    }  else if (block.classList.contains('gr4')) {
      block.classList.replace('gr4', 'gr5');
    }  else if (block.classList.contains('gr5')) {
      block.classList.replace('gr5', 'gr6');
    }  else if (block.classList.contains('gr6')) {
      block.classList.replace('gr6', 'gr7');
    }  else if (block.classList.contains('gr7')) {
      block.classList.replace('gr7', 'gr8');
    }  else if (block.classList.contains('gr8')) {
      block.classList.replace('gr8', 'gr9');
    }  else if (block.classList.contains('gr9')) {
      block.classList.replace('gr9', 'gr10');
    }  else if (block.classList.contains('gr10')) {
      return;
    } else {
      block.classList.add('gr1');
    }
  } else {
    block.classList.add('gr10');
  }
}

function paintGrid() {
  blocks.forEach(block => {
    block.addEventListener('mousedown', () => {
      if (erasing) {
        return;
      }
      addGradation(block);
      drawing = true;
    });

    document.addEventListener('dragend', () => {
      drawing = false;
    });
  
    document.addEventListener('mouseup', () => {
      drawing = false;
    });

    block.addEventListener('mouseenter', () => {
      if (erasing) {
        return;
      }
      if (drawing) {
        addGradation(block);
      }
    });
  });
}

function eraseGrid(block) {
  if (onGrid) {
    block.className = 'block lining';
  } else {
    block.className = 'block';
  }
}

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

  num = input;
  createGrid();
});

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

erase.addEventListener('click', () => {
  if (erasing) {
    erasing = false;
  } else {
    erasing = true;
  }
  erase.classList.toggle('active');

  blocks.forEach(block => {
    block.addEventListener('mousedown', () => {
      if (!erasing) {
        return;
      }
      eraseGrid(block);
      drawing = true;
    });

    document.addEventListener('dragend', () => {
      drawing = false;
    });
  
    document.addEventListener('mouseup', () => {
      drawing = false;
    });

    block.addEventListener('mouseenter', () => {
      if (!erasing) {
        return;
      }
      if (drawing) {
        eraseGrid(block);
      }
    });
  });
});

clear.addEventListener('click', () => {
  blocks.forEach(block => {
    eraseGrid(block);
  });
});