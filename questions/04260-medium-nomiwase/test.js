function bfs(str) {
    const q = [{ val: "", remain: [...Array(str.length).keys()] }]; // init
    const res = [];
  
    while (q.length) {
      const { val, remain } = q.shift();
      res.push(val);
      if (remain.length === 0) {
        break;
      }
      for (const idx of remain) {
        q.push({
          val: `${val}${str[idx]}`,
          remain: remain.filter((x) => x !== idx),
        });
      }
    }
  
    return res;
  }

  function bfsRecursive(str, q = [{ val: "", remain: [...Array(str.length).keys()] }], res = []) {
    let l = q.length
    // if(!l) {
    //   return res // invalid
    // }

    for(let i = 0; i < l; i++) {
      const {val, remain} = q.shift()
      res.push(val)
      if(remain.length === 0) {
        return res; // end recursive
      }
      for (const idx of remain) {
        q.push({
          val: `${val}${str[idx]}`,
          remain: remain.filter((x) => x !== idx),
        });
      }
    }
    return bfsRecursive(str, q, res)
  }
  
  const input = "ABCD";

  // console.log(`bfs("${input}")`, bfs(input));
  
  console.log(`bfs("${input}")`, bfsRecursive(input));

  