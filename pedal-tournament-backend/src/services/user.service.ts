import type { User } from '../models/user'
import { UserModel } from '../models/user'

type GetUserbyUsernameService = (username: string) => Promise<User | null>
export const getUserbyUsernameService: GetUserbyUsernameService = async (username) => {
  return UserModel.findOne({ username })
}

type CreateUserService = (data: Partial<User>) => Promise<User | null>
export const createUserService: CreateUserService = async (data) => {
  return UserModel.create(data)
}
