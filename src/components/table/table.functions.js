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

export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0;
  switch (key) {
  case 'Enter':
  case 'ArrowDown':
    row++;
    break;
  case 'Tab':
  case 'ArrowRight':
    col++;
    break;
  case 'ArrowLeft':
    col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
    break;
  case 'ArrowUp':
    row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
    break;
  }

  return `[data-id="${row}:${col}"]`;
}


export function outlineMatrix($group) {
  const array = $group.map(($element) => $element.id());

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

  const getElements = (sideIndex) => {
    return function(acc, item, i) {
      if (i !== 0 && i !== (rows - 1)) {
        acc.push(item[sideIndex]) || acc.push(null);
      }
      return acc;
    };
  };

  const corners = {
    leftTop: matrix[0][0],
    rightTop: matrix[0][cols - 1],
    leftBot: matrix[rows - 1][0],
    rightBot: matrix[rows - 1][cols - 1],

    get _isSingle() {
      switch (this.leftTop) {
      case this.rightTop:
        return {
          singleTop: this.leftTop,
          singleBot: this.leftBot
        };
      case this.leftBot:
        return {
          singleLeft: this.leftTop,
          singleRight: this.rightTop
        };
      default:
        return this;
      }
    }
  };

  const edges = {
    top: matrix[0].slice(1, cols - 1),
    bot: matrix[rows - 1].slice(1, cols - 1),
    left: matrix.reduce(getElements(0), []),
    right: matrix.reduce(getElements(cols - 1), []),
    singleRow: [],
    singleCol: [],

    get _isSingle() {
      switch ('') {
      case this.top.join(''):
        if (this.left.join('') === this.right.join('')) {
          this.singleRow = this.left;
          this.left = [];
          this.right = [];
        }
        return this;
      case this.left.join(''):
        if (this.top.join('') === this.bot.join('')) {
          this.singleCol = this.top;
          this.top = [];
          this.bot = [];
        }
        return this;
      default:
        return this;
      }
    }
  };

  return {
    $group,
    corners: corners._isSingle,
    edges: edges._isSingle
  };
}

// property of object "cases" should named same as "classes"
const outline = {
  get data() {
    return 'data-outline';
  },

  init(group, classes, cases = {}) {
    group.forEach(($element) => {
      Object
        .keys(cases)
        .forEach((key) => {
          Object
            .keys(cases[key])
            .forEach((deepKey) => {
              if (cases[key]['type'] === 'string') {
                switch ($element.id()) {
                case cases[key][deepKey]:
                  $element.addClass(classes[key][deepKey]);
                  $element.setAttribute(outline.data, classes[key][deepKey]);
                  break;
                }
              } else if (cases[key]['type'] === 'array') {
                const array = Array.from(cases[key][deepKey]);
                switch ($element.id()) {
                case array.find((item) => item === $element.id()):
                  $element.addClass(classes[key][deepKey]);
                  $element.setAttribute(outline.data, classes[key][deepKey]);
                  break;
                }
              } else {
                throw new Error(
                  // eslint-disable-next-line max-len
                  'The object should has property "type" with value "string" or "array"'
                );
              }
            });
        });
    });
  }
};

export {outline};
