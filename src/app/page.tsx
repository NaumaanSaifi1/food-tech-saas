import Link from "next/link";
import { ArrowRight, BarChart3, ChefHat, Clock, Layers, Smartphone, TrendingUp, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-black fill-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">FoodOS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/dashboard">
              <Button>Business Demo</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-8 py-1.5 px-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2" />
            Reinventing Food Service Operations
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <span className="text-foreground">From Chaos to</span> <br />
            <span className="text-gradient-primary">Calculated Precision</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            The end-to-end OS for food businesses. Digitize ordering, predict demand,
            and eliminate wastage with AI-powered operational intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base h-12 px-8">
                Try Business Dashboard <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/order">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base h-12 px-8 border-white/10 hover:bg-white/5">
                View Ordering App <Smartphone className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for Scale</h2>
            <p className="text-muted-foreground">Everything you need to run high-volume food operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6 text-primary" />}
              title="Demand Forecasting"
              description="AI models analyze historical data to predict consumption patterns, optimizing prep-time and inventory procurement."
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6 text-blue-400" />}
              title="Zero-Wait Ordering"
              description="Pre-ordering system eliminates queues and converts uncertain footfall into committed revenue."
            />
            <FeatureCard
              icon={<Layers className="w-6 h-6 text-green-400" />}
              title="Inventory Control"
              description="Real-time ingredient tracking significantly reduces wastage and improves gross margins."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl p-8 md:p-16 border border-white/10 bg-card/30 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-2 text-center md:text-left">
              <div className="text-5xl font-bold text-white tracking-tight">30%</div>
              <div className="text-base text-muted-foreground font-medium">Increased Margins</div>
            </div>
            <div className="h-16 w-[1px] bg-white/10 hidden md:block" />
            <div className="space-y-2 text-center md:text-left">
              <div className="text-5xl font-bold text-white tracking-tight">0min</div>
              <div className="text-base text-muted-foreground font-medium">Customer Wait Time</div>
            </div>
            <div className="h-16 w-[1px] bg-white/10 hidden md:block" />
            <div className="space-y-2 text-center md:text-left">
              <div className="text-5xl font-bold text-white tracking-tight">2x</div>
              <div className="text-base text-muted-foreground font-medium">Peak Hour Throughput</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-muted-foreground text-sm">
        <p>&copy; 2024 FoodOS Technologies. Built for the future of food.</p>
      </footer>

    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl border border-white/5 bg-card/40 hover:bg-card/60 transition-colors group">
      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors border border-white/5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
