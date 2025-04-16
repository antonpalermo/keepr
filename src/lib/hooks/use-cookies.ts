import { useState, useEffect } from "react"

function useCookies() {
  const parseCookies = (cookieString: string): { [key: string]: string } => {
    const cookieObject: { [key: string]: string } = {}
    if (cookieString) {
      const cookiesArray = cookieString.split(";")
      cookiesArray.forEach(cookie => {
        const [name, ...valueParts] = cookie.trim().split("=")
        if (name && valueParts.length > 0) {
          cookieObject[name] = decodeURIComponent(valueParts.join("="))
        }
      })
    }
    return cookieObject
  }

  const [cookies, setCookies] = useState(() => {
    if (typeof document === "undefined") {
      return {}
    }
    return parseCookies(document.cookie)
  })

  useEffect(() => {
    const updateCookies = () => {
      if (typeof document !== "undefined") {
        setCookies(parseCookies(document.cookie))
      }
    }

    window.addEventListener("storage", updateCookies)
    const intervalId = setInterval(updateCookies, 1000)

    return () => {
      window.removeEventListener("storage", updateCookies)
      clearInterval(intervalId)
    }
  }, [])

  const getCookie = (name: string): string | undefined => {
    return cookies[name]
  }

  const setCookie = (
    name: string,
    value: string,
    options: { [key: string]: unknown } = {}
  ) => {
    if (typeof document !== "undefined") {
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
      for (const key in options) {
        if (options[key]) {
          cookieString += `; ${key}=${options[key]}`
        }
      }
      document.cookie = cookieString
      // Immediately update the state to reflect the change
      setCookies(parseCookies(document.cookie))
    }
  }

  return { cookies, getCookie, setCookie }
}

export default useCookies
