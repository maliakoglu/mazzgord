import { useState } from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Badge, LogoMark, PrimaryButton, SectionTitle } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";

const WA_URL = "https://wa.me/905386295040";

const YEMINLI_BELGELER = [
  "Nüfus cüzdanı çevirisi", "Pasaport çevirisi", "Diploma ve transkript çevirisi",
  "Sabıka kaydı çevirisi", "Evlilik cüzdanı çevirisi", "İkametgâh çevirisi",
  "Sürücü belgesi çevirisi", "Vergi levhası çevirisi", "İmza sirküleri çevirisi",
  "Faaliyet belgesi çevirisi", "Sağlık raporu çevirisi", "Adli sicil kaydı çevirisi",
];

const YEMINLI_SUREC = [
  { title: "Belge Teslimi", desc: "Belgenizin fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden gönderin. Belgenin dili, sayfa sayısı ve teslim süresi belirlenir." },
  { title: "Fiyat Teklifi", desc: "Belgenizi inceledikten sonra net teklif veririm. Teklifi onayladığınızda çeviri süreci başlar." },
  { title: "Çeviri ve İmza", desc: "Belgenizi çevirir, imzalar ve kaşelerim. Bu adım belgenin yeminli çeviri olarak geçerlilik kazanmasını sağlar." },
  { title: "Teslim", desc: "Yeminli çeviri belgeniz dijital olarak veya kargo/kurye ile adresinize teslim edilir. Belge resmi kurumlarda kullanılmaya hazırdır." },
];

const YEMINLI_FAQ = [
  { q: "Yeminli tercüme nedir?", a: "Yeminli tercüme, yeminli tercümanlar tarafından yapılan ve resmi belge niteliği taşıyan çeviri işlemidir. Yeminli tercüman, çevirisinin doğru ve eksiksiz olduğunu taahhüt eder. Bu çeviriler mahkemeler, konsolosluklar, üniversiteler ve diğer resmi kurumlar tarafından kabul edilir." },
  { q: "Yeminli tercüme için noter onayı gerekir mi?", a: "Çoğu durumda yeminli tercüman imzası yeterlidir, noter onayı gerekmez. Ancak bazı kurumlar ve ülkeler noter onayını şart koşabilir. Belgenizi sunacağınız kuruma danışmanızı öneririz." },
  { q: "Yeminli tercüme ne kadar sürer?", a: "Standart belgeler için çeviri 1-3 iş günü içinde tamamlanır. Acil taleplerde aynı gün teslimat mümkündür." },
  { q: "Yeminli tercüme fiyatları nasıl belirlenir?", a: "Fiyat belgenin diline, sayfa/karakter sayısına ve belge türüne göre belirlenir. Belgenizin fotoğrafını WhatsApp'tan gönderin; net teklif alırsınız." },
  { q: "Denizli'de yeminli tercüman nerede bulunur?", a: "Denizli merkezli yeminli tercümanım. Belgenizi online veya WhatsApp üzerinden iletebilir, teslimatınızı dijital veya kargo ile alabilirsiniz." },
];

const INGILIZCE_HIZMETLER = [
  "Yeminli İngilizce-Türkçe çeviri", "Teknik İngilizce-Türkçe çeviri", "Akademik İngilizce-Türkçe çeviri",
  "Vize başvurusu İngilizce çeviri", "Hukuki İngilizce-Türkçe çeviri", "Tıbbi İngilizce-Türkçe çeviri",
  "Web sitesi İngilizce-Türkçe çeviri", "İş İngilizcesi çeviri", "E-posta ve yazışma çevirisi",
  "Sözleşme çevirisi", "Katalog ve broşür çevirisi", "Sunum çevirisi",
];

