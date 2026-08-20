from PIL import Image, ImageDraw

SIZE = 512
NAVY = "#1E3A8A"
ORANGE = "#EA580C"
WHITE = "#FFFFFF"

image = Image.new("RGB", (SIZE, SIZE), NAVY)
draw = ImageDraw.Draw(image)

# Two interlocking document/speech forms: translation, trust, exchange.
draw.rounded_rectangle((92, 104, 288, 386), radius=34, fill=WHITE)
draw.polygon([(214, 104), (288, 104), (288, 178), (214, 178)], fill=NAVY)
draw.line((132, 198, 246, 198), fill=NAVY, width=18)
draw.line((132, 250, 246, 250), fill=NAVY, width=18)
draw.line((132, 302, 214, 302), fill=NAVY, width=18)

# Orange translated page layered over the first page.
draw.rounded_rectangle((224, 126, 420, 408), radius=34, fill=ORANGE)
draw.polygon([(346, 126), (420, 126), (420, 200), (346, 200)], fill=NAVY)
draw.line((264, 222, 378, 222), fill=WHITE, width=18)
draw.line((264, 274, 378, 274), fill=WHITE, width=18)
draw.line((264, 326, 346, 326), fill=WHITE, width=18)

# Minimal exchange arrow cut through both documents.
draw.polygon([(170, 382), (170, 424), (342, 424), (342, 452), (396, 403), (342, 354), (342, 382)], fill=ORANGE)

# Keep a crisp small-file PNG.
image.save("/home/ubuntu/mazzgord-mobile/assets/images/icon.png", optimize=True)
image.save("/home/ubuntu/mazzgord-mobile/assets/images/splash-icon.png", optimize=True)
image.save("/home/ubuntu/mazzgord-mobile/assets/images/favicon.png", optimize=True)
image.save("/home/ubuntu/mazzgord-mobile/assets/images/android-icon-foreground.png", optimize=True)
