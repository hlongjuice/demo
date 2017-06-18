import { DivisionModel } from "./division";

export class EmployeeModel {

    public id: number;
    public em_id: string;
    public name: string;
    public division: DivisionModel
    public lastname: string;
    public image: string;
    public created_by_user_id: number;
    public updated_by_user_id: number;
    public created_at: Date;
    public updated_at: Date;
    constructor() {
    }
}