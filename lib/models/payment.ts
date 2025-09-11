import mongoose, {Schema} from "mongoose";

const paymentSchema = new Schema(
    {
        userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
        orderId: {type: Schema.Types.ObjectId, ref: "Order", required: true},
        amount: {type: Number, required: true},
        authority: {type: String, required: true}, // Comes from zarinPal
        refId: {type: String},
        status: {
            type: String,
            enum: ["INIT", "SUCCESS", "FAILED"],
            default: "INIT",
        },
        gateway: {type: String, enum: ["ZARINPAL"], default: "ZARINPAL"},
    },
    {timestamps: true}
);

export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
