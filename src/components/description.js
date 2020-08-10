import React from 'react';

const Description = ((props) => {
    let des = `To know how this website works click on "Help"`;
    if (props.type === "Dijkstra")
        des = "Dijkstra algorithm always provide the shortest path and can work with weights.";
    else if (props.type === "A-star")
        des = "A* algorithm always provide the shortest path and can work with weights.";
    else if (props.type === "Greedy")
        des = "Greedy algorithm may or may not give shortest path and cannot work with weights.";
    else if (props.type === "BFS")
        des = "BFS algorithm always provides the shortest path and cannot work with weights.";
    else if (props.type === "DFS")
        des = "DFS algorithm may or may not give shortest path and cannot work with weights.";
    return(
        <div>
            <div className="description">
                <div className="des-text">Start Node -> <span className="fa fa-chevron-circle-right"></span></div>
                <div className="des-text">End Node -> <span className="fa fa-stop-circle "></span></div>
                <div className="des-text">Wall -> <span className="wall-still box "></span></div>
                <div className="des-text">Visited Node -> <span className="visited box "></span></div>
                <div className="des-text">Shortest Path -> <span className="path box "></span></div>
                <div className="des-text">Weighted Node -> <span className="fa fa-certificate "></span></div>
            </div>
            <div className="algo-desp">
                <div className="algo-text">{des}</div>
            </div>
        </div>
    )
});

export default Description;