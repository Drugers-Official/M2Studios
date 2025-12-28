"use client"

import { useState, useRef, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Video,
  TrendingUp,
  ImageIcon,
  Palette,
  Youtube,
  Gamepad2,
  Film,
  Zap,
  Check,
  Frame,
  Play,
  Clock,
  Star,
  ChevronRight,
  Sparkles,
  ArrowRight,
  MessageCircle,
  RefreshCw,
  Upload,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Animated counter component
function AnimatedCounter({
  target,
  duration = 2000,
  suffix = "",
}: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const categories = [
    { id: "all", label: "All Services" },
    { id: "video", label: "Video Editing" },
    { id: "design", label: "Design" },
    { id: "social", label: "Social Media" },
  ]

  const services = [
    {
      icon: Film,
      title: "Wedding Film Editing",
      description:
        "Transform your special day into a cinematic masterpiece with professional color grading and emotional storytelling.",
      features: ["Cinematic Color Grading", "Audio Mixing", "Highlight Reels", "4K Delivery"],
      price: "299",
      popular: true,
      category: "video",
      deliveryTime: "5-7 days",
    },
    {
      icon: Youtube,
      title: "YouTube Full Video",
      description: "Complete YouTube video production optimized for viewer retention and engagement.",
      features: ["Full Production", "Graphics & B-Roll", "SEO Optimization", "Engagement Elements"],
      price: "149",
      popular: true,
      category: "video",
      deliveryTime: "2-3 days",
    },
    {
      icon: TrendingUp,
      title: "Reels & Shorts",
      description: "Create viral-ready content for Instagram, YouTube Shorts, and TikTok with trending effects.",
      features: ["Trending Effects", "Captions & Text", "Music Sync", "Platform Optimized"],
      price: "49",
      popular: false,
      category: "social",
      deliveryTime: "24 hours",
    },
    {
      icon: ImageIcon,
      title: "Thumbnail Design",
      description: "Eye-catching thumbnails that boost your click-through rates with bold visuals.",
      features: ["Custom Graphics", "A/B Test Designs", "Fast Turnaround", "Unlimited Revisions"],
      price: "29",
      popular: false,
      category: "design",
      deliveryTime: "24 hours",
    },
    {
      icon: Frame,
      title: "Photo Frames",
      description: "Premium quality photo frames in multiple sizes for your precious memories.",
      features: ["5 Different Sizes", "Premium Print", "Fast Delivery", "Gift Packaging"],
      price: "199",
      popular: false,
      category: "design",
      deliveryTime: "3-5 days",
      currency: "₹",
    },
    {
      icon: Palette,
      title: "Logo & Animation",
      description: "Professional brand identity and motion graphics that make your brand memorable.",
      features: ["Brand Identity", "Motion Graphics", "Intro/Outro", "Multiple Formats"],
      price: "199",
      popular: false,
      category: "design",
      deliveryTime: "3-5 days",
    },
    {
      icon: Gamepad2,
      title: "Gaming Montage",
      description: "Epic gaming content with fast-paced edits, effects, and perfect beat sync.",
      features: ["Kill Montages", "Highlight Reels", "Special Effects", "Beat Sync"],
      price: "99",
      popular: false,
      category: "video",
      deliveryTime: "2-3 days",
    },
    {
      icon: Video,
      title: "Promo & Intro",
      description: "Professional promotional videos and channel intros for memorable first impressions.",
      features: ["Brand Promos", "Channel Intros", "Product Videos", "Social Media Ads"],
      price: "129",
      popular: false,
      category: "social",
      deliveryTime: "2-3 days",
    },
    {
      icon: Zap,
      title: "Custom Projects",
      description: "Have a unique project? We handle custom requests including documentaries and corporate videos.",
      features: ["Flexible Scope", "Dedicated Editor", "Unlimited Revisions", "Priority Support"],
      price: "Custom",
      popular: false,
      category: "video",
      deliveryTime: "Varies",
      isCustom: true,
    },
  ]

  const process = [
    {
      step: "01",
      title: "Share Your Vision",
      description:
        "Tell us about your project, upload your raw footage, and share any references or specific requirements.",
      icon: Upload,
    },
    {
      step: "02",
      title: "We Work Our Magic",
      description:
        "Our expert editors transform your footage with professional cuts, effects, color grading, and sound design.",
      icon: Sparkles,
    },
    {
      step: "03",
      title: "Review & Refine",
      description:
        "Preview your edited content and request unlimited revisions until it's exactly what you envisioned.",
      icon: RefreshCw,
    },
    {
      step: "04",
      title: "Download & Share",
      description: "Get your polished content delivered in your preferred format, ready to share with the world.",
      icon: ArrowRight,
    },
  ]

  const stats = [
    { value: 500, suffix: "+", label: "Projects Completed" },
    { value: 200, suffix: "+", label: "Happy Clients" },
    { value: 24, suffix: "hr", label: "Average Delivery" },
  ]

  const filteredServices = activeCategory === "all" ? services : services.filter((s) => s.category === activeCategory)

  return (
    <>
      <AnimatedBackground />
      <Navigation />

      <main className="min-h-screen pt-24 pb-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass rounded-full border border-primary/30">
              <Sparkles className="w-4 h-4" style={{ color: "#FACC15" }} />
              <span style={{ color: "#FACC15" }} className="text-sm font-semibold">
                Professional Video Editing Services
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
              <span style={{ color: "#FFFFFF" }}>Transform Your Content</span>
              <br />
              <span style={{ color: "#FACC15" }} className="text-glow-yellow">
                Into Something Extraordinary
              </span>
            </h1>

            <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-10" style={{ color: "#9CA3AF" }}>
              From viral reels to cinematic wedding films, we deliver premium editing that captivates audiences and
              elevates your brand.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/order">
                <Button
                  size="lg"
                  className="glow-yellow btn-lift text-lg px-8 py-6"
                  style={{ background: "#FACC15", color: "#000000" }}
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-lift text-lg px-8 py-6 border-white/20 hover:bg-white/10 bg-transparent"
                >
                  <Play className="mr-2 w-5 h-5" />
                  View Our Work
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-colors"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#FACC15" }}>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-4 mb-12">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300",
                    activeCategory === category.id
                      ? "bg-primary text-black"
                      : "glass border border-white/10 text-white hover:border-primary/50",
                  )}
                  style={activeCategory === category.id ? { background: "#FACC15", color: "#000000" } : {}}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-4 mb-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <Card
                  key={index}
                  className={cn(
                    "glass border-border hover:border-primary/50 transition-all duration-300 p-6 group relative overflow-hidden",
                    service.popular && "ring-2 ring-primary/50",
                  )}
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4">
                      <span
                        className="px-3 py-1 text-xs font-bold rounded-full"
                        style={{ background: "#FACC15", color: "#000000" }}
                      >
                        POPULAR
                      </span>
                    </div>
                  )}

                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7" style={{ color: "#FACC15" }} />
                  </div>

                  <h3 className="text-xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
                    {service.title}
                  </h3>

                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "#9CA3AF" }}>
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4" style={{ color: "#FACC15" }} />
                    <span className="text-sm" style={{ color: "#9CA3AF" }}>
                      {service.deliveryTime}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#FACC15" }} />
                        <span className="text-sm" style={{ color: "#D1D5DB" }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    {service.isCustom ? (
                      <span className="text-2xl font-bold" style={{ color: "#FACC15" }}>
                        Custom Quote
                      </span>
                    ) : (
                      <div>
                        <span className="text-sm" style={{ color: "#9CA3AF" }}>
                          Starting at
                        </span>
                        <div className="text-2xl font-bold" style={{ color: "#FACC15" }}>
                          {service.currency || "$"}
                          {service.price}
                        </div>
                      </div>
                    )}
                    <Link href={`/order?service=${encodeURIComponent(service.title)}`}>
                      <Button
                        size="sm"
                        style={{ background: "#FACC15", color: "#000000" }}
                        className="hover:opacity-90 btn-lift"
                      >
                        Order Now
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 glass rounded-full border border-primary/30">
                <span style={{ color: "#FACC15" }} className="text-sm font-semibold">
                  Simple Process
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
                How It <span style={{ color: "#FACC15" }}>Works</span>
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#9CA3AF" }}>
                Getting your content edited is easier than you think. Just four simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="relative">
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
                  )}
                  <Card className="glass border-border hover:border-primary/50 transition-all duration-300 p-6 text-center relative z-10">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <step.icon className="w-8 h-8" style={{ color: "#FACC15" }} />
                    </div>
                    <div className="text-sm font-bold mb-2" style={{ color: "#FACC15" }}>
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#FFFFFF" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm" style={{ color: "#9CA3AF" }}>
                      {step.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="relative glass rounded-3xl border border-primary/30 p-12 md:p-16 text-center overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
                  <Star className="w-4 h-4" style={{ color: "#FACC15" }} />
                  <span style={{ color: "#FACC15" }} className="text-sm font-semibold">
                    Ready to Get Started?
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#FFFFFF" }}>
                  Let's Create Something <br />
                  <span style={{ color: "#FACC15" }}>Amazing Together</span>
                </h2>

                <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "#9CA3AF" }}>
                  Join hundreds of satisfied creators who trust M2 Studio for their video editing needs. Start your
                  project today and see the difference professional editing makes.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/order">
                    <Button
                      size="lg"
                      className="glow-yellow btn-lift text-lg px-10 py-6"
                      style={{ background: "#FACC15", color: "#000000" }}
                    >
                      Start Your Project
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="https://wa.me/919876543210" target="_blank">
                    <Button
                      size="lg"
                      variant="outline"
                      className="btn-lift text-lg px-10 py-6 border-white/20 hover:bg-white/10 bg-transparent"
                    >
                      <MessageCircle className="mr-2 w-5 h-5" />
                      Chat on WhatsApp
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
