import React, { Component } from 'react';
import Node from './node';
import Header from './header';
import Description from './description';
import { algorithm, getShortestPath } from './algoRoute';
import Footer from './footer';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            isStart: { row: -1, col: -1 },
            isEnd: { row: -1, col: -1 },
            mousePressed: false,
            mousePressedEnd: false,
            isAnimated: false,
            isRealTime: false,
            visitedNodes: [],
            isRunning: false,
            type: "",
            speed: 10,
            isWeight: false,
            highWeight: 5,
        };
        this.getNewWall = this.getNewWall.bind(this);
        this.startAlgorithm = this.startAlgorithm.bind(this);
        this.animateAlgorithm = this.animateAlgorithm.bind(this);
        this.animateShortestPath = this.animateShortestPath.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.initialise = this.initialise.bind(this);
        this.resetInimation = this.resetInimation.bind(this);
        this.realTime = this.realTime.bind(this);
        this.resetGrid = this.resetGrid.bind(this);
        this.resetWalls = this.resetWalls.bind(this);
        this.resetAll = this.resetAll.bind(this);
        this.changeType = this.changeType.bind(this);
        this.scroll = this.scroll.bind(this);
        this.changeSpeed = this.changeSpeed.bind(this);
        this.addWeight = this.addWeight.bind(this);
        this.addWeightAll = this.addWeightAll.bind(this);
        this.start = this.start.bind(this);
    }

    componentDidMount() {
        const grid = [];
        for (let row = 0; row < 56; row++) {
            const line = [];
            for (let col = 0; col < 26; col++) {
                const node = {
                    row,
                    col,
                    wall: false,
                    distance: Infinity,
                    visited: false,
                    previous: null,
                    heuristic: Infinity,
                    weight: 1,
                }
                line.push(node);
            }
            grid.push(line);
        }
        this.setState({
            grid: grid
        });
    }

    resetGrid(grid) {
        const newGrid = [];
        for (let row = 0; row < grid.length; row++) {
            const line = [];
            for (let col = 0; col < grid[0].length; col++) {
                const node = {
                    row,
                    col,
                    wall: false,
                    distance: Infinity,
                    visited: false,
                    previous: null,
                    heuristic: Infinity,
                    weight: 1,
                }
                line.push(node);
            }
            newGrid.push(line);
        }
        return newGrid;
    }

    initialise(grid) {
        const newGrid = grid.slice();
        for (let row = 0; row < this.state.grid.length; row++) {
            for (let col = 0; col < this.state.grid[0].length; col++) {
                const node = newGrid[row][col];
                node.distance = Infinity;
                node.visited = false;
                node.previous = null;
                node.heuristic = Infinity;
            }
        }
        return newGrid;
    }

    handleMouseDown(row, col) {
        if (this.state.isWeight) return;
        if ((this.state.isStart.row === -1 & this.state.isStart.col === -1) | (this.state.isEnd.row === -1 & this.state.isEnd.col === -1)) return;
        else if (this.state.isStart.row === row & this.state.isStart.col === col) return;
        else if (this.state.isEnd.row === row & this.state.isEnd.col === col) {
            if (!this.state.isRealTime) this.setState({ mousePressedEnd: true });
        }
        else {
            const newGrid = this.getNewWall(this.state.grid, row, col);
            this.setState({ grid: newGrid, mousePressed: true, mousePressedEnd: false });
        }
    }

    handleMouseEnter(row, col) {
        if (this.state.isWeight) return;
        if (this.state.mousePressedEnd) return;
        else if (this.state.isRealTime) {
            if (this.state.grid[row][col].wall) return;
            this.resetInimation(this.state.grid, this.state.isStart, this.state.isEnd);
            const end = { row: row, col: col, isAnimated: true };
            this.setState({ isEnd: end, }, () => {
                for (let i = 0; i < this.state.visitedNodes.length; i++) {
                    if (this.state.visitedNodes[i].row === row & this.state.visitedNodes[i].col === col) break;
                    else if ((this.state.visitedNodes[i].row !== this.state.isStart.row | this.state.visitedNodes[i].col !== this.state.isStart.col)) {
                        const node = this.state.visitedNodes[i];
                        document.getElementById(`${node.row}-${node.col}`).className = 'node visited';
                    }
                }
                const startNode = this.state.grid[this.state.isStart.row][this.state.isStart.col];
                const endNode = this.state.grid[row][col];
                const shortestPath = getShortestPath(this.state.type, startNode, endNode, this.state.grid);
                for (let i = 0; i < shortestPath.length; i++) {
                    const node = shortestPath[i];
                    document.getElementById(`${node.row}-${node.col}`).className = 'node path';
                }
            });
        }
        else {
            if (!this.state.mousePressed) return;
            const newGrid = this.getNewWall(this.state.grid, row, col);
            this.setState({ grid: newGrid });
        }
    }

    handleMouseUp(row, col) {
        if (this.state.isWeight) {
            if (this.state.grid[row][col].wall) return;
            let newGrid;
            if (this.state.grid[row][col].weight === 1) {
                newGrid = this.changeWeight(this.state.grid, row, col, this.state.highWeight);
            }
            else {
                newGrid = this.changeWeight(this.state.grid, row, col, 1);
            }
            this.setState({ grid: newGrid });
            return;
        }
        if (this.state.grid[row][col].wall) {
            if ((this.state.isStart.row === -1 & this.state.isStart.col === -1) | (this.state.isEnd.row === -1 & this.state.isEnd.col === -1)) {
                if (this.state.grid[row][col].wall) {
                    const newGrid = this.getNewWall(this.state.grid, row, col);
                    this.setState({ grid: newGrid });
                    return;
                }
            }
            this.setState({
                mousePressedEnd: false,
                mousePressed: false
            })
        }
        else if (this.state.isStart.row === row & this.state.isStart.col === col) {
            if (this.state.isAnimated) {
                this.setState({
                    mousePressedEnd: false,
                    mousePressed: false
                })
            }
            else {
                const start = { row: -1, col: -1 }
                this.setState({
                    isStart: start,
                    mousePressedEnd: false,
                    mousePressed: false,
                    visitedNodes: [],
                    isRealTime: false,
                })
            }
        }
        else if (this.state.isEnd.row === row & this.state.isEnd.col === col) {
            if (this.state.isAnimated | this.state.isRealTime) {
                this.setState({
                    mousePressedEnd: false,
                    mousePressed: false
                })
            }
            else {
                const end = { row: -1, col: -1 }
                this.setState({
                    isEnd: end,
                    mousePressedEnd: false,
                    mousePressed: false
                })
            }
        }
        else if (this.state.isStart.row === -1 & this.state.isStart.col === -1) {
            const start = { row: row, col: col }
            this.setState({
                isStart: start,
            })
        }
        else if (this.state.isEnd.row === -1 & this.state.isEnd.col === -1) {
            const end = { row: row, col: col }
            this.setState({
                isEnd: end,
            })
        }
        else if (this.state.mousePressedEnd) {
            const newGrid = this.initialise(this.state.grid);
            const endPoint = {
                row: row,
                col: col,
            };
            const retainNode = JSON.parse(JSON.stringify(this.state.isEnd));
            this.setState({
                isEnd: endPoint,
                grid: newGrid,
                mousePressedEnd: false,
                mousePressed: false,
                isAnimated: false,
            }, () => {
                this.resetInimation(this.state.grid, this.state.isStart, retainNode);
                this.startAlgorithm(this.state.type, this.state.grid, this.state.isStart, this.state.isEnd);
            });
        }
        else this.setState({ mousePressed: false });
    }

    changeWeight(grid, row, col, weight) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            weight: weight,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

    addWeightAll(grid, weight) {
        const newGrid = grid.slice();
        for (let row = 0; row < this.state.grid.length; row++) {
            for (let col = 0; col < this.state.grid[0].length; col++) {
                const node = newGrid[row][col];
                if (node.weight === this.state.highWeight) node.weight = weight;
            }
        }
        this.setState({ grid: newGrid, highWeight: weight });
    }

    getNewWall(grid, row, col) {
        if (this.state.isAnimated) return grid;
        this.setState({
            visitedNodes: [],
            isRealTime: false,
        })
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            wall: !node.wall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

    animateAlgorithm(visitedNodes, shortestPath, startNode, endNode) {
        for (let i = 0; i < visitedNodes.length; i++) {
            if (visitedNodes[i] === endNode) {
                setTimeout(() => {
                    this.animateShortestPath(shortestPath, startNode);
                }, this.state.speed * i);
                return;
            }
            else if (i === visitedNodes.length - 1) {
                setTimeout(() => {
                    alert("Sorry, there's no path connecting the start and end points");
                    this.setState({ isRunning: false });
                }, (this.state.speed + 1) * i);
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`${node.row}-${node.col}`).className = 'node node-visited';
            }, this.state.speed * i);
        }
    }

    animateShortestPath(shortestPath, startNode) {
        for (let i = 0; i < shortestPath.length; i++) {
            if (shortestPath[i] === startNode) {
                setTimeout(() => {
                    this.setState({ isRunning: false });
                }, 2.5 * this.state.speed * i);
            }
            setTimeout(() => {
                const node = shortestPath[i];
                document.getElementById(`${node.row}-${node.col}`).className = 'node node-path';
            }, 2.5 * this.state.speed * i);
        }
    }

    start(type, grid, isStart, isEnd) {
        document.getElementById("grid").scrollIntoView();
        this.startAlgorithm(type, grid, isStart, isEnd);
    }

    startAlgorithm(type, grid, isStart, isEnd) {
        if ((isStart.row === -1 & isStart.col === -1) | (isEnd.row === -1 & isEnd.col === -1)) return;
        if (this.state.realTime) return;
        if (this.state.isAnimated) {
            this.resetInimation(grid, isStart, isEnd);
            this.initialise(grid);
        }
        else if (this.state.visitedNodes.lenght !== 0) this.initialise(grid);
        this.setState({ isAnimated: true, isRunning: true }, () => {
            const startNode = grid[isStart.row][isStart.col];
            const endNode = grid[isEnd.row][isEnd.col];
            const visitedNodes = algorithm(type, grid, startNode, endNode);
            const shortestPath = getShortestPath(type, startNode, endNode, grid);
            console.log(visitedNodes);
            console.log(shortestPath);
            this.animateAlgorithm(visitedNodes, shortestPath, startNode, endNode);
            this.setState({
                visitedNodes: visitedNodes,
                isRealTime: false,
            });
        });
    }

    resetInimation(grid, isStart, isEnd) {
        if (this.state.realTime) return;
        if ((this.state.isStart.row === -1 & this.state.isStart.col === -1) | (this.state.isEnd.row === -1 & this.state.isEnd.col === -1)) return;
        const startNode = grid[isStart.row][isStart.col];
        const endNode = grid[isEnd.row][isEnd.col];
        for (let i = 0; i < this.state.visitedNodes.length; i++) {
            if (this.state.visitedNodes[i] === endNode) {
                const node = this.state.visitedNodes[i];
                document.getElementById(`${node.row}-${node.col}`).className = 'node notClick';
                break;
            }
            if (this.state.visitedNodes[i] !== startNode) {
                const node = this.state.visitedNodes[i];
                document.getElementById(`${node.row}-${node.col}`).className = 'node notClick';
            }
        }
        const shortestPath = getShortestPath(this.state.type, startNode, endNode, grid);
        for (let i = 0; i < shortestPath.length; i++) {
            const node = shortestPath[i];
            document.getElementById(`${node.row}-${node.col}`).className = 'node notClick';
        }
        this.setState({ isAnimated: false, });
    }

    resetWalls(grid, isStart, isEnd) {
        if (this.state.realTime) return;
        this.resetInimation(grid, isStart, isEnd);
        const newGrid = this.resetGrid(grid);
        this.setState({
            grid: newGrid,
            mousePressed: false,
            mousePressedEnd: false,
            isAnimated: false,
            isRealTime: false,
            visitedNodes: [],
        })
    }

    resetAll(grid, isStart, isEnd) {
        if (this.state.realTime) return;
        this.resetInimation(grid, isStart, isEnd);
        const newGrid = this.resetGrid(grid);
        this.setState({
            grid: newGrid,
            isStart: { row: -1, col: -1 },
            isEnd: { row: -1, col: -1 },
            mousePressed: false,
            mousePressedEnd: false,
            isAnimated: false,
            isRealTime: false,
            visitedNodes: [],
        });
    }

    realTime() {
        if (this.state.isRealTime) {
            this.setState({ isRealTime: false, });
            this.resetInimation(this.state.grid, this.state.isStart, this.state.isEnd);
        }
        else {
            this.setState({ isRealTime: true, })
        }
    }

    changeType(algo) {
        if (!((this.state.isStart.row === -1 & this.state.isStart.col === -1) | (this.state.isEnd.row === -1 & this.state.isEnd.col === -1)))
            this.resetInimation(this.state.grid, this.state.isStart, this.state.isEnd);
        this.setState({
            mousePressed: false,
            mousePressedEnd: false,
            isAnimated: false,
            isRealTime: false,
            visitedNodes: [],
            isRunning: false,
            type: algo,
        }, () => this.initialise(this.state.grid));
    }

    scroll() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    changeSpeed(speed) {
        this.setState({ speed: speed });
    }

    addWeight() {
        if (this.state.isWeight) this.setState({ isWeight: false, });
        else this.setState({ isWeight: true, })
    }

    render() {
        let grids = this.state.grid;
        return (
            <div>
                <div className="header">
                    <Header speed={this.state.speed}
                        visitLenght={this.state.visitedNodes.length}
                        isRunning={this.state.isRunning}
                        isWeight={this.state.isWeight}
                        highWeight={this.state.highWeight}
                        type={this.state.type}
                        isRealTime={this.state.isRealTime}
                        length={this.state.visitedNodes.length}
                        startAlgorithm={() => this.start(this.state.type, this.state.grid, this.state.isStart, this.state.isEnd)}
                        resetAll={() => this.resetAll(this.state.grid, this.state.isStart, this.state.isEnd)} resetWalls={() => this.resetWalls(this.state.grid, this.state.isStart, this.state.isEnd)}
                        resetInimation={() => this.resetInimation(this.state.grid, this.state.isStart, this.state.isEnd)}
                        realTime={() => this.realTime()}
                        changeType={(algo) => this.changeType(algo)}
                        changeSpeed={(speed) => this.changeSpeed(speed)}
                        addWeight={() => this.addWeight()}
                        addWeightAll={(weight) => this.addWeightAll(this.state.grid, weight)} >
                    </Header>
                </div>
                <div>
                    <Description type={this.state.type}></Description>
                </div>
                <div id="grid">
                    {grids.map((line, lineId) => {
                        return (
                            <div key={lineId}>
                                {line.map((node, nodeId) => {
                                    const row = node.row;
                                    const col = node.col;
                                    const wall = node.wall;
                                    const weight = node.weight;
                                    return (
                                        <Node key={nodeId}
                                            start={this.state.isStart}
                                            end={this.state.isEnd}
                                            weight={weight}
                                            col={col} row={row}
                                            wall={wall}
                                            handleMouseDown={() => this.handleMouseDown(row, col)} handleMouseEnter={() => this.handleMouseEnter(row, col)} handleMouseUp={() => this.handleMouseUp(row, col)} >
                                        </Node>
                                    );
                                })}
                            </div>
                        )
                    })}
                </div>
                <div>
                    <Footer scroll={() => this.scroll()}></Footer>
                </div>
            </div>
        )

    }
}

export default Main;