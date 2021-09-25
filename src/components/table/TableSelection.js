import {outlineMatrix, outline} from './table.functions';
import {classNames, cases} from './table.properties';

export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  select($element) {
    this.clear();

    this.group.push($element);
    this.current = $element;
    $element.focus().addClass(classNames.single);
  }

  clear() {
    this.group.forEach(($cell) => {
      $cell.removeClass(classNames.single);

      if ($cell.data.outline) {
        $cell.removeClass($cell.data.outline);
        $cell.removeAttribute(outline.data);
      }
    });

    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;

    const matrix = outlineMatrix(this.group);
    outline.init(this.group, classNames, cases(matrix));
  }
}

