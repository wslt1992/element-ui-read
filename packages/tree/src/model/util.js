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
 * *注意*：(1)当用户 指定了 唯一标识的字段名，且data数据里有对应的数据(key:值)，则返回这个字段名的的对应值
 *         (2)当用户 没有指定 唯一标识的字段名，则用默认的id为字段名，在nodejs中生成的id序列号为值
 *              但是，此时的值仅仅是用于vue生成dom节点的唯一标识，在进行默认展开或者选中节点的设置时，是无效的
 *       
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
