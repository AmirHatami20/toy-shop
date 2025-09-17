import {Schema, model, models, Types} from "mongoose";

const CartItemSchema = new Schema({
    product: {type: Types.ObjectId, ref: "Product", required: true},
    quantity: {type: Number, required: true, default: 1},
});

const CartSchema = new Schema(
    {
        user: {type: Types.ObjectId, ref: "User", default: null, index: true},
        sessionId: {type: String, default: null, index: true},
        items: [CartItemSchema],
        status: {type: String, enum: ["active", "ordered"], default: "active"},
    },
    {timestamps: true}
);

CartSchema.index({user: 1, status: 1}, {unique: true, sparse: true});
CartSchema.index({sessionId: 1, status: 1}, {unique: true, sparse: true});

export default models.Cart || model("Cart", CartSchema);
