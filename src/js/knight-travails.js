import { Queue, HashSet, HashMap } from "@land_v/data-structures";

function isValidCoord([x, y]) {
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function coordKey(coord) {
  return coord.toString();
}

function addChild(child, parentCoord, queue, parentMap, visitedSet) {
  const key = coordKey(child);
  if (isValidCoord(child) && !visitedSet.has(key)) {
    queue.enqueue(child);
    parentMap.set(key, parentCoord);
    visitedSet.set(key);
  }
}

function addChildren(coord, queue, parentMap, visitedSet) {
  const [x, y] = coord;
  const moves = [
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y - 2],
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
  ];
  moves.forEach((move) => addChild(move, coord, queue, parentMap, visitedSet));
}

function knightMoves(start, end) {
  if (!isValidCoord(start) || !isValidCoord(end)) {
    throw new Error("Invalid arguments.");
  }

  const queue = new Queue();
  const visited = new HashSet();
  const parent = new HashMap();
  const path = [];

  queue.enqueue(start);
  parent.set(coordKey(start), null);
  visited.set(coordKey(start));

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    const coord = current.value;

    if (coord.every((val, i) => val === end[i])) break;

    addChildren(coord, queue, parent, visited);
  }

  let cur = end;
  while (cur !== null) {
    path.unshift(cur);
    const prev = parent.get(coordKey(cur));
    if (!prev) break;
    cur = prev.value;
  }

  return path;
}

export { knightMoves };
