import { EditorView } from 'prosemirror-view';
import { EditorState, Selection, Plugin } from 'prosemirror-state';
import { Node, Schema, Mark } from 'prosemirror-model';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { history, undo, redo } from 'prosemirror-history';

import { getWrapElement } from './utils';
import SchemaFactory from './utils/SchemaFactory';
import MenuFactory from './utils/MenuFactory'

import './style/index.css'

export interface IStateConfig<S extends Schema = any> {
  schema?: S|null
  doc?: Node|null
  selection?: Selection|null
  storedMarks?: Mark[]|null
  plugins?: Plugin[]|null
}

export type TEditorConfig = {
  extensions: []
  element: HTMLElement
  onChange: (doc: Node) => void
}

class Editor {
  editorContainer: HTMLElement
  wrapElement: HTMLElement
  view: EditorView

  constructor(config: TEditorConfig) {
    console.log('editor view =====>', config);
    if (!config.element) {
      throw new Error('element prop have be a html element');
    }
    if (!config.extensions) {
      throw new Error('extensions can not be undefined');
    }

    // 编辑器容器DOM初始化
    this.editorContainer = config.element;
    this.wrapElement = getWrapElement(this.editorContainer);

    const schemaFactory = new SchemaFactory(config.extensions);
    const schema = schemaFactory.getSchema();

    const state = EditorState.create({
      schema,
      plugins: [
        history(),
        keymap(baseKeymap),
        keymap({'Mod-z': undo, 'Mod-y': redo })
      ]
    })

    this.view = new EditorView(this.wrapElement, {
      state,
      dispatchTransaction: (transaction) => {
        const { state, transactions } = this.view.state.applyTransaction(transaction);
        this.view.updateState(state);
        if (transactions.some((tr) => tr.docChanged)) {
          config.onChange(state.doc.toJSON()); // 外部暴露doc的变化
        }
      },
    });

    // 菜单初始化
    const menuFactory = new MenuFactory(this.view, this.wrapElement, config.extensions)
    menuFactory.renderMenuBar()

    console.log('view ====>', this.view);
  }
}

(window as any).Editor = Editor;
export default Editor;
