import './transition.less';
const DEFAULT_TRANSITION = 'slide'; // fade / fade-transform / zoom / slide
// out-in模式会触发keep-alive组件destory，导致keep-alive无效
const DEFAULT_TRANSITION_MODE = 'in-out';

export default {
  name: 'TransitionPage',
  props: {
    aliveRef: {
      type: String,
      default: 'view',
    },
    keepAlive: {
      type: Boolean,
      default: false,
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
    noTransition: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      transitionName: DEFAULT_TRANSITION,
      transitionMode: DEFAULT_TRANSITION_MODE,
      transitionEnterActiveClass: '',
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
  created() {
    this.handleTransition();
  },
  mounted() {
    const depth = this.depth;

    this.keepAlive && this.$keepRouterAlive({
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
  methods: {
    handleTransition() {
      this.$router.beforeEach((to, from, next) => { // 全局路由守卫
        if (this.noTransition ||
          // 路由守卫authHandler在微信中等待太长时间next时，不用切换动画
          (from.path === '/' && from.matched.length <= 0)) {
          this.transitionName = null;
          this.transitionMode = null;
          return next();
        }

        let transitionName = to.meta.transitionName || DEFAULT_TRANSITION;
        transitionName = this.handleBackTransition(transitionName, to, from);

        if (transitionName === 'slide' && this.$routerHistory.useTimestamp) {
          transitionName = 'slide-left'; // slide默认为slide-left
        }

        // 跳转时使用zoom模式
        if (to.meta.transitionName === 'zoom' ||
          // 从zoom模式的页面跳转时也使用zoom模式
          from.meta.transitionName === 'zoom') {
          transitionName = transitionName === 'slide-right'
            ? 'zoom-out' // transitionName=slide-right表示是返回，用zoom-out
            : 'zoom-in'; // 默认zoom-in
        }

        this.transitionName = transitionName;
        this.transitionEnterActiveClass = `${transitionName}-enter-active`;

        next();
      });
    },

    // 根据$router.routeHistory自动识别是否返回上页
    handleBackTransition(name, to, from) {
      if (this.$routerHistory.useTimestamp) {
        const fromTimestamp = from.query.timestamp;
        const toTimestamp = to.query.timestamp;
        if (!toTimestamp) return name;
        return fromTimestamp > toTimestamp ? 'slide-right' : name;
      }
      return name;
    },
    beforeEnter() {
      /* do something */
    },
    beforeLeave() {
      /* do something */
    },
    enter() {
      /* do something */
    },
    afterEnter() {
      /* do something */
    },
  },
  render() {
    return (
      <transition
        name={this.transitionName}
        mode={this.transitionMode}
        enterActiveClass={this.transitionEnterActiveClass}
        onBeforeEnter={this.beforeEnter}
        onBeforeLeave={this.beforeLeave}
        onEnter={this.enter}
        onAfterEnter={this.afterEnter}
      >
        {this.keepAlive
          ? (
            <history-keep-alive
              key="routerView"
              el-desc="for router-view"
              include={this.history}
              aliveKey={this.aliveKey}
              max={this.max}
            >
              <router-view ref={this.aliveRef} />
            </history-keep-alive>
          ) : (<router-view ref={this.aliveRef} />)
        }
      </transition>
    );
  },
};
