import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
         type: String,
         required: true,
         unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true})

// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }
// // This pre middleware will run every time before a user document is saved in th db.
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next()
//     }
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })

// static signup method
userSchema.statics.signup = async function(email, password, name) {
    // Validation
    if (!email || !password) {
        throw Error ('All fields must be filled')
      }
      
    const exists = await this.findOne({email})

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, name})

    return user
}


// static login method
userSchema.statics.login = async function(email, password) {
    // Validaton
    if (!email || !password) {
        throw Error ('All fields must be filled')
      }

    const user = await this.findOne({email})

    if (!user) {
          throw Error('Incorrect email')
      } 
      
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

const User = mongoose.model("User", userSchema)

export default User;
