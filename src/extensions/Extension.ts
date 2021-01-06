import { Node } from 'prosemirror-model'
import { EditorView } from 'prosemirror-view'
import { MenuItem } from '../components/Menu'

export interface IExtensionSchema {
  type: string;
  content?: string;
  group?: string;
  parseDOM?: ({
    tag?: string
    style?: string
  })[];
  toDOM?(node: Node): (string | { [key: string]: any } | number)[];
}

export type TExtensionOptions = {
  schema?: IExtensionSchema;
  className?: string;
  tagName?: string;
  icon?: any;
  customName?: string;
} | null

export default class Extension {
  constructor(options: TExtensionOptions) {
    if (options) {
      this.customSchema = options.schema;
      this.customName = options.customName;
      this.customIcon = options.icon;
    }
  }

  type: string
  name: string
  customName?: string
  customIcon?: any
  customSchema?: IExtensionSchema

  private _schema?: IExtensionSchema;
  public get schema(): IExtensionSchema {
    return this._schema;
  }
  public set schema(value: IExtensionSchema) {
    this._schema = value;
  }

  private _icon?: string;
  public get icon(): string {
    return this._icon;
  }
  public set icon(value: string) {
    this._icon = value;
  }

  registerMenu(editorView: EditorView): MenuItem|null { return null }
}

