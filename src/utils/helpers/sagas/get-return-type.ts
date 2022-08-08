export declare type getPromiseReturn<T> = (
	...args: any
) => Promise<T | undefined>;

export declare type getReturn<T> = (...args: any) => T;

export default getReturn;
