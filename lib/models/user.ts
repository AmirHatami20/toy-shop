import {Schema, model, models} from "mongoose";

const UserSchema = new Schema(
    {
        name: String,
        email: {type: String, unique: true, required: true},
        password: String,
        role: {type: String, enum: ["customer", "admin"], default: "customer"},
    },
    {timestamps: true}
);

export default models?.User || model("User", UserSchema);
