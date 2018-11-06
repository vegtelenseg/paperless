const teachers = require('./data').students;
const file = require('fs');
const util = require('util');

let i = -1;
let j = [];

while(teachers.length > ++i) {
  const data = {
    student_name: teachers[i],
    student_id: i + 1
  }
  j.push(data)
}

file.writeFileSync('./teachers.js', util.inspect(j, {
  maxArrayLength: 1000000,
  showHidden: true,
  depth: 1000000
}), 'utf-8'); 
console.log({j})