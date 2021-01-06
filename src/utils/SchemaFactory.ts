import { Schema } from 'prosemirror-model';
import Extension from '../extensions/Extension';

export const baseNodes = {
  doc: {
    content: 'block+'
  },

  text: {
    group: 'inline'
  },

  hard_break: {
    inline: true,
    group: 'inline',
    selectable: false,
    parseDOM: [{ tag: 'br' }],
    toDOM() {
      return ['br']
    }
  }
}

export default class SchemaFactory {
  private _extensions: Extension[]

  constructor(extensions: Extension[]) {
    this._extensions = [...extensions];
  }

  getSchema() {
    let nodes = baseNodes, marks = {};
    this._extensions.forEach((extension) => {
      if (extension.type === 'mark') {
        marks[extension.schema.type] = extension.schema;
      }
      if (extension.type === 'block') {
        nodes[extension.schema.type] = extension.schema;
      }
    });
    return new Schema({ nodes, marks });
  }
}
