import Logo from '@/logo.png'

const AppLoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 animate-in fade-in-20">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-2xl animate-pulse delay-200" />
      </div>
      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <img src={Logo} alt="GSTS Logo" className="w-24 h-24 mb-6 rounded-xl drop-shadow-xl animate-fade-in" />
        {/* Spinner */}
        <div className="w-12 h-12 mb-4 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <div className="w-6 h-6 bg-primary rounded-full opacity-20" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2 tracking-tight animate-fade-in">GSTS Tablet Tracking System</h1>
        <p className="text-muted-foreground text-sm animate-fade-in delay-200">Loading, please wait...</p>
      </div>
    </div>
  )
}

export default AppLoadingScreen