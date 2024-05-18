import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import DrawerButton from '@/components/DrawerButton'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/header/Header1'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nani Bilona Ghee',

  description: 'Nani Bilona Ghee Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="drawer bg-white">
            <DrawerButton />
            <div className="drawer-content">
              <div className="min-h-screen w-full flex flex-col">
                <Header />
                {children}
                {/* <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                  <p>
                    Copyright © 2024 - All right reserved by Nani&apos;s Bilona
                    Ghee
                  </p>
                </footer> */}

                <footer className="bg-[#1b2528]">
                  <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
                      <div>
                        <div className="mb-6 md:mb-0">
                          <a href="/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                              Nani&apos;s Bilona Ghee
                            </span>
                          </a>
                        </div>
                        <div>
                          <h1 className="text-white font-semibold">
                            Manufacturing address:{' '}
                          </h1>
                          <h2 className="text-gray-300">
                            Nani&apos;s Bilona Ghee, JE Colony, Sirsa, Haryana -
                            125055
                          </h2>
                          <h2 className="text-gray-300">Tel: +91 8198985878</h2>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-8 sm:gap-6 sm:grid-cols-4">
                        <div>
                          <h2 className="mb-6 text-sm font-semibold text-[#fbbf24] uppercase">
                            Services
                          </h2>
                          <ul className="text-white font-medium">
                            <li className="mb-4">
                              <a href="/products" className="hover:underline">
                                Our Products
                              </a>
                            </li>
                            <li className="mb-4">
                              <a href="/our-story" className="hover:underline">
                                Our Story
                              </a>
                            </li>
                            <li>
                              <a href="/contact-us" className="hover:underline">
                                Contact Us
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h2 className="mb-6 text-sm font-semibold text-[#fbbf24] uppercase">
                            Follow us
                          </h2>
                          <ul className="text-white font-medium">
                            <li className="mb-4">
                              <a
                                href="https://www.instagram.com/nani_bilona_ghee/"
                                className="hover:underline "
                              >
                                Instagram
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.facebook.com/NaniBilonaGhee/"
                                className="hover:underline"
                              >
                                Facebook
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h2 className="mb-6 text-sm font-semibold text-[#fbbf24] uppercase">
                            Legal
                          </h2>
                          <ul className="text-white  font-medium">
                            {/* <li className="mb-4">
                              <a href="#" className="hover:underline">
                                Privacy Policy
                              </a>
                            </li> */}
                            <li className="mb-4">
                              <a
                                href="/shipping-policy"
                                className="hover:underline"
                              >
                                Shipping Policy
                              </a>
                            </li>
                            {/* <li>
                              <a href="#" className="hover:underline">
                                Terms &amp; Conditions
                              </a>
                            </li> */}
                            <li>
                              <a
                                href="/refund-policy"
                                className="hover:underline"
                              >
                                Refund Policy
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h2 className="mb-6 text-sm font-semibold text-[#fbbf24] uppercase">
                            Need Help ?
                          </h2>
                          <ul className="text-white font-medium">
                            <li className="mb-4">
                              <Link
                                href="/contact-us"
                                className=" py-2 px-3 sm:ms-0 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#fbbf24] focus:z-10 focus:ring-4 focus:ring-gray-100 "
                              >
                                Contact Us
                              </Link>
                            </li>
                            <li>
                              <a
                                href="https://wa.me/917303290341"
                                className="hover:underline"
                              >
                                WhatsApp
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2024{' '}
                        <a href="" className="hover:underline">
                          Nani&apos;s Bilona Ghee
                        </a>
                        . All Rights Reserved.
                      </span>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
            <div className="drawer-side z-10">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <Sidebar />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
