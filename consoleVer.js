const input = (size) => {
  let matrix = [];
  let row = []
  for (let i = 0; i < size[0]; i++) {
    row.push({flag: '-'});
  }
  for (let i = 0; i < size[1]; i++) {
    matrix.push(row.concat());
  }
  return matrix;
}

const fillMatrix = (start, end, obstacles, ) => {
  for (let i = 0; i < obstacles.length; i++) {
    matrix[obstacles[i][1]][obstacles[i][0]] = {flag: 'o'};
  }
  matrix[start[1]][start[0]] = {flag: 's'}
  matrix[end[1]][end[0]] = {flag: 'e'}
}

const output = (matrix) => {
  console.log()
  for(let i = 0; i < matrix.length; i++) {
    let row = '';
    for(let j = 0; j < matrix[i].length; j++) {
      row += `${matrix[i][j].flag} `
    }
    console.log(row);
  }
  console.log()
}

const getDistance = (from, to) => {
  let distance = 0;
  distance = Math.sqrt(Math.abs(from[0] - to[0]) ** 2 + Math.abs(from[1] - to[1]) ** 2);
  return Math.trunc(distance * 10);
}

const checkBuffer = (node) => {
  let changed = false;
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i][1][0] == node[1][0] && buffer[i][1][1] == node[1][1]) {
      changed = true;
      if (buffer[i][0] > node[0]) {
        buffer[i] = node;
        buffer[i].push('n');
      }
    }
  }
  if (changed === false)
    buffer.push(node);
}

const checkNode = (currentNode, start) => {
  if (matrix[currentNode[1]])
    if (matrix[currentNode[1]][currentNode[0]])
      if (matrix[currentNode[1]][currentNode[0]].flag == '-' || matrix[currentNode[1]][currentNode[0]].flag == 'e') {
      checkBuffer([
        getDistance(currentNode.concat(), startPoint) + getDistance(currentNode.concat(), endPoint), 
        currentNode.concat(),
        start
      ]);
    }
}

const calculateNode = (start) => {
  let currentNode = [];
  const dots = [
    [start[0] - 1, start[1]],
    [start[0] - 1, start[1] - 1],
    [start[0], start[1] - 1],
    [start[0] + 1, start[1] - 1],
    [start[0] + 1, start[1]],
    [start[0] + 1, start[1] + 1],
    [start[0], start[1] + 1],
    [start[0] - 1, start[1] + 1]
  ]
  for (let i = 0; i < dots.length; i++) {
    currentNode = dots[i];
    checkNode(currentNode, start);
  }
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i][1][0] == start[0] && buffer[i][1][1] == start[1]) {
      trace.push(buffer[i]);
      buffer.splice(i, 1);
    }
  }
}

const getTrace = (curr) => {
  res.push(curr[2])
  trace.find(el => {
    if (el[1][0] === curr[2][0] && el[1][1] === curr[2][1]) {
      getTrace(el)
    }
  })
}

const findClosest = (iteration) => {
  const fCosts = [];
  for (let i = 0; i < iteration.length; i++) {
    fCosts.push(iteration[i][0]);
  }
  const closest = fCosts.sort(function(a, b) {
    return a - b;
  })[0];
  const res = iteration.find( el => { 
    if (el[0] === closest) {
      return el[1];
    }
  })
  try {
    return res[1]
  }
  catch {
    console.log('слышь говно собачье уебок вонючий что решил на меня лезть');
  }
}

const findingCycle = (currentNode, end) => {
  if (currentNode[0] == end[0] && currentNode[1] == end[1]) {
    res.push(endPoint, trace[trace.length - 1][1])
    // console.log(trace)
    getTrace(trace[trace.length - 1]);
    console.log('priehali') 
  }
  else {
    calculateNode(currentNode);
    const nextNode = findClosest(buffer);
    matrix[nextNode[1]][nextNode[0]] = {flag: 'w'};
    output(matrix)
    console.log(buffer);
    console.log(trace);
    findingCycle(nextNode, end);
  }
}

// const startPoint = [7, 4];
// const endPoint = [4, 1];
// const size = [11, 6];
// const obstacles = [
  // [3, 0],
  // [4, 0],
  // [5, 0],
  // [3, 1],
  // [3, 2],
  // [4, 2],
  // [5, 2],
  // [5, 1]
  // [3, 1],
  // [3, 2],
  // [4, 2],
  // [5, 2],
  // [6, 2],
  // [7, 2]

  // [3, 1],
  // [4, 2],
  // [4, 1],
// ];

// const matrix = input(startPoint, endPoint, obstacles, size);
const buffer = [];
const trace = [];
const res = [];
// findingCycle(startPoint, endPoint);

// res.reverse().map(el => {
//   output(matrix);
//   matrix[el[1]][el[0]] = {flag: 'c'}
// })
// output(matrix);
