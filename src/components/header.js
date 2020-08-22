import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button, ButtonGroup, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.highWeight,
            showWeight: false,
            redirect: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggleShowWeight = this.toggleShowWeight.bind(this);
        this.handlePlus = this.handlePlus.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
    }

    handleChange(event) {
        if (event.target.value > 1) {
            this.setState({ value: event.target.value }, () => {
                this.props.addWeightAll(this.state.value);
            });
        }
    }

    toggleShowWeight() {
        this.setState({ showWeight: !this.state.showWeight });
    }

    handlePlus() {
        this.setState({ value: this.state.value + 1 }, () => {
            this.props.addWeightAll(this.state.value);
        });
    }

    handleMinus() {
        if (this.state.value !== 2) {
            this.setState({ value: this.state.value - 1 }, () => {
                this.props.addWeightAll(this.state.value);
            });
        }
    }

    render() {

        let button_real = this.props.isRealTime ? "btn-danger" : "btn-primary";
        let button_weight = this.props.isWeight ? "btn-danger" : "btn-primary"
        return (
            <Navbar bg="primary">
                <Navbar.Brand href="#" className="items head">Path Visualizer</Navbar.Brand>
                <Nav>
                    <NavDropdown title="Pick Algorithm" className="items">
                        <NavDropdown.Item onClick={() => this.props.changeType("Dijkstra")}>Dijkstra Algorithm</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => this.props.changeType("A-star")}>A* Algorithm</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => this.props.changeType("Greedy")}>Greedy Best Search</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => this.props.changeType("BFS")}>Breadth First Search</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => this.props.changeType("DFS")}>Depth First Search</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Reset" className="items">
                        <NavDropdown.Item disabled={this.props.isRunning | this.props.isWeight} onClick={() => this.props.resetAll()}>Reset All</NavDropdown.Item>
                        <NavDropdown.Item disabled={this.props.isRunning | this.props.isWeight} onClick={() => this.props.resetWalls()}>Reset Walls and Weights</NavDropdown.Item>
                        <NavDropdown.Item disabled={this.props.isRunning | this.props.isWeight} onClick={() => this.props.resetInimation()}>Reset Animation</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Button className="items" disabled={this.props.isRunning | (this.props.type === "") | this.props.isWeight} onClick={() => this.props.startAlgorithm()}>Start {this.props.type}</Button>
                <Button disabled={this.props.isRunning | (!this.props.length) | (this.props.type === "Greedy") | (this.props.type === "A-star") | this.props.isWeight} className={`items ${button_real}`} onClick={() => this.props.realTime()}>Real Time</Button>
                <Nav>
                    <NavDropdown title="Speed" className="items">
                        <NavDropdown.Item className="speed" disabled={(this.props.speed === 10)} onClick={() => this.props.changeSpeed(10)}>Fast</NavDropdown.Item>
                        <NavDropdown.Item className="speed" disabled={(this.props.speed === 20)} onClick={() => this.props.changeSpeed(20)}>Average</NavDropdown.Item>
                        <NavDropdown.Item className="speed" disabled={(this.props.speed === 30)} onClick={() => this.props.changeSpeed(30)}>Slow</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Button disabled={this.props.length | (this.props.type === "") | (this.props.type === "Greedy") | (this.props.type === "DFS") | (this.props.type === "BFS")} className={`items ${button_weight}`} onClick={() => this.props.addWeight()}>Add Weight</Button>
                <div className="show-weight">
                    <Button onClick={() => this.toggleShowWeight()} className="items">Weight Cost</Button>
                    <Collapse in={this.state.showWeight}>
                        <ButtonGroup>
                            <Button onClick={() => { this.handlePlus() }} className="button-compact"> + </Button>
                            <input value={this.state.value} onChange={this.handleChange} />
                            < Button onClick={() => { this.handleMinus() }} className="button-compact" > - </Button>
                        </ButtonGroup>
                    </Collapse>
                </div>
                <Link to={'/help'}>
                    <Button className="items">Help</Button>
                </Link>
            </Navbar>
        )
    }
}

export default Header;