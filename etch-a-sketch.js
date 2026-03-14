function addGradation(cell) {
  const currentColor = colorPicker.value;

  function resetGrade() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => cell.dataset.grade = '0');
    previousColor = currentColor;
  }

  if (gradationBtn.classList.contains('active-btn')) {
    if (previousColor !== currentColor) {
      resetGrade();
    }

    if (cell.dataset.grade < 10) {
      // Add opacity from 10% to 100%.
      const hexConvertArray = ['19', '33', '4C', '66', '80', '99', 'B2', 'CC', 'E5', 'FF'];
      const currentGrade = hexConvertArray[cell.dataset.grade];
      cell.dataset.grade = Number(cell.dataset.grade) + 1;
      cell.style.backgroundColor = currentColor + currentGrade;
    }
  } else {
    cell.style.backgroundColor = currentColor;
  }
}

function paintGrid() {
  const cells = document.querySelectorAll('.cell');
  let drawing;

  function handleMousedown(cell) {
    drawing = true;
    eraseBtn.classList.contains('active-btn') ? eraseGrid(cell) : addGradation(cell);
  }

  function handleMouseenter(cell) {
    if (drawing) {
      eraseBtn.classList.contains('active-btn') ? eraseGrid(cell) : addGradation(cell);
    }
  }
  
  cells.forEach((cell) => {
    cell.addEventListener('mousedown', () => handleMousedown(cell));
    cell.addEventListener('mouseenter', () => handleMouseenter(cell));
  });

  document.body.addEventListener('dragstart', (e) => e.preventDefault());
  document.body.addEventListener('mouseup', () => drawing = false);
}

function createGrid() {
  const squareSize = size * size;
  container.innerHTML = '';

  for (let i = 0; i < squareSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.grade = '0';
    cell.setAttribute('tabindex', '0');
    cell.style.width = `calc(3rem * (16 / ${size})`;
    cell.style.height = `calc(3rem * (16 / ${size})`;
    container.appendChild(cell);

    if (gridBtn.classList.contains('active-btn')) {
      cell.classList.add('lining');
    }
  }

  focusCell();
  paintGrid();
  sizeDisplay.textContent = `${size} * ${size}`;
}

function eraseGrid(cell) {
  cell.dataset.grade = '0';
  cell.style.backgroundColor = 'var(--sub-theme)';
}

function handleEvent(e) {
  const cells = document.querySelectorAll('.cell');
  let target = e.target;

  if (target.classList.contains('icon')) {
    target = target.parentElement;
  }
  
  if (target.classList.contains('color-picker')) {
    previousColor = colorPicker.value;
  } else if (target.classList.contains('size-btn')) {
    sizeBtn.classList.add('active-btn');
    sizeIcon.classList.add('active-icon');
    // Using setTimeout to prevent activating prompt before activating classList 'active-btn' and 'active-icon'. 
    setTimeout(() => {
      const inputNum = Number(prompt('Enter the canvas size. (Max: 100)'));
      sizeBtn.classList.remove('active-btn');
      sizeIcon.classList.remove('active-icon');

      if (isNaN(inputNum)) {
      return alert('Please input number');
    } else if (!inputNum) {
      return;
    } else if (inputNum > 100) {
      return alert('Max number is 100');
    } else if (inputNum < 1) {
      return alert('Min number is 1');
    }  else if (!Number.isInteger(inputNum)) {
      return alert('Please input integer');
    }
    
    size = inputNum
    createGrid();
    }, 100);
  } else if (target.classList.contains('grid-btn')) {
    gridBtn.classList.toggle('active-btn');
    gridIcon.classList.toggle('active-icon');
    cells.forEach(cell => cell.classList.toggle('lining'));
  } else if (target.classList.contains('gradation-btn')) {
    gradationBtn.classList.toggle('active-btn');
    gradationIcon.classList.toggle('active-icon');
  } else if (target.classList.contains('erase-btn')) {
    eraseBtn.classList.toggle('active-btn');
    eraseIcon.classList.toggle('active-icon');
    container.classList.toggle('erasing');
  } else if (target.classList.contains('clear-btn')) {
    cells.forEach(cell => eraseGrid(cell));
    clearBtn.classList.add('active-btn');
    clearIcon.classList.add('active-icon');
    
    setTimeout(() => {
      clearBtn.classList.remove('active-btn');
      clearIcon.classList.remove('active-icon');
    }, 300);
  }
}

function focusCell() {
  const cells = document.querySelectorAll('.cell');

  cells.forEach((cell, i) => {
    cell.addEventListener('keydown', (e) => {
      let cellIndex = null;

      if (e.key === ' ' || e.key === 'Enter') {
        eraseBtn.classList.contains('active-btn') ? eraseGrid(cell) : addGradation(cell);
      } else if (e.key === 'ArrowLeft') {
        if (i % size === 0) {
          btns[0].focus();
          return;
        }

        cellIndex = i - 1;

        if (cellIndex < 0) {
          cellIndex += cells.length;
        }
      } else if (e.key === 'ArrowRight') {
        if (i % size === size - 1) {
          btns[0].focus();
          return;
        }

        cellIndex = i + 1;

        if (cellIndex >= cells.length) {
          cellIndex -= cells.length;
        }
      } else if (e.key === 'ArrowUp') {
        cellIndex = i - size;

        if (cellIndex < 0) {
          cellIndex += cells.length;
        }
      } else if (e.key === 'ArrowDown') {
        cellIndex = i + size;

        if (cellIndex >= cells.length) {
          cellIndex -= cells.length;
        }
      }

      if (cellIndex !== null) {
        cells[cellIndex].focus();
      }
    });
  });
}

function focusBtn(e, i) {
  const cells = document.querySelectorAll('.cell');
  let btnIndex = 0;

  if (e.key === 'ArrowLeft') {
    cells[size - 1].focus();
  } else if (e.key === 'ArrowRight') {
    cells[0].focus();
  } else if (e.key === 'ArrowUp') {
    btnIndex = i - 1;

    if (btnIndex < 0) {
      btnIndex = btns.length - 1;
    }

    btns[btnIndex].focus();
  } else if (e.key === 'ArrowDown') {
    btnIndex = i + 1;

    if (btnIndex >= btns.length) {
      btnIndex = 0;
    }

    btns[btnIndex].focus();
  }
}

function focusColorPicker(e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    const activeElement = document.activeElement;

    if (activeElement === document.body) {
      colorPicker.focus();
    }
  }
}

const btns = document.querySelectorAll('.btn');
const colorPicker = document.querySelector('.color-picker');
const sizeBtn = document.querySelector('.size-btn');
const gridBtn = document.querySelector('.grid-btn');
const gradationBtn = document.querySelector('.gradation-btn');
const eraseBtn = document.querySelector('.erase-btn');
const clearBtn = document.querySelector('.clear-btn');
const sizeIcon = document.querySelector('.size-icon');
const gridIcon = document.querySelector('.grid-icon');
const gradationIcon = document.querySelector('.gradation-icon');
const eraseIcon = document.querySelector('.erase-icon');
const clearIcon = document.querySelector('.clear-icon');
const container = document.querySelector('.container');
const sizeDisplay = document.querySelector('.size-display');
let previousColor = '#000000';
let size = 16;

btns.forEach((btn) => btn.addEventListener('click', handleEvent));
btns.forEach((btn, i) => btn.addEventListener('keydown', (e) => focusBtn(e, i)));
document.body.addEventListener('keydown', focusColorPicker);
// Initial rendering.
createGrid();
