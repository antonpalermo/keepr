import OrganizationToggle from "./organization-toggle"

export default function Navbar() {
  return (
    <nav className="container mx-auto px-5">
      <div className="flex w-full py-5">
        <OrganizationToggle />
        <span className="grow" />
      </div>
    </nav>
  )
}
