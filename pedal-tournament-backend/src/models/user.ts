import { getModelForClass, pre, prop } from '@typegoose/typegoose'
import * as argon2 from 'argon2'

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return
  }

  if (this.password) {
    const hash = await argon2.hash(this.password)
    this.password = hash
  }
})
export class User {
  @prop({ required: true, maxlength: 20 })
  firstName!: string

  @prop({ required: true, maxlength: 20 })
  lastName!: string

  @prop({ required: false, maxlength: 40 })
  fullName!: string

  @prop({ type: String, required: true, unique: true })
  username!: string

  @prop({ type: String, required: true, unique: true })
  email!: string

  @prop({ type: String })
  phone!: string

  @prop({ type: String })
  bio!: string

  @prop({ type: String })
  profileImage!: string

  @prop({ type: String, required: true })
  password!: string

  @prop({ type: String, required: true, enum: ['user', 'admin'] })
  role!: 'user' | 'admin'
}

export const UserModel = getModelForClass(User)
