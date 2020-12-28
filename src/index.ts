import { EditorView } from 'prosemirror-view'
import { EditorState, Selection, Plugin } from 'prosemirror-state'
import { Node, Schema, DOMParser, Mark } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import { undo, redo, history } from "prosemirror-history"
import { keymap } from "prosemirror-keymap"
import { baseKeymap } from "prosemirror-commands"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"

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

    // const myPlugin = new Plugin({
    //   props: {
    //     handleKeyDown(view, event) {
    //       return false // We did not handle this
    //     }
    //   }
    // })
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
      marks: schema.spec.marks
    })

    const state = EditorState.create({
      // schema: mySchema,
      doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
      plugins: exampleSetup({schema: mySchema})
      // plugins: [
      //   myPlugin,
      //   history(),
      //   keymap({"Mod-z": undo, "Mod-y": redo}),
      //   // keymap(baseKeymap)
      // ],
    })
    
    this.editorContainer = config.element || document.createElement('div');

    this.view = new EditorView(this.editorContainer, {
      state,
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
