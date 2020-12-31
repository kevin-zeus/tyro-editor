import { TExtensionOptions } from '../Extension';
import BlockExtension from '../BlockExtension';

export default class Paragraph extends BlockExtension {
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