const findSkyline = () => {
  let skyline = [];

  const corners = getTopCorners();

  const heights = new BinaryHeap(buildings.length);
  heights.insert(0);

  for (let corner of corners) {
    if (corner.isStart) {
      const maxChanged = heights.insert(corner.y);
      if (maxChanged)
        skyline.push(new SkylinePoint(corner.x, corner.y));
    } else {
      const maxChanged = heights.remove(corner.y);
      if (maxChanged)
        skyline.push(new SkylinePoint(corner.x, heights.findMax()));
    }
  }
  return skyline;
}

const getTopCorners = () => {

  const corners = [];
  for (let building of buildings) {
    corners.push(new BuildingCorner(building.left, building.height, true));
    corners.push(new BuildingCorner(building.right, building.height, false));
  }

  corners.sort((a, b) => {
    if (a.x !== b.x) return a.x - b.x;
    const aY = a.isStart ? -a.y : a.y;
    const bY = b.isStart ? -b.y : b.y;
    return aY - bY;
  });

  return corners;
}