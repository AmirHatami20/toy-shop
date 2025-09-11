import {Schema, model, models, Query, UpdateQuery} from "mongoose";

const ProductSchema = new Schema(
    {
        title: {type: String, required: true},
        shortName: {type: String, unique: true, required: true},
        description: {type: String},
        price: {type: Number, required: true},
        stock: {type: Number, default: 0},
        images: [{type: String, required: true}],
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        attributes: {
            color: String,
            size: String,
            material: String,
            pieces: Number,
        },
        totalSells: {type: Number, default: 0},
        discount: {type: Number, default: 0},
        finalPrice: {type: Number, required: true},
    },
    {timestamps: true}
);

ProductSchema.pre("save", function (next) {
    this.finalPrice = this.price - (this.price * (this.discount || 0)) / 100;
    next();
});

ProductSchema.pre("findOneAndUpdate", function (this: Query<Document, Document>, next) {
    const update = this.getUpdate() as UpdateQuery<Document>;
    if (update.price !== undefined || update.discount !== undefined) {
        const price = update.price ?? this.getQuery().price;
        const discount = update.discount ?? this.getQuery().discount ?? 0;
        update.finalPrice = price - (price * discount) / 100;
    }
    next();
});


export default models?.Product || model("Product", ProductSchema);
