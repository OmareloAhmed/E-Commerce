'use server'
import { getUserToken } from "src/getUserToken"
import { WishlistData } from "src/types/wishlist.type"

export async function getWishlistData() {
    const token = await getUserToken()
    if (!token) {
        throw new Error("Missing Token")
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        headers: {
            token: token as string
        }
    })
    const data: WishlistData = await res.json()
    return data

}

export async function AddProductToWishlist(id: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("Missing Token")
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        method: "post",
        body: JSON.stringify({
            productId: id
        }),
        headers: {
            token: token as string,
            'content-type': 'application/json' // post , put دي ببعتها لو الاي بي اي بتاعتي ببعتلها داتا زي 
        }
    })
    const data = await res.json()
    return data
}

export async function removeFromWishlist(id: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("Missing Token")
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist${id}`, {
        method: "delete",
        headers: {
            token: token as string
        }
    })
    const data = await res.json()
    return data
}