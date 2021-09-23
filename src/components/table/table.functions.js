import {range} from '@core/utils';

export function shouldResize(e) {
  return e.target.dataset.resize;
}

export function isCell(e) {
  return e.target.dataset.type === 'cell';
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function arrayMatrix(array) {
  const matrix = [];
  const ids = array.sort((a, b) => {
    return Number.parseInt(a) - Number.parseInt(b);
  });

  const firstRow = Number.parseInt(ids[0]);
  const lastRow = Number.parseInt(ids[ids.length - 1]);
  const rows = (lastRow - firstRow) + 1;
  const cols = ids.length / rows;

  for (let i = firstRow; i <= lastRow; i++) {
    matrix.push(ids.splice(0, cols));
  }

  const getLeftElements = (acc, item, i) => {
    if (i !== 0 && i !== (rows - 1)) {
      acc.push(item[0]);
    }
    return acc;
  };

  const corners = {
    leftTop: matrix[0][0],
    rightTop: matrix[0][cols - 1],
    leftBot: matrix[rows - 1][0],
    rightBot: matrix[rows - 1][cols - 1]
  };

  const edges = {
    top: matrix[0].slice(1, cols - 1),
    bot: matrix[rows - 1].slice(1, cols - 1),
    left: matrix.reduce(getLeftElements, [])
  };

  return {matrix, cols, rows, corners, edges};
}
