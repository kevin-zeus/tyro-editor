import Extension, { TExtensionOptions } from './Extension';

export default class Strong extends Extension {
  type = 'mark'

  constructor(options: TExtensionOptions) {
    super(options);
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }
    return {
      type: 'strong',
      group: 'mark',
      parseDOM: [
        { tag: "strong" },
        { tag: "b", getAttrs: node => node.style.fontWeight != "normal" && null },
        { style: "font-weight", getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null }
      ],
      toDOM() { return ['b', 0] }
    }
  }

}