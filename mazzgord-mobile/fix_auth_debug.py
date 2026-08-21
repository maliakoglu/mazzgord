with open("app/(tabs)/quote.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_submit = """  const handleAuthSubmit = async () => {
    setAuthError(null);
    if (!authEmail.trim() || !authPassword.trim()) { setAuthError("E-posta ve sifre zorunlu"); return; }
    if (authMode === "register" && !authName.trim()) { setAuthError("Ad soyad zorunlu"); return; }
    setAuthLoading(true);
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
      setAuthError(authErrorFromHook || "Giris basarisiz. Bilgileri kontrol edin.");
    }
  };"""

new_submit = """  const handleAuthSubmit = async () => {
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

if old_submit in content:
    content = content.replace(old_submit, new_submit, 1)
    with open("app/(tabs)/quote.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    print("OK: handleAuthSubmit guncellendi")
else:
    print("HATA: blok bulunamadi")
