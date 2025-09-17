import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const NextOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                // console.log(credentials);
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
                    method: "post",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: {
                        'content-type': "application/json"
                    }
                })
                const data = await res.json()
                console.log("data", data);
                // return null //   دا مش حل اكببببببد  لازم نرجع حاجه عشان ميضربش خطا
                if (data.message == 'success') {
                    const dacodedToken: { id: string } = jwtDecode(data.token)
                    return {
                        id: dacodedToken.id, // هحتاج مكتبة jwt decoded عشان ابعتله ال اي دي الصحيح
                        userData: data.user,
                        tokenData: data.token
                    }
                }
                else {
                    throw new Error(data.message) // دي حاجة ثابته بتطلع الاخطاء   throw new Error()
                }
            }
        })
    ],
    callbacks: {
        // بتعمل enctypt للتوكن  وهو بيعمل انكربت ب secret key
        // وبتحتفظ بيها في ال cookies
        async jwt({ token, user }) {
            if (user) { // المشكلة كانت هنا اشتغل لما قلتله لو في يوزر اعمل كذا
                token.token = user.tokenData
                token.user = user.userData
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user
            return session
        },
    }

}
const Handler = NextAuth(NextOptions)
export { Handler as GET, Handler as POST }
