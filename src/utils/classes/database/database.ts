export interface Database {
	getAll<T>(collectionName: string, options?: any): Promise<T[]>;
	get<T>(collectionName: string, id: string): Promise<T | undefined>;
	create<T>(documentPath: string, id: string, item: T): Promise<void | string>;
	update(collectionName: string, id: string, item: any): Promise<void | string>;
	delete(collectionName: string, id: string): Promise<void>;
}
