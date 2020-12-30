/* eslint-disable no-undef */
import Editor from '../../src/Editor';
import { Paragraph, Strong } from '../../src/extensions/index';

const editorView = new Editor({
  element: document.getElementById('editor'),
  onChange: (docs) => {
    console.log(docs);
  },
  extensions: [
    new Paragraph(),
    new Strong,
  ],
});
console.log(editorView);