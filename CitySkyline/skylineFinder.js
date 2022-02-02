class BuildingCorner {
  constructor(x, y, isStart) {
    this.x = x;
    this.y = y;
    this.isStart = isStart;
  }
}

const findSkyline = () => {
  let skyline = [];

  // Create top corners array
  const corners = [];
  for (let building of buildings) {
    corners.push(new BuildingCorner(building.left, building.height, true));
    corners.push(new BuildingCorner(building.right, building.height, false));
  }


  // Sort by ascending x
  corners.sort((a, b) => {
    if(a.x !== b.x) return a.x - b.x;
    const aY = a.isStart ? -a.y : a.y;
    const bY = b.isStart ? -b.y : b.y;
    return aY - bY;
  });

  // Initialize heap
  const heights = new BinaryHeap(buildings.length);
  heights.insert(0);

  // Loop over array
  for (let corner of corners) {
    // If it's a start
    if (corner.isStart) {
      // add height to priority queue
      const maxChanged = heights.insert(corner.y);
      // if maxHeight changes, add point to output
      if (maxChanged)
        skyline.push(new SkylinePoint(corner.x, corner.y));
      // Else, if it's an end
    } else {
      // remove height from priority queue
      const maxChanged = heights.remove(corner.y);
      // if maxHeight changes, add (x, newMaxHeight) to output
      if(maxChanged)
      skyline.push(new SkylinePoint(corner.x, heights.findMax()));
    }
  }
  return skyline;
}