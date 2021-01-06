import { EditorView } from 'prosemirror-view'
import { BalloonMenu, BlockMenu } from '../components/Menu'
import { Extension, MarkExtension, BlockExtension } from '../extensions'

export default class MenuFactory {
  editorView: EditorView
  extensions: Extension[]
  wrapper: HTMLElement

  constructor(editorView: EditorView, wrapper: HTMLElement, extensions: Extension[]) {
    this.editorView = editorView
    this.extensions = [...extensions]
    this.wrapper = wrapper
  }

  renderMenuBar() {
    const markExtensions: MarkExtension[] = [], blockExtensions: BlockExtension[] = []
    for (let i=0; i<this.extensions.length; i++) {
      if (this.extensions[i].type === 'block') {
        blockExtensions.push(this.extensions[i])
      } else if (this.extensions[i].type === 'mark') {
        markExtensions.push(this.extensions[i])
      }
    }

    // this._renderBlockMenuBar(blockExtensions)
    this._renderMarkMenuBar(markExtensions)
  }

  private _renderMarkMenuBar(extensions: MarkExtension[]) {
    console.log(this.editorView)
    const menuBar = new BalloonMenu(this.editorView, extensions).wrapper
    this.wrapper.appendChild(menuBar)
  }

  private _renderBlockMenuBar(extensions: BlockExtension[]) {
    const menuBar = new BlockMenu(this.editorView, extensions).wrapper
    this.wrapper.appendChild(menuBar)
  }
}

