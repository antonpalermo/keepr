"use client"

import Image from "next/image"

import UserMenu from "@/components/user-menu"

function Logo() {
  return (
    <div className="flex flex-row items-center space-x-2">
      <Image
        src={"/logo-dark.svg"}
        alt="application placeholder logo"
        width={30}
        height={30}
      />
      <span className="font-bold text-xl">Keepr</span>
    </div>
  )
}

export default function Navbar() {
  return (
    <nav className="container mx-auto px-5">
      <div className="py-5 flex flex-row items-center justify-between w-full">
        <Logo />
        <UserMenu />
      </div>
    </nav>
  )
}
