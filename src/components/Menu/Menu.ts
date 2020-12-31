import { EditorView } from 'prosemirror-view';
import { Extension } from "../../extensions"

export type TPostion = {
  top: number
  right: number
  bottom: number
  left: number
}

export default class Menu {
  type: string
  rect: DOMRect
  pos: TPostion
  selection: Selection
  isShow: boolean

  constructor(view: EditorView, extensions: Extension[]) {

  }

  updatePos() {}

  show() {}

  hide() {}

  private render() {

  }

  private getMenusFromExtensions(extensions: Extension[]) {

  }
}