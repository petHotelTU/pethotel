export abstract class PetBaseModel {
	userId: number; // id of its owner
	name: string;
	type: string;
	passport: string;
	breed: string; // nullable in DB
	age: number;
	employeeId: number;
}
