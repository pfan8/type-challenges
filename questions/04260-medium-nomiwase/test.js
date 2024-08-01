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
  
  const input = "ACC";
  console.log(`bfs("${input}")`, bfs(input));