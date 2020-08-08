export function bfs(grid, startNode, endNode) {
    let visitedNodes = [];
    let unvisitedNodes = [];
    startNode.distance = 0;
    unvisitedNodes.push(startNode);
    while (unvisitedNodes.length !== 0) {
        let selectedNode = unvisitedNodes.shift();
        if (selectedNode.wall) continue;
        selectedNode.visited = true;
        visitedNodes.push(selectedNode);
        const unvisitedNeighbors = updateNeighbors(selectedNode, grid, endNode);
        for (const neighbor of unvisitedNeighbors) {
            if (unvisitedNodes.indexOf(neighbor) === -1) unvisitedNodes.push(neighbor);
        }
    }
    return visitedNodes;
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
        neighbor.distance = node.distance + 1;
        neighbor.previous = node;
    }
    return unvisitedNeighbors;
}

export function bfsPath(startNode, endNode) {
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