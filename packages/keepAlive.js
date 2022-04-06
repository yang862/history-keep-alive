/**
 * keepRouterAlive拓展方法，通过路由实现指定页面的keep-alive
 * @param {*} router vue-router实例
 */
export default function(router) {
  // 滚动元素的id // 约定好的，要使用keep-scroll功能就要给滚动元素设置这个id
  const scrollTarget = '#keep-scroll-plugin-target';

  const executeFn = function() {
    const [ fn, ...args ] = arguments;
    if (typeof fn === 'function') fn(...args);
  };

  /**
   * 使用afterEach钩子更新 keep-alive 的组件
   * @param {key, beforeEach} param
   * refs: router-view 实例的集合
   * ref: router-view 实例对应的key
   * beforeEach：路由更新时的回调函数，会返回 需要缓存的组件 matched 列表
   * immediate：是否马上执行beforeEach函数
   */
  function keepRouterAlive({ refs, key, beforeEach, immediate }) {
    if (immediate) {
      const routeHistory = (history.state && history.state.routeHistory) || [];
      executeFn(beforeEach, routeHistory);
    }

    router.beforeResolve((to, from, next) => {
      const routeHistory = (history.state && history.state.routeHistory) || [];
      getSrollTop(from);
      executeFn(beforeEach, routeHistory);
      setTimeout(next, 0); // 让beforeEach执行的函数可以引起视图变化
    });

    router.afterEach(to => {
      key && setTimeout(() => { // 等待组件渲染完成
        setSrollTop(to, refs ? refs[key] : this.$refs[key]);
      }, 0);
    });
  }

  // 记录离开时的scrollTop
  function getSrollTop(from) {
    // 这里可以用document
    const target = document.querySelector(scrollTarget);
    if (!target) return;
    if (!from.meta.scrollTopMap) from.meta.scrollTopMap = {};
    from.meta.scrollTopMap[from.path] = target.scrollTop;
  }

  // 还原滚动条
  function setSrollTop(to, ref) {
    if (!to.meta ||
      !to.meta.keepScroll ||
      !to.meta.scrollTopMap ||
      !to.meta.scrollTopMap[to.path] ||
      (!ref || !ref.$vnode || !ref.$vnode.data.keepAlive)
    ) return; // 没有缓存的页面不做还原
    try {
      const isTarget = ref && ref.$el && ref.$el.id &&
        ref.$el.id.includes(scrollTarget.slice(1));

      const target = isTarget ? ref.$el : ref.$el.querySelector(scrollTarget);
      if (!target) return;
      target.scrollTop = to.meta.scrollTopMap[to.path] || 0;
    } catch (e) {
      console.log('[keep-alive]setSrollTop error===', to.path, e);
    }
  }

  return keepRouterAlive;
}