const INGILIZCE_FAQ = [
  { q: "İngilizce-Türkçe çeviri ne kadar sürer?", a: "Standart belgeler çoğunlukla 1-3 iş günü içinde teslim edilir. Belge yoğunluğu ve teslim tarihi net teklifte belirtilir." },
  { q: "Yeminli tercüme mi, normal çeviri mi gerekiyor?", a: "Resmi belgeler için yeminli tercüme, genel metinler için normal çeviri yeterlidir. Belgenin kullanım amacına göre hangi türün gerektiğini birlikte değerlendiririz." },
  { q: "Fiyat nasıl belirlenir?", a: "Belge türü, sayfa sayısı, metin yoğunluğu, teslim tarihi ve dil çifti fiyatı etkiler. Kesin fiyat belge görüldükten sonra belirlenir." },
  { q: "Online çeviri yapıyor musunuz?", a: "Evet, belgelerinizi WhatsApp veya e-posta ile gönderebilir, dijital teslim alabilirsiniz. Yeminli tercüme gerekiyorsa fiziksel teslim kargo ile yapılır." },
];

const SSS_FAQ = [
  { q: "Belgenin fotoğrafını WhatsApp'tan göndersem yeterli mi?", a: "Evet. Belgenizin net fotoğrafını veya taranmış halini WhatsApp'tan göndermeniz yeterli. Belge türünü, dil yönünü ve noter/apostil ihtiyacını inceleyip net teklif veriyorum." },
  { q: "Noter onayı ne kadar sürer?", a: "Noter onayı genellikle aynı gün tamamlanır. Noter bedeli belge türüne göre değişir; işlem öncesi teyit edilir. Noter bedelini kendim tahsil etmem, makbuz karşılığı gerçek bedeli müşteriye iletirim." },
  { q: "Denizli dışında yaşayanlar için hizmet veriyor musunuz?", a: "Evet. Türkiye'nin her yerinden online hizmet veriyorum. Belgelerinizi dijital olarak gönderirsiniz; çeviri tamamlandığında dijital (PDF) olarak e-posta veya WhatsApp ile teslim edilir. Fiziksel kopya gerektiğinde kargo ile gönderilir." },
  { q: "Apostil ne demek, her belgede gerekir mi?", a: "Apostil, belgenizin yabancı bir ülkede kullanılabilmesi için valilik veya kaymakamlıkça eklenen uluslararası tasdik şerhidir. Her belgede gerekmez; belgenin kullanılacağı ülke ve kuruma göre değişir. Hangi onaya ihtiyaç duyduğunuzu belgeyi inceledikten sonra söylüyorum." },
];

const TABS = [
  { key: "yeminli", label: "Yeminli Tercüme", icon: "verified" as const },
  { key: "ingilizce", label: "İngilizce Çeviri", icon: "translate" as const },
  { key: "sss", label: "S.S.S.", icon: "help-outline" as const },
];

function FAQAccordion({ items, colors }: { items: { q: string; a: string }[]; colors: ReturnType<typeof useColors> }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <View style={{ gap: 10 }}>
      {items.map((item, idx) => (
        <View key={idx} style={{ backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.border, overflow: "hidden" }}>
          <Pressable onPress={() => setOpen(open === idx ? null : idx)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 }}>
            <Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "700", flex: 1, paddingRight: 8 }}>{item.q}</Text>
            <MaterialIcons name={open === idx ? "expand-less" : "expand-more"} size={22} color={colors.muted} />
          </Pressable>
          {open === idx && (
            <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
              <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20 }}>{item.a}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

function InfoCard({ icon, title, desc, colors }: { icon: keyof typeof MaterialIcons.glyphMap; title: string; desc: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={{ flexDirection: "row", gap: 12, padding: 15, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, flex: 1 }}>
      <View style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: "#EFF6FF", alignItems: "center", justifyContent: "center" }}>
        <MaterialIcons name={icon} size={22} color="#2563EB" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 4 }}>{title}</Text>
        <Text style={{ color: colors.muted, fontSize: 12, lineHeight: 17 }}>{desc}</Text>
      </View>
    </View>
  );
}

function SectionCard({ children, colors }: { children: React.ReactNode; colors: ReturnType<typeof useColors> }) {
  return <View style={{ backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 14 }}>{children}</View>;
}

