import { prisma } from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const results = await prisma.pokemon.findMany()
        res.status(200).json(results)
    } catch (error) {
        console.log('Failure')
    }
}