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

const turnPoint = (point) => [point[1], point[0]]

const transponate = (array) => 
  array[0].map((_, colIndex) => array.map(row => row[colIndex]));

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

submit.addEventListener('click', () => {
  matrix = input([+xInput.value, +yInput.value]);
  render();
  popup.classList.toggle('disable');
})

aside.addEventListener('click', (el) => {
  const boxes = document.getElementsByClassName('box');
  let st = null;
  if (el.target.id == 'start') {
    el.target.setAttribute('disabled', true);
    st = 0;
  }
  if (el.target.id == 'end') {
    el.target.setAttribute('disabled', true);
    st = 1;
  }
  if (el.target.id == 'obst') {
    st = 2;
  }
  if (el.target.id == 'reset') {
    st = 3;
  }
  if (el.target.id == 'run') {
    findingCycle(startPoint, endPoint);
    res.reverse().map(el => {
        matrix[el[1]][el[0]] = {flag: 'c'}
        render();
      })
  }
  field.addEventListener('click', (e) => {
    if (st === 0) {
      st = null
      startPoint = [e.target.innerHTML.split(' ')[1], e.target.innerHTML.split(' ')[0]];
      matrix[startPoint[1]][startPoint[0]] = {flag: 's'};
      render()
    }
    if (st === 1) {
      st = null;
      endPoint = [e.target.innerHTML.split(' ')[1], e.target.innerHTML.split(' ')[0]];
      matrix[endPoint[1]][endPoint[0]] = {flag: 'e'};
      render()
    }
    if (st === 2) {
      obstacles.push([e.target.innerHTML.split(' ')[1], e.target.innerHTML.split(' ')[0]])
      for (let i = 0; i < obstacles.length; i++) {
        matrix[obstacles[i][1]][obstacles[i][0]] = {flag: 'o'};
      }
      render()
    }
    if (st === 3) {
      point = [e.target.innerHTML.split(' ')[1], e.target.innerHTML.split(' ')[0]];
      matrix[point[1]][point[0]] = {flag: '-'};
      render()
    }
  })
})