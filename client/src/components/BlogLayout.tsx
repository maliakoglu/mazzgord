import { ArrowLeft, MessageCircle, FileText } from "lucide-react"
import { useState, useEffect, ReactNode } from "react"
type IllustrationKey =
  | "akademik" | "hatalar" | "ipuclari" | "sektor" | "teknoloji"
  | "kariyer" | "deyim" | "edebi" | "google-vs" | "hukuki"
  | "mektup" | "noter" | "sozlesme" | "teknik" | "teknik-nedir"
  | "tibbi" | "uc-dunya" | "vize" | "yeminli" | "yerellestirme"

const illustrations: Record<IllustrationKey, { gradient: string; svg: ReactNode }> = {
  akademik: { gradient: "from-blue-50 via-indigo-50 to-blue-100", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><path d="M100 35L40 60l60 25 60-25-60-25z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><path d="M65 72v18c0 6 16 11 35 11s35-5 35-11V72" stroke="currentColor" strokeWidth="2.5" /><path d="M160 60v22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><circle cx="160" cy="86" r="4" stroke="currentColor" strokeWidth="2" /><path d="M70 92h60v5H70z" stroke="currentColor" strokeWidth="2" fill="none" /></svg>) },
  hatalar: { gradient: "from-amber-50 via-orange-50 to-red-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><path d="M100 25L55 100h90L100 25z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><path d="M100 55v20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><circle cx="100" cy="85" r="3" fill="currentColor" /><circle cx="145" cy="45" r="15" stroke="currentColor" strokeWidth="2.5" /><path d="M156 56l10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>) },
  ipuclari: { gradient: "from-yellow-50 via-amber-50 to-orange-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><path d="M100 25c-18 0-32 14-32 32 0 12 7 22 16 28v8h32v-8c9-6 16-16 16-28 0-18-14-32-32-32z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><path d="M84 98h32M88 106h24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><path d="M100 10v8M70 20l5 5M130 20l-5 5M55 50h8M137 50h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>) },
  sektor: { gradient: "from-slate-50 via-blue-50 to-indigo-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><path d="M50 95V65M75 95V45M100 95V55M125 95V35M150 95V50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><path d="M45 95h110" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><path d="M60 70l30-25 25 15 30-30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M135 30h15v15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  teknoloji: { gradient: "from-cyan-50 via-blue-50 to-slate-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><rect x="55" y="25" width="90" height="55" rx="4" stroke="currentColor" strokeWidth="2.5" /><path d="M85 80v10h30v-10M75 95h50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><path d="M70 45l-8 8 8 8M130 45l8 8-8 8M105 40l-10 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="155" cy="100" r="10" stroke="currentColor" strokeWidth="2" /><path d="M155 88v-4M155 116v-4M143 100h-4M171 100h-4M147 92l-3-3M166 111l3 3M147 108l-3 3M166 89l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>) },
  kariyer: { gradient: "from-emerald-50 via-teal-50 to-blue-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><rect x="60" y="45" width="80" height="50" rx="5" stroke="currentColor" strokeWidth="2.5" /><path d="M85 45v-8h30v8M60 65h80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><path d="M40 100c10-15 25-15 35-5s25 10 35 0 25-15 50-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" fill="none" /><path d="M155 88l8 4-4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  deyim: { gradient: "from-purple-50 via-pink-50 to-rose-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><path d="M45 30h70c5 0 8 3 8 8v25c0 5-3 8-8 8H70l-15 12V71H45c-5 0-8-3-8-8V38c0-5 3-8 8-8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><path d="M95 55h70c5 0 8 3 8 8v25c0 5-3 8-8 8h-10v12l-15-12h-45c-5 0-8-3-8-8V63c0-5 3-8 8-8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><path d="M55 48h30M55 55h20M110 73h30M110 80h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>) },
  edebi: { gradient: "from-violet-50 via-purple-50 to-indigo-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><path d="M100 35c-12-8-28-10-40-8v55c12-2 28 0 40 8 12-8 28-10 40-8V27c-12-2-28 0-40 8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><path d="M100 35v55" stroke="currentColor" strokeWidth="2.5" /><path d="M145 20l15 15-35 35-15 5 5-15 30-30z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M140 25l10 10" stroke="currentColor" strokeWidth="2" /></svg>) },
  "google-vs": { gradient: "from-blue-50 via-slate-50 to-emerald-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><path d="M100 25v70M70 95h60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><circle cx="100" cy="25" r="4" stroke="currentColor" strokeWidth="2" /><path d="M65 45h70M65 45l-15 25h30l-15-25zM135 45l-15 25h30l-15-25z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><text x="50" y="85" fontSize="10" fill="currentColor" textAnchor="middle">AI</text><text x="150" y="85" fontSize="10" fill="currentColor" textAnchor="middle">PRO</text></svg>) },
  hukuki: { gradient: "from-slate-50 via-blue-50 to-indigo-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><rect x="75" y="30" width="50" height="22" rx="3" stroke="currentColor" strokeWidth="2.5" transform="rotate(-30 100 41)" /><path d="M100 50l-5 5 25 25 5-5z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><path d="M85 95h30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><path d="M55 35v55M40 90h30M40 90l-8-20h16l-8 20zM70 90l-8-20h16l-8 20z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>) },
  mektup: { gradient: "from-cyan-50 via-teal-50 to-emerald-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><rect x="50" y="35" width="100" height="60" rx="5" stroke="currentColor" strokeWidth="2.5" /><path d="M50 40l50 35 50-35" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><circle cx="150" cy="30" r="12" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M150 24a6 6 0 1 1 0 12c-3 0-5-2-5-5s2-5 5-5 3 2 3 4" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>) },
  noter: { gradient: "from-red-50 via-rose-50 to-amber-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><path d="M70 20h45l20 20v55c0 3-2 5-5 5H70c-3 0-5-2-5-5V25c0-3 2-5 5-5z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><path d="M75 45h40M75 55h40M75 65h30M75 75h25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="130" cy="85" r="16" stroke="currentColor" strokeWidth="2.5" /><circle cx="130" cy="85" r="10" stroke="currentColor" strokeWidth="1.5" /><path d="M125 80h10M125 90h10M128 78v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>) },
  sozlesme: { gradient: "from-blue-50 via-indigo-50 to-purple-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><rect x="55" y="25" width="60" height="70" rx="4" stroke="currentColor" strokeWidth="2.5" /><path d="M65 40h35M65 50h35M65 60h25M65 70h30M65 80h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M125 60l15-10 10 8-12 12M140 58l8 8-5 5M130 68l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  teknik: { gradient: "from-slate-50 via-cyan-50 to-blue-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><circle cx="85" cy="55" r="22" stroke="currentColor" strokeWidth="2.5" /><circle cx="85" cy="55" r="8" stroke="currentColor" strokeWidth="2" /><path d="M85 27v-6M85 89v-6M57 55h-6M119 55h6M65 35l-4-4M105 75l4 4M65 75l-4 4M105 35l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M140 35a12 12 0 1 0 8 8l12 12-5 5-12-12a12 12 0 0 0-3-13z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>) },
  "teknik-nedir": { gradient: "from-slate-50 via-blue-50 to-cyan-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><rect x="50" y="25" width="100" height="70" rx="3" stroke="currentColor" strokeWidth="2.5" /><path d="M50 50h100M50 75h100M80 25v70M120 25v70" stroke="currentColor" strokeWidth="1.5" /><path d="M140 95l-15-25-15 25M125 70V55M118 80h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  tibbi: { gradient: "from-rose-50 via-red-50 to-pink-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><rect x="80" y="25" width="40" height="70" rx="5" stroke="currentColor" strokeWidth="2.5" /><path d="M95 45h10M100 40v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><path d="M55 65h15l8-15 8 25 8-15h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M140 65h10l5-10 5 20 5-10h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  "uc-dunya": { gradient: "from-blue-50 via-indigo-50 to-purple-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><circle cx="100" cy="55" r="30" stroke="currentColor" strokeWidth="2.5" /><ellipse cx="100" cy="55" rx="12" ry="30" stroke="currentColor" strokeWidth="2" /><path d="M70 45h60M70 65h60M75 30c15 15 15 35 0 50M125 30c-15 15-15 35 0 50" stroke="currentColor" strokeWidth="1.5" /><circle cx="50" cy="100" r="5" stroke="currentColor" strokeWidth="2" /><circle cx="100" cy="105" r="5" stroke="currentColor" strokeWidth="2" /><circle cx="150" cy="100" r="5" stroke="currentColor" strokeWidth="2" /></svg>) },
  vize: { gradient: "from-emerald-50 via-teal-50 to-cyan-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><rect x="60" y="25" width="55" height="75" rx="5" stroke="currentColor" strokeWidth="2.5" /><circle cx="87" cy="50" r="12" stroke="currentColor" strokeWidth="2" /><path d="M77 50c0-5 5-9 10-9s10 4 10 9M72 70h30M72 80h25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="140" cy="75" r="16" stroke="currentColor" strokeWidth="2.5" /><path d="M132 75h16M140 67v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>) },
  yeminli: { gradient: "from-amber-50 via-yellow-50 to-blue-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><path d="M70 70h60v5H70z" stroke="currentColor" strokeWidth="2.5" /><path d="M75 75c0 8-5 15-5 15M100 75v25M125 75c0 8 5 15 5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M100 65V40M95 45c0-5 5-8 5-8s5 3 5 8M90 50c0-5 10-8 10-8s10 3 10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="145" cy="45" r="12" stroke="currentColor" strokeWidth="2" /><path d="M145 38v14M138 45h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>) },
  yerellestirme: { gradient: "from-emerald-50 via-green-50 to-teal-50", svg: (<svg viewBox="0 0 200 120" fill="none" className="w-full h-full"><circle cx="100" cy="55" r="30" stroke="currentColor" strokeWidth="2.5" /><ellipse cx="100" cy="55" rx="12" ry="30" stroke="currentColor" strokeWidth="2" /><path d="M70 45h60M70 65h60" stroke="currentColor" strokeWidth="1.5" /><path d="M45 95l-8-8 8-8M37 87h20M155 95l8-8-8-8M163 87h-20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><text x="55" y="100" fontSize="8" fill="currentColor" textAnchor="middle">A</text></svg>) },
}

function BlogCTA() {
  return (
    <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-3">Belgeniz için Teklif Alın</h3>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Yeminli tercüme, noter onaylı çeviri, apostil süreci ve daha fazlası için belgenizi gönderin; net teklif alırsınız.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/teklif" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition no-underline">
            <FileText className="w-5 h-5" /> Teklif Al
          </a>
          <a href="https://wa.me/905386295040" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-semibold hover:opacity-90 transition no-underline">
            <MessageCircle className="w-5 h-5" /> WhatsApp ile İletişim
          </a>
        </div>
      </div>
    </div>
  )
}

function BlogNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition no-underline">
          <ArrowLeft className="w-5 h-5" /> Blog
        </a>
        <div className="hidden md:flex gap-8">
          <a href="/fiyatlar" className="text-foreground hover:text-primary transition no-underline">Fiyatlar</a>
          <a href="/blog" className="text-foreground hover:text-primary transition no-underline">Blog</a>
          <a href="/hakkimizda" className="text-foreground hover:text-primary transition no-underline">Hakkımda</a>
          <a href="/teklif" className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition no-underline">Teklif Al</a>
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none z-60" onClick={() => setMobileOpen(!mobileOpen)}>
          <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}></span>
        </button>
        {mobileOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)}></div>
            <div className="fixed top-0 right-0 w-72 h-full bg-background z-50 shadow-2xl p-8 pt-24 flex flex-col gap-2 md:hidden">
              <a href="/fiyatlar" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Fiyatlar</a>
              <a href="/blog" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Blog</a>
              <a href="/hakkimizda" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Hakkımda</a>
              <a href="/teklif" className="block px-4 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Teklif Al</a>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

interface BlogLayoutProps {
  title: string
  description: string
  canonical: string
  date: string
  illustration: IllustrationKey
  ogType?: string
  jsonLd?: string
  children: ReactNode
}

export default function BlogLayout({ title, description, canonical, date, illustration, ogType = "article", jsonLd, children }: BlogLayoutProps) {
  const illust = illustrations[illustration]

  useEffect(() => {
    document.title = title
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = document.createElement('meta'); m.setAttribute('name','description'); document.head.appendChild(m) }
    m.setAttribute('content', description)
    let l = document.querySelector('link[rel="canonical"]')
    if (!l) { l = document.createElement('link'); l.setAttribute('rel','canonical'); document.head.appendChild(l) }
    l.setAttribute('href', canonical)
    for (const [prop, content] of [['og:title',title],['og:description',description],['og:url',canonical],['og:type',ogType],['og:locale','tr_TR']]) {
      let e = document.querySelector('meta[property="'+prop+'"]')
      if (!e) { e = document.createElement('meta'); e.setAttribute('property',prop); document.head.appendChild(e) }
      e.setAttribute('content', content)
    }
    let j = document.querySelector('script[data-blog-jsonld]')
    if (jsonLd) {
      if (!j) { j = document.createElement('script'); j.type='application/ld+json'; j.setAttribute('data-blog-jsonld',''); document.head.appendChild(j) }
      j.textContent = jsonLd
    } else if (j) { j.remove() }
  }, [title, description, canonical, ogType, jsonLd])

  return (
    <div className="min-h-screen bg-background">
      <BlogNav />
      <div className={`bg-gradient-to-br ${illust.gradient} border-b border-border`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="py-12 md:py-16 flex flex-col items-center text-center">
            <div className="w-48 h-28 md:w-64 md:h-36 text-primary/70 mb-6">{illust.svg}</div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-3 leading-tight max-w-3xl">{title.split(" | ")[0]}</h1>
            <p className="text-muted-foreground text-lg">{date} . Mazzgord Çeviri Hizmetleri · Denizli</p>
          </div>
        </div>
      </div>
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">{children}</div>
        <BlogCTA />
      </article>
    </div>
  )
}
