import { Plugin } from 'prosemirror-state'

const HeroPlugin = () => {
  return new Plugin({
    props: {

    }
  })
}

class HeroCard {
  get schema() {
    return {
      type: 'hero_card',
      content: 'inline*',
      group: 'block',
      attrs: {
        src: { default: '' },
        title: { default: '在这输入标题' },
        desc: { default: '在这输入描述' }
      },
      toDOM(node) {
        return [
          'figure',
          {
            'class': 'hero_card',
          },
          [
            'img',
            {
              src: node.attrs.src
            }
          ],
          ['figcaption', node.attrs.title],
          ['figcaption', node.attrs.desc],
        ]
      },
    }
  }

  get plugin() {
    return HeroPlugin();
  }
}

export default HeroCard;
