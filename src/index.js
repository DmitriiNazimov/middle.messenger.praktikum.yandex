import './testStyle.css';
import './testStyle2.css';
import {sum} from './modules/sum';

const root = document.querySelector('#root');
root.textContent = sum(25, -4).toString(); 