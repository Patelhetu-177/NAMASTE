const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    pic: {
        type: "String",
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
},
    {
        timestamps: true,
    }
)


userSchema.methods.matchPassword = async function (enteresPassword) {
    return await bcrypt.compare(enteresPassword, this.password)
}


userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)

})


const User = mongoose.model("User", userSchema);

module.exports = User;