import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true,
}

const lanuageSchema = new mongoose.Schema({
    name: reqString,
    url: reqString,
    version: reqString,
    platform: reqString,
    arch: reqString
});

export class Languages {
    model: mongoose.Model<any>;
    upsert: any;
    constructor() {
        this.model = mongoose.model('languages', lanuageSchema);
        this.upsert = { upsert: true };
    }

    async get(data: any) {
        return await this.model.find(data);
    }

    async find(name: string, version: string, platform: string, arch: string) {
        return await this.model.findOne({ name, version, platform, arch });
    }

    async getAll() {
        return await this.model.find();
    }
}