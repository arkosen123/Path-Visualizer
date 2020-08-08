export function dijkstra(grid, startNode) {
    let visitedNodes = [];
    let unvisitedNodes = initialise(grid);
    startNode.distance = 0;
    unvisitedNodes.push(startNode);
    let count=0;
    while (count !== grid.length * grid[0].length) {
        unvisitedNodes = sortUnvisitedNodes(unvisitedNodes);
        let selectedNode = unvisitedNodes.shift();
        count= count+1;
        if (selectedNode.distance === Infinity) return visitedNodes;
        if (selectedNode.wall) continue;
        selectedNode.visited = true;
        visitedNodes.push(selectedNode);
        updateNeighbors(selectedNode, grid);
    }
    return visitedNodes;
}

function initialise(grid) {
    const initial = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            grid[row][col].distance = Infinity;
            grid[row][col].visited = false;
            initial.push(grid[row][col]);
        }
    }
    return initial;
}

function sortUnvisitedNodes(unvisitedNodes) {
    unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance);
    return unvisitedNodes;
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const col = node.col;
    const row = node.row;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => {
        return !(neighbor.visited);
    });
}

function updateNeighbors(node, grid) {
    const unvisitedNeighbors = getNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + neighbor.weight;
        neighbor.previous = node;
    }
}

export function dijkstraPath(startNode, endNode) {
    const shortestPath = [];
    if(endNode.previous === null) return shortestPath;
    let currentNode = endNode;
    while (currentNode !== startNode) {
        shortestPath.push(currentNode);
        currentNode = currentNode.previous;
    }
    shortestPath.push(startNode);
    return shortestPath;
}