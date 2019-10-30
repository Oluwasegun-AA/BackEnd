import mongoose from 'mongoose';

const { Schema } = mongoose;

class MakeSchema {
  constructor(collectionName, schemaObj, params) {
    this.schemaObj = schemaObj;
    this.collectionName = collectionName;
    this.CreatedSchema = new Schema(schemaObj, params);
  }

  getModel() {
    return mongoose.model(
      this.collectionName,
      this.CreatedSchema,
      this.collectionName
    );
  }

  getSchema() {
    return this.CreatedSchema;
  }
}

export { MakeSchema, Schema };
