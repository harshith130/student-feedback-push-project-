# Menu List — static demo

Files created:
- `index.html` — main page
- `styles.css` — layout and styling
- `script.js` — loads `menu.json`, search and filter logic
- `menu.json` — sample menu items

How to open:

1. Open `index.html` directly in your browser (double-click).
2. Or serve with a simple HTTP server (recommended to avoid fetch CORS issues):

PowerShell (if Python installed):
```
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

Next steps you might want:
- Edit `menu.json` to add your items.
- Add images or an "Add to order" button in `script.js`.
- Integrate with a backend for persistence.
