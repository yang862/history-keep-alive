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
  if (entry && (!current || (entry.tag !== current.tag
    || entry.componentInstance._uid !== current.componentInstance._uid))) {
    entry.componentInstance.$destroy();
    cache[key] = null;
    entry && remove(keys, key);
    return true;
  }
  return false;
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
    destroy({ path, key }) {
      if (!key) key = this.keyMap[path];
      if (!key) return false;
      if (path) this.keyMap[path] = null; // ??????keyMap
      return pruneCacheEntry(this.cache, key, this.keys, this._vnode);
    },
    /**
     * @param {Boolean} all ??????????????????????????????????????????????????????
     */
    destroyAll(all) {
      for (const key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys, all ? undefined : this._vnode);
      }
    },
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
        this.keyMap[this.$route.path] = keyToCache;
      }
    },
    _setParentNode() {
      if (this.preVNodeCache) {
        let instance = this.preVNodeCache.componentInstance;
        setTimeout(() => { // ????????????????????????
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
    this.keyMap = Object.create(null); // ?????????path??????key
    this.keys = [];
  },

  destroyed() {
    this.destroyAll(true);
  },

  mounted() {
    this._setParentNode();
    this.cacheVNode();
    this.$watch('include', val => {
      setTimeout(() => { // ????????????????????????
        pruneCache(this, name => matches(val, name), !!this.aliveKey);
      }, 0);
    });
    this.$watch('exclude', val => {
      setTimeout(() => { // ????????????????????????
        pruneCache(this, name => !matches(val, name), !!this.aliveKey);
      }, 0);
    });
  },

  updated() {
    this.cacheVNode();
  },

  render() {
    // ??????inactive?????????????????????router-view????????????
    if (this.parentNode && this.parentNode._inactive && this.preVNodeCache) {
      return this.preVNodeCache;
    }

    const slot = this.$slots.default;
    const vnode = getFirstComponentChild(slot);

    // ??????router-view??????????????????from??????update???????????????????????????????????????
    this.preVNodeCache = vnode;

    const componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      setTimeout(() => { // ???????????????????????????
        // ???<history-keep-alive>????????????detroy??????
        vnode.componentInstance.$routerHistoryInstance = {
          destroy: this.destroy,
          destroyAll: this.destroyAll,
        };
      }, 0);

      // check pattern
      const name = this.aliveKey || getComponentName(componentOptions);

      const { cache, keys } = this;
      const key = this.aliveKey || (vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key);

      const { include, exclude } = this;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }

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
