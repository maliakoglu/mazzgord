with open("app/(tabs)/track.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old = """  if (ofs === "offered") return 0;
  return 0;"""

new = """  if (ofs === "offered") return 1;
  return 0;"""

content = content.replace(old, new, 1)

with open("app/(tabs)/track.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("OK: offered -> stage 1")
