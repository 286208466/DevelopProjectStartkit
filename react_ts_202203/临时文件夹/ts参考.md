### 引入 React

```jsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
  Suspense,
  FC,
} from "react";
```

### 无状态组件

```jsx
interface IProps {
    logo?: string
    className?: string
    alt?: string
    children?: ReactNode
}

const App: React.SFC<IProps> = (props) => {
    return (
        <div>
            {props.className}
            {props.children}
        </div>
    )
}

//
interface AppProps {
  value?: string;
  children?: React.ReactNode; // 自己定义children的类型
}

function App({ value = "", children }: AppProps) {
  return <>{children}</>;
}

```

### useState<T>

```jsx
type User = {
  name: string
  age: number
}
const [user, setUser] = React.useState<User | null>(null)
```

### useRef<T>

```jsx
const ref1 = React.useRef<HTMLInputElement>(null)
const ref2 = React.useRef<HTMLInputElement | null>(null)

第一种方式的 ref1.current 是只读的（read-only），并且可以传递给内置的 ref 属性，绑定 DOM 元素 ；

第二种方式的 ref2.current 是可变的（类似于声明类的成员变量）

这两种方式在使用时，都需要对类型进行检查:
const onButtonClick = () => {
  ref1.current?.focus()
  ref2.current?.focus()
}
```

### useMemo<T> / useCallback<T>

```jsx
const value = 10;
// 自动推断返回值为 number
const result = React.useMemo(() => value * 2, [value]);
// 自动推断 (value: number) => number
const multiply = React.useCallback((value: number) => value * multiplier, [
  multiplier,
]);
```

同时也支持传入泛型， useMemo 的泛型指定了返回值类型，useCallback 的泛型指定了参数类型

```jsx
// 也可以显式的指定返回值类型，返回值不一致会报错
const result = React.useMemo<string>(() => 2, [])
// 类型“() => number”的参数不能赋给类型“() => string”的参数。
const handleChange = React.useCallback<
  React.ChangeEventHandler<HTMLInputElement>
>(evt => {
  console.log(evt.target.value)
}, [])
```

### 自定义 Hook

需要注意，自定义 Hook 的返回值如果是数组类型，TS 会自动推导为 Union 类型，而我们实际需要的是数组里里每一项的具体类型，需要手动添加 const 断言 进行处理

```jsx
function useLoading() {
  const [isLoading, setState] = React.useState(false)
  const load = (aPromise: Promise<any>) => {
    setState(true)
    return aPromise.then(() => setState(false))
  }
  // 实际需要: [boolean, typeof load] 类型
  // 而不是自动推导的：(boolean | typeof load)[]
  return [isLoading, load] as const
}
```

如果使用 const 断言遇到问题，也可以直接定义返回类型:

```jsx
export function useLoading(): [
  boolean,
  (aPromise: Promise<any>) => Promise<any>
] {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.then(() => setState(false));
  };
  return [isLoading, load];
}
```

如果有大量的自定义 Hook 需要处理，这里有一个方便的工具方法可以处理 tuple 返回值:

```jsx
function tuplify<T extends any[]>(...elements: T) {
  return elements
}
function useLoading() {
  const [isLoading, setState] = React.useState(false)
  const load = (aPromise: Promise<any>) => {
    setState(true)
    return aPromise.then(() => setState(false))
  }

  // (boolean | typeof load)[]
  return [isLoading, load]
}

function useTupleLoading() {
  const [isLoading, setState] = React.useState(false)
  const load = (aPromise: Promise<any>) => {
    setState(true)
    return aPromise.then(() => setState(false))
  }

  // [boolean, typeof load]
  return tuplify(isLoading, load)
}
```

### 类组件

```jsx
interface IProps{
    title: string,
    handleSubmit: (value:string)=>void
}
interface IState{
    count: number,

}
class App extends React.Components<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {
      count: 0,
      title: 'Second标题',
    }
    this.changeCount = this.changeCount.bind(this)
  }
  render: (){
      return (<div></div>)
  }
}
```

### useReducer
```jsx
// state类型
interface ReducerState {
  value: string;
}
// action类型
interface AnyAction {
  type: string;
  [key: string]: any;
}
// reducer函数
const reducer: React.Reducer<ReducerState, AnyAction> = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
// 初始值
const initialState: ReducerState = { value: "" };

const [state, dispatch] = useReducer(reducer, initialState);
// state 的类型为 ReducerState
// dispatch 的类型为 React.Dispatch<AnyAction>

```
Action也可以是多个不同的Action的联合类型

### useImperativeHandle
useImperativeHandle这个钩子可以把内部方法通过ref暴露出去，用ts也是要写多一点，类型都需要标注清楚

所以需要使用到React.forwardRef，可以先看下一节
```jsx
// props
interface AppProps {
  value: string;
}
// useImperativeHandle获取到ref的类型
interface Handle {
  get: () => string;
}

const App = React.forwardRef<Handle, AppProps>(({ value }, ref) => {
  // 定义
  useImperativeHandle(ref, () => ({
    get: () => `handle get value : ${value}`,
  }));
  return null;
});
// 使用
const handleRef = useRef<Handle>(null);
// handleRef.current?.get();
return <App value="hello" ref={handleRef} />;
```

### 事件

```jsx
const Test: React.FC<{}> = () => {
 // React.MouseEventHandler
  const onClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    console.log(e.currentTarget.value);
  };
  // React.ChangeEventHandler
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.currentTarget.value);
  };
  // React.FocusEventHandler
  const onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    console.log(e.currentTarget.value);
  };
  return <input onClick={onClick} onChange={onChange} onFocus={onFocus} />;
};
```

### React.forwardRef
React.forwardRef<T, P = {}>只需要传props的类型和ref的类型，第一个T是ref的类型，P是props的类型
```jsx
const App = React.forwardRef<HTMLDivElement, AppProps>(({ value }, ref) => {
  return <div ref={ref} />;
});
// 使用
const ref = useRef<HTMLDivElement>(null);
return <App value="hello" ref={ref} />;
```

### React.ForwardRefRenderFunction
定义为该类型的函数可以放进React.forwardRef函数中作为参数
```jsx
// 定义
const forwardRender: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AppProps
> = ({ value }, ref) => {
  return <div ref={ref} />;
};
const App = React.forwardRef(forwardRender);
// 使用
const ref = useRef<HTMLDivElement>(null);
return <App value="hello" ref={ref} />;
```

### React.createContext
泛型有自动推断的功能，所以useContext就不需要再写上类型了
```jsx
interface ContextType {
  getPrefixCls: (value: string) => string;
}

const context = React.createContext<ContextType>({
  getPrefixCls: (value) => `prefix-${value}`,
});

const App = () => {
  const { getPrefixCls } = useContext(context);
  getPrefixCls("App"); // prefix-App
  return null;
};
```

### React的内置类型
React.ReactElement —— 使用React.createElement创建的，可以简单理解为React中的JSX的元素
React.ReactNode —— `<div>xxx</div>` xxx的合法类型
React.CSSProperties —— 组件内联的style对象的类型
React.RefObject —— React.createRef创建的类型，只读不可改
React.MutableRefObject —— useRef创建的类型，可以修改