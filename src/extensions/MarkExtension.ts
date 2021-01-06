import { EditorView } from 'prosemirror-view'
import Extension, { TExtensionOptions } from './Extension'
import { markItem, MenuItem } from '../components/Menu'

export default class MarkExtension extends Extension {
  type: string = 'mark'

  constructor(options: TExtensionOptions) {
    super(options);
  }

  registerMenu(editorView: EditorView): MenuItem {
    const menuItem = markItem(
      editorView.state.schema.marks[this.schema.type],
      { icon: this.icon }
    )

    document.addEventListener('selectionchange', (e) => {
      console.log(menuItem)
    })
    
    return menuItem;
  }
}