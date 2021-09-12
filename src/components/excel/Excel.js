export class Excel {
    constructor(selector, options) {
        this.$element = document.querySelector(selector);
        this.components = options.components || [];
    }

    getRoot() {
        const $root = document.createElement('div');

        this.components.forEach((Component) => {
            const component = new Component();
            $root.insertAdjacentHTML('beforeend', component.toHTML());
        });

        return $root;
    }

    render() {
        this.$element.append(this.getRoot());
    }
}
