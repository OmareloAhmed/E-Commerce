'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'

export default function Register() {


  const Route = useRouter()

  const SchemaRegister = z.object({
    name: z.string().nonempty("Name Required").min(3, "min char 3").max(15, "max char 15"),
    email: z.email("Email Required").nonempty("email in valid"),
    password: z.string().nonempty("Password Required").regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/),
    rePassword: z.string().nonempty("rePassword Required"),
    phone: z.string().nonempty("Phone Required").regex(/^(\+2)?01[0125][0-9]{8}$/, "enter valid phone")
  }).refine((obj) => {
    return obj.password == obj.rePassword
  }, {
    path: ['rePassword'],
    error: "Confirm Password Not Match"
  })

  const RegisterForm = useForm<z.infer<typeof SchemaRegister>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(SchemaRegister)
  })
  async function handleRegister(values: z.infer<typeof SchemaRegister>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
      method: "Post",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data);
    if (data.message == 'success') {
      toast.success("Account Created", { position: "top-center" })
      Route.push('/login')
    }
    else {
      toast.error(data.message, { position: "top-center" })
    }


  }
  return (
    <div className='w-3/4 mx-auto my-5'>
      <h1 className='text-3xl my-5'>Register Now</h1>

      <Form {...RegisterForm}>

        <form className='space-y-3' onSubmit={RegisterForm.handleSubmit(handleRegister)} >
          <FormField
            control={RegisterForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={RegisterForm.control}
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
            control={RegisterForm.control}
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

          <FormField
            control={RegisterForm.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>rePassword:</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={RegisterForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone:</FormLabel>
                <FormControl>
                  <Input type='tel' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full bg-main'>Register</Button>
        </form>
      </Form>
    </div>
  )
}
