import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp?: number
}

export const isJWTValid = (token: string | null | undefined): boolean => {
    if (!token) return false

    try {
        const jwtData = jwtDecode<JwtPayload>(token)
        const expires = jwtData.exp || 0
        const currentTime = Math.floor(Date.now() / 1000)

        const isValid = currentTime < expires

        console.log(`[JWT Check] Expires: ${expires}, Current: ${currentTime}, Valid: ${isValid}`)

        return isValid
    } catch (error) {
        console.error('[JWT Check] Decode error:', error)
        return false
    }
}