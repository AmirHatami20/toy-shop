import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema(
    {
        userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
        items: [
            {
                productId: {type: Schema.Types.ObjectId, ref: "Product", required: true},
                quantity: {type: Number, required: true, min: 1},
                price: {type: Number, required: true},
            },
        ],
        totalAmount: {type: Number, required: true},
        status: {
            type: String,
            enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
            default: "PENDING",
        },
        shippingAddress: {
            fullName: {type: String, required: true},
            phone: {type: String, required: true},
            city: {type: String, required: true},
            address: {type: String, required: true},
            postalCode: {type: String},
        },
        paymentId: {type: Schema.Types.ObjectId, ref: "Payment"},
    },
    {timestamps: true}
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
