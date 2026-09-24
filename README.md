# ctrlzgau.github.io

Personal site for Gautham Balachandran — a neon-terminal portfolio and a daily
log, built with plain Jekyll and deployed to GitHub Pages.

```
.
├── index.html                  home page (terminal layout + intro animation)
├── log/
│   ├── index.html              /log — post index with client-side tag filter
│   └── rss.xml                 /log/rss.xml
├── _posts/                     one markdown file per log entry
├── _layouts/                   default, post
├── _includes/num.html          zero-pads a post number to #014
├── assets/
│   ├── css/main.scss           every style on the site
│   ├── js/intro.js             typing intro + scroll reveal (home only)
│   ├── js/log-filter.js        tag pills on /log
│   └── cv.pdf                  the CV the nav links to
└── design-reference/           the original design mockups (not built)
```

## Running it

```shell
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

## Adding a log entry

Drop a markdown file into `_posts/` named `YYYY-MM-DD-some-slug.md`. Nothing
else needs updating — it appears on `/log`, in the home page's `tail -n 3 log/`
list and in the RSS feed automatically.

```yaml
---
title: "Notes on action chunking"
number: 14
date: 2026-09-25
tag: papers        # one of: notes | papers | builds
minutes: 4         # optional; computed from word count when omitted
---
```

## Deploying

Pushing to `main` triggers `.github/workflows/jekyll.yml`, which builds the site
and publishes it to GitHub Pages.

## License

[MIT](LICENSE).
