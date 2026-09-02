// A/B test altyapısı — deterministic hash + localStorage
// GA4'e experiment event'leri gönderir

type Variant = "A" | "B";

interface Experiment {
  name: string;
  variants: Record<Variant, string>;
  active: boolean;
}

// Aktif experiment'ler
const experiments: Record<string, Experiment> = {
  hero_cta_text: {
    name: "hero_cta_text",
    variants: {
      A: "Belgem İçin Teklif Al",
      B: "Hemen Teklif Al",
    },
    active: true,
  },
  hero_subtitle: {
    name: "hero_subtitle",
    variants: {
      A: "İngilizce-Türkçe Resmi Belge ve Vize Çevirisi",
      B: "Denizli'den Online Yeminli Tercüme — Hızlı Teklif",
    },
    active: true,
  },
};

// Deterministic hash — aynı kullanıcı her zaman aynı variant'ı görür
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getVariant(experimentName: string): Variant {
  const exp = experiments[experimentName];
  if (!exp || !exp.active) return "A";

  // localStorage'dan kontrol et
  const storageKey = `ab_${experimentName}`;
  if (typeof window === "undefined") return "A";

  const stored = window.localStorage.getItem(storageKey);
  if (stored === "A" || stored === "B") return stored;

  // Deterministic assignment — kullanıcı ID'si veya random
  const userId = window.localStorage.getItem("ab_user_id") || crypto.randomUUID();
  window.localStorage.setItem("ab_user_id", userId);

  const variant: Variant = hashString(userId + experimentName) % 2 === 0 ? "A" : "B";
  window.localStorage.setItem(storageKey, variant);

  // GA4'e experiment event'i gönder
  if (window.gtag) {
    window.gtag("event", "experiment_view", {
      experiment_name: experimentName,
      variant: variant,
    });
  }

  return variant;
}

export function getExperimentValue(experimentName: string): string {
  const variant = getVariant(experimentName);
  const exp = experiments[experimentName];
  if (!exp) return "";
  return exp.variants[variant];
}

export function getAllExperiments(): Record<string, { variant: Variant; value: string }> {
  const result: Record<string, { variant: Variant; value: string }> = {};
  for (const name of Object.keys(experiments)) {
    if (experiments[name].active) {
      const variant = getVariant(name);
      result[name] = { variant, value: experiments[name].variants[variant] };
    }
  }
  return result;
}
