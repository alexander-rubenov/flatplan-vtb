'use strict';

let clientHeight = document.documentElement.clientHeight;
let clientWidth = document.documentElement.clientWidth;

console.log(clientHeight);

let pageHeader = document.querySelector('.page-header');

if (clientWidth <= 536) {
    pageHeader.style.height = clientHeight;
}
