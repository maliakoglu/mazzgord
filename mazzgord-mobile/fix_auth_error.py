with open("app/(tabs)/quote.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_import = 'const { user, isAuthenticated, login, register } = useAuth();'
new_import = 'const { user, isAuthenticated, login, register, error: authErrorFromHook } = useAuth();'
content = content.replace(old_import, new_import, 1)

old_error = """    } else {
      setAuthError("Giris basarisiz. Bilgileri kontrol edin.");
    }"""
new_error = """    } else {
      setAuthError(authErrorFromHook || "Giris basarisiz. Bilgileri kontrol edin.");
    }"""
content = content.replace(old_error, new_error, 1)

with open("app/(tabs)/quote.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("OK: auth error mesaji guncellendi")
