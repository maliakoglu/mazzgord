import { lazy, Suspense } from "react";
const Toaster = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
const TooltipProvider = lazy(() => import("@/components/ui/tooltip").then(m => ({ default: m.TooltipProvider })));
import { blogRegistry } from "@/data/blogRegistry";
const NotFound = lazy(() => import("@/pages/NotFound"));
const Admin = lazy(() => import("@/pages/Admin"));
const TeklifFormu = lazy(() => import("@/pages/TeklifFormu"));
const Odeme = lazy(() => import("@/pages/Odeme"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const About = lazy(() => import("@/pages/About"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const SSS = lazy(() => import("@/pages/SSS"));
const Fiyatlar = lazy(() => import("@/pages/Fiyatlar"));
const Hizmetler = lazy(() => import("@/pages/Hizmetler"));
const SiparisTakip = lazy(() => import("@/pages/SiparisTakip"));
const Iletisim = lazy(() => import("@/pages/Iletisim"));
const Giris = lazy(() => import("@/pages/Giris"));
const Hesabim = lazy(() => import("@/pages/Hesabim"));
const YeminliTercume = lazy(() => import("@/pages/YeminliTercume"));
const TeknikCeviri = lazy(() => import("@/pages/TeknikCeviri"));
const AkademikCeviri = lazy(() => import("@/pages/AkademikCeviri"));
const VizeCeviri = lazy(() => import("@/pages/VizeCeviri"));
const IngilizceTurkceCeviri = lazy(() => import("@/pages/IngilizceTurkceCeviri"));
const PasaportCeviri = lazy(() => import("@/pages/PasaportCeviri"));
const DiplomaCeviri = lazy(() => import("@/pages/DiplomaCeviri"));
const Blog = lazy(() => import("@/pages/Blog"));
const ChatWidget = lazy(() => import("@/components/ChatWidget"));
import { Route, Switch, useParams, useLocation } from "wouter";
import MobileStickyCTA from "@/components/home/MobileStickyCTA";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
const Home = lazy(() => import("./pages/Home"));

// Dinamik blog route — registry'den slug'a göre component seç
function BlogRoute() {
  const { slug } = useParams();
  const Component = blogRegistry[slug as keyof typeof blogRegistry];
  if (!Component) return <NotFound />;
  return <Component />;
}

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
    <Switch>
      <Route path={"/admin"} component={Admin} />
      <Route path={"/odeme"} component={Odeme} />
      <Route path={"/odeme/sonuc"} component={Odeme} />
      <Route path={"/teklif"} component={TeklifFormu} />
      <Route path={"/"} component={Home} />
      <Route path={"/gizlilik"} component={Privacy} />
      <Route path={"/kullanim-kosullari"} component={Terms} />
      <Route path={"/hakkimizda"} component={About} />
      <Route path={"/cerez-politikasi"} component={CookiePolicy} />
      <Route path={"/sss"} component={SSS} />
      <Route path={"/fiyatlar"} component={Fiyatlar} />
      <Route path={"/hizmetler"} component={Hizmetler} />
      <Route path={"/siparis"} component={SiparisTakip} />
      <Route path={"/iletisim"} component={Iletisim} />
      <Route path={"/giris"} component={Giris} />
      <Route path={"/hesabim"} component={Hesabim} />
      <Route path={"/yeminli-tercume"} component={YeminliTercume} />
      <Route path={"/teknik-ceviri"} component={TeknikCeviri} />
      <Route path={"/akademik-ceviri"} component={AkademikCeviri} />
      <Route path={"/vize-ceviri"} component={VizeCeviri} />
      <Route path={"/ingilizce-turkce-ceviri"} component={IngilizceTurkceCeviri} />
      <Route path={"/pasaport-ceviri"} component={PasaportCeviri} />
      <Route path={"/diploma-ceviri"} component={DiplomaCeviri} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogRoute} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <Suspense fallback={null}><ChatWidget /></Suspense>
            <MobileStickyCTA />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
