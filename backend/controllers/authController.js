import User from '../models/User.js'

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

export const signup = async (
  req,
  res
) => {

  try {

    const {
      name,
      department,
      phone,
      email,
      blood,
      password,
    } = req.body

    const existingUser =
      await User.findOne({ email })

    if (existingUser) {

      return res.status(400).json({
        message:
          'User Already Exists',
      })

    }

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const newUser =
      await User.create({

        name,
        department,
        phone,
        email,
        blood,

        password: hashedPassword,

      })

    res.status(201).json({
      success: true,
      message:
        'Signup Success',
      user: newUser,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server Error',
    })

  }
}

export const login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body

    const user =
      await User.findOne({ email })

    if (!user) {

      return res.status(400).json({
        message:
          'Wrong Email',
      })

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!isMatch) {

      return res.status(400).json({
        message:
          'Wrong Password',
      })

    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    )

    res.status(200).json({

      success: true,

      token,

      user,

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Login Failed',
    })

  }
}