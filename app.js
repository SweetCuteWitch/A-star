const submit = document.querySelector('#submit');
const xInput = document.querySelector('#x');
const yInput = document.querySelector('#y');
const popup = document.querySelector('#popup');
const field = document.querySelector('#field');
const aside = document.querySelector('aside');
const start = document.querySelector('#start');
const end = document.querySelector('#end');
let matrix = [];
let startPoint = [];
let endPoint = [];
let obstacles = [];
let diagon = true;

const render = () => {
  let rows = '';
  let coloumns = '';
  field.innerHTML = '';
  for (let i = 0; i < matrix.length; i++) {
    rows += 'auto ';
  }
  field.style.gridTemplateRows = rows;
  for (let i = 0; i < matrix[0].length; i++) {
    coloumns += 'auto ';
  }
  field.style.gridTemplateColumns = coloumns;
  for (let i = 0; i < matrix.length; i++)
    for (let j = 0; j < matrix[i].length; j++)
      switch (matrix[i][j].flag) {
        case'-': field.innerHTML += `<div class="box empty">${i} ${j} ${matrix[i][j].flag}</div>`; break
        case's': field.innerHTML += `<div class="box start">${i} ${j} ${matrix[i][j].flag}</div>`; break
        case'e': field.innerHTML += `<div class="box end">${i} ${j} ${matrix[i][j].flag}</div>`; break
        case'w': field.innerHTML += `<div class="box walked">${i} ${j} ${matrix[i][j].flag}</div>`; break
        case'o': field.innerHTML += `<div class="box obs">${i} ${j} ${matrix[i][j].flag}</div>`; break
        case'c': field.innerHTML += `<div class="box path">${i} ${j} ${matrix[i][j].flag}</div>`; break
      }
  aside.style.display = 'flex'
}
const rerender = () => {
  const arr = document.getElementsByClassName('box');
  let count = 0;
  for (let j = 0; j < matrix.length; j++) {
    for (let i = 0; i < matrix.length; i++) {
      switch (matrix[j][i].flag) {
        case'-': arr[count].classList = 'box empty'; break;
        case's': arr[count].classList = 'box start'; break;
        case'e': arr[count].classList = 'box end'; break;
        case'w': arr[count].classList = 'box walked'; break;
        case'o': arr[count].classList = 'box obs'; break;
        case'c': arr[count].classList = 'box path'; break;
      }
      count ++;
    }
  }
} 

submit.addEventListener('click', () => {
  matrix = input([+xInput.value, +yInput.value]);
  render();
  popup.classList.toggle('disable');
})

let st = null;
aside.addEventListener('click', (el) => {
  if (el.target.id === 'start') {
    el.target.setAttribute('disabled', true);
    st = 0;
  }
  if (el.target.id === 'end') {
    el.target.setAttribute('disabled', true);
    st = 1;
  }
  if (el.target.id === 'obst') {
    st = 2;
  }
  if (el.target.id === 'reset') {
    st = 3;
  }
  if (el.target.id === 'run') {
    findingCycle(startPoint, endPoint);
    res.reverse().map(el => {
        matrix[el[1]][el[0]] = {flag: 'c'}
      })
    rerender();
  }
  if (el.target.id === 'reset-field') {
    matrix.forEach(el => {
      el.forEach(e => {
        e.flag = '-';
      })
    });
    buffer = [];
    trace = [];
    res = [];
    obstacles = [];
    startPoint = [];
    endPoint = [];
    mousedown = false;
    document.getElementById('start').removeAttribute('disabled');
    document.getElementById('end').removeAttribute('disabled');
    rerender();
  }
  if (el.target.id === 'walk') {
    el.target.classList.toggle('no');
    diagon = !diagon
  }
  if (el.target.id === 'reset-path') {
    buffer = [];
    trace = [];
    res = [];
    matrix = [];
    matrix = input([+xInput.value, +yInput.value]);
    matrix[startPoint[1]][startPoint[0]] = {flag: 's'};
    matrix[endPoint[1]][endPoint[0]] = {flag: 'e'};
    for (let i = 0; i < obstacles.length; i++) {
      matrix[obstacles[i][1]][obstacles[i][0]] = {flag: 'o'};
    }
    rerender();
  }
})
field.addEventListener('click', (e) => {
  if (e.target.id !== 'field') {
    if (st === 0) {
      st = null
      startPoint = [e.target.innerHTML.split(' ')[1], e.target.innerHTML.split(' ')[0]];
      matrix[startPoint[1]][startPoint[0]] = {flag: 's'};
      e.target.classList.value = 'box start';
    }
    if (st === 1) {
      st = null;
      endPoint = [e.target.innerHTML.split(' ')[1], e.target.innerHTML.split(' ')[0]];
      matrix[endPoint[1]][endPoint[0]] = {flag: 'e'};
      e.target.classList.value = 'box end';
    }
    if (st === 2) {
      obstacles.push([e.target.innerHTML.split(' ')[1], e.target.innerHTML.split(' ')[0]])
      for (let i = 0; i < obstacles.length; i++) {
        matrix[obstacles[i][1]][obstacles[i][0]] = {flag: 'o'};
      }
      e.target.classList.value = 'box obs';
    }
    if (st === 3) {
      point = [e.target.innerHTML.split(' ')[1], e.target.innerHTML.split(' ')[0]];
      matrix[point[1]][point[0]] = {flag: '-'};
      let index = obstacles.indexOf(point);
      obstacles.splice(index, 1);
      e.target.classList.value = 'box empty';
    }
    mousedown = !mousedown;
  }
})
field.addEventListener('mouseover', (e) => {
  if (e.target.id !== 'field') {
    if (mousedown && st === 2) {
      obstacles.push([e.target.innerHTML.split(' ')[1], e.target.innerHTML.split(' ')[0]])
      for (let i = 0; i < obstacles.length; i++) {
        matrix[obstacles[i][1]][obstacles[i][0]] = {flag: 'o'};
      }
      e.target.classList.value = 'box obs';
    }
  }
})
field.addEventListener('mouseleave', () => {
  mousedown = false;
})
