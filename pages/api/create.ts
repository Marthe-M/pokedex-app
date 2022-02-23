import { prisma } from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('body', req.body)
    const { name, id, image, uniqueId } = req.body

    try {
        await prisma.pokemon.create({
            data: {
                name,
                id,
                image,
                uniqueId
            }
        })
        res.status(200).json({ message: 'Pokemon Created' })
    } catch (error) {
        console.log(error)
        console.log('Failure')
    }
}