function SectionHeading({ children, colors }: { children: string; colors: ReturnType<typeof useColors> }) {
  return <Text style={{ color: colors.primary, fontSize: 19, fontWeight: "800", marginBottom: 12 }}>{children}</Text>;
}

function CheckItem({ text, colors }: { text: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, padding: 12, backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border }}>
      <MaterialIcons name="check-circle" size={20} color={colors.primary} />
      <Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "600", flex: 1 }}>{text}</Text>
    </View>
  );
}

function StepCard({ num, title, desc, colors }: { num: number; title: string; desc: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={{ flexDirection: "row", gap: 14, padding: 15, backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.border }}>
      <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#fff", fontSize: 17, fontWeight: "900" }}>{num}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.primary, fontSize: 15, fontWeight: "800", marginBottom: 5 }}>{title}</Text>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 19 }}>{desc}</Text>
      </View>
    </View>
  );
}

function CTABox({ colors }: { colors: ReturnType<typeof useColors> }) {
  return (
    <View style={{ backgroundColor: colors.primary, borderRadius: 18, padding: 22, alignItems: "center", marginBottom: 14 }}>
      <Text style={{ color: "#fff", fontSize: 19, fontWeight: "900", marginBottom: 6 }}>Teklif Alın</Text>
      <Text style={{ color: "rgba(255,255,255,0.88)", fontSize: 14, marginBottom: 18 }}>Belgenizi gönderin, net teklif alın.</Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <Pressable onPress={() => router.push("/(tabs)/quote")} style={({ pressed }) => [{ backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 14, paddingHorizontal: 20, paddingVertical: 12 }, pressed && { opacity: 0.8 }]}>
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "800" }}>Teklif Al</Text>
        </Pressable>
        <Pressable onPress={() => Linking.openURL(WA_URL)} style={({ pressed }) => [{ backgroundColor: "#22C55E", borderRadius: 14, paddingHorizontal: 20, paddingVertical: 12, flexDirection: "row", alignItems: "center", gap: 6 }, pressed && { opacity: 0.8 }]}>
          <MaterialIcons name="chat" size={18} color="#fff" />
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "800" }}>WhatsApp</Text>
        </Pressable>
      </View>
    </View>
  );
}

