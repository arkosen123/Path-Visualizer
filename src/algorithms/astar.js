export function astar(grid, startNode, endNode) {
    let visitedNodes = [];
    let unvisitedNodes = [];
    startNode.distance = 0;
    startNode.heuristic = manhattanDistance(startNode, endNode);
    unvisitedNodes.push(startNode);
    let isWall = false;
    while (unvisitedNodes.length !== 0) {
        unvisitedNodes = sortUnvisitedNodes(unvisitedNodes, isWall);
        let selectedNode = unvisitedNodes.shift();
        if (selectedNode.wall) { isWall = true; continue; }
        else { isWall = false };
        selectedNode.visited = true;
        visitedNodes.push(selectedNode);
        const unvisitedNeighbors = updateNeighbors(selectedNode, grid, endNode);
        if (selectedNode === endNode) return visitedNodes;
        for (const neighbor of unvisitedNeighbors) {
            if (unvisitedNodes.indexOf(neighbor) === -1) unvisitedNodes.push(neighbor);
        }
    }
    return visitedNodes;
}

function sortUnvisitedNodes(unvisitedNodes, isWall) {
    if (!isWall) {
        unvisitedNodes.sort((node1, node2) => {
            if (node1.distance + node1.heuristic === node2.distance + node2.heuristic)
                return node2.distance - node1.distance;
            else
                return node1.distance + node1.heuristic - node2.distance - node2.heuristic;
        });
    }
    else {
        unvisitedNodes.sort((node1, node2) => {
            if (node1.distance + node1.heuristic === node2.distance + node2.heuristic)
                return node1.distance - node2.distance;
            else
                return node1.distance + node1.heuristic - node2.distance - node2.heuristic;
        });
    }
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

function updateNeighbors(node, grid, endNode) {
    const unvisitedNeighbors = getNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        if(neighbor.distance > node.distance + neighbor.weight) {
            neighbor.distance = node.distance + neighbor.weight;
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

function visitedNeighbors(currentNode, grid) {
    const neighbors = [];
    const col = currentNode.col;
    const row = currentNode.row;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((visitedNeighbor) => {
        return (visitedNeighbor.visited & !visitedNeighbor.wall);
    });
}

export function astarPath(startNode, endNode, grid) {
    const shortestPath = [];
    if (endNode.previous === null) return shortestPath;
    let currentNode = endNode;
    shortestPath.push(endNode);
    while (currentNode !== startNode) {
        const neighbors = visitedNeighbors(currentNode, grid);
        neighbors.sort((node1, node2) => node1.distance - node2.distance);
        const target = neighbors.shift();
        shortestPath.push(target);
        currentNode = target;
    }
    return shortestPath;
}