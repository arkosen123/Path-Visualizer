This is a PathFinding Visualization Project, built on React and Express.

There are basically few algorithms which help in generating a path between the StartNode and EndNode. So let me introduce you to the algorithms:

Dijkstra's Algorithm (weighted): The basic algorithm for pathfinding, it completely guarantees the shortest path and can work with weights.

A* Search (weighted): Indeed the best pathfinding algorithm, uses heuristics to guarantee the shortest path, hence it's much like an informed search, so much faster than Dijkstra's Algorithm. It also works fine with weight.

Greedy Best-first Search: A faster, more heuristic-heavy version of A*, does not guarantee the shortest path. It is purely based on heuristics so does not work well with weights.

Breath-first Search (unweighted): A good algorithm, guarantees the shortest path. It's more or less similar to Dijkstra, just in contrast the former doesn't work with weights.

Depth-first Search (unweighted): A very bad algorithm for pathfinding, does not guarantee the shortest path for sure. It just randomly search every single node to it's maximum depth.

So now let me demonstrate how it works.... 

All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a cost of One and movements from a node to another have a cost of One. Note that diagonal movements are restricted.

Firstly there is an empty grid presented in front of you. You first need to click once for the StartNode and then for the EndNode.

After that you are requested to choose an algorithm. Note that some algorithms are unweighted, while others are weighted. Unweighted algorithms do not take weight nodes into account, whereas weighted ones do. So the "Add Weight" button for unweighted algorithms has been disabled. Additionally, not all algorithms guarantee the shortest path.

Now further you can create some walls in the grid. You just need to click or you may click and drag to create walls. Walls are impenetrable, meaning that a path cannot cross through them.

Then for weighted algorithms, you may click the button "Add weight" and then click anywhere in the grid to add some weights. Weights are not impassable. They are simply more costly to move through. In this application, moving through a weight node has a default cost of Five. Make sure to click back the Add Weight Button once you are done with adding weights

You may simply change the default cost of weight by clicking on the "Weight Cost" button to see an input space which can be incremented or decremented by small buttons attached to it. Note that the weight must greater than One.

You can also drag and drop the EndNode to automatically start the animation again for that new endpoint. Note it's only applicable when an algorithm is working and no change in walls, weights and StartNode is done.

Finally comes the most interesting part of this part, that is the real-time visualisation. Note that it's only available for uninformed search algorithms. You can just hover anywhere in the grid, the hovered node will become the EndNode after you click the "Real Time" button and it will let you analyse how the algorithm works for different endpoints instantly. Make sure you click back Real Time button after you are done.

Use the navbar buttons to visualize algorithms and to do other interesting stuffs! There is also a Reset Dropdown Button which allows you to erase the inimation, or the walls and weights or even everything from the grid. There is also a button which controls the speed of the imanition.