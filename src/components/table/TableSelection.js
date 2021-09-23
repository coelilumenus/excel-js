export class TableSelection {
  constructor() {
    this.group = [];
  }

  select($element) {
    this.group.push($element);
    $element.addClass('selected');
  }

  selectGroup() {}
}
