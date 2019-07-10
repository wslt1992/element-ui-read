/**
 * 向当前组件的子（child）组件进行广播，发送事件
 * @param componentName
 * @param eventName
 * @param params
 */
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    /**
     * 子组件向父（可指定父组件名称）组件传递一个事件
     * @param componentName 父组件的名称
     * @param eventName 事件名
     * @param params 事件参数
     */
    dispatch(componentName, eventName, params) {
      // 找到父组件，父组件为空，则为根组件
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      // 名字不存在，继续循环查找；名字不匹配，继续查找
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        // 在parent上执行emit发送事件
        // apply 接收一个目标对象和一个数组，[eventName]为一个数组，params为数组，数组连接方法concat
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
