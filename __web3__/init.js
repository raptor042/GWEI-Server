import { ethers } from "ethers"
import { config } from "dotenv"

config()

export const getProvider = () => {
    return new ethers.JsonRpcProvider(process.env.SEPOLIA_API_URL)
}

export const getSigner = () => {
    return new ethers.Wallet(process.env.PRIVATE__KEY, getProvider())
}