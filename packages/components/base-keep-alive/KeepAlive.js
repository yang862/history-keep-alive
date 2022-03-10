/* @flow */

const _toString = Object.prototype.toString;
function isDef(v) {
  return v !== undefined && v !== null;
}
function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCache(keepAliveInstance, filter, custom) {
  const { cache, keys, _vnode } = keepAliveInstance;
  for (const key in cache) {
    const entry = cache[key];
    if (entry) {
      const name = custom ? key : entry.name;
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(
  cache,
  key,
  keys,
  current
) {
  const entry = cache[key];
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

const patternTypes = [ String, RegExp, Array ];

export default {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [ String, Number ],

    aliveKey: String,
  },

  methods: {
    cacheVNode() {
      const { cache, keys, vnodeToCache, keyToCache } = this;
      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache;
        cache[keyToCache] = {
          name: getComponentName(componentOptions),
          tag,
          componentInstance,
        };
        keys.push(keyToCache);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
        this.vnodeToCache = null;
      }
    },
    _setParentNode() {
      if (this.preVNodeCache) {
        let instance = this.preVNodeCache.componentInstance;
        setTimeout(() => { // 等待父级渲染完成
          while (instance.$parent && instance.$el === instance.$parent.$el) {
            instance = instance.$parent;
          }
          if (instance.$parent) this.parentNode = instance.$parent;
        }, 0);
      }
    },
  },

  created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted() {
    this._setParentNode();
    this.cacheVNode();
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name), !!this.aliveKey);
    });
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name), !!this.aliveKey);
    });
  },

  updated() {
    this.cacheVNode();
  },

  render() {
    // 父级inactive时，说明在使用router-view切换页面
    if (this.parentNode && this.parentNode._inactive && this.preVNodeCache) {
      return this.preVNodeCache;
    }

    const slot = this.$slots.default;
    const vnode = getFirstComponentChild(slot);

    // 用于router-view切换页面时，from页面update的渲染（其实就是渲染自己）
    this.preVNodeCache = vnode;

    const componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      const name = this.aliveKey || getComponentName(componentOptions);
      const { include, exclude } = this;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }

      const { cache, keys } = this;
      const key = this.aliveKey || (vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key);

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        // delay setting the cache until update
        this.vnodeToCache = vnode;
        this.keyToCache = key;
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0]);
  },
};
