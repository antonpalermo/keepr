import * as React from "react"
import { Input } from "./ui/input"

export default function UserAutocomplete() {
  const [focused, setFocused] = React.useState(false)

  const [query, setQuery] = React.useState("")
  const [suggestions, setSuggestions] = React.useState([])

  React.useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.length > 1) {
        fetch(`/api/users?query=${encodeURIComponent(query)}`)
          .then(res => res.json())
          .then(data => setSuggestions(data.data))
          .catch(err => console.error(err))
      } else {
        setSuggestions([])
      }
    }, 1000)

    return () => clearTimeout(debounce)
  }, [query])

  return (
    <div>
      {focused ? "focused" : "not focused"}
      <Input
        type="text"
        value={query}
        onFocus={e => setFocused(true)}
        onBlur={e => setFocused(false)}
        onChange={e => setQuery(e.target.value)}
      />
      {JSON.stringify(suggestions)}
    </div>
  )
}
