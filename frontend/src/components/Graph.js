import React from 'react';
import VisGraph from 'vis-react';
import { uniqueId } from 'lodash-es';
import { useTheme } from '@material-ui/core';

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
      color: 'black',
    },
    selectionWidth: 0,
  },
  nodes: {
    shape: 'box',
    margin: 10,
    shadow: true,
    labelHighlightBold: false,
    widthConstraint: {
      maximum: 200,
    },
  },
  physics: {
    enabled: false,
  },
};

const transformToGraph = (model, { goalColor, questionColor, measureColor }) => {
  const graph = {
    nodes: [],
    edges: [],
  };

  const nodeStyle = {
    font: { color: 'black' },
  };

  const goalId = uniqueId();
  graph.nodes.push({
    id: goalId,
    label: model.name,
    level: 1,
    color: goalColor,
    ...nodeStyle,
  });

  model.questions.forEach(question => {
    const questionId = uniqueId();
    graph.nodes.push({
      id: questionId,
      label: question.text,
      level: 2,
      color: questionColor,
      ...nodeStyle,
    });
    graph.edges.push({ from: goalId, to: questionId });

    question.metrics.forEach(metric => {
      const metricId = uniqueId();
      graph.nodes.push({
        id: metricId,
        label: metric.name,
        level: 3,
        color: measureColor,
        font: { color: 'white' },
      });
      graph.edges.push({ from: questionId, to: metricId });
    });
  });

  return graph;
};

const Graph = ({ model }) => {
  const {
    palette: {
      primary: { light: goalColor },
      secondary: { light: questionColor, dark: measureColor },
    },
  } = useTheme();

  return <VisGraph graph={transformToGraph(model, { goalColor, questionColor, measureColor })} options={options} />;
};

export default Graph;
