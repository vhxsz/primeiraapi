import express from 'express'
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// Criar usuário
app.post('/users', async (req, res) => {
  try {
    const { email, name, age } = req.body

    const user = await prisma.user.create({
      data: { email, name, age },
    })

    res.status(201).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

// Editar usuário
app.put('/users/:id', async (req, res) => {
  try {
    const id = req.params.id // NÃO converter para Number
    const { email, name, age } = req.body

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { email, name, age },
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

// Listar todos os usuários
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

// Deletar usuário
app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id // id como string

    await prisma.user.delete({
      where: { id },
    })

    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

app.listen(3001, () => console.log('Servidor rodando na porta 3001'))
