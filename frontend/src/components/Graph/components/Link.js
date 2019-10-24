import { dia } from 'jointjs';

export default dia.Link.define(
  'demo.Link',
  {
    attrs: {
      line: {
        connection: true,
        stroke: 'gray',
        strokeWidth: 2,
        pointerEvents: 'none',
        targetMarker: {
          type: 'path',
          fill: 'gray',
          stroke: 'none',
          d: 'M 10 -10 0 0 10 10 z',
        },
      },
    },
    connector: {
      name: 'rounded',
    },
    z: 1,
    weight: 1,
    minLen: 1,
  },
  {
    markup: [
      {
        tagName: 'path',
        selector: 'line',
        attributes: {
          fill: 'none',
        },
      },
    ],

    connect: function(sourceId, targetId) {
      return this.set({
        source: { id: sourceId },
        target: { id: targetId },
      });
    },

    setLabelText: function(text) {
      return this.prop('labels/0/attrs/labelText/text', text || '');
    },
  },
);
