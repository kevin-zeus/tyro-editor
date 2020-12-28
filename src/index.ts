import { EditorView } from 'prosemirror-view';
import { EditorState, Selection, Plugin } from 'prosemirror-state';
import { Node, Schema, Mark } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';

export interface IStateConfig<S extends Schema = any> {
  schema?: S|null
  doc?: Node|null
  selection?: Selection|null
  storedMarks?: Mark[]|null
  plugins?: Plugin[]|null
}

export interface IEditorProps {
  stateOptions: IStateConfig
  element: HTMLElement
  onChange: (doc: Node) => void
}

class Editor {
  editorContainer: HTMLElement
  view: EditorView

  constructor(config: IEditorProps) {
    console.log('editor view =====>', config);
    this.editorContainer = config.element || document.createElement('div');
    this.view = new EditorView(this.editorContainer, {
      state: EditorState.create({schema}),
      dispatchTransaction: (transaction) => {
        const { state, transactions } = this.view.state.applyTransaction(transaction);
        this.view.updateState(state);
        if (transactions.some((tr) => tr.docChanged)) {
          config.onChange(state.doc); // 外部暴露doc的变化
        }
      },
    });
    console.log('view ====>', this.view);
  }
}

(window as any).Editor = Editor;
export default Editor;
