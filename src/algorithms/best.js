export function best(grid, startNode, endNode) {
    let visitedNodes = [];
    let unvisitedNodes = [];
    startNode.distance = 0;
    startNode.heuristic = manhattanDistance(startNode, endNode);
    unvisitedNodes.push(startNode);
    while (unvisitedNodes.length !== 0) {
        unvisitedNodes = sortUnvisitedNodes(unvisitedNodes);
        let selectedNode = unvisitedNodes.shift();
        if (selectedNode.wall) continue;
        if (visitedNodes.indexOf(selectedNode) === -1) visitedNodes.push(selectedNode);
        const unvisitedNeighbors = updateNeighbors(selectedNode, grid, endNode);
        if (selectedNode === endNode) return visitedNodes;
        for (const neighbor of unvisitedNeighbors) {
            if (unvisitedNodes.indexOf(neighbor) === -1 & visitedNodes.indexOf(neighbor) === -1) unvisitedNodes.push(neighbor);
        }
    }
    return visitedNodes;
}

function sortUnvisitedNodes(unvisitedNodes) {
    unvisitedNodes.sort((node1, node2) => node1.heuristic - node2.heuristic);
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
        return !(neighbor.wall);
    });
}

function updateNeighbors(node, grid, endNode) {
    const unvisitedNeighbors = getNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        if(neighbor.distance > node.distance + 1) {
            neighbor.distance = node.distance + 1;
            neighbor.previous = node;
        }
        neighbor.heuristic = manhattanDistance(neighbor, endNode);
    }
    return unvisitedNeighbors;
}

function manhattanDistance(nodeOne, nodeTwo) {

    let xChange = Math.abs(nodeOne.row - nodeTwo.row);
    let yChange = Math.abs(nodeOne.col - nodeTwo.col);
    return (xChange + yChange);
}

export function bestPath(startNode, endNode) {
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