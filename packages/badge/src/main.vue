<template>
  <div class="el-badge">
    <slot></slot>
    <transition name="el-zoom-in-center">
<!--      隐藏开启，或者 没有内容 都隐藏-->
      <sup
        v-show="!hidden && (content || content === 0 || isDot)"
        v-text="content"
        class="el-badge__content"
        :class="[
          'el-badge__content--' + type,
          {
            'is-fixed': $slots.default,
            'is-dot': isDot
          }
        ]">
      </sup>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ElBadge',

  props: {
    // 值可以是数字和字符串
    value: {},
    // value为值时，max表示最大值：格式（100+）
    max: Number,
    // 显示格式为小红点
    isDot: Boolean,
    // 隐藏badge
    hidden: Boolean,
    type: {
      type: String,
      validator(val) {
        return ['primary', 'success', 'warning', 'info', 'danger'].indexOf(val) > -1;
      }
    }
  },

  computed: {
    content() {
      //  小红点true，只显示小红点
      if (this.isDot) return;

      const value = this.value;
      const max = this.max;
      // 显示值，当超过max(假设10)则显示“10+”
      if (typeof value === 'number' && typeof max === 'number') {
        return max < value ? `${max}+` : value;
      }

      return value;
    }
  }
};
</script>
