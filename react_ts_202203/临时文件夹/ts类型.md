### 基础类型    
```jsx
type BasicProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** 数组类型 */
  names: string[];
  /** 用「联合类型」限制为下面两种「字符串字面量」类型 */
  status: "waiting" | "success";
};

```

### 对象类型
```jsx
type ObjectOrArrayProps = {
  /** 如果你不需要用到具体的属性 可以这样模糊规定是个对象 ❌ 不推荐 */
  obj: object;
  obj2: {}; // 同上
  /** 拥有具体属性的对象类型 ✅ 推荐 */
  obj3: {
    id: string;
    title: string;
  };
  /** 对象数组 😁 常用 */
  objArr: {
    id: string;
    title: string;
  }[];
  /** key 可以为任意 string，值限制为 MyTypeHere 类型 */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // 基本上和 dict1 相同，用了 TS 内置的 Record 类型。
}

```

### 函数类型
```jsx
type FunctionProps = {
  /** 任意的函数类型 ❌ 不推荐 不能规定参数以及返回值类型 */
  onSomething: Function;
  /** 没有参数的函数 不需要返回值 😁 常用 */
  onClick: () => void;
  /** 带函数的参数 😁 非常常用 */
  onChange: (id: number) => void;
  /** 另一种函数语法 参数是 React 的按钮事件 😁 非常常用 */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** 可选参数类型 😁 非常常用 */
  optional?: OptionalType;
}

```










