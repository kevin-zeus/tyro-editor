import { findChildren } from 'prosemirror-utils';

export const getWrapElement = (editorContainer: HTMLElement): HTMLElement => {
  const wrapEle: HTMLDivElement = document.createElement('div');
  wrapEle.className = 'TyroEditor';
  wrapEle.style.position = 'relative';
  wrapEle.style.padding = '2rem';
  editorContainer.appendChild(wrapEle);
  return wrapEle;
}

export const markActive = type => state => {
  const { from, $from, to, empty } = state.selection;

  return empty
    ? type.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, type);
}

export const blockActive = type => state => {
  const { selection } = state;
  const { $from, to } = state.selection;
  const { $anchor } = selection;
  const resolvedPos = state.doc.resolve($anchor.pos) as any;
  const rowNumber = resolvedPos.path[1];
  let i = 0;
  const [firstNode] = findChildren(
    state.doc,
    () => {
      if (rowNumber === i) {
        return true
      }
      i++
      return false
    },
    false
  )

  if (!firstNode) {
    return false;
  }

  return to <= $from.end() && firstNode.node.type.name === type.name;
}

export const canInsert = type => state => {
  const { $from } = state.selection;
  for (let d = $from.depth; d >= 0; d--) {
    const index = $from.index(d);

    if ($from.node(d).canReplaceWith(index, index, type)) {
      return true;
    }
  }
  return false;
}

export const getScrollTop = () => {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export const getScrollLeft = () => {
  return (
    window.pageXOffset ||
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    0
  );
}

export const getOffset = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + getScrollTop(),
    left: rect.left + getScrollLeft()
  };
}