/* eslint-disable no-undef */
import Editor from '@/index';

const editorView = new Editor({
  element: document.getElementById('editor'),
  onChange: (docs) => {
    console.log(docs);
  },
  extensions: [

  ],
});
console.log(editorView);