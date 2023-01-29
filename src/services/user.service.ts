import { UserFull, UserSecure } from '../types'
import { prisma } from '../utils/prisma'

// GET METHODS
export const getUserByIndex = async (index: string): Promise<UserFull | undefined> => {
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

export const getUsers = async (): Promise<UserSecure[] | undefined> => {
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

// UPDATE METHODS

// DELETE METHODS

/*****
 try {

    } catch(e) {
        throw new Error('Error fetching data')
    }
 */
