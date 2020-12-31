import { EditorView } from 'prosemirror-view';
import { findChildren } from 'prosemirror-utils';
import crelt from 'crelt';

import { Extension } from '../../extensions';
import Menu from './Menu';
import { getOffset } from '../../utils';
import Button from '../ui/Button';

const prefix = 'TyroEditor-blockmenu';

export default class BlockMenu extends Menu {
  editorView: EditorView
  options: any
  wrapper: HTMLElement
  menu: HTMLElement
  switch: HTMLElement
  spacer: any
  maxHeight: number

  constructor(editorView: EditorView, extensions: Extension[], options?) {
    super(editorView, extensions);

    this.editorView = editorView;
    this.options = options;

    this.wrapper = crelt('div', { class: prefix + '-wrapper' });
    this.menu = this.wrapper.appendChild(crelt('div', { class: prefix }));
    this.menu.className = prefix;
    this.switch = new Button({ icon: 'fa-bold' }).dom;
    this.switch.classList.add('plus')
    this.menu.appendChild(this.switch);
    this.spacer = null;

    this.maxHeight = 0;
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