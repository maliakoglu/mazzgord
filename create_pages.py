#!/usr/bin/env python3
import os

NAV = '''      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Ana Sayfa</a>
          <div className="hidden md:flex gap-8">
            <a href="/fiyatlar" className="text-foreground hover:text-primary transition">Fiyatlar</a>
            <a href="/blog" className="text-foreground hover:text-primary transition">Blog</a>
            <a href="/hakkimizda" className="text-foreground hover:text-primary transition">Hakkımda</a>
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
      </nav>'''

def make_other_services(current_href):
    services = [
        ("/yeminli-tercume", "Yeminli Tercüme"),
        ("/ingilizce-turkce-ceviri", "İngilizce-Türkçe Çeviri"),
        ("/pasaport-ceviri", "Pasaport Çevirisi"),
        ("/diploma-ceviri", "Diploma Çevirisi"),
        ("/transkript-ceviri", "Transkript Çevirisi"),
        ("/vize-ceviri", "Vize Çevirisi"),
        ("/teknik-ceviri", "Teknik Çeviri"),
        ("/akademik-ceviri", "Akademik Çeviri"),
        ("/acil-tercume", "Acil Tercüme"),
        ("/fiyatlar", "Çeviri Fiyatları"),
        ("/teklif", "Teklif Al"),
    ]
    html = '<h2 className="text-2xl font-bold text-primary mb-6">Diğer Hizmetler</h2><div className="grid md:grid-cols-2 gap-4">'
    for href, title in services:
        if href != current_href:
            html += '<a href="' + href + '" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">' + title + '</a>'
    html += '</div></div>'
    return html

def make_page(p):
    features = ""
    for icon, title, desc in p['features']:
        features += '<div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><' + icon + ' className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">' + title + '</h3><p className="text-muted-foreground text-sm">' + desc + '</p></div></div>'

    what_is = '<div className="bg-secondary/30 rounded-xl p-8 mb-8"><h2 className="text-2xl font-bold text-primary mb-4">' + p['what_is_title'] + '</h2>'
    for para in p['what_is_paras']:
        what_is += '<p className="text-muted-foreground leading-relaxed mb-4">' + para + '</p>'
    what_is += '</div>'

    where_used = '<div className="bg-secondary/30 rounded-xl p-8 mb-8"><h2 className="text-2xl font-bold text-primary mb-4">' + p['where_used_title'] + '</h2><div className="grid md:grid-cols-2 gap-4">'
    for item in p['where_used_items']:
        where_used += '<div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">' + item + '</span></div>'
    where_used += '</div></div>'

    process = '<div className="mb-8"><h2 className="text-2xl font-bold text-primary mb-6">' + p['process_title'] + '</h2><div className="space-y-4">'
    for i, (title, desc) in enumerate(p['process_steps'], 1):
        process += '<div className="flex gap-4 p-5 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">' + str(i) + '</div><div><h3 className="text-lg font-semibold text-primary mb-2">' + title + '</h3><p className="text-muted-foreground">' + desc + '</p></div></div>'
    process += '</div></div>'

    pricing = '<div className="bg-secondary/30 rounded-xl p-8 mb-8"><h2 className="text-2xl font-bold text-primary mb-4">' + p['pricing_title'] + '</h2>'
    for para in p['pricing_paras']:
        pricing += '<p className="text-muted-foreground leading-relaxed mb-4">' + para + '</p>'
    pricing += '</div>'

    faq = '<div className="mb-8"><h2 className="text-2xl font-bold text-primary mb-6">Sıkça Sorulan Sorular</h2><div className="space-y-4">'
    for q, a in p['faq']:
        faq += '<div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">' + q + '</h3><p className="text-muted-foreground">' + a + '</p></div>'
    faq += '</div></div>'

    related = '<div className="mb-8"><h2 className="text-2xl font-bold text-primary mb-6">İlgili Blog Yazıları</h2><div className="grid md:grid-cols-2 gap-4 mb-8">'
    for href, title in p['related_blogs']:
        related += '<a href="' + href + '" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">' + title + '</a>'
    related += '</div>'

    other = make_other_services(p['href'])

    cta = '<div className="bg-primary text-primary-foreground rounded-xl p-8 text-center"><h2 className="text-2xl font-bold mb-4">' + p['cta_title'] + '</h2><p className="mb-6 opacity-90">' + p['cta_desc'] + '</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Alın</a><a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp ile Ulaşın</a></div></div>'

    template = '''import { ArrowLeft, CheckCircle2, Shield, Clock, Globe, Zap, Lock } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { useState } from "react";
export default function __COMPONENT__() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
__NAV__
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Breadcrumb items={[{label: "Hizmetler", href: "/hizmetler"}, {label: "__BREADCRUMB__"}]} />
        <h1 className="text-4xl font-bold text-primary mb-4">__H1__</h1>
        <p className="text-xl text-muted-foreground mb-8">__DESC__</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
__FEATURES__
        </div>
__WHAT_IS__
__WHERE_USED__
__PROCESS__
__PRICING__
__FAQ__
__RELATED__
__OTHER__
__CTA__
      </div>
    </div>
  );
}'''

    replacements = {
        '__COMPONENT__': p['component'],
        '__BREADCRUMB__': p['breadcrumb_label'],
        '__H1__': p['h1'],
        '__DESC__': p['desc'],
        '__FEATURES__': features,
        '__WHAT_IS__': what_is,
        '__WHERE_USED__': where_used,
        '__PROCESS__': process,
        '__PRICING__': pricing,
        '__FAQ__': faq,
        '__RELATED__': related,
        '__OTHER__': other,
        '__CTA__': cta,
        '__NAV__': NAV,
    }
    for old, new in replacements.items():
        template = template.replace(old, new)
    return template

