import React from 'react';
import VisGraph from 'vis-react';

const graph = {
  nodes: [
    { id: 1, label: 'Node 1 woenrw[eo f[weoj fer[oj jer[oj jer[ogj ', level: 1 },
    { id: 2, label: 'Node 2 ew[kwe gmkgmmer]per]g pkg ]mg] weg', level: 2 },
    { id: 3, label: 'Node 3 ewprgkr wer gwe gwe[g ner[gpk ner]g erg', level: 2 },
    { id: 4, label: 'Node 4pwekmg]wengwe]pg wekg ne]og ner-ogmjrgknwerg]p q]', level: 3 },
    {
      id: 5,
      label: 'Node 5 qpwkmf] g]prng]erpkg nkr g]qe ng]prgmn]3jngS kg]permg]3jgng k]3pgon32]pgnng ]pwerngerljg n',
      level: 3,
    },
  ],
  edges: [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }],
};

const options = {
  layout: {
    hierarchical: {
      direction: 'UD',
      sortMethod: 'directed',
      levelSeparation: 100,
      nodeSpacing: 250,
    },
  },
  edges: {
    font: {
      size: 12,
    },
  },
  nodes: {
    shape: 'box',
    margin: 10,
    widthConstraint: {
      maximum: 200,
    },
    shadow: true,
  },
  physics: {
    enabled: false,
  },
};

const Graph = () => {
  return <VisGraph graph={graph} options={options} />;
};

export default Graph;
