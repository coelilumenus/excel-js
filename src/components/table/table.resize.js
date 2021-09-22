import {$} from '@core/dom';

export function resize(e, $root) {
  if (e.target.dataset.resize) {
    const $resizer = $(e.target);
    const $parent = $resizer.closest('[data-type="resizeble"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({
      opacity: 0.7,
      [sideProp]: '-2000px'
    });

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({right: -delta + 'px'});
      } else if (type === 'row') {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({bottom: -delta + 'px'});
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (type === 'col') {
        $parent.css({width: value + 'px'});
        $root.findAll(`[data-cell="${$parent.data.col}"]`)
          .forEach((el) => el.style.width = value + 'px');
      } else {
        $parent.css({height: value + 'px'});
      }

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      });
    };
  }
}
