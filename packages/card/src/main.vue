<template>
  <div class="el-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
<!--    header默认，输出props中的header-->
<!--    如果有具名插槽header,则显示自定义-->
<!--    如果都没有，则隐藏-->
    <div class="el-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="el-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElCard',
    props: {
      // 标题的值
      header: {},
      // body的样式
      bodyStyle: {},
      // shadow的值：always、hover或never
      // 阴影显示时机
      shadow: {
        type: String
      }
    }
  };
</script>
