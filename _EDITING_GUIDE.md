# Hala Lab Website — Editing Guide

This file is not linked from the site. It's here so anyone with repo access
knows how to make changes without breaking things.

---

## File Structure

```
/
├── index.html        ← all page content (text, members, pubs, sections)
├── styles.css        ← all visual styling (colors, fonts, layout, spacing)
├── script.js         ← all interactive behavior (scroll, counters, menu)
├── Images/
│   ├── marine_tox_lab_logo.png   ← nav logo
│   └── (member photos go here)
└── _EDITING_GUIDE.md ← you are here
```

**Rule of thumb:**
- Changing *what it says* → edit `index.html`
- Changing *how it looks* → edit `styles.css`
- Changing *how it behaves* → edit `script.js`

---

## Adding or Editing a Lab Member

Open `index.html` and find the `<!-- CURRENT MEMBERS -->` section
(search for `<!-- ===== SECTION 4 — PEOPLE =====`).

Each member is a `<div class="member-card">` block. Copy an existing one
and change the four fields:

```html
<div class="member-card fade-up">
  <div class="avatar-sm" style="background:linear-gradient(135deg,#2e86ab,#0a2342)"
       aria-label="Photo coming soon for FIRSTNAME LASTNAME">
    XX   ← initials (2 letters)
    ...
  </div>
  <div class="role-badge">PhD Student</div>   ← or "PhD Candidate", "Postdoc"
  <div class="member-name">First Last</div>
  <p class="member-research">
    One or two sentences describing their project.
  </p>
  <a href="mailto:email@tamu.edu" class="member-email">email@tamu.edu</a>
</div>
```

**Avatar gradient colors** — pick any two from this palette to keep it
consistent. Mix and match:

| Swatch       | Value     |
|--------------|-----------|
| teal         | `#2e86ab` |
| teal-light   | `#a8dadc` |
| navy         | `#0a2342` |
| navy-mid     | `#112d4e` |
| maroon       | `#500000` |
| gold         | `#c9a227` |

**Adding the award badge** (e.g. Hagler Award):

```html
<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.5rem;">
  <div class="role-badge" style="margin-bottom:0;">PhD Student</div>
  <div class="award-badge">🏆 2025 Hagler Award</div>
</div>
```

**Making a member card full-width** (for featured members):

```html
<div class="member-card member-card-wide fade-up">
  <div class="member-wide-inner">
    <div><!-- avatar here --></div>
    <div style="flex:1;min-width:200px;"><!-- text here --></div>
  </div>
</div>
```

---

## Replacing a Gradient Avatar with a Real Photo

When a photo is ready, drop it in the `Images/` folder and swap the
`<div class="avatar-sm" ...>` for an `<img>`:

```html
<!-- BEFORE -->
<div class="avatar-sm" style="background:linear-gradient(...)">OT</div>

<!-- AFTER -->
<img src="Images/olivia_thibault.jpg"
     alt="Olivia Thibault"
     style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin:0 auto 1rem;" />
```

Remove the `cam-badge` and `photo-tip` spans at the same time — they're
only needed for the gradient placeholder.

For the PI (Dr. Hala), the large avatar is `<div class="avatar-lg">DH</div>`:

```html
<!-- AFTER -->
<img src="Images/david_hala.jpg"
     alt="Dr. David Hala"
     style="width:120px;height:120px;border-radius:50%;object-fit:cover;flex-shrink:0;" />
```

---

## Adding an Alumni Entry

Find the `<ul class="alumni-list">` block and add a `<li>`:

```html
<li class="alumni-item">
  <span class="alumni-year">PhD 2025</span>
  <div class="alumni-name">Dr. First Last</div>
  <div class="alumni-desc">Brief description of their dissertation research.</div>
  <div class="alumni-now">Now: Position, Institution.</div>  ← optional
</li>
```

---

## Adding a Publication

Find `<ul class="pub-list"` in the Publications section and add a `<li>`:

```html
<li class="pub-item">
  <span class="pub-year">2025</span>
  <div>
    <div class="pub-title">Full paper title here</div>
    <div class="pub-journal">Journal Name</div>
    <div class="pub-authors">Hala D, Author B, et al.</div>
  </div>
</li>
```

To link the title to the DOI/PDF, wrap it in an anchor:

```html
<div class="pub-title">
  <a href="https://doi.org/..." target="_blank" rel="noopener"
     style="color:inherit;text-decoration:none;">Paper title</a>
</div>
```

The hover color (teal) already applies via `.pub-item:hover .pub-title`.

---

## Updating the Hero Stats

The three animated counters are in the hero section:

```html
<span class="stat-number" data-target="7">0</span>
```

Change `data-target` to the new number. Add `data-suffix="+"` if you
want a "+" appended (e.g. `data-target="25" data-suffix="+"`).

The matching stats in **Section 3** (the dark stats band) are separate
elements — update both if the numbers change.

---

## Updating the PI Bio, Links, or Contact Info

Search `index.html` for `<!-- PI -->`. The relevant fields:

```html
<h3 class="pi-name">Dr. David Hala</h3>
<p class="pi-role">Associate Professor of Marine Biology</p>
<p class="pi-contact">halad@tamug.edu · 409-740-4535</p>

<a href="https://tamug.edu/..." class="btn-small">TAMUG Faculty Page</a>
<a href="https://scholar.google.com/..." class="btn-small">Google Scholar</a>

<div class="pi-bio">Biography text goes here.</div>
```

Replace the `href="#"` placeholder values with real URLs when available.

---

## Changing Colors

All colors are CSS custom properties at the top of `styles.css`:

```css
:root {
  --teal:       #2e86ab;   /* primary accent */
  --teal-light: #a8dadc;   /* secondary accent */
  --navy:       #0a2342;   /* dark section backgrounds */
  --maroon:     #500000;   /* TAMU accent */
  --sand:       #f8f5f0;   /* warm light sections */
  ...
}
```

Change a value here and it updates everywhere on the site instantly.

---

## Adding a New Section

1. Add a `<section id="your-id">` block to `index.html` in the correct
   position (keep the alternating dark/light pattern).
2. Add a nav link in both the desktop `<ul class="nav-links">` and the
   mobile overlay `<div id="navMobile">`.
3. Style the section in `styles.css`. Follow the existing pattern:
   dark sections use `background: var(--navy)` or `var(--navy-mid)`,
   light sections use `background: var(--sand)` or `var(--white)`.
4. Wrap content blocks in `<div class="fade-up">` for the scroll animation.

---

## Deploying to GitHub Pages

1. Push all files (`index.html`, `styles.css`, `script.js`, `Images/`)
   to the `main` branch.
2. In the repo → Settings → Pages → Source: `main` branch, `/ (root)`.
3. The site will be live at `https://<username>.github.io/<repo-name>/`.

No build step. No npm. Changes go live within ~60 seconds of a push.

---

## Things to NOT Edit Without Care

- The SVG illustrations inside research cards — they're fragile; pixel-nudge
  carefully or regenerate from scratch.
- The `IntersectionObserver` logic in `script.js` — it controls all scroll
  animations. Don't restructure section IDs without updating the observer.
- The Google Fonts `<link>` in `<head>` — removing it breaks all typography.
- The `filter: brightness(0) invert(1)` on the nav logo image — this makes
  the logo white against the dark nav. If you replace with a different image
  format or the logo is already white, remove that style.
