export function dfs(grid, startNode, endNode) {
    let visitedNodes = [];
    let unvisitedNodes = [];
    startNode.distance = 0;
    unvisitedNodes.push(startNode);
    while (unvisitedNodes.length !== 0) {
        let selectedNode = unvisitedNodes.pop();
        if (selectedNode.wall) continue;
        selectedNode.visited = true;
        visitedNodes.push(selectedNode);
        const unvisitedNeighbors = updateNeighbors(selectedNode, grid, endNode);
        for (const neighbor of unvisitedNeighbors) {
            unvisitedNodes.push(neighbor);
        }
    }
    return visitedNodes;
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const col = node.col;
    const row = node.row;
    if (col > 0) neighbors.unshift(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.unshift(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.unshift(grid[row][col + 1]);
    if (row > 0) neighbors.unshift(grid[row - 1][col]);
    return neighbors.filter((neighbor) => {
        return ((! neighbor.visited) & (! neighbor.wall));
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

export function dfsPath(startNode, endNode) {
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