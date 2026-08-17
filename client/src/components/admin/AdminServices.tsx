import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, RefreshCw, Package } from "lucide-react";

interface ServiceOption {
  key: string;
  label: string;
  type: "surcharge_percent" | "fixed_price";
  value: number;
}

interface ServiceProduct {
  id: number;
  sku: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  source_language: string | null;
  target_language: string | null;
  unit: string;
  base_price: number;
  currency: string;
  active: number;
  image: string | null;
  tax_rate: number;
  delivery_type: string;
  sort_order: number;
  options: ServiceOption[];
}

const CATEGORIES = [
  { value: "translation", label: "Çeviri Hizmetleri" },
  { value: "sworn", label: "Yeminli Tercüme" },
  { value: "official", label: "Resmi Onaylar" },
  { value: "extra", label: "Ek Hizmetler" },
];

const UNITS = ["page", "word", "document", "item"];

const emptyProduct: Omit<ServiceProduct, "id"> = {
  sku: "", slug: "", name: "", description: "", category: "translation",
  source_language: null, target_language: null, unit: "page",
  base_price: 0, currency: "TRY", active: 1, image: null,
  tax_rate: 0.2, delivery_type: "digital", sort_order: 0, options: [],
};

export default function AdminServices({ adminToken }: { adminToken: string }) {
  const [services, setServices] = useState<ServiceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ServiceProduct | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<Omit<ServiceProduct, "id">>(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const headers = { Authorization: `Bearer ${adminToken}`, "Content-Type": "application/json" };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services", { headers });
      const data = await res.json();
      if (data.success) setServices(data.data);
    } catch { setError("Hizmetler yüklenemedi"); }
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleEdit = (s: ServiceProduct) => {
    setEditing(s); setCreating(false); setFormData({ ...s }); setError("");
  };

  const handleNew = () => {
    setCreating(true); setEditing(null); setFormData({ ...emptyProduct }); setError("");
  };

  const handleCancel = () => {
    setEditing(null); setCreating(false); setFormData({ ...emptyProduct }); setError("");
  };

  const handleSave = async () => {
    if (!formData.sku || !formData.slug || !formData.name) { setError("SKU, slug ve ad zorunludur"); return; }
    setSaving(true); setError("");
    try {
      const body = { ...formData, options: formData.options };
      if (editing) {
        const res = await fetch(`/api/admin/services/${editing.id}`, { method: "PUT", headers, body: JSON.stringify(body) });
        const data = await res.json();
        if (!data.success) { setError(data.error || "Güncelleme başarısız"); setSaving(false); return; }
      } else {
        const res = await fetch("/api/admin/services", { method: "POST", headers, body: JSON.stringify(body) });
        const data = await res.json();
        if (!data.success) { setError(data.error || "Ekleme başarısız"); setSaving(false); return; }
      }
      await fetchServices(); handleCancel();
    } catch { setError("Sunucu hatası"); }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    try { await fetch(`/api/admin/services/${id}`, { method: "DELETE", headers }); await fetchServices(); }
    catch { setError("Silme başarısız"); }
  };

  const toggleActive = async (s: ServiceProduct) => {
    try {
      await fetch(`/api/admin/services/${s.id}`, { method: "PUT", headers, body: JSON.stringify({ active: s.active ? 0 : 1 }) });
      await fetchServices();
    } catch { setError("Durum değiştirilemedi"); }
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, { key: "", label: "", type: "fixed_price", value: 0 }] });
  };

  const updateOption = (i: number, field: keyof ServiceOption, val: string | number) => {
    const opts = [...formData.options];
    opts[i] = { ...opts[i], [field]: val };
    setFormData({ ...formData, options: opts });
  };

  const removeOption = (i: number) => {
    setFormData({ ...formData, options: formData.options.filter((_, idx) => idx !== i) });
  };

  const isEditing = editing || creating;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Package className="w-6 h-6" /> Hizmet Yönetimi
        </h2>
        <div className="flex gap-2">
          <button onClick={fetchServices} className="p-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition" aria-label="Yenile">
            <RefreshCw className="w-5 h-5" />
          </button>
          {!isEditing && (
            <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
              <Plus className="w-5 h-5" /> Yeni Hizmet
            </button>
          )}
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

      {isEditing ? (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold text-foreground mb-4">{editing ? "Hizmet Düzenle" : "Yeni Hizmet"}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">SKU *</label>
              <input type="text" value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="TR-EN-TRANSLATION" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Slug *</label>
              <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="english-turkish-translation" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Ad *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="İngilizce → Türkçe Çeviri" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Açıklama</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" rows={2} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Kategori</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Birim</label>
              <select value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Birim Fiyat (₺)</label>
              <input type="number" step="0.01" value={formData.base_price} onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Sıralama</label>
              <input type="number" value={formData.sort_order} onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Kaynak Dil</label>
              <input type="text" value={formData.source_language || ""} onChange={(e) => setFormData({ ...formData, source_language: e.target.value || null })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="en, tr, de" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Hedef Dil</label>
              <input type="text" value={formData.target_language || ""} onChange={(e) => setFormData({ ...formData, target_language: e.target.value || null })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="en, tr, de" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Teslimat Tipi</label>
              <select value={formData.delivery_type} onChange={(e) => setFormData({ ...formData, delivery_type: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="digital">Dijital</option>
                <option value="physical">Fiziksel</option>
                <option value="both">İkisi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">KDV Oranı</label>
              <input type="number" step="0.01" value={formData.tax_rate} onChange={(e) => setFormData({ ...formData, tax_rate: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Seçenekler (Opsiyonlar)</label>
              <button onClick={addOption} className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-foreground rounded-lg text-sm hover:bg-secondary/80 transition">
                <Plus className="w-4 h-4" /> Seçenek Ekle
              </button>
            </div>
            {formData.options.map((opt, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <input type="text" placeholder="key" value={opt.key} onChange={(e) => updateOption(i, "key", e.target.value)}
                  className="w-24 px-2 py-1.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none" />
                <input type="text" placeholder="Etiket" value={opt.label} onChange={(e) => updateOption(i, "label", e.target.value)}
                  className="flex-1 px-2 py-1.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none" />
                <select value={opt.type} onChange={(e) => updateOption(i, "type", e.target.value)}
                  className="w-40 px-2 py-1.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none">
                  <option value="fixed_price">Sabit Fiyat</option>
                  <option value="surcharge_percent">Yüzde Ek</option>
                </select>
                <input type="number" placeholder="Değer" value={opt.value} onChange={(e) => updateOption(i, "value", parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none" />
                <button onClick={() => removeOption(i)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50">
              <Save className="w-5 h-5" /> {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-2.5 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition">
              <X className="w-5 h-5" /> İptal
            </button>
          </div>
        </div>
      ) : (
        <div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-secondary/50 rounded-lg animate-pulse" />)}
            </div>
          ) : services.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">Henüz hizmet eklenmedi.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-3 font-bold text-foreground">SKU</th>
                    <th className="text-left py-3 px-3 font-bold text-foreground">Ad</th>
                    <th className="text-left py-3 px-3 font-bold text-foreground">Kategori</th>
                    <th className="text-right py-3 px-3 font-bold text-foreground">Fiyat</th>
                    <th className="text-center py-3 px-3 font-bold text-foreground">Birim</th>
                    <th className="text-center py-3 px-3 font-bold text-foreground">Durum</th>
                    <th className="text-center py-3 px-3 font-bold text-foreground">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(s => (
                    <tr key={s.id} className="border-b border-border hover:bg-secondary/20 transition">
                      <td className="py-3 px-3 font-mono text-sm text-foreground">{s.sku}</td>
                      <td className="py-3 px-3 text-foreground font-medium">{s.name}</td>
                      <td className="py-3 px-3 text-muted-foreground">{CATEGORIES.find(c => c.value === s.category)?.label || s.category}</td>
                      <td className="py-3 px-3 text-right text-foreground">{s.base_price.toLocaleString("tr-TR")} ₺</td>
                      <td className="py-3 px-3 text-center text-muted-foreground">{s.unit}</td>
                      <td className="py-3 px-3 text-center">
                        <button onClick={() => toggleActive(s)}
                          className={`text-xs px-2 py-1 rounded-full ${s.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                          {s.active ? "Aktif" : "Pasif"}
                        </button>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => handleEdit(s)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition" aria-label="Düzenle">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(s.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition" aria-label="Sil">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
