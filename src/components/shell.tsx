import * as React from "react"

function Heading({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className="text-2xl font-bold" {...props} />
}

function Shell({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="space-y-5" {...props} />
}

Shell.Heading = Heading

export default Shell
