

"use client"

import Link from "next/link"
import "@fortawesome/fontawesome-free/css/all.min.css"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Shipping & Delivery</Link></li>
              <li><Link href="/returns">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <Link href="https://facebook.com" target="_blank" className="hover:text-blue-600 ">
                <i className="fab fa-facebook-f text-xl"></i>
              </Link>
              <Link href="https://instagram.com" target="_blank" className="hover:text-pink-500">
                <i className="fab fa-instagram text-xl"></i>
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-sky-500">
                <i className="fab fa-twitter text-xl"></i>
              </Link>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6" />

        {/* CopyRight */}
        <div className="text-center text-sm">
          © {new Date().getFullYear()} E-commerce Store. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
