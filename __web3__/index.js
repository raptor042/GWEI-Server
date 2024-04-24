import { ethers } from "ethers"
import { GWEI_ABI, GWEI_CA } from "./config.js"
import { getProvider, getSigner } from "./init.js"

const format = (value, denominator) => {
    const fmt_value = value / (10 ** denominator)
    console.log(fmt_value)

    return fmt_value
}

export const get = async () => {
    const gwei = new ethers.Contract(
        GWEI_CA,
        GWEI_ABI,
        getProvider()
    )

    try {
        const name = await gwei.name()
        const symbol = await gwei.symbol()
        const _decimals = await gwei.decimals()
        const decimals = Number(_decimals)
        const _supply = await gwei.totalSupply()
        const supply = format(Number(_supply), decimals)

        return { name, symbol, decimals, supply }
    } catch (error) {
        console.log(error)
    }
}

export const transfer = async (to, amount) => {
    const gwei = new ethers.Contract(
        GWEI_CA,
        GWEI_ABI,
        getSigner()
    )

    try {
        const _decimals = await gwei.decimals()
        const decimals = Number(_decimals)
        const value = Number(amount) * (10 ** decimals)

        await gwei.transfer(to, value)

        gwei.on("Transfer", (from, to, amount, e) => {
            console.log(from, to, amount)
        })

        return true
    } catch (error) {
        console.log(error)
    }
}