function YeminliTab({ colors }: { colors: ReturnType<typeof useColors> }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
      <Text style={{ color: colors.foreground, fontSize: 26, fontWeight: "900", letterSpacing: -0.7, marginBottom: 8 }}>Denizli Yeminli Tercüman</Text>
      <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 21, marginBottom: 18 }}>Denizli'de profesyonel yeminli tercüme hizmetleri. Resmi belgeleriniz için güvenilir ve doğru çeviri çözümleri.</Text>

      <View style={{ flexDirection: "row", gap: 10, marginBottom: 18 }}>
        <InfoCard icon="verified-user" title="Resmi Geçerlilik" desc="Yeminli tercüman imzam tüm resmi kurumlarda geçerlidir." colors={colors} />
        <InfoCard icon="bolt" title="Hızlı Teslimat" desc="Acil talepleriniz için aynı gün teslimat seçeneği var." colors={colors} />
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 18 }}>
        <InfoCard icon="description" title="Geniş Belge Yelpazesi" desc="Nüfus cüzdanı, diploma, sabıka kaydı ve daha fazlası." colors={colors} />
      </View>

      <SectionCard colors={colors}>
        <SectionHeading colors={colors}>Yeminli Tercüme Nedir?</SectionHeading>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20, marginBottom: 10 }}>Yeminli tercüme, yeminli tercümanlar tarafından yapılan ve noter onayı gerektirmeyen resmi çeviri işlemidir. Yeminli tercüman, yeminname vererek çevirisinin doğru ve eksiksiz olduğunu taahhüt eder. Bu çeviriler, mahkemeler, konsolosluklar, üniversiteler ve diğer resmi kurumlar tarafından kabul edilir.</Text>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20, marginBottom: 10 }}>Türkiye'de yeminli tercümanlık, 6325 sayılı Yeminli Mali Müşavirlik ve Yeminli Tercümanlık Kanunu ile düzenlenmiştir. Yeminli tercümanlar, noter huzurunda yemin ederek bu unvanı alır ve yaptıkları çeviriler resmi belge niteliği taşır.</Text>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20 }}>Yeminli tercüme, özellikle yurt dışı başvurularında, vize işlemlerinde, göçmenlik dosyalarında ve üniversite başvurularında zorunlu bir belgedir. Yanlış veya eksik çeviri, başvurunun reddedilmesine neden olabilir.</Text>
      </SectionCard>

      <SectionTitle title="Yeminli Tercüme Yapılan Belgeler" />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        {YEMINLI_BELGELER.map((item, i) => (
          <View key={i} style={{ width: "48%" }}>
            <CheckItem text={item} colors={colors} />
          </View>
        ))}
      </View>

      <SectionCard colors={colors}>
        <SectionHeading colors={colors}>Denizli'de Yeminli Tercüme</SectionHeading>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20, marginBottom: 10 }}>Denizli merkezli yeminli tercüme hizmeti veriyorum. Denizli Adliyesi, Denizli Valiliği, Pamukkale Üniversitesi ve diğer kurumlar tarafından kabul edilen yeminli tercümelerle resmi işlemlerinizi sorunsuz tamamlayabilirsiniz.</Text>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20 }}>WhatsApp üzerinden ulaşabilir, belgenizin fotoğrafını göndererek net teklif alabilirsiniz. Mesai saatlerinde yanıt veririm.</Text>
      </SectionCard>

      <SectionTitle title="Yeminli Tercüme Süreci" />
      <View style={{ gap: 10, marginBottom: 18 }}>
        {YEMINLI_SUREC.map((step, i) => (
          <StepCard key={i} num={i + 1} title={step.title} desc={step.desc} colors={colors} />
        ))}
      </View>

      <SectionCard colors={colors}>
        <SectionHeading colors={colors}>Yeminli Tercüme Fiyatları</SectionHeading>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20, marginBottom: 10 }}>Yeminli tercüme fiyatları; belgenin diline, sayfa veya karakter sayısına ve konusuna göre belirlenir. Standart belgeler için sayfa başına ücret uygulanır. Özel içerikli belgelerde (hukuki, teknik, tıbbi) fiyat değişebilir.</Text>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20, marginBottom: 10 }}>Noter onayı gerektiren belgelerde, gerçek noter bedeli makbuzla teyit edilir ve çeviri ücretine dahil değildir. Noter işlem/takip bedeli ayrı kalemdir.</Text>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20 }}>Net teklif için belgenizin fotoğrafını WhatsApp'tan gönderin. Belge türünü, noter ve apostil ihtiyacını inceleyip dönüş yapıyorum.</Text>
      </SectionCard>

      <SectionTitle title="Sıkça Sorulan Sorular" />
      <View style={{ marginBottom: 18 }}>
        <FAQAccordion items={YEMINLI_FAQ} colors={colors} />
      </View>

      <CTABox colors={colors} />
    </ScrollView>
  );
}

