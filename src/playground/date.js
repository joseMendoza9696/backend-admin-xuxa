const dateFormat = require('dateformat');
const now = new Date();

const a = dateFormat(now);
// console.log(a);
// console.log(now);
// console.log(now.getDay());
// console.log(now.getMonth()+1);
// console.log(now.getFullYear());

const hoy = new Date();
const ano = hoy.getFullYear();
const mes = hoy.getMonth();
const dia = hoy.getDate();
const hora = hoy.getHours();
const minuto = hoy.getMinutes();
const hoy2 = new Date(ano,mes,dia,23,59,59);

const n = dateFormat(hoy2);

console.log(hoy2);
console.log(n);