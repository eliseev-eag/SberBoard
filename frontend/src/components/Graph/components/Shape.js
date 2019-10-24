import { dia } from 'jointjs';

export default dia.Element.define(
  'demo.Shape',
  {
    z: 2,
    size: {
      width: 100,
      height: 50,
    },
    attrs: {
      body: {
        refWidth: '100%',
        refHeight: '100%',
        fill: 'ivory',
        stroke: 'gray',
        strokeWidth: 2,
        rx: 10,
        ry: 10,
      },
      label: {
        refX: '50%',
        refY: '50%',
        yAlignment: 'middle',
        xAlignment: 'middle',
        fontSize: 30,
      },
    },
  },
  {
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],

    setText(text) {
      return this.attr('label/text', text || '');
    },
  },
);
