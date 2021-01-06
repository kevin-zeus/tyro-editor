import { TExtensionOptions } from '../Extension'
import MarkExtension from '../MarkExtension'

export default class Blod extends MarkExtension {
  constructor(options: TExtensionOptions) {
    super(options);
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema
    }
    return {
      type: 'bold',
      group: 'mark',
      parseDOM: [
        { tag: "strong" },
        { tag: "b", getAttrs: node => node.style.fontWeight != "normal" && null },
        { style: "font-weight", getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null }
      ],
      toDOM() { return ['b', 0] }
    }
  }

  get icon() {
    return 'fa-bold'
  }
}