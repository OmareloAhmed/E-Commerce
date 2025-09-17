"use client"

import { useContext } from "react"
import Link from "next/link"
// import { cn } from "src/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { cn } from "src/lib/utils"
import { countContext } from "src/CountProvider"
// import { countContext } from './../../../CountProvider';


export function Navbar() {
  const { data, status } = useSession()
  const pathName: string = usePathname()
  const countData = useContext(countContext)
  
  
  

  const MenuItems: { path: string, content: string, protected: boolean }[] = [
    { path: "/products", content: "Products", protected: false },
    { path: "/categories", content: "Category", protected: false },
    { path: "/brands", content: "Brands", protected: false },
    { path: "/wishlist", content: "Wishlist", protected: false },
    // { path: "/cart", content: "Cart", protected: true },
    { path: "/allorders", content: "Orders", protected: true },
  ]
  const MenuAuthItems: { path: string, content: string }[] = [
    { path: "/login", content: "login" },
    { path: "/register", content: "register" },

  ]
  function logout() {
    signOut({
      callbackUrl: '/login'
    })
  }

  return (
    <NavigationMenu viewport={false} className="max-w-full justify-between p-5 fixed top-0 z-50 shadow-md left-0 w-full bg-gray-500/50 hover:bg-gray-300 hover:duration-500 " >
      <NavigationMenuList>
        <NavigationMenuItem >
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={'/'}>
              <Image src={'/images/freshcart-logo.svg'} alt="Logo" width={100} height={100} />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {
          MenuItems.map((item) => {
            return <NavigationMenuItem key={item.path}>

              {item.protected && status == 'authenticated' && <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className={pathName == item.path ? 'text-main' : ''} href={item.path}>{item.content}</Link>
              </NavigationMenuLink>}

              {!item.protected && <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className={pathName == item.path ? 'text-main' : ''} href={item.path}>{item.content}</Link>
              </NavigationMenuLink>}

            </NavigationMenuItem>
          })
        }

        {
          status == 'authenticated' && <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link className="relative" href='/cart'>Cart
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 w-5 h-5 rounded-full flex justify-center items-center " >{countData?.count}</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        }
      </NavigationMenuList>
      
      <NavigationMenuList>
        {status == 'authenticated' ? <>
          <NavigationMenuItem >
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <span className="bg-gray-500 p-4 hover:text-blue-600" > hello {data?.user.name} </span>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem >
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <span onClick={logout} > Logout </span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </> : <>
          {
            MenuAuthItems.map((item) => {
              return <NavigationMenuItem key={item.path}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={item.path}>{item.content}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            })
          }
        </>}


      </NavigationMenuList>
    </NavigationMenu>
  )
}


