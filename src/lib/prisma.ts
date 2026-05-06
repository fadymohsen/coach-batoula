import { PrismaClient } from '@prisma/client'

declare const globalThis: {
  prismaGlobal: PrismaClient | undefined;
} & typeof global;

function getPrismaClient() {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = new PrismaClient()
  }
  return globalThis.prismaGlobal
}

const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return Reflect.get(getPrismaClient(), prop)
  },
})

export default prisma
