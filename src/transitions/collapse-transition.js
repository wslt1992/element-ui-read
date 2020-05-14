import { addClass, removeClass } from 'element-ui/src/utils/dom';

/**
 * 以下是一个展开收起动画：假设高度从0到300
 * 高度从0到300，然后从300到0是一个动画的来回，是2个部分动画
 * 2、beforeEnter、enter、afterEnter  是从0到300动画的钩子函数
 * 3、beforeLeave、leave、afterleave 是从300到0动画的钩子函数
 */
class Transition {

  /**
   * 进入动画之前（展开开始之前）
   */
  beforeEnter(el) {
    addClass(el, 'collapse-transition');
    if (!el.dataset) el.dataset = {};

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;

    el.style.height = '0';
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  }

  /**
   * 动画执行过程中（展开过程中）
   */
  enter(el) {
    el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
      el.style.height = '';
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    el.style.overflow = 'hidden';
  }

  /**
   * 完成动画之后（展开后）
   */
  afterEnter(el) {
    // for safari: remove class then reset height is necessary
    removeClass(el, 'collapse-transition');
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
  }

  /**
   * 恢复状态动画开始之前（（收起开始前）
   * 若在enter环节增加了transition设置，则在此处要清除一次之前设置的
   */
  beforeLeave(el) {
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.height = el.scrollHeight + 'px';
    el.style.overflow = 'hidden';
  }

  /**
   * 恢复状态动画中（收起过程中）
   * ***注意***
   * (1)高度在这里恢复为0，不是在afterEnter
   * (2)transition或者animation设置在此处
   */
  leave(el) {
    if (el.scrollHeight !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      addClass(el, 'collapse-transition');
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  }

  /**
   * 恢复动画完成后（收起之后）
   */
  afterLeave(el) {
    removeClass(el, 'collapse-transition');
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  }
}

export default {
  name: 'ElCollapseTransition',
  functional: true,
   // children来自组件包裹的内容(官方文档说明的是：上下文内容)，
   // 如： <collapse-transition>
   //          <div>fdjfkdjfkdjfkdj</div> //这个节点就是children
   //      </collapse-transition>
  render(h, { children }) {
    const data = {
      on: new Transition()
    };

    return h('transition', data, children);
  }
};
