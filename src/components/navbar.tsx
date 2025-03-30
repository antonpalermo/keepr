"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"

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

function UserMenu() {
  const session = useSession({
    required: true
  })

  return (
    <div className="relative w-10 h-10">
      {session.data?.user && (
        <Image
          src={session.data.user.image || "/default-avatar.png"}
          alt="user avatar"
          className="rounded-full"
          fill
        />
      )}
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
