import { TExtensionOptions } from '../Extension'
import MarkExtension from '../MarkExtension'

export default class Italic extends MarkExtension {
  constructor(options: TExtensionOptions) {
    super(options)
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema
    }
    return {
      type: 'italic',
      group: 'mark',
      parseDOM: [
        { tag: 'i' },
        { tag: 'em' },
      ],
      toDOM() { return ['em', 0] }
    }
  }

  get icon() {
    return 'fa-italic'
  }
}
