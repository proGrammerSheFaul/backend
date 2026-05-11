import express from 'express'

import jwt from 'jsonwebtoken'

import User from '../models/User.js'

const router = express.Router()

/* SIGNUP */

router.post(
  '/signup',
  async (req, res) => {

    try {

      const {
        name,
        department,
        phone,
        email,
        blood,
        password,
      } = req.body

      const oldUser =
        await User.findOne({ email })

      if (oldUser) {

        return res.status(400)
        .json({
          message:
            'User Already Exists',
        })
      }

      /* SAVE NORMAL PASSWORD */

      const user =
        await User.create({

          name,
          department,
          phone,
          email,
          blood,

          password,

        })

      res.status(201).json({

        success: true,

        user,

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          'Signup Failed',
      })

    }
})

/* LOGIN */

router.post(
  '/login',
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body

      const user =
        await User.findOne({ email })

      if (!user) {

        return res.status(400)
        .json({
          message:
            'Wrong Email',
        })
      }

      /* NORMAL PASSWORD CHECK */

      if (
        user.password !== password
      ) {

        return res.status(400)
        .json({
          message:
            'Wrong Password',
        })
      }

      const token = jwt.sign(

        {
          id: user._id,
        },

        'shefaul'

      )

      res.status(200).json({

        token,

        user,

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          'Login Failed',
      })

    }
})

export default router