import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import About from "@/pages/About";
import CookiePolicy from "@/pages/CookiePolicy";
import YeminliTercume from "@/pages/YeminliTercume";
import TeknikCeviri from "@/pages/TeknikCeviri";
import AkademikCeviri from "@/pages/AkademikCeviri";
import VizeCeviri from "@/pages/VizeCeviri";
import IngilizceTurkceCeviri from "@/pages/IngilizceTurkceCeviri";
import Blog from "@/pages/Blog";
import BlogYeminliTercume from "@/pages/BlogYeminliTercume";
import BlogVizeCeviri from "@/pages/BlogVizeCeviri";
import BlogTeknikCeviri from "@/pages/BlogTeknikCeviri";
import BlogCeviriIpuclari from "@/pages/BlogCeviriIpuclari";
import BlogCeviriSektoru from "@/pages/BlogCeviriSektoru";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/gizlilik"} component={Privacy} />
      <Route path={"/kullanim-kosullari"} component={Terms} />
      <Route path={"/hakkimizda"} component={About} />
      <Route path={"/cerez-politikasi"} component={CookiePolicy} />
      <Route path={"/yeminli-tercume"} component={YeminliTercume} />
      <Route path={"/teknik-ceviri"} component={TeknikCeviri} />
      <Route path={"/akademik-ceviri"} component={AkademikCeviri} />
      <Route path={"/vize-ceviri"} component={VizeCeviri} />
      <Route path={"/ingilizce-turkce-ceviri"} component={IngilizceTurkceCeviri} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/yeminli-tercume"} component={BlogYeminliTercume} />
      <Route path={"/blog/vize-ceviri"} component={BlogVizeCeviri} />
      <Route path={"/blog/teknik-ceviri"} component={BlogTeknikCeviri} />
      <Route path={"/blog/ceviri-ipuclari"} component={BlogCeviriIpuclari} />
      <Route path={"/blog/ceviri-sektoru"} component={BlogCeviriSektoru} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
