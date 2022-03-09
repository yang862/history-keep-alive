export default {
  name: 'KeepAlive',
  props: {
    aliveRef: {
      type: String,
      default: 'view',
    },
    max: {
      type: Number,
      default: 10,
    },
    // 自定义keep-alive的key的处理器
    keyFormatter: {
      type: Function,
      default: () => {},
    },
    // 自定义keep-alive的history的过滤器
    historyFilter: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      history: [],
    };
  },
  computed: {
    depth() {
      const d = this.$parent.$vnode.data.routerViewDepth;
      return (d === 0 || d > 0 ? d : -1) + 1;
    },
    aliveKey() {
      return this.keyFormatter(this.$route, this.depth) || this.$route.path;
    },
  },
  mounted() {
    const depth = this.depth;

    this.$keepRouterAlive({
      refs: this.$refs,
      key: this.aliveRef,
      beforeEach: history => {
        if (this._inactive) return; // 元素不可见时直接return
        this.history = history
          .filter(item => item.matched && item.matched[depth] && !item.matched[depth].meta.nocache)
          .filter(item => {
            return typeof this.historyFilter === 'function'
              ? this.historyFilter(item, depth)
              : true;
          })
          .map(item => this.keyFormatter(item, depth) || item.path); // 默认path
      },
    });
  },
  render() {
    return (
      <history-keep-alive
        key="routerView"
        include={this.history}
        aliveKey={this.aliveKey}
        max={this.max}
      >
        <router-view ref={this.aliveRef} />
      </history-keep-alive>
    );
  },
};
