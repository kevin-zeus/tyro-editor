import Extension, { TExtensionOptions } from './Extension';

export default class MarkExtension extends Extension {
  type: string = 'mark'

  constructor(options: TExtensionOptions) {
    super(options);
  }
}