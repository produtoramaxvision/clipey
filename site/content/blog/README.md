# Clipey blog publishing guide

Articles live in `content/blog/<lang>/<slug>.md`, with language folders `pt-BR`, `en`, and `es`. Every article carries its own literal dates (`YYYY-MM-DD`): `date` is the day it was first published and `updated` the day of its last factual change. There is no shared release date and no date template token; the build rejects `{{…}}` tokens in articles. The blog starts empty; content is maintained separately.

## Frontmatter

```yaml
title: ""                 # 60 characters or fewer
description: ""           # 155 characters or fewer
slug: ""                  # lowercase ASCII kebab-case; never change after publishing
lang: "pt-BR"             # pt-BR | en | es
translationKey: ""        # pt-BR slug, shared by every translation
category: "novidades"     # translated category values are defined by language
tags: ["Edição com IA"]   # one to three localized tags
author: "Equipe Clipey"   # localized author name
date: "YYYY-MM-DD"        # first publication day of this article
updated: "YYYY-MM-DD"     # last factual change; never earlier than date
featured: false            # true only for the 1.15 launch post
order: 1
cover: "/blog/covers/<translationKey>.webp"
coverAlt: ""
ogImage: "/blog/og/<translationKey>.png"
appliesTo: "1.15"
```

## Naming and article anatomy

Use `/blog/<pt-slug>/`, `/blog/en/<en-slug>/`, and `/blog/es/<es-slug>/`. Slugs are lowercase ASCII and retain their trailing slash. Keep each article in all three languages; an incomplete translation set is excluded from language-specific output with a build warning. Use `/blog/img/<translationKey>/<name>.webp` for real app captures and request each capture in the lane evidence file. Do not invent screenshots.

Open with an “Aplica-se a” / “Applies to” / “Aplica a” note naming Clipey 1.15 and Windows. Explain the reader's problem, then provide numbered steps for tutorials with exact interface labels. Include a localized tips section, limitations when relevant, two links to other planned posts, one landing-page anchor, and one closing call to action. Finish with “Histórico desta página” / “Page history” / “Historial de esta página” and a dated entry such as `- YYYY-MM-DD: published.` using the article's real `date`; add a dated line for each later factual update.

Tutorial UI labels in English and Spanish must match the translated UI. If there is no English label, mention the Portuguese label in parentheses on first use only. Write each language naturally rather than translating sentence by sentence.

## Pre-publish checklist

1. Check every product claim against the current released app or an explicitly pending feature spec.
2. Keep claims within Clipey 1.15 and say Windows wherever a feature is Windows-only.
3. Keep titles within 60 characters and descriptions within 155 characters.
4. Verify canonical links, hreflang alternates, JSON-LD, RSS, Atom and sitemap output.
5. Use one to three translated tags, a localized author, cover alt text and 1.15 applicability.
6. Link at least two planned articles and one existing landing anchor in the same language.
7. Use only canonical capture names; never add fake UI or unrequested images.
8. Check mobile layout, keyboard access, contrast, image dimensions and reduced-motion behavior.
9. Read English and Spanish as natural editorial copy and confirm UI labels match the app.
10. Remove drafts that have not passed fact review; missing images use placeholders locally and fail only with `CLIPEY_STRICT_IMAGES=1`.
