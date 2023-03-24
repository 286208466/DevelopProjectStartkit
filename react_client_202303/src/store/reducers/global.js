// eslint-disable-next-line

const firsttab = {
  id: 0,
  path: "/manage/dashboard",
  name: "首页",
  closable: false,
  version: "0.0.1",
};

const initialState = {
  dict: {}, //默认数据字典
  collapsed: false, //是否展开
  theme: "light", //主题
  locale: "zh_CN", //默认语言
  tabs: [firsttab], //页签
  activeTab: firsttab.path,
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
      return {
        ...state,
        collapsed: action.playload,
      };
    case "SET_THEME":
      return {
        ...state,
        theme: action.playload,
      };
    case "SET_LOCALE":
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

      return {
        ...state,
        tabs: [...tabs],
      };
    case "REMOVEALL_TABS":
      state.activeTab = firsttab.path;
      state.tabs = [firsttab];
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
