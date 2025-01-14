export interface IBaseRepository<SelectType, InsertType, OptionsTypes> {
	create?: (values: InsertType) => Promise<SelectType>;
	readAll: (options?: OptionsTypes) => Promise<SelectType[]>;
	readById: (id?: number) => Promise<SelectType>;
	update?: (id: number, values: Partial<SelectType>) => Promise<SelectType>;
	delete?: (id: number) => Promise<SelectType>;
}
