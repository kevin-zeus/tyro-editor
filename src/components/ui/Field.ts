export default class Field {
  options: any

  constructor(options) {
    this.options = options;
  }

  read(dom: any) {
    return dom.value;
  }

  clean(value) {
    return this.options.clean ? this.options.clean(value) : value;
  }
}