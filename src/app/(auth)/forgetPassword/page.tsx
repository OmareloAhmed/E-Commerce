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

export default function ForfetPassword() {


  const Route = useRouter()

  const SchemaForgetPassword = z.object({
    email: z.email("Email Required").nonempty("email in valid"),
  })
  const forgetForm = useForm<z.infer<typeof SchemaForgetPassword>>({
    defaultValues: {
      email: ""
    },
    resolver: zodResolver(SchemaForgetPassword)
  })
  async function handleForgetPassword(values: z.infer<typeof SchemaForgetPassword>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
      method: "Post",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data);
    if (data.statusMsg == 'success') {
      Route.push('/resetCode')
    }
    else {
      toast.error(data.message, { position: "top-center" })
    }

  }
  return (
    <div className='w-3/4 mx-auto my-5'>
      <h1 className='text-3xl my-5'>Send Email</h1>

      <Form {...forgetForm}>

        <form className='space-y-3' onSubmit={forgetForm.handleSubmit(handleForgetPassword)} >

          <FormField
            control={forgetForm.control}
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

          <Button className='w-full bg-main'>Send Email</Button>
        </form>
      </Form>
    </div>
  )
}
