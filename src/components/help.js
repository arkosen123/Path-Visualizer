import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from './footer';

const Help = ((props) => {
    return (
        <div>
            <div class="help-info">
                <div>
                    <Link to={'/'}>
                        <Button className="help-btn">Go back</Button>
                    </Link>
                    <h1 className="help-heading"> Path Visualizer Help</h1>
                </div>
                <h2 className="help-topic help-main">This is a PathFinding Visualization Project, built on React and Express.</h2>

                <h6 className="help-instru">There are basically few algorithms which help in generating a path between the StartNode and EndNode. So let me introduce you to the algorithms: </h6>
                <ul>
                    <li><p><strong>Dijkstra's Algorithm (weighted):</strong> The basic algorithm for pathfinding, it completely guarantees the shortest path and can work with weights.</p></li>
                    <li><p><strong>A* Search (weighted):</strong> Indeed the best pathfinding algorithm, uses heuristics to guarantee the shortest path, hence it's much like an informed search, so much faster than Dijkstra's Algorithm. It also works fine with weight.</p></li>
                    <li><p><strong>Greedy Best-first Search:</strong> A faster, more heuristic-heavy version of A*, does not guarantee the shortest path. It is purely based on heuristics so does not work well with weights.</p></li>
                    <li> <p><strong>Breath-first Search (unweighted):</strong> A good algorithm, guarantees the shortest path. It's more or less similar to Dijkstra, just in contrast the former doesn't work with weights.</p></li>
                    <li><p><strong>Depth-first Search (unweighted):</strong> A very bad algorithm for pathfinding, does not guarantee the shortest path for sure. It just randomly search every single node to it's maximum depth.</p></li>
                </ul>                

                <h4 className="help-topic help-demo">So now let me demonstrate how it works....</h4>
                <h5 className="help-topic help-instru">This tutorial will walk you through all of the features of this website. If you want to dive right in, feel free to press the "Go Back" button at the top of the page.</h5>

                <ul>
                    <li><p>All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a cost of One and movements from a node to another have a cost of One. <i>Note that diagonal movements are restricted.</i></p></li>
                    <li><p>Firstly there is an empty grid presented in front of you. You first need to click once for the StartNode and then for the EndNode.</p></li>
                    <li><p>After that you are requested to choose an algorithm. <i>Note that some algorithms are unweighted, while others are weighted.</i> Unweighted algorithms do not take weight nodes into account, whereas weighted ones do. So the "Add Weight" button for unweighted algorithms has been disabled. Additionally, not all algorithms guarantee the shortest path.</p></li>
                    <li><p>Now further you can create some walls in the grid. You just need to click or you may click and drag to create walls. Walls are impenetrable, meaning that a path cannot cross through them.</p></li>
                    <li><p>Then for weighted algorithms, you may click the button "Add weight" and then click anywhere in the grid to add some weights. Weights are not impassable. They are simply more costly to move through. In this application, moving through a weight node has a default cost of Five. <i>Make sure to click back the Add Weight Button once you are done with adding weights</i></p></li>
                    <li><p>You may simply change the default cost of weight by clicking on the "Weight Cost" button to see an input space which can be incremented or decremented by small buttons attached to it. <i>Note that the weight must greater than One.</i></p></li>
                    <li><p>You can also drag and drop the EndNode to automatically start the animation again for that new endpoint. <i>Note it's only applicable when an algorithm is working and no change in walls, weights and StartNode is done.</i></p></li>
                    <li><p>Finally comes the most interesting part of this part, that is the real-time visualisation. <i>Note that it's only available for uninformed search algorithms.</i> You can just hover anywhere in the grid, the hovered node will become the EndNode after you click the "Real Time" button and it will let you analyse how the algorithm works for different endpoints instantly. <i>Make sure you click back Real Time button after you are done.</i></p></li>
                    <li><p>Use the navbar buttons to visualize algorithms and to do other interesting stuffs! There is also a Reset Dropdown Button which allows you to erase the inimation, or the walls and weights or even everything from the grid.</p></li>
                </ul>
               
                <h3>That's it from the Tutorial. Now you are ready to jump in and enjoy the cool animations and play with it. Just press the "Next" button to jump in!!!</h3>

                <Link to={'/'}>
                    <Button className="help-btn">Next</Button>
                </Link>
            </div>
            <Footer></Footer>
        </div>
    )
});

export default Help;