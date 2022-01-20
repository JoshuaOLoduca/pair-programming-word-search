const wordSearch = (letters, word) => {
  // Guard Clauses
  if (letters.length === 0 || letters === undefined) throw Error('Matrix is empty');
  if (word === '' || word === undefined) throw Error('Invalid word');


  const horizontalJoin = joinArrayContent(letters);
  for (const l of horizontalJoin) {
    if (l.includes(word) || l.split('').reverse().join('').includes(word)) return true;
  }
  
  const verticalJoin = joinArrayContent(flipMatrix(letters));
  for (const l of verticalJoin) {
    if (l.includes(word) || l.split('').reverse().join('').includes(word)) return true;
  }
  // console.log(horizontalJoin, verticalJoin)
  // console.log(checkDiagonal(letters, word));
  if (checkDiagonal(letters, word)) return true;

  return false;
};

const checkDiagonal = (matrix, word) => {
  const origWord = word;
  const firstLetter = word[0];
  let cornerPos = [];
  let buildingWord = firstLetter;
  word = word.slice(1);

  for (let i = 0; i < matrix.length; i++) {

    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === firstLetter) {
        
        cornerPos = checkCorners(matrix, i, j, word[0]);
        if (cornerPos.length > 0) {
          let ColDirectionOriginal = cornerPos[0] - i;
          let rowDirectionOriginal = cornerPos[1] - j;
          let ColDirection = ColDirectionOriginal;
          let rowDirection = rowDirectionOriginal;
          for (const char of word) {
            if (char === matrix[i + ColDirection][j + rowDirection]) {
              buildingWord += char;
              ColDirection += ColDirectionOriginal;
              rowDirection += rowDirectionOriginal;
            }
            if (buildingWord === origWord) return true;
          }
          buildingWord = firstLetter;
        }
      }
    }

  }

  // Declared like this so it gets hoisted
  function checkCorners(matrix, i, j, nextLetter) {
    // console.log(matrix[i-1][j-1]);
    if (matrix[i - 1] !== undefined) {
      
      if (matrix[i - 1][j - 1] !== undefined) {
        if (matrix[i - 1][j - 1] === nextLetter) return [i - 1, j - 1];
      }
      
      if (matrix[i - 1][j + 1] !== undefined) {
        if (matrix[i - 1][j + 1] === nextLetter) return [i - 1, j + 1];
      }
    }
    
    if (matrix[i + 1] !== undefined) {
      if (matrix[i + 1][j - 1] !== undefined) {
        if (matrix[i + 1][j - 1] === nextLetter) return [i + 1, j - 1];
      }
    
      if (matrix[i + 1][j + 1] !== undefined) {
        if (matrix[i + 1][j + 1] === nextLetter) return [i + 1, j + 1];
      }
    }
    return [];
  }
  
  return false;
};
  
const joinArrayContent = (matrix) => matrix.map(ls => ls.join(''));
const flipMatrix = (matrix) => {
  const length = matrix[0].length;
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      result[i].push(matrix[j][i]);
    }
  }
  return result;
};

module.exports = wordSearch;