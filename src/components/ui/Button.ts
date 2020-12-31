const prefix = 'TyroEditor-btn';

export default class Button {
  // 
  // <button class="btn>
  //   <i class="fa fa-bold"></i>
  // </button>
  //
  dom: HTMLElement

  constructor(options: any) {
    this.dom = this.render(options)
  }

  private render(options) {
    const button = document.createElement('button');
    button.className = prefix;
    button.title = options.title;
    const i = document.createElement('i');
    i.classList.add('fa', options.icon);
    button.appendChild(i);
    return button;
  }
}