// src/fontAwesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faStar as fasStar, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'; 
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser, fasStar,farStar,faTrash,faPenToSquare); // Add the icons to the library

export { FontAwesomeIcon };
