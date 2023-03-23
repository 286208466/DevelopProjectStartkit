// eslint-disable-next-line

const _theme = localStorage.getItem("_theme");
const _locale = localStorage.getItem("_locale");
const _pageLoading = localStorage.getItem("_pageLoading");
const _collapsed = localStorage.getItem("_collapsed");

const _storage_tabs = localStorage.getItem("_tabs");
const firsttab = {
  id: 0,
  path: "/manage/dashboard",
  name: "首页",
  closable: false,
};
const _tabs = !!_storage_tabs ? JSON.parse(_storage_tabs) : [firsttab];

const _storage_activeTab = localStorage.getItem("_activeTab");
const _activeTab = !!_storage_activeTab ? _storage_activeTab : _tabs[0].path;

const initialState = {
  dict: {}, //默认数据字典
  collapsed: _collapsed === "true" ? true : false, //是否展开
  theme: _theme ? _theme : "light", //主题
  locale: _locale ? _locale : "zh_CN", //默认语言
  tabs: _tabs, //页签
  activeTab: _activeTab,
  pageLoading: _pageLoading === "true" ? true : false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_DICT":
      return {
        ...state,
        dict: {
          ...initialState.dict,
          ...action.playload,
        },
      };
    case "SET_COLLAPSED":
      localStorage.setItem("_collapsed", action.playload);
      return {
        ...state,
        collapsed: action.playload,
      };
    case "SET_THEME":
      localStorage.setItem("_theme", action.playload);
      return {
        ...state,
        theme: action.playload,
      };
    case "SET_LOCALE":
      localStorage.setItem("_locale", action.playload);
      return {
        ...state,
        locale: action.playload,
      };
    case "SET_PAGELOADING":
      return {
        ...state,
        pageLoading: action.playload,
      };
    case "SET_TABS":
      if (action.playload.length > 0) {
        state.tabs = [...action.playload];
      } else {
        state.activeTab = firsttab.path;
        state.tabs = [firsttab];
      }
      localStorage.setItem("_tabs", JSON.stringify(state.tabs));
      localStorage.setItem("_activeTab", state.activeTab);
      return {
        ...state,
      };

    case "ADD_TAB":
      const isexit = state.tabs.find((m) => m.path === action.playload.path);
      const arr = [...state.tabs];
      if (!isexit) {
        arr.push(action.playload);
      }
      state.activeTab = action.playload.path;
      localStorage.setItem("_tabs", JSON.stringify(arr));
      localStorage.setItem("_activeTab", action.playload.path);
      return {
        ...state,
        tabs: [...arr],
      };

    case "REMOVE_TAB":
      console.log("REMOVE_TAB", action);
      const { tabs, activeTab } = state;
      const targetKey = action.playload;
      let lastIndex = 0;
      tabs.forEach((item, i) => {
        if (item.path == targetKey) {
          tabs.splice(i, 1);
          lastIndex = i - 1;
        }
      });

      if (activeTab == targetKey) {
        state.activeTab = state.tabs[lastIndex].path;
      }

      localStorage.setItem("_tabs", JSON.stringify([...tabs]));
      localStorage.setItem("_activeTab", state.activeTab);
      return {
        ...state,
        tabs: [...tabs],
      };
    case "REMOVEALL_TABS":
      state.activeTab = firsttab.path;
      state.tabs = [firsttab];
      localStorage.setItem("_tabs", JSON.stringify([firsttab]));
      localStorage.setItem("_activeTab", firsttab.path);
      return {
        ...state,
      };

    case "SET_ACTIVETAB":
      localStorage.setItem("_activeTab", action.playload);
      return {
        ...state,
        activeTab: action.playload,
      };
    default:
      return state;
  }
}
