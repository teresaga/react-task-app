class TaskModel {
    id: number;
    title: string;
    description: string;
    is_done: boolean;
    start_date: Date;
    end_date: Date;

    constructor(id: number, title: string, description: string, is_done: boolean, 
        start_date: Date, end_date: Date, user_id: string) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.is_done = is_done;
            this.start_date = start_date;
            this.end_date = end_date;
    }
}

export default TaskModel;