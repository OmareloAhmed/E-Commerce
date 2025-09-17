'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResetPassword() {
    const [btnLoading, setBtn] = useState<boolean>(true)

    const Route = useRouter()
    const SchemaResetPassword = z.object({
        email: z.email("Email Required").nonempty("email in valid"),
        newPassword: z.string().nonempty("newPassword Required").regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/),
    })
    const LoginForm = useForm<z.infer<typeof SchemaResetPassword>>({
        defaultValues: {
            email: "",
            newPassword: "",
        },
        resolver: zodResolver(SchemaResetPassword)
    })
    async function handleResetPassword(values: z.infer<typeof SchemaResetPassword>) {
        setBtn(false)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`, {
            method: "Put",
            body: JSON.stringify(values),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        setBtn(true)
        console.log(data);
        if (data.token) {
            Route.push('/login')
        }
        else {
            toast.error(data.message, { position: "top-center" })
        }
    }
    return (
        <div className='w-3/4 mx-auto my-5'>
            <h1 className='text-3xl my-5'>Reset Now</h1>

            <Form {...LoginForm}>

                <form className='space-y-3' onSubmit={LoginForm.handleSubmit(handleResetPassword)} >

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
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password:</FormLabel>
                                <FormControl>
                                    <Input type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {
                        btnLoading ? <Button className='w-full bg-main'>Reset Password</Button> : <Button type='button' className='w-full bg-main'>loading</Button>
                    }
                    
                    
                </form>
            </Form>
        </div>
    )
}
