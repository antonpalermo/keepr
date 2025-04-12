import * as React from "react"
import { Popover, PopoverAnchor, PopoverContent } from "./ui/popover"
import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

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
    <Popover open={focused}>
      <PopoverAnchor asChild>
        <div>
          <Label>Assign Assignee</Label>
          <div className="relative w-full">
            <SearchIcon
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-500"
            />
            <Input
              placeholder="Search user"
              className="pl-10"
              onBlur={e => setFocused(false)}
              onFocus={e => setFocused(true)}
              onKeyDown={e => e.key === "Escape" && setFocused(false)}
            />
          </div>
        </div>
      </PopoverAnchor>
      <PopoverContent>Test</PopoverContent>
    </Popover>
  )
}
