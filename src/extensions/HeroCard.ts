export default class HeroCard {
  customSchema: any

  get name() {
    return 'herocard'
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }
    return {
      content: 'inline block+',
      group: 'block',
      parseDOM: [
        {

        }
      ],
      attrs: {},
      toDOM
    }
  }


}