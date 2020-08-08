import {dijkstra, dijkstraPath} from '../algorithms/dijkstra';
import {astar, astarPath} from '../algorithms/astar';
import {best, bestPath} from '../algorithms/best';
import {bfs, bfsPath} from '../algorithms/bfs';
import {dfs, dfsPath} from '../algorithms/dfs';

export function algorithm (type, grid, isStart, isEnd) {
    let visitedNodes = [];
    if(type === "Dijkstra")
        visitedNodes = dijkstra(grid, isStart);
    else if(type === "A-star")
        visitedNodes = astar(grid, isStart, isEnd);
    else if(type === "Greedy")
        visitedNodes = best(grid, isStart, isEnd);
    else if(type === "BFS")
        visitedNodes = bfs(grid, isStart);
    else 
        visitedNodes = dfs(grid, isStart);
    return visitedNodes;
}

export function getShortestPath (type, isStart, isEnd, grid) {
    let shortestPath = [];
    if(type === "Dijkstra")
        shortestPath = dijkstraPath(isStart, isEnd, grid);
    else if(type === "A-star")
        shortestPath = astarPath(isStart, isEnd, grid);
    else if(type === "Greedy")
        shortestPath = bestPath(isStart, isEnd);
    else if(type === "BFS")
        shortestPath = bfsPath(isStart, isEnd);
    else 
        shortestPath = dfsPath(isStart, isEnd);
    return shortestPath;
}