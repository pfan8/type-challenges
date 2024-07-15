const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

declare function PromiseAll<T extends any[]>(
  args: readonly [...T]
): Promise<{
  [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K];
}>;

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);

/**
 * # 总结
 * 1. 如果要定义一个函数类型，而不用管其实现，可以用 `declare function xxx<??>(??): ??`
 * 2. 数组类型，在 ts 中似乎等同于（不确定）{[number]: element}
 *      例如 [1,2,3]
 *      可以表示为 {[0]:1, [1]:2, [2]:3}
 * 
 *      type Arr2 = {[0]:1, [1]:2, [2]:3}
        type Arr1 = [1,2,3]
        
        下面两种写法都不会报错
        const arr1:Arr1 = [1,2,3]
        const arr2:Arr2 = [1,2,3]
   3. 函数参数类型，尽量用 `readonly`
 */
