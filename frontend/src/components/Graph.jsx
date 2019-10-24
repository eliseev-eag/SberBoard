import React from 'react';
import VisGraph from 'vis-react';
import { uniqueId } from 'lodash-es';

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

const transformToGraph = model => {
  const graph = {
    nodes: [],
    edges: [],
  };

  const goalId = uniqueId();
  graph.nodes.push({
    id: goalId,
    label: model.description,
    level: 1,
  });

  model.questions.forEach(question => {
    const questionId = uniqueId();
    graph.nodes.push({
      id: questionId,
      label: question.text,
      level: 2,
    });
    graph.edges.push({ from: goalId, to: questionId });

    question.metrics.forEach(metric => {
      const metricId = uniqueId();
      graph.nodes.push({
        id: metricId,
        label: metric.name,
        level: 3,
      });
      graph.edges.push({ from: questionId, to: metricId });
    });
  });

  return graph;
};

const Graph = ({ model }) => {
  return <VisGraph graph={transformToGraph(model)} options={options} />;
};

export default Graph;
