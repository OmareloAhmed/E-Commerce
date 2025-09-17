'use client'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { getUserToken } from 'src/getUserToken'
import { getCartData } from 'src/CartAction/CartAction'
import { CartData } from 'src/types/cart.type'
import { countContext } from 'src/CountProvider'

export default function Login() {
  const Route = useRouter()
  const CountData = useContext(countContext)

  const SchemaLogin = z.object({
    email: z.email("Email Required").nonempty("email in valid"),
    password: z.string().nonempty("Password Required").regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/),
  })
  const LoginForm = useForm<z.infer<typeof SchemaLogin>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SchemaLogin)
  })
  async function handleLogin(values: z.infer<typeof SchemaLogin>) {


    const data = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false, //  لو كنت علمتها ب صح كان هو اللي هينقني ع الصفحة اللي هو عملها في المكتبه
      // callbackUrl: '/'
    })
    if (data?.ok) {
      toast.success("Logined", { position: "top-center" })

      const token = await getUserToken()
      if (token) {
        const data: CartData = await getCartData()
        const sum = data.data.products.reduce((total, item) => total += item.count, 0)
        CountData?.setCount(sum)

      }
      Route.push('/')
    }
    else {
      toast.error(data?.error, { position: "top-center" })
    }
    console.log(data);


    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
    //   method: "Post",
    //   body: JSON.stringify(values),
    //   headers: {
    //     "content-type": "application/json"
    //   }
    // })
    // const data = await res.json()
    // console.log(data);
    // if (data.message == 'success') {
    //   toast.success("Logined", { position: "top-center" })
    //   Route.push('/')
    // }
    // else {
    //   toast.error(data.message, { position: "top-center" })
    // }


  }
  return (
    <div className='w-3/4 mx-auto my-5'>
      <h1 className='text-3xl my-5'>Login Now</h1>

      <Form {...LoginForm}>
        <form className='space-y-3' onSubmit={LoginForm.handleSubmit(handleLogin)} >

          <FormField
            control={LoginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={LoginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Link href={'/forgetPassword'}>Forget Password</Link>
          <Button className='w-full bg-main'>Login</Button>
        </form>
      </Form>
    </div>
  )
}
