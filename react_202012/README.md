图片缩放控件  
react-zmage

处理 Event 对象
有时候我们需要处理一下 Event 对象，一般 change 事件我们可以使用 React.ChangeEvent，click 事件可以使用 React.MouseEvent ，它们都接收一个 Element，如：
    onClickColor =(ev:ReactMouseEvent<HTMLButtonElement>) => {
       //
    }
