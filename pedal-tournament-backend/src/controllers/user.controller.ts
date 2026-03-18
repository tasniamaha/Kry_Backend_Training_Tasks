import type { Request, Response } from 'express'
import type { CommonController } from '../types/core.type'
import { createUserService, getUserbyUsernameService } from '../services'
import { Logger } from '../utils/logger'

export const signUpController: CommonController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, fullName, phone, profileImage, bio, role } = req.body
    const username = (firstName + lastName).toLowerCase()

    const usernameExists = await getUserbyUsernameService(username)
    if (usernameExists) {
      res.status(400).json({ message: 'Username already exists', data: { username } })
      return
    }

    const user = await createUserService({
      username,
      email,
      password,
      firstName,
      lastName,
      fullName: fullName || `${firstName} ${lastName}`,
      bio,
      profileImage,
      phone,
      role,
    })
    const userResponse = {
      username: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
      role: user?.role,
    }
    res.status(201).json({
      succes: true,
      message: 'User created successfully',
      data: userResponse,
    })
  }
  catch (error: unknown) {
    Logger.error('signUpController error', error) // ← correct usage

    if (
      typeof error === 'object'
      && error !== null
      && 'code' in error
      && (error as { code: number }).code === 11000
    ) {
      res.status(400).json({ success: false, message: 'Email already exists' })
      return
    }

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}
