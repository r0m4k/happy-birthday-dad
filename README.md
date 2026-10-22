# 🎂 Happy Birthday, Dad

An interactive birthday card made for iPhone:

1. **Gift box**: tap it to burst it open with confetti.
2. **Photo deck**: swipe each card away (or tap the right side). Tap the left side to go back. Photos slowly zoom (Ken Burns effect) and the wishes animate in.
3. **Cake**: tap the candles to blow them out. That triggers fireworks and the final message. The card is completely silent.

On a laptop or desktop the site shows a cake and a QR code to open it on a phone instead.

## Editing

All the text and the photo order live in the `CONFIG` block at the top of `app.js`:
- `title` and `text` set each card's wording.
- `pos: '60% 50%'` moves the focus point if a face gets cropped.
- `name`, `from`, `candles` and `finalText` set the ending.

To add a photo, convert it to JPEG in `photos/` and add a line to `slides`:

```bash
sips -s format jpeg -s formatOptions 80 -Z 1400 IMG_XXXX.HEIC --out photos/12.jpg
```

## Preview locally

```bash
python3 -m http.server 8765
```

Then open `http://localhost:8765/?phone` (`?phone` forces the phone version on a computer, and `?phone&finale` jumps straight to the cake).

## Publish on GitHub Pages

```bash
git init && git add . && git commit -m "Birthday card"
```

```bash
gh repo create happy-birthday-dad --public --source=. --push
```

```bash
gh api -X POST repos/{owner}/happy-birthday-dad/pages -f "source[branch]=main" -f "source[path]=/"
```

After about a minute the card is live at `https://<your-username>.github.io/happy-birthday-dad/`. Send that link to Dad.

> On a free GitHub plan the repo must be **public** for Pages to work, so anyone with the link (or who finds the repo) can see the photos. The original HEIC files are excluded via `.gitignore`.
