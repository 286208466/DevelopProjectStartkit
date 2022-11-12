function mynew (fn, ...args){
    var obj = new Object()
    obj.__proto__ = fn.prototype;
    fn.apply(obj, args)
    return obj
}