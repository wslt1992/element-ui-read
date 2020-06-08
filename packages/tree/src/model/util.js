export const NODE_KEY = '$treeNodeId';

export const markNodeData = function(node, data) {
  if (!data || data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};

/**
 * 返回节点唯一标识的值
 * @param  key:唯一标识字段名
 * @param  data:节点数据，纯数据
 */
export const getNodeKey = function(key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};

export const findNearestComponent = (element, componentName) => {
  let target = element;
  while (target && target.tagName !== 'BODY') {
    if (target.__vue__ && target.__vue__.$options.name === componentName) {
      return target.__vue__;
    }
    target = target.parentNode;
  }
  return null;
};
