const chai = require("chai");
const assert = chai.assert;

const wordSearch = require("../wordsearch.js");

describe("#wordSearch()", function() {
  it("should return false if the word is not present", function() {
    const result = wordSearch(
      [
        ["A", "W", "C", "F", "Q", "U", "A", "L"],
        ["S", "E", "I", "N", "F", "E", "L", "D"],
        ["Y", "F", "C", "F", "Q", "U", "A", "L"],
        ["H", "M", "J", "T", "E", "V", "R", "G"],
        ["W", "H", "C", "S", "Y", "E", "R", "L"],
        ["B", "F", "R", "E", "N", "E", "Y", "B"],
        ["U", "B", "T", "W", "A", "P", "A", "I"],
        ["O", "D", "C", "A", "K", "U", "A", "S"],
        ["E", "Z", "K", "F", "Q", "U", "A", "L"],
      ],
      "FRANK"
    );

    assert.isFalse(result);
  });

  it("should thow and error when the matrix is empty", function() {
    assert.throw(() => {
      wordSearch([], "FRANK");
    }, "Matrix is empty");
  });

  it("should return true if the word is present", function() {
    const result = wordSearch(
      [
        ["A", "W", "C", "F", "Q", "U", "A", "L"],
        ["S", "E", "I", "N", "F", "E", "L", "D"],
        ["Y", "F", "C", "F", "Q", "U", "A", "L"],
        ["H", "M", "J", "T", "E", "V", "R", "G"],
        ["W", "H", "C", "S", "Y", "E", "R", "L"],
        ["B", "F", "R", "E", "N", "E", "Y", "B"],
        ["U", "B", "T", "W", "A", "P", "A", "I"],
        ["O", "D", "C", "A", "K", "U", "A", "S"],
        ["E", "Z", "K", "F", "Q", "U", "A", "L"],
      ],
      "SEINFELD"
    );

    assert.isTrue(result);
  });

  it("should return true if the word is present", function() {
    const result = wordSearch(
      [
        ["A", "W", "C", "F", "Q", "U", "A", "E"],
        ["S", "E", "I", "N", "F", "E", "L", "L"],
        ["Y", "F", "C", "F", "Q", "U", "A", "A"],
        ["H", "M", "J", "T", "E", "V", "R", "I"],
        ["W", "H", "C", "S", "Y", "E", "R", "N"],
        ["B", "F", "R", "E", "N", "E", "Y", "E"],
        ["U", "B", "T", "W", "A", "P", "A", "I"],
        ["O", "D", "C", "A", "K", "U", "A", "S"],
        ["E", "Z", "K", "F", "Q", "U", "A", "L"],
      ],
      "ELAINE"
    );

    assert.isTrue(result);
  });

  it("should throw an error when the word parameter is empty", function() {
    const matrix = [
      ["A", "W", "C", "F", "Q", "U", "A", "E"],
      ["S", "E", "I", "N", "F", "E", "L", "L"],
      ["Y", "F", "C", "F", "Q", "U", "A", "A"],
      ["H", "M", "J", "T", "E", "V", "R", "I"],
      ["W", "H", "C", "S", "Y", "E", "R", "N"],
      ["B", "F", "R", "E", "N", "E", "Y", "E"],
      ["U", "B", "T", "W", "A", "P", "A", "I"],
      ["O", "D", "C", "A", "K", "U", "A", "S"],
      ["E", "Z", "K", "F", "Q", "U", "A", "L"],
    ];

    assert.throws(() => {
      wordSearch(matrix, "");
    });
  });

  it("should return true if the word is backwards", function() {
    const result = wordSearch([
      ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
      ['D', 'L', 'E', 'F', 'N', 'I', 'E', 'S'],
      ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
      ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
      ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
      ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
      ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
      ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
      ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
    ], 'SEINFELD');

    assert.isTrue(result);
  });
  it("should return true if the word is present (Topleft to Bottom Right; diagonally)", function() {
    const result = wordSearch([
      // DIRECTION =
      // ColDirection = col2 - col1 | 2 - 1 = 1
      // rowDirection = row2 - row1 | 3 - 2 = 1
      // to find the next 3+ chars
      // REPEAT START:
      // [col2 + colDirection][row2 + rowDirection]
      // IF [col2 + colDirection][row2 + rowDirection] === word[2]
      //    THEN REPEAT
      // ELSE return;
      //
      //
      ['A', '_', '_', 'F', 'Q', 'U', 'A', 'L'],
      //        col1 row1
      //              [1][2]
      ['D', '_', 'H', '_', 'N', 'I', 'E', 'S'],
      //            col2 row2
      //                   [2][3]
      ['Y', 'F', '_', 'E', '_', 'U', 'A', 'L'],
      ['H', 'M', 'J', '_', 'L', '_', 'R', 'G'],
      ['W', 'H', 'C', 'S', '_', 'L', '_', 'L'],
      ['B', 'F', 'R', 'E', 'N', '_', 'O', '_'],
      ['U', 'B', 'T', 'W', 'A', 'P', '_', '_'],
      ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
      ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
    ], 'HELLO');

    assert.isTrue(result);
  });
  it("should return true if the word is present (Topleft to Bottom Right; diagonally, Backwards)", function() {
    const result = wordSearch([
      ['A', '_', '_', 'F', 'Q', 'U', 'A', 'L'],
      ['D', '_', 'O', '_', 'N', 'I', 'E', 'S'],
      ['Y', 'F', '_', 'L', '_', 'U', 'A', 'L'],
      ['H', 'M', 'J', '_', 'L', '_', 'R', 'G'],
      ['W', 'H', 'C', 'S', '_', 'E', '_', 'L'],
      ['B', 'F', 'R', 'E', 'N', '_', 'H', '_'],
      ['U', 'B', 'T', 'W', 'A', 'P', '_', '_'],
      ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
      ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
    ], 'HELLO');

    assert.isTrue(result);
  });

  it("should return true if the word is present (diagonally, bottom left to top right)", function() {
    const result = wordSearch([
      ['A', 'T', 'F', 'F', 'Q', 'U', 'A', 'L'],
      ['D', 'H', 'O', 'P', 'N', 'I', 'E', 'S'],
      ['Y', 'F', 'S', 'E', 'Q', 'U', 'A', 'L'],
      ['H', 'M', 'J', 'I', 'L', 'K', 'R', 'G'],
      ['W', 'H', 'C', 'S', 'O', 'E', 'L', 'L'],
      ['B', 'F', 'R', 'L', 'N', 'K', 'E', 'P'],
      ['U', 'B', 'L', 'W', 'A', 'P', 'P', 'I'],
      ['O', 'E', 'C', 'A', 'K', 'U', 'A', 'S'],
      ['H', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
    ], 'HELLO');

    assert.isTrue(result);
  });

  
});
