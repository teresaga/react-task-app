class TaskModel {
    id?: number;
    title: string;
    description: string;
    isDone?: boolean;
    startDate: string;
    endDate: string;

    constructor(id: number, title: string, description: string, isDone: boolean, 
        startDate: string, endDate: string) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.isDone = isDone;
            this.startDate = startDate;
            this.endDate = endDate;
    }
}

export default TaskModel;