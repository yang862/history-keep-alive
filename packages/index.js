import keepAlive from './keepAlive';
import KeepAliveComponent from './components/the-keep-alive/index.jsx';
import BaseKeepAliveComponent from './components/base-keep-alive/KeepAlive.js';
export * from './components/index.js';

class RouterHistory {
  // 记录当前路由的信息
  resetCurrent() {
    return {
      path: null,
      routeName: null,
      matched: [], // 当前展示的路由信息（嵌套多级）
      timestamp: null,
    };
  }
  createHistory(to, timestamp) {
    const current = this.resetCurrent();
    current.path = to.path;
    current.routeName = to.name;
    current.matched = (to.matched || []).map(item => ({
      meta: item.meta,
      name: item.name,
      path: item.path,
      regex: item.regex,
    }));
    current.timestamp = timestamp;
    return current;
  }

  addHistory({ router, routeHistory, isReplace = false, timestamp }) {
    const current = this.createHistory(router.currentRoute, timestamp);
    !isReplace ? routeHistory.push(current) : routeHistory.splice(-1, 1, current);
    history.replaceState({ ...(history.state || {}), current, routeHistory }, '');
  }

  handleTimestamp(params, useTimestamp, timestamp) {
    if (!useTimestamp) return params;
    params instanceof Object
      ? params.query = Object.assign(params.query || {}, { timestamp })
      : params += (params.includes('?') ? '?' : '&') + 'timestamp=' + timestamp;
    return params;
  }

  install(Vue, { router, immediate = true, useTimestamp = true, componentPrefix = 'history' }) {
    const that = this;

    router.onReady(() => {
      immediate && this.addHistory({
        router, routeHistory: [],
        timestamp: useTimestamp && router.currentRoute.query
          ? router.currentRoute.query.timestamp
          : null,
      });
    });

    const _history = { // 自定义对象
      isReplace: false,
      popstate: false,
      immediate,
      useTimestamp,
    };

    // 当发生浏览器路由动作时（e.g. history.go/history.back/history.forward），会触发popstate事件
    window.onpopstate = function() {
      _history.popstate = true;
    };

    // 重写router.back
    const back = router.back;
    router.back = function() {
      router.isRouterBack = true; // 记录返回状态
      back.apply(this, arguments);
    };

    // 重写router.replace
    const replace = router.replace;
    router.replace = async function() {
      const timestamp = Date.now();
      arguments[0] = that.handleTimestamp(arguments[0], useTimestamp, timestamp);
      const routeHistory = (history.state && history.state.routeHistory) || [];
      _history.isReplace = true;
      await replace.apply(this, arguments);
      that.addHistory({
        router, routeHistory, isReplace: true,
        timestamp: useTimestamp ? timestamp : null,
      });
    };

    // 重写router.push
    const push = router.push;
    router.push = async function() {
      const timestamp = Date.now();
      arguments[0] = that.handleTimestamp(arguments[0], useTimestamp, timestamp);
      const routeHistory = (history.state && history.state.routeHistory) || [];
      await push.apply(this, arguments);
      that.addHistory({
        router, routeHistory,
        timestamp: useTimestamp ? timestamp : null,
      });
    };

    const keepRouterAlive = new keepAlive(router);
    Object.defineProperty(Vue.prototype, '$keepRouterAlive', { value: keepRouterAlive });

    Object.defineProperty(Vue.prototype, '$routerHistory', { value: _history });

    Vue.component('history-base-keep-alive', BaseKeepAliveComponent);
    Vue.component(componentPrefix + '-keep-alive', KeepAliveComponent);
  }
}

export default new RouterHistory();
