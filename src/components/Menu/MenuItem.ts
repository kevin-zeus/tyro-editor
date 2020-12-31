import crelt from 'crelt';
import { EditorView } from 'prosemirror-view';

const prefix = 'TyroEditor-menu';

export interface IMenuItemSpec {
  class?: string
  css?: string
  title: string|Function
  icon: string
  render?(view):HTMLElement
  run(state, dispatch, view, event): void
  select?(state): any
  active?(state): any
  enable?(state): any
}

export default class MenuItem {
  spec: IMenuItemSpec

  constructor(spec: IMenuItemSpec) {
    this.spec = spec;
  }

  render(view) {
    let spec = this.spec;
    let dom: HTMLElement = spec.render
      ? spec.render(view)
      : crelt(
        'button',
        { 'class': 'btn' },
        crelt('i', { 'class': `fa fa-${spec.icon}` })
      );
    if (!dom) throw new Error('MenuItem whitout icon or render property');
    if (spec.title) {
      const title = (typeof spec.title === 'function' ? spec.title(view.state) : spec.title);
      dom.setAttribute('title', title);
    }
    if (spec.class) dom.classList.add(spec.class);
    if (spec.css) dom.style.cssText += spec.css;

    dom.addEventListener('mousedown', e => {
      e.preventDefault();
      if (!dom.classList.contains(prefix + '-disabled')) {
        spec.run(view.state, view.dispatch, view, e);
      }
    });

    function update(state) {
      if (spec.select) {
        let selected = spec.select(state);
        dom.style.display = selected ? '' : 'none';
        if (!selected) return false;
      }
      let enabled = true;
      if (spec.enable) {
        enabled = spec.enable(state) || false;
        setClass(dom, prefix + '-disabled', !enabled);
      }
      if (spec.active) {
        let active = enabled && spec.active(state) || false;
        setClass(dom, prefix + '-active', active);
      }
      return true;
    }

    return { dom, update };
  }
}

function setClass(dom: HTMLElement, cls: string, on: boolean) {
  if (on) dom.classList.add(cls);
  else dom.classList.remove(cls);
}
