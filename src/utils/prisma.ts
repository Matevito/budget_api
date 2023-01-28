import { PrismaClient } from '@prisma/client'

/* declare global {
  const prisma: PrismaClient | undefined
}

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
export const prisma = global.prisma || new PrismaClient({ log: ['info'] })
 */

export const prisma = new PrismaClient()
