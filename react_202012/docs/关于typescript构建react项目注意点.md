1、extends React.Component<object,State>中泛型是props和state如果没有就传递object

2、定义未使用就会报错

3、react中获取DOM元素的方法
import * as ReactDOM from 'react-dom';
...
return (
    <div className="hello">
        <div className="greeting">
            Hello word
            <p ref="myp">1111--{this.state.num1}</p>
            <input value="添加" onClick={this.add} type="button"/>
        </div>
    </div>
);
...
componentDidMount(){
    console.log(`componentDidMount方法`);
    var myp = ReactDOM.findDOMNode<HTMLInputElement>(this.refs["myp"]);
    console.log(myp.innerText);
}