import mongoose, {Schema} from "mongoose";

const orderItemSchema = new Schema(
    {
        product: {type: Schema.Types.ObjectId, ref: "Product", required: true},
        quantity: {type: Number, required: true, min: 1},
        finalPrice: {type: Number, required: true},
    },
    {_id: false}
);

const shippingAddressSchema = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        phone: {type: String, required: true},
        province: {type: String, required: true},
        city: {type: String, required: true},
        street: {type: String, required: true},
        alley: {type: String, required: true},
        buildingNumber: {type: Number, required: true},
        apartment: {type: Number, required: true},
        postalCode: {type: String},
    },
    {_id: false}
);

const orderSchema = new Schema(
    {
        userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
        items: [orderItemSchema],
        status: {
            type: String,
            enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
            default: "PENDING",
        },
        shippingAddress: shippingAddressSchema,
        totalPrice: {type: Number, required: true},
        paymentId: {type: Schema.Types.ObjectId, ref: "Payment"},
    },
    {timestamps: true}
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
