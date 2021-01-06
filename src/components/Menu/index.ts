import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands'
import MenuItem from './MenuItem';

export { default as BlockMenu } from './BlockMenu';
export { default as BalloonMenu } from './BalloonMenu'
export { default as MenuItem } from './MenuItem'; 

export function canInsert(state, nodeType) {
  let $from = state.selection.$from;
  for (let d = $from.depth; d >= 0; d--) {
    let index = $from.index(d);
    if ($from.node(d).canReplaceWith(index, index, nodeType)) return true;
  }
  return false;
}

export function cmdItem(cmd, options) {
  let passedOptions = {
    label: options.title,
    run: cmd
  }
  for (let prop in options) passedOptions[prop] = options[prop]
  if ((!options.enable || options.enable === true) && !options.select)
    passedOptions[options.enable ? "enable" : "select"] = state => cmd(state)

  return new MenuItem(passedOptions)
}

export function markActive(state, type) {
  let {from, $from, to, empty} = state.selection
  if (empty) return type.isInSet(state.storedMarks || $from.marks())
  else return state.doc.rangeHasMark(from, to, type)
}

// 文本标记菜单
export function markItem(markType, options) {
  let passedOptions = {
    active(state) { return markActive(state, markType) },
    enable: true
  }
  for (let prop in options) passedOptions[prop] = options[prop]
  return cmdItem(toggleMark(markType), passedOptions)
}

// 文本块菜单
export function blockTypeItem(nodeType, options) {
  let command = setBlockType(nodeType, options.attrs)
  let passedOptions = {
    run: command,
    enable: (state) => command(state),
    active: state => {
      const { $from, to, node } = state.selection
      if (node) return node.hasMarkup(nodeType, options.attrs)
      return to <= $from.end() && $from.parent.hasMarkup(nodeType, options.attrs)
    }
  }
  for (let prop in options) passedOptions[prop] = options[prop]
  return new MenuItem(passedOptions);
}

// 文本容器菜单
export function wrapItem(nodeType, options) {
  let passedOptions = {
    run: (state, dispatch) => wrapIn(nodeType, options.attrs)(state, dispatch),
    select: state => wrapIn(nodeType. options.attrs instanceof Function ? null : options.attrs)(state),
  }
  passedOptions = { ...passedOptions, ...options }
  return new MenuItem(passedOptions);
}