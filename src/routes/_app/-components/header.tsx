const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          Tablet Management Dashboard
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Welcome! Here’s a summary of your tablet tracking system.
        </p>
      </div>
    </div>
  )
}

export default Header
