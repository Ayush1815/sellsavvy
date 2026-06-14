import re

with open('src/data/services.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add image field to Service type
content = re.sub(r'span: string;', r'span: string;\n  image: string;', content)

# For E-commerce account management
content = re.sub(
    r'(slug: "e-commerce-account-management",.*?Icon: ShoppingBag,\n\s*span: ")[^"]+(",)',
    r'\1lg:col-span-1\2\n    image: "/media/services/E-commerce_management_1.webp",',
    content,
    flags=re.DOTALL
)

# For Social media management
content = re.sub(
    r'(slug: "social-media-management",.*?Icon: Instagram,\n\s*span: ")[^"]+(",)',
    r'\1lg:col-span-1\2\n    image: "/media/services/social_media_management_1.webp",',
    content,
    flags=re.DOTALL
)

# For Website design
content = re.sub(
    r'(slug: "website-design",.*?Icon: Monitor,\n\s*span: ")[^"]+(",)',
    r'\1lg:col-span-1\2\n    image: "/media/services/Website_design_1.webp",',
    content,
    flags=re.DOTALL
)

# For Digital marketing
content = re.sub(
    r'(slug: "digital-marketing-services",.*?Icon: TrendingUp,\n\s*span: ")[^"]+(",)',
    r'\1lg:col-span-1\2\n    image: "/media/services/digital_marketing_1.webp",',
    content,
    flags=re.DOTALL
)

# For E-commerce photoshoot
content = re.sub(
    r'(slug: "e-commerce-photoshoot",.*?Icon: Camera,\n\s*span: ")[^"]+(",)',
    r'\1lg:col-span-1\2\n    image: "/media/services/Photoshoot_1.webp",',
    content,
    flags=re.DOTALL
)

with open('src/data/services.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated services.ts")
