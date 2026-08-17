with open('tests/quote.test.ts', 'r') as f:
    content = f.read()

# Mock'u bul ve değiştir — prepare().first() ve prepare().bind().run() ikisini de destekle
old = "function createMockEnv(quoteRow = { id: 1 }) {"
idx = content.index(old)
end = content.index("}", content.index("RESEND_API_KEY: null,")) + 1
end = content.index("}", end) + 1  # dış } kapat
end = content.index("}", end) + 1  # return } kapat
end = content.index("}", end) + 1  # fonksiyon } kapat

new_mock = """function createMockEnv(quoteRow = { id: 1 }) {
  const bound = {
    run: vi.fn(async () => ({})),
    first: vi.fn(async () => quoteRow),
  };
  return {
    DB: {
      prepare: vi.fn(() => ({
        bind: vi.fn(() => bound),
        first: vi.fn(async () => quoteRow),
        run: vi.fn(async () => ({})),
      })),
    },
    RESEND_API_KEY: null,
  };
}"""

content = content[:idx] + new_mock + content[end:]

with open('tests/quote.test.ts', 'w') as f:
    f.write(content)

print('OK')
