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
      color: '#FFFFFF',
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

const transformToGraph = (model, color) => {
  const graph = {
    nodes: [],
    edges: [],
  };

  const nodeStyle = {
    font: { color: 'white' },
    color,
  };

  const goalId = uniqueId();
  graph.nodes.push({
    id: goalId,
    label: model.name,
    level: 1,
    ...nodeStyle,
  });

  model.questions.forEach(question => {
    const questionId = uniqueId();
    graph.nodes.push({
      id: questionId,
      label: question.text,
      level: 2,
      ...nodeStyle,
    });
    graph.edges.push({ from: goalId, to: questionId });

    question.metrics.forEach(metric => {
      const metricId = uniqueId();
      graph.nodes.push({
        id: metricId,
        label: metric.name,
        level: 3,
        ...nodeStyle,
      });
      graph.edges.push({ from: questionId, to: metricId });
    });
  });

  return graph;
};

const Graph = ({ model }) => {
  const {
    palette: {
      primary: { light },
    },
  } = useTheme();

  return <VisGraph graph={transformToGraph(model, light)} options={options} />;
};

export default Graph;
