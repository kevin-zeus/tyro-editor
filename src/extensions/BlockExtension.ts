import Extension, { TExtensionOptions } from './Extension';

export default class BlockExtension extends Extension {
  type: string = 'block'

  constructor(options: TExtensionOptions) {
    super(options);
  }


}