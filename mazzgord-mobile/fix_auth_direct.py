with open("app/(tabs)/quote.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_import = 'import { quoteApi, uploadApi } from "@/lib/api";'
new_import = 'import { quoteApi, uploadApi, authApi } from "@/lib/api";'
content = content.replace(old_import, new_import, 1)

old_submit = """  const handleAuthSubmit = async () => {
    setAuthError(null);
    if (!authEmail.trim() || !authPassword.trim()) { setAuthError("E-posta ve sifre zorunlu"); return; }
    if (authMode === "register" && !authName.trim()) { setAuthError("Ad soyad zorunlu"); return; }
    setAuthLoading(true);
    try {
      let success = false;
      if (authMode === "login") {
        success = await login(authEmail.trim(), authPassword);
      } else {
        success = await register({ name: authName.trim(), email: authEmail.trim(), password: authPassword, phone: authPhone.trim() || undefined });
      }
      setAuthLoading(false);
      if (success) {
        await handleAuthSuccess();
      } else {
        setAuthError("Giris basarisiz. E-posta ve sifrenizi kontrol edin.");
      }
    } catch (err) {
      setAuthLoading(false);
      setAuthError(err instanceof Error ? err.message : "Baglanti hatasi");
    }
  };"""

new_submit = """  const handleAuthSubmit = async () => {
    setAuthError(null);
    if (!authEmail.trim() || !authPassword.trim()) { setAuthError("E-posta ve sifre zorunlu"); return; }
    if (authMode === "register" && !authName.trim()) { setAuthError("Ad soyad zorunlu"); return; }
    setAuthLoading(true);
    try {
      let result;
      if (authMode === "login") {
        result = await authApi.login({ email: authEmail.trim(), password: authPassword });
      } else {
        result = await authApi.register({ name: authName.trim(), email: authEmail.trim(), password: authPassword, phone: authPhone.trim() || undefined });
      }
      if (result.success && result.token && result.customer) {
        const { setToken } = await import("@/lib/api");
        await setToken(result.token);
        setAuthLoading(false);
        await handleAuthSuccess();
      } else {
        setAuthLoading(false);
        setAuthError(result.error || "Islem basarisiz");
      }
    } catch (err) {
      setAuthLoading(false);
      setAuthError(err instanceof Error ? err.message : "Baglanti hatasi");
    }
  };"""

if old_submit in content:
    content = content.replace(old_submit, new_submit, 1)
    with open("app/(tabs)/quote.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    print("OK: handleAuthSubmit direkt API cagrisi ile guncellendi")
else:
    print("HATA: blok bulunamadi")
