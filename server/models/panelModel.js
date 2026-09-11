import mongoose from "mongoose";

const panelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
},
{
    timestamps: true,
}
)

const Panel = mongoose.model('panel', panelSchema);
export default Panel;