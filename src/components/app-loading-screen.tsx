import Logo from '@/logo.png'

const AppLoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 animate-in fade-in-20">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-2xl animate-pulse delay-200" />
      </div>
      {/* Logo and App Name */}
      <div className="relative z-10 flex flex-col items-center">
        <img src={Logo} alt="GSTS Logo" className="w-24 h-24 mb-4 rounded-xl drop-shadow-xl animate-fade-in" />
        <h1 className="text-2xl font-bold text-foreground tracking-tight animate-fade-in delay-200">GSTS Tablet Tracking System</h1>
      </div>
    </div>
  )
}

export default AppLoadingScreen