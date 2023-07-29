function findPath(maze) 
{
  maze = maze.split('\n');
  maze = maze.map(row => row.split(''));
  let N = maze.length;
  let table = {};
  
  let unvisited = [[0, 0, 0, ""]];
  let visited = new Set();
  
  const contained = (x, y) => {return x >= 0 && x < maze.length && y >= 0 && y < maze[0].length;};
  
  let dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  while(unvisited.length)
  {
    let [i, j, sp, prev] = unvisited.shift();
    let key = i + "," + j;
    
    if(!(key in table))
      table[key] = [sp, prev];
    visited.add(key)
    for(let dir of dirs)
    {
      let [ni, nj] = [i + dir[0], j + dir[1]];
      let keyn = ni + "," + nj;
      if(!visited.has(keyn) && contained(ni, nj) && maze[ni][nj] != 'W')
        unvisited.push([ni, nj, sp + 1, key]);
      
      if(contained(ni, nj) && maze[ni][nj] != 'W')
      {
        if(! (keyn in table) )
          table[keyn] = [sp + 1, key];
        else if(table[keyn][0] > sp + 1)
          table[keyn][0] = sp + 1;
      }
    }
  }
  

  let finishPoint = (N-1) + "," + (N-1);
  
  drawMaze(maze, table, finishPoint);
  
  return finishPoint in table ? table[finishPoint][0] : false;
}

function drawMaze(maze, table, finishPoint)
{
  let N = maze.length;
  if(finishPoint in table)
  {
    f = table[finishPoint][0];
    let w = finishPoint.split(',');
    maze[+w[0]][+w[1]] = '*';
    while(true)
    {
      let pos = table[finishPoint];
      if(pos[1] == "")
        break;
      let prev = pos[1].split(',');
      let m = +prev[0];
      let n = +prev[1];
      maze[m][n] = '*';
      finishPoint = prev;
    }
  }
  
  console.log("\n" + ('-'.repeat(N)) + "Maze" + ('-'.repeat(N)) + "\n");
  console.log((maze.map(row=>row.join(''))).join('\n'));
  console.log("\n" + ('-'.repeat(N)) + "Maze" + ('-'.repeat(N)) + "\n");
}
