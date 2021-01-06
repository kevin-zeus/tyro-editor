import { EditorView } from 'prosemirror-view';
import { Extension } from "../../extensions"

export type TPostion = {
  top: number
  right: number
  bottom: number
  left: number
}

export default class Menu {
  editorView: EditorView
  wrapper: HTMLElement
  menu: HTMLElement

  constructor(editorView: EditorView) {
    this.editorView = editorView
  }

  updatePos() {}

  show() {}

  hide() {}

  private render() {

  }

  private getMenusFromExtensions(extensions: Extension[]) {

  }
}