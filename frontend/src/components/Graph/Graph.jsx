import React, { useEffect, useRef } from 'react';
import dagre from 'dagre';
import { dia, layout } from 'jointjs';
import { Link, Shape } from './components';

const buildGraphFromAdjacencyList = adjacencyList => {
  var elements = [];
  var links = [];

  Object.keys(adjacencyList).forEach(parentLabel => {
    // Add element
    elements.push(new Shape({ id: parentLabel }).setText(parentLabel));
    // Add links
    adjacencyList[parentLabel].forEach(childLabel => {
      links.push(new Link().connect(parentLabel, childLabel));
    });
  });

  // Links must be added after all the elements. This is because when the links
  // are added to the graph, link source/target
  // elements must be in the graph already.
  return elements.concat(links);
};

const Graph = () => {
  const containerRef = useRef(null);
  const graphRef = useRef(null);
  const paperRef = useRef(null);

  useEffect(() => {
    if (paperRef.current === null) {
      graphRef.current = new dia.Graph();
      paperRef.current = new dia.Paper({
        el: containerRef.current,
        model: graphRef.current,
        sorting: dia.Paper.sorting.APPROX,
      });

      graphRef.current.addCells(
        buildGraphFromAdjacencyList({
          a: ['b', 'c', 'd'],
          b: ['d', 'e'],
          c: [],
          d: [],
          e: ['e'],
          f: [],
          g: ['b', 'i'],
          h: ['f'],
          i: ['f', 'h'],
        }),
      );

      layout.DirectedGraph.layout(graphRef.current, {
        dagre: dagre,
        graphlib: dagre.graphlib,
        nodeSep: 50,
        edgeSep: 80,
        rankDir: 'TB',
        setVertices: true,
        setLabels: true,
      });
    }
  }, []);

  return <div ref={containerRef} />;
};

export default Graph;