function IngilizceTab({ colors }: { colors: ReturnType<typeof useColors> }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
      <Text style={{ color: colors.foreground, fontSize: 26, fontWeight: "900", letterSpacing: -0.7, marginBottom: 8 }}>İngilizce-Türkçe Çeviri</Text>
      <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 21, marginBottom: 18 }}>İngilizce-Türkçe ve Türkçe-İngilizce profesyonel çeviri hizmetleri. Yeminli tercüme, teknik çeviri, akademik çeviri ve vize başvurusu çevirisi.</Text>

      <View style={{ flexDirection: "row", gap: 10, marginBottom: 18 }}>
        <InfoCard icon="language" title="Çift Yönlü Çeviri" desc="İngilizceden Türkçeye ve Türkçeden İngilizceye profesyonel çeviri." colors={colors} />
        <InfoCard icon="chat-bubble" title="Ana Dil Doğruluğu" desc="Ana dili Türkçe olan yeminli tercüman olarak doğal ve akıcı çeviri." colors={colors} />
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 18 }}>
        <InfoCard icon="bolt" title="Zamanında Teslim" desc="Acil projelerde teslim kapasiteye bağlı değerlendirilir." colors={colors} />
      </View>

      <SectionCard colors={colors}>
        <SectionHeading colors={colors}>İngilizce-Türkçe Çeviri</SectionHeading>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20, marginBottom: 10 }}>İngilizce-Türkçe dil çifti, Türkiye'de en çok talep edilen çeviri dil çiftidir. Küreselleşen dünyada İngilizce, iş dünyasının, akademinin ve uluslararası ilişkilerin ortak dili haline gelmiştir. Bu nedenle İngilizce-Türkçe çeviri hizmeti, bireyler ve kurumlar için vazgeçilmez bir ihtiyaçtır.</Text>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20, marginBottom: 10 }}>İngilizce-Türkçe çeviride en büyük zorluk, iki dilin yapısal farklılıklarıdır. İngilizce Hint-Avrupa dil ailesine ait bir dilken Türkçe Ural-Altay dil ailesine mensuptur. Bu yapısal farklılık, kelime dizimi, zaman kullanımı ve ifade biçimleri üzerinde doğrudan etkili olur. Bu farklılıkları göz önünde bulundurarak kaynak metnin anlamını hedef dilde en doğru şekilde aktarmaya çalışıyorum.</Text>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20 }}>İngilizce-Türkçe çevirilerinizi ana dili Türkçe olan yeminli tercüman olarak yapıyorum. Her projede doğruluk, tutarlılık ve okunabilirlik ilkelerine bağlı kalıyorum.</Text>
      </SectionCard>

      <SectionTitle title="İngilizce-Türkçe Çeviri Hizmetlerimiz" />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        {INGILIZCE_HIZMETLER.map((item, i) => (
          <View key={i} style={{ width: "48%" }}>
            <CheckItem text={item} colors={colors} />
          </View>
        ))}
      </View>

      <SectionTitle title="Sıkça Sorulan Sorular" />
      <View style={{ marginBottom: 18 }}>
        <FAQAccordion items={INGILIZCE_FAQ} colors={colors} />
      </View>

      <CTABox colors={colors} />
    </ScrollView>
  );
}

function SSSTab({ colors }: { colors: ReturnType<typeof useColors> }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
      <Text style={{ color: colors.foreground, fontSize: 26, fontWeight: "900", letterSpacing: -0.7, marginBottom: 8 }}>Sıkça Sorulan Sorular</Text>
      <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 21, marginBottom: 18 }}>Aklınıza takılan sorular için buraya bakabilirsiniz.</Text>
      <FAQAccordion items={SSS_FAQ} colors={colors} />
      <View style={{ marginTop: 18 }}>
        <CTABox colors={colors} />
      </View>
    </ScrollView>
  );
}

export default function ServicesScreen() {
  const colors = useColors();
  const [activeTab, setActiveTab] = useState("yeminli");

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 14 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <LogoMark compact />
          <Badge>PROFESYONEL HİZMET</Badge>
        </View>
        <View style={{ flexDirection: "row", backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 4 }}>
          {TABS.map((tab) => (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={({ pressed }) => [
                {
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  paddingVertical: 10,
                  borderRadius: 11,
                  backgroundColor: activeTab === tab.key ? colors.primary : "transparent",
                },
                pressed && { opacity: 0.85 },
              ]}
            >
              <MaterialIcons name={tab.icon} size={17} color={activeTab === tab.key ? "#fff" : colors.muted} />
              <Text style={{ color: activeTab === tab.key ? "#fff" : colors.muted, fontSize: 12, fontWeight: "800" }}>{tab.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {activeTab === "yeminli" && <YeminliTab colors={colors} />}
        {activeTab === "ingilizce" && <IngilizceTab colors={colors} />}
        {activeTab === "sss" && <SSSTab colors={colors} />}
      </View>
    </ScreenContainer>
  );
}
