const splitIntoChunk = (arr, chunk) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunk) {
    let tempArray;
    tempArray = arr.slice(i, i + chunk);
    res.push(tempArray);
  }
  return res;
};

export default splitIntoChunk;
