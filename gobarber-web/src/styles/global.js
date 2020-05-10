import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-perfect-scrollbar/dist/css/styles.min.css';

export default createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   outline: 0;
 }

 *:focus {
   outline: 0;
 }

 html, body, #root {
   height: 100%;
 }

 html, body {
   overflow: auto;
 }

 body {
   -webkit-font-smoothing: antialiased !important;
 }

 body, input, button {
   font: 14px 'Montserrat', sans-serif;
 }

 a {
   text-decoration: none;
 }

 ul {
   list-style: none;
 }

 button {
   cursor: pointer;
 }
`;
