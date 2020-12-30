import Extension, { TExtensionOptions } from './Extension';

export default class Paragraph extends Extension {
  constructor(options: TExtensionOptions) {
    super(options);
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }
    return {
      type: 'paragraph',
      group: 'block',
      content: 'inline*',
      parseDOM: [{tag: 'p'}],
      toDOM() { return ['p', 0] }
    }
  }

}