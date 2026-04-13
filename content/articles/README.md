# Article publishing

Create one markdown file per post in this folder.

Required frontmatter fields:

```md
---
title: "Post title"
summary: "1-2 line summary for the feed card"
date: "2026-04-13"
category: "AI"
author: "Sahil"
source: "https://example.com"
coverImage: "/uploads/example.jpg"
---
```

Then write your article content in markdown below the frontmatter.

Tips:

- Use `YYYY-MM-DD` format for `date`.
- Put images in `public/uploads`.
- Restart `npm run dev` if a new file does not appear immediately.
