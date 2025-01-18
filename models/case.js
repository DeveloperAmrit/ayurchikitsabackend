import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
    caseId: {
        type: String,
        required: true,
        unique: true // Ensures no duplicate clientId
    },
    patientId: {
        type: String,
        required: true,
        trim: true
    },
    doctorId: {
        type: String,
        required: true,
        trim: true
    },
    isClosed: {
        type: Boolean,
        default: false 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    firstImageURL: {
        type: String,
        required: true
    },
    patientMessages: {
        type:[{
            message: {
                type: String,
                required: true
            },
            imageURL: {
                type: String,
                required: true
            },
            datetime: {
                type: String,
                required: true
            }
        }],
        default: []
    },
    doctorMessages: {
        type:[{
            message: {
                type: String,
                required: true
            },
            datetime: {
                type: String,
                required: true
            }
        }],
        default: []
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Case = mongoose.model('Case', caseSchema);

export default Case;