import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
      super($root, {
        name: 'Formula',
        listeners: ['input', 'keydown'],
        ...options
      });
    }

    getTemplate() {
      return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `;
    }

    onInput(e) {
      const text = e.target.textContent.trim();
      this.$emit('formula:input', text);
    }

    onKeydown(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.$emit('formula:enter');
      }
    }
}
