import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true // Ensures no duplicate clientId
    },
    name: {
        type: String,
        required: true, 
        trim: true // Removes extra spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Validates email format
    },
    photoURL: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    isDoctor: {
        type: Boolean,
        default: false 
    },
    isDeveloper: {
        type: Boolean,
        default: false
    },
    interactedUsers: {
        type:[{
            id: {
                type: String,
                required: true
            }
        }],
        default: []
    },
    interactedCases: {
        type:[{
            id: {
                type: String,
                required: true
            },
            messages: []
        }]
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

export default User;