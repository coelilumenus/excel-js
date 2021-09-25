import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from './table.template';
import {resize} from './table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions';
import {keys} from './table.properties';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options
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

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });

    this.$on('formula:enter', () => {
      this.selection.current.focus();
    });
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resize(e, this.$root);
    } else if (isCell(e)) {
      const $target = $(e.target);
      if (e.shiftKey) {
        const $cells = matrix($target, this.selection.current)
          .map((id) => this.$root.find(`[data-id="${id}"]`));

        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(e) {
    const {key} = e;

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);
    }
  }
}

