'use server'

// import UserModel from "@/models/userModel"
import connectDB from "../config/database"

export async function getUsers() {
  try {
    await connectDB();

    return {msg: 'GET'}
  } catch (err) {
    return { errMsg: err.message}
  }
}