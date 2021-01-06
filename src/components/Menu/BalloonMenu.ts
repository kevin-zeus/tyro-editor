import { EditorView } from 'prosemirror-view';
import { TextSelection } from 'prosemirror-state';
import { findChildren } from 'prosemirror-utils';
import crelt from 'crelt';

import { MarkExtension } from '../../extensions';
import Menu from './Menu';
import { getOffset } from '../../utils';

const prefix = 'TyroEditor-balloonmenu';

export default class BalloonMenu extends Menu {
  constructor(editorView: EditorView, extensions: MarkExtension[], options?) {
    super(editorView);

    this.wrapper = crelt('div', { class: prefix + '-wrapper' })
    this.menu = this.wrapper.appendChild(crelt('div', { class: prefix }))
    this.menu.className = prefix;

    this._renderMenuItems(extensions)
    this.hide()

    document.addEventListener('selectionchange', (e) => {
      console.log(editorView.state.selection)
      const selection = editorView.state.selection
      if (selection instanceof TextSelection) {
        const { from, to, empty } = selection
        if (from === to && empty) { this.hide() }
        else { this.show() }
      } else {
        this.hide()
      }
    })

    document.addEventListener('selectstart', () => {
      console.log('开始选区')
    })
  }

  // 渲染气泡菜单条
  private _renderMenuItems(extensions: MarkExtension[]) {
    extensions.forEach(extension => {
      console.log(extension.registerMenu(this.editorView))
      let { dom, update } = extension.registerMenu(this.editorView).render(this.editorView)
      this.menu.appendChild(dom)

      document.addEventListener('selectionchange', e => {
        update(this.editorView.state)
      })
    })
  }

  show() {
    this.wrapper.style.display = ''
  }

  hide() {
    this.wrapper.style.display = 'none'
  }
}

// 计算当前聚焦输入的块距离顶部的位置
function calculateTop(view: EditorView) {
  const { state } = view;
  const { selection } = state;
  if (!selection || !selection.empty) return null;

  const { $anchor } = selection;
  if ($anchor.pos === 0) return null;

  const resolvePos = state.doc.resolve($anchor.pos);
  const rowNumber = resolvePos.path[1];
  let i = 0;
  const [firstNode] = findChildren(
    state.doc,
    _node => {
      if (rowNumber === i || rowNumber + 1 === i) {
        i ++;
        return true;
      }
      i ++;
      return false;
    }
  );
  if (!firstNode) return null;

  const coords = view.coordsAtPos(firstNode.pos);
  const dom = view.nodeDOM(firstNode.pos) as HTMLElement;
  const elementTop = getOffset(dom).top;
  const offsetTop = getOffset(view.dom).top;

  if (coords.top === 0) return null;
  if (dom && dom.offsetHeight) return elementTop + dom.offsetHeight - offsetTop + 20;
  return elementTop - offsetTop + 20;
}