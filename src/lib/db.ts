import { SECRET_DB_URI } from "$env/static/private";
import mongoose from "mongoose";

import { Languages } from "./language";

class DB {
    dbs: any;
    languages: Languages;
    constructor() {
        this.languages = new Languages();
        this.connect();
    }

    connect() {
        mongoose.set('strictQuery', true);
        mongoose.connect(SECRET_DB_URI).then(() => { console.log("Connected to DataBase") });
    }  
}

export const db = new DB();