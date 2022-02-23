import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query as { id: string };
    if (req.method === 'DELETE') {
        const deleted = await prisma.pokemon.delete({
            where: { uniqueId: id }
        })

        res.json(deleted)
    } else {
        console.log('Pokemon could not be deleted')
    }
}