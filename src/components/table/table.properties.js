const classNames = {
  single: 'selected',
  corners: {
    leftTop: 'selected-corner__left-top',
    rightTop: 'selected-corner__right-top',
    leftBot: 'selected-corner__left-bottom',
    rightBot: 'selected-corner__right-bottom',
    singleTop: 'selected-corner__single-top',
    singleBot: 'selected-corner__single-bottom',
    singleLeft: 'selected-corner__single-left',
    singleRight: 'selected-corner__single-right',
  },
  edges: {
    top: 'selected-edge__top',
    bot: 'selected-edge__bottom',
    left: 'selected-edge__left',
    right: 'selected-edge__right',
    singleRow: 'selected-edge__single-row',
    singleCol: 'selected-edge__single-col'
  }
};

const cases = (matrix) => {
  return ({
    corners: {
      leftTop: matrix.corners.leftTop,
      rightTop: matrix.corners.rightTop,
      leftBot: matrix.corners.leftBot,
      rightBot: matrix.corners.rightBot,
      singleTop: matrix.corners.singleTop,
      singleBot: matrix.corners.singleBot,
      singleRight: matrix.corners.singleRight,
      singleLeft: matrix.corners.singleLeft
    },
    edges: {
      top: matrix.edges.top,
      bot: matrix.edges.bot,
      left: matrix.edges.left,
      right: matrix.edges.right,
      singleRow: matrix.edges.singleRow,
      singleCol: matrix.edges.singleCol
    }
  });
};

const keys = [
  'Enter',
  'Tab',
  'ArrowLeft',
  'ArrowRight',
  'ArrowDown',
  'ArrowUp'
];

export {classNames, cases, keys};
