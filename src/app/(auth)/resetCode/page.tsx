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


import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
export default function ResetCode() {


    const Route = useRouter()

    const SchemaResetCode = z.object({
        resetCode: z.string().nonempty("reset code required")
    })
    const forgetForm = useForm<z.infer<typeof SchemaResetCode>>({
        defaultValues: {
            resetCode: ""
        },
        resolver: zodResolver(SchemaResetCode)
    })
    async function handleResetCode(values: z.infer<typeof SchemaResetCode>) {
        console.log(values);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`, {
            method: "Post",
            body: JSON.stringify(values),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data);
        if (data.status == 'Success') { //data.statusMsg == 'Success
            Route.push('/resetPassword')
        }
        else {
            toast.error(data.message, { position: "top-center" })
        }
    }
    return (
        <div className='w-3/4 mx-auto my-5'>
            <h1 className='text-3xl my-5'>Send Email</h1>

            <Form {...forgetForm}>

                <form className='space-y-3' onSubmit={forgetForm.handleSubmit(handleResetCode)} >

                    <FormField
                        control={forgetForm.control}
                        name="resetCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email:</FormLabel>
                                <FormControl>
                                    <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className='w-full bg-main'> Verfiy Code</Button>
                </form>
            </Form>
        </div>
    )
}
