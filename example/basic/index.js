/* eslint-disable no-undef */
import Editor from '../../src/Editor';
import { Paragraph, Bold } from '../../src/extensions/index';

import './style.css'

const editorView = new Editor({
  element: document.getElementById('editor'),
  onChange: (docs) => {
    console.log(docs);
  },
  extensions: [
    new Paragraph(),
    new Bold(),
  ],
});
console.log(editorView);