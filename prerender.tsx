import React from 'react';
import { renderToString } from 'react-dom/server';
import Website from './App';

console.log(renderToString(<Website />));
