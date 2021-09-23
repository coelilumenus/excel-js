import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resize} from './table.resize';
import {shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  getTemplate() {
    return createTable(35);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resize(e, this.$root);
    } else if (e.target.dataset.type === 'cell') {
      console.log(e.target);
    }
  }
}
