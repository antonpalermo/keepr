"use client"

import * as React from "react"

import {
  Bell,
  ChevronDown,
  LogOut,
  Moon,
  Settings,
  Sun,
  User
} from "lucide-react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Switch } from "./ui/switch"
import { useSession, signOut } from "next-auth/react"
import { Skeleton } from "./ui/skeleton"

export default function UserMenu() {
  const { data } = useSession()

  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  function UserAvatar() {
    return (
      <Avatar className="h-8 w-8">
        <AvatarImage src={data?.user?.image ?? undefined} alt="User" />
        {data?.user && <Skeleton className="w-8 h-8" />}
      </Avatar>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-2 py-5 hover:bg-accent"
        >
          <UserAvatar />
          <div className="flex flex-col items-start text-sm">
            <span className="font-medium">{data?.user?.name}</span>
            <span className="text-xs text-muted-foreground">
              {data?.user?.email}
            </span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <UserAvatar />
          </div>
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">{data?.user?.name}</p>
            <p className="text-xs text-muted-foreground">{data?.user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="flex items-center gap-2">
            {theme === "light" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="text-sm">
              {theme === "light" ? "Light" : "Dark"} Mode
            </span>
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
            aria-label="Toggle theme"
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:text-red-500"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