# ---- Page definitions ----

pages = [
    {
        "filename": "TranskriptCeviri.tsx",
        "component": "TranskriptCeviri",
        "href": "/transkript-ceviri",
        "breadcrumb_label": "Transkript Çevirisi",
        "h1": "Transkript Çevirisi | İngilizce-Türkçe Yeminli Tercüme",
        "desc": "Transkriptinizin yeminli tercüman tarafından İngilizce veya Türkçe'ye çevirisi. Yurt dışı eğitim başvuruları için hızlı, güvenilir ve doğru çeviri hizmeti.",
        "features": [
            ("Shield", "Resmi Geçerlilik", "Yeminli tercüman imzası yurt dışı üniversiteler ve kurumlarda kabul edilir; başvuru yapacağınız kurumun güncel şartlarını kontrol etmeniz gerekir."),
            ("Clock", "Aynı Gün Teslimat", "Transkript çevirisi genellikle aynı gün içinde tamamlanır."),
            ("Globe", "İngilizce-Türkçe", "İngilizce-Türkçe dil çiftinde uzman yeminli tercüme."),
        ],
        "what_is_title": "Transkript Çevirisi Nedir?",
        "what_is_paras": [
            "Transkript çevirisi, üniversite transkriptinizdeki ders adları, notlar, kredi saatleri ve akademik bilgilerin yeminli tercüman tarafından İngilizce'ye veya Türkçe'ye çevrilmesidir. Bu çeviri, yeminli tercüman tarafından imzalanır ve kaşelenir.",
            "Transkript çevirisi, özellikle yurt dışı üniversite başvurularında, master ve PhD başvurularında, denklik işlemlerinde ve akademik başvurularda talep edilir. Yanlış çeviri, başvuru sürecinizin gecikmesine veya reddedilmesine neden olabilir.",
            "İngilizce-Türkçe dil çiftinde transkript çevirisi yapıyorum. Transkriptinizdeki tüm akademik bilgileri eksiksiz ve doğru şekilde çevirip imzalıyor ve kaşeliyorum.",
        ],
        "where_used_title": "Transkript Çevirisi Nerede Kullanılır?",
        "where_used_items": [
            "Yurt dışı üniversite başvuruları",
            "Master ve PhD başvuruları",
            "Erasmus ve değişim programları",
            "Diploma denklik işlemleri",
            "Akademik iş başvuruları",
            "Burs başvuruları",
        ],
        "process_title": "Transkript Çevirisi Süreci: Adım Adım",
        "process_steps": [
            ("Transkripti Gönderin", "Transkriptinizin fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden iletin. Tüm sayfaların net görünmesi gerekir."),
            ("Fiyat Teklifi", "Transkript çevirisi için belgeyi inceleyip net teklif veririm. Teklifi onayladığınızda çeviri süreci başlar."),
            ("Çeviri ve İmza", "Transkriptinizdeki tüm ders adları, notlar ve akademik bilgileri çevirir, imzalar ve kaşelerim. Çeviri resmi belge niteliği kazanır."),
            ("Teslim", "Çevrilmiş transkriptiniz dijital (PDF) olarak veya kargo/kurye ile adresinize teslim edilir. Belgeniz başvurular için hazırdır."),
        ],
        "pricing_title": "Transkript Çevirisi Fiyatları",
        "pricing_paras": [
            "Transkript çevirisi için belgeyi inceleyip net teklif veririm. Sayfa sayısı ve içerik yoğunluğu fiyatı belirler. Noter onayı gerektiğinde, gerçek noter bedeli makbuzla teyit edilir ve işlem/takip bedeli ayrı kalemdir.",
            "Net teklif için transkriptinizin fotoğrafını WhatsApp'tan gönderin. Belge türünü, noter ve apostil ihtiyacını inceleyip dönüş yapıyorum.",
        ],
        "faq": [
            ("Transkript çevirisi nedir ve ne için gerekir?", "Transkript çevirisi, üniversite transkriptinizdeki akademik bilgilerin yeminli tercüman tarafından İngilizce'ye veya Türkçe'ye çevrilmesidir. Yurt dışı eğitim başvuruları, denklik işlemleri ve akademik başvurularda istenir."),
            ("Transkript çevirisi yeminli tercüman tarafından mı yapılmalıdır?", "Evet, yurt dışı üniversiteler ve kurumlar transkript çevirisinin yeminli tercüman tarafından yapılmasını ve imzalanmasını ister. Yeminli tercüman imzası, çevirinin doğru ve eksiksiz olduğunu taahhüt eder."),
            ("Transkript çevirisi ne kadar sürer?", "Transkript çevirisi genellikle aynı gün veya 1 iş günü içinde tamamlanır. Sayfa sayısı fazla ise süre uzayabilir."),
            ("Transkript çevirisi için noter onayı gerekir mi?", "Çoğu durumda yeminli tercüman imzası yeterlidir. Ancak bazı ülkeler ve kurumlar noter onayını şart koşabilir. Başvuru yapacağınız kuruma danışmanızı öneririm."),
            ("Transkript çevirisi ücreti ne kadar?", "Transkript çevirisi ücreti belge görülerek belirlenir. Belgenizin fotoğrafını WhatsApp'tan gönderin; net teklif alırsınız."),
        ],
        "related_blogs": [
            ("/blog/akademik-ceviri", "Akademik Çeviri Rehberi"),
            ("/blog/yeminli-tercume", "Yeminli Tercüme Süreci"),
            ("/blog/vize-formatlari", "Vize Çeviri Formatları Rehberi"),
        ],
        "cta_title": "Transkript Çevirisi Teklifi Alın",
        "cta_desc": "Transkriptinizin fotoğrafını gönderin, net teklif alın.",
    },
    {
        "filename": "AdliSicilCevirisi.tsx",
        "component": "AdliSicilCevirisi",
        "href": "/adli-sicil-cevirisi",
        "breadcrumb_label": "Adli Sicil Çevirisi",
        "h1": "Adli Sicil Çevirisi | İngilizce-Türkçe Yeminli Tercüme",
        "desc": "Adli sicil belgenizin yeminli tercüman tarafından İngilizce veya Türkçe'ye çevirisi. Vize, göçmenlik ve iş başvuruları için hızlı ve güvenilir çeviri hizmeti.",
        "features": [
            ("Shield", "Resmi Geçerlilik", "Yeminli tercüman imzası vize başvurularında ve resmi kurumlarda kabul edilir; başvuru yapacağınız kurumun güncel şartlarını kontrol etmeniz gerekir."),
            ("Clock", "Hızlı Teslimat", "Adli sicil çevirisi genellikle aynı gün içinde tamamlanır."),
            ("Lock", "Gizlilik", "Adli sicil belgeniz gizlilik ilkelerine uygun olarak işlenir ve teslim sonrası güvenli şekilde silinir."),
        ],
        "what_is_title": "Adli Sicil Çevirisi Nedir?",
        "what_is_paras": [
            "Adli sicil çevirisi, adli sicil belgenizdeki bilgilerin yeminli tercüman tarafından İngilizce'ye veya Türkçe'ye çevrilmesidir. Bu çeviri, yeminli tercüman tarafından imzalanır ve kaşelenir.",
            "Adli sicil çevirisi, özellikle vize başvurularında, göçmenlik dosyalarında, uluslararası iş başvurularında ve evlat edinme süreçlerinde talep edilir. Yanlış çeviri, başvuru sürecinizin gecikmesine veya reddedilmesine neden olabilir.",
            "İngilizce-Türkçe dil çiftinde adli sicil çevirisi yapıyorum. Belgenizdeki tüm bilgileri eksiksiz ve doğru şekilde çevirip imzalıyor ve kaşeliyorum.",
        ],
        "where_used_title": "Adli Sicil Çevirisi Nerede Kullanılır?",
        "where_used_items": [
            "Vize başvuruları",
            "Göçmenlik dosyaları (USCIS vb.)",
            "Uluslararası iş başvuruları",
            "Uluslararası evlilik işlemleri",
            "Evlat edinme süreçleri",
            "Konsolosluk işlemleri",
        ],
        "process_title": "Adli Sicil Çevirisi Süreci: Adım Adım",
        "process_steps": [
            ("Belgeyi Gönderin", "Adli sicil belgenizin fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden iletin. Belgenin net görünmesi gerekir."),
            ("Fiyat Teklifi", "Adli sicil çevirisi için belgeyi inceleyip net teklif veririm. Teklifi onayladığınızda çeviri süreci başlar."),
            ("Çeviri ve İmza", "Belgenizdeki tüm bilgileri çevirir, imzalar ve kaşelerim. Çeviri resmi belge niteliği kazanır."),
            ("Teslim", "Çevrilmiş belgeniz dijital (PDF) olarak veya kargo/kurye ile adresinize teslim edilir. Belgeniz resmi başvurular için hazırdır."),
        ],
        "pricing_title": "Adli Sicil Çevirisi Fiyatları",
        "pricing_paras": [
            "Adli sicil çevirisi için belgeyi inceleyip net teklif veririm. İngilizce-Türkçe veya Türkçe-İngilizce için ücret aynıdır. Noter onayı gerektiğinde, gerçek noter bedeli makbuzla teyit edilir ve işlem/takip bedeli ayrı kalemdir.",
            "Net teklif için belgenizin fotoğrafını WhatsApp'tan gönderin. Belge türünü, noter ve apostil ihtiyacını inceleyip dönüş yapıyorum.",
        ],
        "faq": [
            ("Adli sicil çevirisi nedir ve ne için gerekir?", "Adli sicil çevirisi, adli sicil belgenizdeki bilgilerin yeminli tercüman tarafından İngilizce'ye veya Türkçe'ye çevrilmesidir. Vize başvuruları, göçmenlik dosyaları ve uluslararası işlemlerde istenir."),
            ("Adli sicil çevirisi yeminli tercüman tarafından mı yapılmalıdır?", "Evet, resmi kurumlar adli sicil çevirisinin yeminli tercüman tarafından yapılmasını ve imzalanmasını ister. Yeminli tercüman imzası, çevirinin doğru ve eksiksiz olduğunu taahhüt eder."),
            ("Adli sicil çevirisi ne kadar sürer?", "Adli sicil çevirisi genellikle aynı gün veya 1 iş günü içinde tamamlanır."),
            ("Adli sicil çevirisi için noter onayı gerekir mi?", "Çoğu durumda yeminli tercüman imzası yeterlidir. Ancak bazı ülkeler ve kurumlar noter onayını şart koşabilir. Başvuru yapacağınız kuruma danışmanızı öneririm."),
            ("Adli sicil çevirisi ücreti ne kadar?", "Adli sicil çevirisi ücreti belge görülerek belirlenir. Belgenizin fotoğrafını WhatsApp'tan gönderin; net teklif alırsınız."),
        ],
        "related_blogs": [
            ("/blog/yeminli-tercume", "Yeminli Tercüme Süreci"),
            ("/blog/vize-formatlari", "Vize Çeviri Formatları Rehberi"),
            ("/blog/noter-onayli-ceviri", "Noter Onaylı Çeviri Rehberi"),
        ],
        "cta_title": "Adli Sicil Çevirisi Teklifi Alın",
        "cta_desc": "Belgenizin fotoğrafını gönderin, net teklif alın.",
    },
    {
        "filename": "NufusKayitOrnegiCevirisi.tsx",
        "component": "NufusKayitOrnegiCevirisi",
        "href": "/nufus-kayit-ornegi-cevirisi",
        "breadcrumb_label": "Nüfus Kayıt Örneği Çevirisi",
        "h1": "Nüfus Kayıt Örneği Çevirisi | İngilizce-Türkçe Yeminli Tercüme",
        "desc": "Nüfus kayıt örneğinizin yeminli tercüman tarafından İngilizce veya Türkçe'ye çevirisi. Vize, konsolosluk ve resmi işlemler için hızlı ve doğru çeviri hizmeti.",
        "features": [
            ("Shield", "Resmi Geçerlilik", "Yeminli tercüman imzası konsolosluklarda ve resmi kurumlarda kabul edilir; başvuru yapacağınız kurumun güncel şartlarını kontrol etmeniz gerekir."),
            ("Clock", "Hızlı Teslimat", "Nüfus kayıt örneği çevirisi genellikle aynı gün içinde tamamlanır."),
            ("Globe", "İngilizce-Türkçe", "İngilizce-Türkçe dil çiftinde uzman yeminli tercüme."),
        ],
        "what_is_title": "Nüfus Kayıt Örneği Çevirisi Nedir?",
        "what_is_paras": [
            "Nüfus kayıt örneği çevirisi, nüfus kayıt örneğinizdeki kişisel bilgilerin — ad, soyad, doğum tarihi, doğum yeri, ana-baba adları, medeni durum gibi — yeminli tercüman tarafından İngilizce'ye veya Türkçe'ye çevrilmesidir. Bu çeviri, yeminli tercüman tarafından imzalanır ve kaşelenir.",
            "Nüfus kayıt örneği çevirisi, özellikle vize başvurularında, konsolosluk işlemlerinde, uluslararası evlilik işlemlerinde, miras ve mülk devirlerinde talep edilir.",
            "İngilizce-Türkçe dil çiftinde nüfus kayıt örneği çevirisi yapıyorum. Belgenizdeki tüm bilgileri eksiksiz ve doğru şekilde çevirip imzalıyor ve kaşeliyorum.",
        ],
        "where_used_title": "Nüfus Kayıt Örneği Çevirisi Nerede Kullanılır?",
        "where_used_items": [
            "Vize başvuruları",
            "Konsolosluk işlemleri",
            "Göçmenlik dosyaları",
            "Uluslararası evlilik işlemleri",
            "Miras ve mülk devri",
            "Aile birleşimi başvuruları",
        ],
        "process_title": "Nüfus Kayıt Örneği Çevirisi Süreci: Adım Adım",
        "process_steps": [
            ("Belgeyi Gönderin", "Nüfus kayıt örneğinizin fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden iletin. Belgenin net görünmesi gerekir."),
            ("Fiyat Teklifi", "Belgeyi inceleyip net teklif veririm. Teklifi onayladığınızda çeviri süreci başlar."),
            ("Çeviri ve İmza", "Belgenizdeki tüm bilgileri çevirir, imzalar ve kaşelerim. Çeviri resmi belge niteliği kazanır."),
            ("Teslim", "Çevrilmiş belgeniz dijital (PDF) olarak veya kargo/kurye ile adresinize teslim edilir. Belgeniz resmi başvurular için hazırdır."),
        ],
        "pricing_title": "Nüfus Kayıt Örneği Çevirisi Fiyatları",
        "pricing_paras": [
            "Nüfus kayıt örneği çevirisi için belgeyi inceleyip net teklif veririm. İngilizce-Türkçe veya Türkçe-İngilizce için ücret aynıdır. Noter onayı gerektiğinde, gerçek noter bedeli makbuzla teyit edilir ve işlem/takip bedeli ayrı kalemdir.",
            "Net teklif için belgenizin fotoğrafını WhatsApp'tan gönderin. Belge türünü, noter ve apostil ihtiyacını inceleyip dönüş yapıyorum.",
        ],
        "faq": [
            ("Nüfus kayıt örneği çevirisi nedir?", "Nüfus kayıt örneği çevirisi, belgenizdeki kişisel bilgilerin yeminli tercüman tarafından İngilizce'ye veya Türkçe'ye çevrilmesidir. Vize, konsolosluk ve resmi işlemlerde istenir."),
            ("Nüfus kayıt örneği çevirisi yeminli tercüman tarafından mı yapılmalıdır?", "Evet, resmi kurumlar çevirinin yeminli tercüman tarafından yapılmasını ve imzalanmasını ister. Yeminli tercüman imzası, çevirinin doğru ve eksiksiz olduğunu taahhüt eder."),
            ("Nüfus kayıt örneği çevirisi ne kadar sürer?", "Nüfus kayıt örneği çevirisi genellikle aynı gün veya 1 iş günü içinde tamamlanır."),
            ("Nüfus kayıt örneği çevirisi için noter onayı gerekir mi?", "Çoğu durumda yeminli tercüman imzası yeterlidir. Bazı ülkeler ve kurumlar noter onayını veya apostil şart koşabilir. Başvuru yapacağınız kuruma danışmanızı öneririm."),
            ("Nüfus kayıt örneği çevirisi ücreti ne kadar?", "Nüfus kayıt örneği çevirisi ücreti belge görülerek belirlenir. Belgenizin fotoğrafını WhatsApp'tan gönderin; net teklif alırsınız."),
        ],
        "related_blogs": [
            ("/blog/yeminli-tercume", "Yeminli Tercüme Süreci"),
            ("/blog/vize-formatlari", "Vize Çeviri Formatları Rehberi"),
            ("/blog/noter-onayli-ceviri", "Noter Onaylı Çeviri Rehberi"),
        ],
        "cta_title": "Nüfus Kayıt Örneği Çevirisi Teklifi Alın",
        "cta_desc": "Belgenizin fotoğrafını gönderin, net teklif alın.",
    },
    {
        "filename": "AcilTercume.tsx",
        "component": "AcilTercume",
        "href": "/acil-tercume",
        "breadcrumb_label": "Acil Tercüme",
        "h1": "Acil Tercüme | Hızlı İngilizce-Türkçe Yeminli Çeviri",
        "desc": "Acil çeviri ihtiyacınız için aynı gün teslimat. Belgenizi gönderin, öncelikli olarak çevirip teslim edeyim.",
        "features": [
            ("Zap", "Aynı Gün Teslimat", "Acil taleplerde belgenizi aynı gün içinde teslim ederim."),
            ("Clock", "Öncelikli İşlem", "Acil çeviriler öncelikli sıraya alınır, bekleme süresini kısaltır."),
            ("Globe", "İngilizce-Türkçe", "İngilizce-Türkçe dil çiftinde uzman yeminli tercüme."),
        ],
        "what_is_title": "Acil Tercüme Nedir?",
        "what_is_paras": [
            "Acil tercüme, normal teslim süresinden daha kısa sürede tamamlanması gereken çeviri talepleridir. Vize başvurusu son günü, konsolosluk randevusu, mahkeme dosyası veya acil iş başvurusu gibi durumlarda ihtiyaç duyulur.",
            "Acil çevirilerde belgenizi öncelikli olarak işler ve aynı gün içinde teslim ederim. Çeviri kalitesinden ödün vermeden hızlı teslimat sağlarım.",
            "İngilizce-Türkçe dil çiftinde acil yeminli tercüme yapıyorum. Belgenizi gönderin, durumunuzu açıklayın; en kısa sürede dönüş yapayım.",
        ],
        "where_used_title": "Acil Tercüme Ne Zaman Gerekir?",
        "where_used_items": [
            "Vize başvurusu son günü",
            "Konsolosluk randevusu yaklaştığında",
            "Acil iş başvurusu",
            "Mahkeme dosyası teslim süresi",
            "Acil denklik başvurusu",
            "Son dakika belge teslimi",
        ],
        "process_title": "Acil Tercüme Süreci: Adım Adım",
        "process_steps": [
            ("Belgeyi Gönderin", "Belgenizin fotoğrafını WhatsApp'tan gönderin ve acil durumunuzu açıklayın. Mümkün olan en kısa süreyi belirtirim."),
            ("Hızlı Teklif", "Belgeyi inceleyip hemen teklif veririm. Onayladığınızda çeviri hemen başlar."),
            ("Öncelikli Çeviri", "Belgenizi öncelikli sıraya alır, aynı gün içinde çevirir, imzalar ve kaşelerim."),
            ("Hızlı Teslim", "Çevrilmiş belgenizi dijital (PDF) olarak aynı gün içinde teslim ederim. Kargo gerekiyorsa en hızlı seçeneği kullanırım."),
        ],
        "pricing_title": "Acil Tercüme Fiyatları",
        "pricing_paras": [
            "Acil tercüme fiyatı, normal çeviri ücretine %30-50 acil işlem ek ücreti eklenerek belirlenir. Belge türü ve teslim süresi fiyatı etkiler. Noter onayı gerektiğinde, gerçek noter bedeli makbuzla teyit edilir.",
            "Net teklif için belgenizin fotoğrafını WhatsApp'tan gönderin ve acil durumunuzu açıklayın. Hemen dönüş yapıyorum.",
        ],
        "faq": [
            ("Acil tercüme nedir?", "Acil tercüme, normal süreden daha kısa sürede tamamlanması gereken çeviri talebidir. Vize son günü, konsolosluk randevusu veya acil iş başvurusu gibi durumlarda ihtiyaç duyulur."),
            ("Acil çeviri aynı gün teslim edilir mi?", "Evet, çoğu durumda aynı gün içinde teslim edilir. Belgenizi gönderin, durumunuzu açıklayın; en kısa süreyi belirtirim."),
            ("Acil tercüme fiyatı normalden farklı mıdır?", "Evet, acil taleplerde %30-50 arası acil işlem ek ücreti uygulanır. Belge türü ve teslim süresi fiyatı belirler."),
            ("Hangi belgeler için acil tercüme yapabilirsiniz?", "Pasaport, diploma, transkript, vize belgeleri, adli sicil, nüfus kayıt örneği ve diğer resmi belgeler için acil çeviri yapabilirim."),
            ("Acil tercüme için nasıl başvururum?", "Belgenizin fotoğrafını WhatsApp'tan gönderin ve acil durumunuzu açıklayın. Hemen teklif veririm ve onayladığınızda çeviri başlar."),
        ],
        "related_blogs": [
            ("/blog/yeminli-tercume", "Yeminli Tercüme Süreci"),
            ("/blog/yeminli-tercume-fiyatlari-2026", "Yeminli Tercüme Fiyatları 2026"),
            ("/blog/vize-formatlari", "Vize Çeviri Formatları Rehberi"),
        ],
        "cta_title": "Acil Tercüme Teklifi Alın",
        "cta_desc": "Belgenizi gönderin, aynı gün teslimat için hemen dönüş yapayım.",
    },
]

# ---- Create files ----
for p in pages:
    filepath = os.path.join("client/src/pages", p["filename"])
    content = make_page(p)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print("[OK] " + filepath + " (" + str(len(content.splitlines())) + " satir)")

print("\n=== 4 sayfa olusturuldu ===")
