<template>
<!--  class名字的写法可以借鉴，前缀+js中定义的名字，css名与这相同，可以借鉴。代码简洁-->
  <button
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
<!--    正在加载时，显示加载 图标-->
    <i class="el-icon-loading" v-if="loading"></i>
<!--    一般时（没有加载时），显示 外部绑定的图标-->
    <i :class="icon" v-if="icon && !loading"></i>
<!--    $slots.default 包含了所有没有具字插槽的节点-->
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'ElButton',
    // 这代码怎么注入的？
    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    props: {
      // 主题类型 primary / success / warning / danger / info / text
      type: {
        type: String,
        default: 'default'
      },
      // 尺寸 medium / small / mini
      size: String,
      icon: {
        type: String,
        default: ''
      },
      // button / submit / reset
      nativeType: {
        type: String,
        default: 'button'
      },
      // 正在加载
      loading: Boolean,
      // 禁用
      disabled: Boolean,
      // 是否朴素按钮
      plain: Boolean,
      // 自动聚焦
      autofocus: Boolean,
      // 圆角
      round: Boolean,
      // 圆形button
      circle: Boolean
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      buttonDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      }
    },

    methods: {
      /**
       * 向父发送click事件
       * @param evt
       */
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
