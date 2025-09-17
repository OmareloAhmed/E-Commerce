'use client'
import { useParams } from 'next/navigation'
import React, { useReducer } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from 'src/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import { checkoutPayment } from 'src/OrderAction/OrderAction';

export default function Checkoutsession() {
  const { cartId }: { cartId: string } = useParams()
  // const route = useReducer()
  console.log(cartId);

  const shippingForm = useForm({
    defaultValues: {
      "details": "",
      "phone": "",
      "city": ""
    }
  })

  async function checkoutSessionPayment(values: { details: string, phone: string, city: string }) {
    const data = await checkoutPayment(cartId, values)
    console.log(data);
    // window.location.href = data.session.url دا هيطلع ارور ويودينا علي مكان الدفع
    window.open(data.session.url, "_self", "width=600,height=600")

  }

  return (
    <div className='w-3/4 mx-auto my-5'>
      <h1 className='text-3xl'>Check Out Payment</h1>
      <Form {...shippingForm}>
        <form className='space-y-1' onSubmit={shippingForm.handleSubmit(checkoutSessionPayment)}>   
         
          <FormField
            control={shippingForm.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={shippingForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <Button className='bg-main text-white' >Payment</Button>
           {/* <Button className='bg-main text-white' onClick={shippingForm.handleSubmit(handleCash)}>Cash</Button> } */}


        </form>

      </Form>

    </div>
  )
}
