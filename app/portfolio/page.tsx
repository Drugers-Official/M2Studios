"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef } from "react"
import { PlayCircle, X, Clock, TrendingUp, Star, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
}: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime: number
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * end))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

const projects = [
  {
    id: 1,
    title: "Romantic Wedding Film",
    category: "wedding",
    thumbnail: "/romantic-wedding-cinematography.jpg",
    views: "25K",
    duration: "8:30",
  },
  {
    id: 2,
    title: "Viral Instagram Reel",
    category: "reels",
    thumbnail: "/viral-instagram-reel.jpg",
    views: "150K",
    duration: "0:30",
  },
  {
    id: 3,
    title: "Tech Review YouTube Video",
    category: "youtube",
    thumbnail: "/tech-review-youtube.jpg",
    views: "500K",
    duration: "12:45",
  },
  {
    id: 4,
    title: "Gaming Montage",
    category: "gaming",
    thumbnail: "/gaming-montage-highlights.jpg",
    views: "75K",
    duration: "5:20",
  },
  {
    id: 5,
    title: "Corporate Brand Video",
    category: "corporate",
    thumbnail: "/corporate-brand-video.jpg",
    views: "30K",
    duration: "3:15",
  },
  {
    id: 6,
    title: "Destination Wedding",
    category: "wedding",
    thumbnail: "/destination-wedding-film.jpg",
    views: "40K",
    duration: "10:00",
  },
  {
    id: 7,
    title: "Fashion Reel",
    category: "reels",
    thumbnail: "/fashion-instagram-reel.jpg",
    views: "200K",
    duration: "0:45",
  },
  {
    id: 8,
    title: "Vlog Edit",
    category: "youtube",
    thumbnail: "/travel-vlog-editing.jpg",
    views: "120K",
    duration: "15:30",
  },
  {
    id: 9,
    title: "FPS Highlights",
    category: "gaming",
    thumbnail: "/fps-gaming-highlights.jpg",
    views: "90K",
    duration: "4:50",
  },
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedVideo, setSelectedVideo] = useState<(typeof projects)[0] | null>(null) // Changed from number | null to project object | null
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // const categories = ["all", "wedding", "reels", "youtube", "gaming", "corporate", "frames"] // This line is removed as categories are now objects below

  const caseStudies = [
    {
      id: 1,
      title: "Destination Wedding Cinematic Film",
      client: "Sarah & James",
      category: "wedding",
      thumbnail: "/luxury-destination-wedding.jpg",
      result: "2M+ Views on Instagram",
      deliveryTime: "5 days",
      rating: 5,
      description:
        "Created a breathtaking cinematic wedding film for a luxury destination wedding in Bali. The project included drone footage, slow-motion sequences, and emotional storytelling.",
      challenge:
        "Capturing the essence of a multi-day celebration across various locations while maintaining a cohesive narrative.",
      solution:
        "We used advanced color grading techniques and seamless transitions to create a timeless film that perfectly captured every emotional moment.",
      testimonial:
        "M2 Studio exceeded our expectations! The final video was absolutely stunning and captured our special day perfectly.",
    },
    {
      id: 2,
      title: "Viral Product Launch Reel",
      client: "TechBrand Co.",
      category: "corporate",
      thumbnail: "/tech-product-launch-video.jpg",
      result: "500K+ Reach in 24hrs",
      deliveryTime: "3 days",
      rating: 5,
      description:
        "Produced a high-energy product launch reel for a tech startup's flagship product. The video went viral and significantly boosted pre-orders.",
      challenge: "Creating engaging content that would stand out in a competitive tech market.",
      solution:
        "We combined dynamic motion graphics, upbeat music, and fast-paced editing to create a reel that captured attention within the first 3 seconds.",
      testimonial: "The reel drove incredible engagement. Our pre-orders doubled within the first week!",
    },
    {
      id: 3,
      title: "Gaming Tournament Highlights",
      client: "ESports Arena",
      category: "gaming",
      thumbnail: "/esports-gaming-highlights.jpg",
      result: "1M+ YouTube Views",
      deliveryTime: "2 days",
      rating: 5,
      description:
        "Edited an epic highlight reel for a major gaming tournament featuring the best plays, reactions, and crowd moments.",
      challenge: "Processing hours of footage to find the most exciting moments and syncing them to music.",
      solution:
        "We used AI-assisted editing to identify key moments, combined with manual refinement to create the perfect flow and energy.",
      testimonial: "The best tournament recap we've ever had. M2 Studio knows how to build hype!",
    },
  ]

  const portfolio = projects

  const topSellers = [
    {
      rank: 1,
      badge: "TOP SELLER",
      badgeColor: "from-yellow-500 to-orange-500",
      size: '4" × 6"',
      name: "Classic",
      price: "₹199",
      subtitle: "Highest demand",
      usedFor: ["Family photos", "Couple photos", "Passport-style keepsakes"],
      features: ["Cheap, fast print, high volume"],
      tag: "Must-have size",
    },
    {
      rank: 2,
      badge: "HIGH DEMAND",
      badgeColor: "from-blue-500 to-cyan-500",
      size: '5" × 7"',
      name: "Premium",
      price: "₹299",
      subtitle: "Best for gifts",
      usedFor: ["Gifts", "Table frames", "Studio photos"],
      features: ["Looks premium than 4×6"],
      tag: "Strong seller",
    },
    {
      rank: 3,
      badge: "PROFESSIONAL LOOK",
      badgeColor: "from-purple-500 to-pink-500",
      size: '8" × 10"',
      name: "Professional",
      price: "₹499",
      subtitle: "Premium quality",
      usedFor: ["Wall frames", "Portraits", "Certificates with photo"],
      features: ["Higher profit margin"],
      tag: "Worth Of Cost",
    },
  ]

  const photoSizes = [
    {
      size: '4" × 6"',
      price: "₹199",
      popular: true,
      image: "/frame-4x6-sample-1.jpg",
      gallery: [
        "/frame-4x6-sample-1.jpg",
        "/frame-4x6-sample-2.jpg",
        "/frame-4x6-sample-3.jpg",
        "/frame-4x6-sample-4.jpg",
        "/frame-4x6-sample-5.jpg",
      ],
    },
    {
      size: '5" × 7"',
      price: "₹299",
      popular: true,
      image: "/frame-5x7-sample-1.jpg",
      gallery: [
        "/frame-5x7-sample-1.jpg",
        "/frame-5x7-sample-2.jpg",
        "/frame-5x7-sample-3.jpg",
        "/frame-5x7-sample-4.jpg",
        "/frame-5x7-sample-5.jpg",
      ],
    },
    {
      size: '6" × 8"',
      price: "₹349",
      popular: false,
      image: "/frame-6x8-sample-1.jpg",
      gallery: [
        "/frame-6x8-sample-1.jpg",
        "/frame-6x8-sample-2.jpg",
        "/frame-6x8-sample-3.jpg",
        "/frame-6x8-sample-4.jpg",
      ],
    },
    {
      size: '8" × 10"',
      price: "₹449",
      popular: true,
      image: "/frame-8x10-sample-1.jpg",
      gallery: [
        "/frame-8x10-sample-1.jpg",
        "/frame-8x10-sample-2.jpg",
        "/frame-8x10-sample-3.jpg",
        "/frame-8x10-sample-4.jpg",
        "/frame-8x10-sample-5.jpg",
        "/frame-8x10-sample-6.jpg",
      ],
    },
    {
      size: '5" × 5"',
      name: "Square",
      price: "₹279",
      popular: false,
      image: "/frame-5x5-sample-1.jpg",
      gallery: [
        "/frame-5x5-sample-1.jpg",
        "/frame-5x5-sample-2.jpg",
        "/frame-5x5-sample-3.jpg",
        "/frame-5x5-sample-4.jpg",
      ],
    },
  ]

  const getSelectedFrameData = () => photoSizes.find((p) => p.size === selectedFrame)

  const handleNextImage = () => {
    const frameData = getSelectedFrameData()
    if (frameData) {
      setCurrentImageIndex((prev) => (prev + 1) % frameData.gallery.length)
    }
  }

  const handlePrevImage = () => {
    const frameData = getSelectedFrameData()
    if (frameData) {
      setCurrentImageIndex((prev) => (prev - 1 + frameData.gallery.length) % frameData.gallery.length)
    }
  }

  const filteredPortfolio =
    selectedCategory === "all" ? portfolio : portfolio.filter((item) => item.category === selectedCategory)

  const filteredCaseStudies =
    selectedCategory === "all" ? caseStudies : caseStudies.filter((study) => study.category === selectedCategory)

  // Updated categories to match the new structure
  const categories = [
    { id: "all", label: "All" },
    { id: "wedding", label: "Weddings" },
    { id: "reels", label: "Reels" },
    { id: "youtube", label: "YouTube" },
    { id: "gaming", label: "Gaming" },
    { id: "corporate", label: "Corporate" },
    { id: "frames", label: "Frames" },
  ]

  return (
    <>
      <AnimatedBackground />
      <Navigation />

      <main className="min-h-screen pt-24 pb-20 overflow-hidden relative">
        {/* Decorative gradient blobs */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div
          className="absolute top-[600px] right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse pointer-events-none"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-[1200px] left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none"
          style={{ animationDelay: "2s" }}
        />

        {/* Header */}
        <section className="py-20 px-4 relative z-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />

          <div className="container mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass rounded-full border border-primary/30">
              <Sparkles className="w-4 h-4" style={{ color: "#FACC15" }} />
              <span style={{ color: "#FACC15" }} className="text-sm font-semibold">
                Our Work
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
              <span style={{ color: "#FFFFFF" }}>Portfolio of</span>
              <br />
              <span style={{ color: "#FACC15" }} className="text-glow-yellow">
                Amazing Projects
              </span>
            </h1>

            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: "#9CA3AF" }}>
              Explore our collection of professionally edited videos across various genres and styles
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 mb-16 relative z-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="glass border-border hover:border-primary/30 transition-colors p-6 text-center">
                <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FACC15" }}>
                  <AnimatedCounter end={500} duration={2000} suffix="+" />
                </p>
                <p className="text-sm" style={{ color: "#9CA3AF" }}>
                  Projects Completed
                </p>
              </Card>
              <Card className="glass border-border hover:border-primary/30 transition-colors p-6 text-center">
                <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FACC15" }}>
                  <AnimatedCounter end={200} duration={2000} suffix="+" />
                </p>
                <p className="text-sm" style={{ color: "#9CA3AF" }}>
                  Happy Clients
                </p>
              </Card>
              <Card className="glass border-border hover:border-primary/30 transition-colors p-6 text-center">
                <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FACC15" }}>
                  <AnimatedCounter end={24} duration={2000} suffix="M+" />
                </p>
                <p className="text-sm" style={{ color: "#9CA3AF" }}>
                  Total Views
                </p>
              </Card>
              <Card className="glass border-border hover:border-primary/30 transition-colors p-6 text-center">
                <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FACC15" }}>
                  <AnimatedCounter end={24} duration={1500} suffix="hr" />
                </p>
                <p className="text-sm" style={{ color: "#9CA3AF" }}>
                  Average Delivery
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="px-4 mb-20 relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-4 py-2 glass rounded-full border border-primary/30">
                <span style={{ color: "#FACC15" }} className="text-sm font-semibold">
                  Success Stories
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
                Featured <span style={{ color: "#FACC15" }}>Case Studies</span>
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#9CA3AF" }}>
                Deep dive into our most successful projects and see how we helped our clients achieve their goals
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <Card
                  key={study.id}
                  className="glass border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group flex flex-col"
                  onClick={() => setSelectedCase(study.id)}
                >
                  <div className="relative aspect-video w-full">
                    <img
                      src={study.thumbnail || "/placeholder.svg"}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <Badge className="absolute top-4 right-4 bg-[#FACC15]/20 text-[#FACC15] border-[#FACC15]/50">
                      Case Study
                    </Badge>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      {[...Array(study.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">{study.title}</h3>
                    <p className="text-sm text-[#9CA3AF] mb-4">{study.client}</p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-sm text-[#9CA3AF]">
                        <TrendingUp className="w-4 h-4 text-[#FACC15]" />
                        {study.result}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[#9CA3AF]">
                        <Clock className="w-4 h-4 text-[#FACC15]" />
                        {study.deliveryTime}
                      </div>
                    </div>

                    <p className="text-sm text-[#9CA3AF] mb-4 line-clamp-2 flex-1">{study.description}</p>

                    <Button
                      variant="ghost"
                      className="w-full text-[#FACC15] hover:bg-[#FACC15]/10 group/btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCase(study.id)
                      }}
                    >
                      Read Full Case Study
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-4 mb-8 relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-4 py-2 glass rounded-full border border-primary/30">
                <span style={{ color: "#FACC15" }} className="text-sm font-semibold">
                  Browse by Category
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
                Our <span style={{ color: "#FACC15" }}>Portfolio</span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300",
                    selectedCategory === category.id
                      ? "text-black"
                      : "glass border border-white/10 text-white hover:border-primary/50",
                  )}
                  style={selectedCategory === category.id ? { background: "#FACC15", color: "#000000" } : {}}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="px-4 mb-20 relative z-10">
          <div
            className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none"
            style={{ animationDelay: "1.5s" }}
          />

          <div className="container mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPortfolio.map((item) => (
                <Card
                  key={item.id}
                  className="glass border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedVideo(item)} // Pass the whole item to setSelectedVideo
                >
                  <div className="relative aspect-video">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="w-16 h-16" style={{ color: "#FACC15" }} />
                    </div>
                    <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm text-[#FFFFFF]">
                      {item.views} views
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm text-[#FFFFFF]">
                      {item.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#FFFFFF]">{item.title}</h3>
                    <p className="text-sm capitalize text-[#9CA3AF]">{item.category}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Frames Section */}
        {(selectedCategory === "all" || selectedCategory === "frames") && (
          <section className="px-4 mb-20 relative z-10">
            <div className="container mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div
                  className="inline-block mb-4 px-4 py-2 rounded-full border"
                  style={{ background: "rgba(250, 204, 21, 0.1)", borderColor: "rgba(250, 204, 21, 0.3)" }}
                >
                  <span style={{ color: "#FACC15" }} className="text-sm font-semibold">
                    Premium Photo Frames
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-[#FFFFFF] mb-4">Transform Your Memories</h2>
                <p className="text-[#9CA3AF] max-w-2xl mx-auto">
                  High-quality photo frames available in multiple sizes. From classic photo prints to A4 documents - we
                  have the perfect frame for you.
                </p>
              </div>

              {/* Top Sellers Section */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-[#FFFFFF] mb-8 text-center">
                  <span className="text-[#FACC15]">★</span> Top Selling Sizes <span className="text-[#FACC15]">★</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topSellers.map((seller, index) => (
                    <Card
                      key={index}
                      className="relative bg-[#0E0E0E] border-[#1a1a1a] hover:border-[#FACC15] transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Rank Badge */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${seller.badgeColor}`} />

                      <div className="p-6 flex flex-col flex-1">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-[#FACC15]/10 flex items-center justify-center">
                            <span className="text-lg">
                              {seller.rank === 1 ? "🥇" : seller.rank === 2 ? "🥈" : "🥉"}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-[#FACC15] font-bold">
                              #{seller.rank} {seller.badge}
                            </p>
                            <p className="text-2xl font-bold text-[#FFFFFF]">{seller.size}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span>🏆</span>
                          <span className="text-[#FACC15] font-semibold">{seller.subtitle}</span>
                        </div>

                        {/* Used For */}
                        <div className="mb-4">
                          <p className="text-sm text-[#9CA3AF] mb-2">Used for:</p>
                          <ul className="space-y-1 ml-4">
                            {seller.usedFor.map((use, i) => (
                              <li key={i} className="text-sm text-[#FFFFFF] list-disc">
                                {use}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Features */}
                        {seller.features.map((feature, i) => (
                          <p key={i} className="text-sm text-[#9CA3AF] mb-2">
                            • {feature}
                          </p>
                        ))}

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#FACC15]/30 bg-[#FACC15]/10 mt-3 w-fit">
                          <span className="text-[#FACC15]">✓</span>
                          <span className="text-sm font-medium text-[#FACC15]">{seller.tag}</span>
                        </div>

                        <div className="mt-auto pt-6">
                          <div className="pt-4 border-t border-[#1a1a1a]">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[#9CA3AF]">Starting at</span>
                              <span className="text-2xl font-bold text-[#FACC15]">{seller.price}</span>
                            </div>
                            <Link href="/order">
                              <Button className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#050505] font-semibold">
                                Order Now
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* All Photo Sizes */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-[#FFFFFF] mb-6 text-center">All Available Sizes</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {photoSizes.map((photo, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedFrame(photo.size)
                        setCurrentImageIndex(0)
                      }}
                    >
                      <Card className="bg-[#0E0E0E] border-[#1a1a1a] hover:border-[#FACC15] transition-all duration-300 cursor-pointer group h-full flex flex-col">
                        {/* Frame Image */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
                          <img
                            src={photo.image || "/placeholder.svg?height=300&width=225&query=photo frame"}
                            alt={`Photo frame ${photo.size}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {photo.popular && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#FACC15] text-[#050505] text-xs font-bold">
                              Popular
                            </span>
                          )}
                          {/* Gallery Indicator */}
                          <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {photo.gallery.length}
                          </div>
                        </div>

                        <div className="p-3 text-center flex flex-col gap-2">
                          <div>
                            <p className="text-base md:text-lg font-bold text-[#FFFFFF]">{photo.size}</p>
                            {photo.name && <p className="text-xs text-[#9CA3AF]">{photo.name}</p>}
                          </div>
                          <p className="text-lg md:text-xl font-bold text-[#FACC15]">{photo.price}</p>
                          <div className="w-full bg-[#FACC15] text-[#050505] py-2 px-3 rounded font-bold text-xs md:text-sm group-hover:bg-[#FACC15]/90 transition-colors text-center">
                            View Gallery
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card className="bg-[#0E0E0E] border-[#1a1a1a] p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FACC15]/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-[#FACC15]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#FFFFFF] mb-2">Premium Quality</h3>
                  <p className="text-sm text-[#9CA3AF]">High-quality wooden frames with UV-protected glass</p>
                </Card>

                <Card className="bg-[#0E0E0E] border-[#1a1a1a] p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FACC15]/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-[#FACC15]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#FFFFFF] mb-2">Fast Delivery</h3>
                  <p className="text-sm text-[#9CA3AF]">Get your frames delivered within 3-5 business days</p>
                </Card>

                <Card className="bg-[#0E0E0E] border-[#1a1a1a] p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FACC15]/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-[#FACC15]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#FFFFFF] mb-2">Custom Designs</h3>
                  <p className="text-sm text-[#9CA3AF]">Choose from multiple frame colors and styles</p>
                </Card>
              </div>

              {/* CTA */}
              <div className="text-center mt-12">
                <Link href="/order">
                  <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#050505] font-bold px-8 py-6 text-lg">
                    Order Your Custom Frame Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Case Study Modal */}
        {selectedCase && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 overflow-y-auto"
            onClick={() => setSelectedCase(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#0E0E0E] border border-[#1a1a1a] rounded-lg overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6 text-[#FFFFFF]" />
              </button>

              {caseStudies
                .filter((s) => s.id === selectedCase)
                .map((study) => (
                  <div key={study.id}>
                    <div className="relative aspect-video">
                      <img
                        src={study.thumbnail || "/placeholder.svg"}
                        alt={study.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] to-transparent" />
                    </div>

                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(study.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#FACC15] text-[#FACC15]" />
                        ))}
                      </div>

                      <h2 className="text-3xl font-bold text-[#FFFFFF] mb-2">{study.title}</h2>
                      <p className="text-[#9CA3AF] mb-6">Client: {study.client}</p>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-[#1a1a1a] p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-[#FACC15]" />
                            <span className="text-sm text-[#9CA3AF]">Result</span>
                          </div>
                          <p className="text-lg font-semibold text-[#FFFFFF]">{study.result}</p>
                        </div>
                        <div className="bg-[#1a1a1a] p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-5 h-5 text-[#FACC15]" />
                            <span className="text-sm text-[#9CA3AF]">Delivery Time</span>
                          </div>
                          <p className="text-lg font-semibold text-[#FFFFFF]">{study.deliveryTime}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-[#FFFFFF] mb-3">Overview</h3>
                          <p className="text-[#9CA3AF] leading-relaxed">{study.description}</p>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-[#FFFFFF] mb-3">The Challenge</h3>
                          <p className="text-[#9CA3AF] leading-relaxed">{study.challenge}</p>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-[#FFFFFF] mb-3">Our Solution</h3>
                          <p className="text-[#9CA3AF] leading-relaxed">{study.solution}</p>
                        </div>

                        <div className="bg-[#1a1a1a] p-6 rounded-lg border-l-4 border-[#FACC15]">
                          <p className="text-[#FFFFFF] italic mb-2">"{study.testimonial}"</p>
                          <p className="text-sm text-[#9CA3AF]">- {study.client}</p>
                        </div>
                      </div>

                      <div className="mt-8 flex gap-4">
                        <Link href="/order" className="flex-1">
                          <Button className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#050505]">
                            Start Your Project
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="flex-1 border-[#1a1a1a] hover:border-[#FACC15] text-[#FFFFFF] bg-transparent"
                          onClick={() => setSelectedCase(null)}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#0E0E0E] border border-[#1a1a1a] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6 text-[#FFFFFF]" />
              </button>
              <div className="aspect-video bg-[#1a1a1a] flex items-center justify-center">
                <div className="text-center">
                  <PlayCircle className="w-20 h-20 mx-auto mb-4 text-[#FACC15]" />
                  <p className="text-[#9CA3AF]">Video preview would play here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Popup Modal */}
        {selectedFrame && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 overflow-y-auto"
            onClick={() => setSelectedFrame(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-[#0E0E0E] border border-[#1a1a1a] rounded-lg overflow-hidden my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFrame(null)}
                className="absolute top-3 right-3 z-10 p-1.5 bg-black/50 rounded-full hover:bg-[#FACC15] hover:text-[#050505] transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {getSelectedFrameData() && (
                <>
                  {/* Main Image Display */}
                  <div className="relative aspect-square max-h-[60vh] bg-[#1a1a1a]">
                    <img
                      src={
                        getSelectedFrameData()!.gallery[currentImageIndex] ||
                        "/placeholder.svg?height=500&width=500&query=photo frame sample" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt={`Frame ${getSelectedFrameData()!.size} - Sample ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                    />

                    {/* Navigation Arrows */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePrevImage()
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-[#FACC15] hover:text-[#050505] transition-colors text-white"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNextImage()
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-[#FACC15] hover:text-[#050505] transition-colors text-white"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/70 rounded-full text-white text-sm">
                      {currentImageIndex + 1} / {getSelectedFrameData()!.gallery.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="p-4 bg-[#0a0a0a] border-t border-[#1a1a1a]">
                    <div className="flex gap-2 justify-center overflow-x-auto pb-1">
                      {getSelectedFrameData()!.gallery.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`flex-shrink-0 w-14 h-14 rounded overflow-hidden border-2 transition-all ${
                            currentImageIndex === idx
                              ? "border-[#FACC15] scale-105"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={img || "/placeholder.svg?height=56&width=56&query=photo frame thumbnail"}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Frame Info & Order Button */}
                  <div className="p-5 border-t border-[#1a1a1a]">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-[#FFFFFF]">
                          {getSelectedFrameData()!.size}{" "}
                          {getSelectedFrameData()!.name && `(${getSelectedFrameData()!.name})`}
                        </h3>
                        <p className="text-sm text-[#9CA3AF]">Premium quality wooden frame</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-[#9CA3AF]">Price</p>
                          <p className="text-2xl font-bold text-[#FACC15]">{getSelectedFrameData()!.price}</p>
                        </div>
                        <Link href="/order">
                          <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#050505] font-bold px-6 py-4 text-base">
                            Order Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="px-4 py-20 relative z-10">
          <div className="container mx-auto">
            <div className="relative glass rounded-3xl border border-primary/30 p-12 md:p-16 text-center overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
                  <Star className="w-4 h-4" style={{ color: "#FACC15" }} />
                  <span style={{ color: "#FACC15" }} className="text-sm font-semibold">
                    Ready to Create?
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#FFFFFF" }}>
                  Like What You See? <br />
                  <span style={{ color: "#FACC15" }}>Let's Work Together</span>
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
                  <Link href="/services">
                    <Button
                      size="lg"
                      variant="outline"
                      className="btn-lift text-lg px-10 py-6 border-white/20 hover:bg-white/10 bg-transparent"
                    >
                      View Services
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
