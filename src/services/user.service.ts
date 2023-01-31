import { UserFull, UserSecure } from '../types'
import { prisma } from '../utils/prisma'
import bcrypt from 'bcryptjs'

// GET METHODS
export const getUserByIndex = async (index: string): Promise<UserFull> => {
  try {
    // get user with it's id, email or username
    const userInfo: UserFull[] | any = await prisma.user.findMany({
      where: {
        OR: [
          { id: index },
          { email: index },
          { username: index }
        ]
      }
    })

    if (userInfo.length === 0) throw new Error('User not found')

    // the userInfo query returns an array with only one element
    return userInfo[0]
  } catch (e) {
    throw new Error('Error fetching data')
  }
}

export const getUserByIdSecure = async (id: string): Promise<UserSecure> => {
  try {
    const userInfo: UserSecure[] | any = await prisma.user.findMany({
      where: {
        id
      },
      select: {
        id: true,
        username: true,
        email: true,
        description: true,
        admin: true
      }
    })

    return userInfo
  } catch (e) {
    throw new Error('Error fetching data')
  }
}

export const getUsers = async (): Promise<UserSecure[]> => {
  try {
    const usersList: UserFull[] | any = await prisma.user.findMany()

    const formatedUsers = usersList.map((user: UserFull) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        description: user.description,
        admin: user.admin
      }
    })
    return formatedUsers
  } catch (e) {
    throw new Error('Error fetching data')
  }
}

// CREATE METHODS
export const createUser = async (userData: UserFull): Promise<UserSecure> => {
  try {
    // genereating hash to store
    const saltRounds = Number(process.env.SALT)
    const plainPassword = userData.password
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(plainPassword, salt)

    // storing user in db
    const newUser: UserFull | any = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hash
      },
      select: {
        id: true,
        username: true,
        email: true,
        description: true,
        admin: true
      }
    })

    return newUser
  } catch (e) {
    throw new Error('Error fetching data')
  }
}

// UPDATE METHODS
// update user info // no password
export const updateUser = async (updateData: UserSecure): Promise<UserSecure> => {
  try {
    const updatedUser: UserSecure | any = await prisma.user.update({
      where: {
        id: updateData.id
      },
      data: {
        username: updateData.username,
        email: updateData.email,
        description: updateData.description,
        admin: updateData.admin
      },
      select: {
        id: true,
        username: true,
        email: true,
        description: true,
        admin: true
      }
    })

    return updatedUser
  } catch (e) {
    throw new Error('Error fetching data')
  }
}

// update admin status
export const updateAdminStatus = async (userData: UserSecure): Promise<UserSecure> => {
  try {
    const updatedUser: UserSecure | any = await prisma.user.update({
      where: {
        id: userData.id
      },
      data: {
        admin: !userData.admin
      },
      select: {
        id: true,
        username: true,
        email: true,
        description: true,
        admin: true
      }
    })

    return updatedUser
  } catch (e) {
    throw new Error('Error fetching data')
  }
}
// todo: update password?

// todo: delete method? is needed?
/*****
 try {

    } catch(e) {
        throw new Error('Error fetching data')
    }
 */
