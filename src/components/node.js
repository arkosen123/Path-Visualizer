import React, {Component} from 'react';

class Node extends Component{

    render() {
        let extraClass ="";
        let mainClass ="";
        if(this.props.start.row === this.props.row & this.props.start.col === this.props.col) extraClass= "fa fa-chevron-circle-right";
        else if(this.props.end.row === this.props.row & this.props.end.col === this.props.col) extraClass= "fa fa-stop-circle";
        else if(this.props.weight !== 1) extraClass="fa fa-certificate";
        else if(this.props.wall) mainClass= "wall";
        else mainClass= "";
        return(
            <div onMouseDown={this.props.handleMouseDown} onMouseUp={this.props.handleMouseUp} onMouseEnter={this.props.handleMouseEnter} className={`node ${mainClass}`} id={`${this.props.row}-${this.props.col}`}><span className={`${extraClass}`}></span></div>
        )
    }
}

export default Node;