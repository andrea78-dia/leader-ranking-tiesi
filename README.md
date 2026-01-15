# Leader Ranking - Team Tiesi

Sistema di classifiche per il Team Tiesi.

## 🚀 Deploy su Vercel

### Metodo 1: Via GitHub (Consigliato)

1. **Crea repository GitHub**
   - Vai su github.com → New repository
   - Nome: `leader-ranking-tiesi`
   - Clicca "Create repository"

2. **Carica i file**
   - Clicca "uploading an existing file"
   - Trascina TUTTA la cartella del progetto
   - Clicca "Commit changes"

3. **Collega a Vercel**
   - Vai su vercel.com
   - "Add New Project"
   - Importa il repository GitHub
   - Clicca "Deploy"

### Metodo 2: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## 👥 Credenziali Utenti

| Username | Password | Ruolo |
|----------|----------|-------|
| admin | nwg2026admin | Admin |
| assistente | nwg2026ass | Assistente |
| tiesi_patrizio | tiesip2026 | K Leader |
| tiesi_andrea | tiesia2026 | K |
| magri_thomas | magri2026 | K |
| ventura_marcello | ventura2026 | K |
| colletta_leonardo | colletta2026 | K |

## ⚙️ Funzionalità

- ✅ Login multi-ruolo
- ✅ Upload CSV
- ✅ 4 Classifiche (IVD, Presenti, Networker, K)
- ✅ Filtro "Escludi K"
- ✅ Barra conversione %
- ✅ Config evento

## 📁 Struttura File

```
nwg-ranking-app/
├── pages/
│   ├── index.js      # App principale
│   └── _app.js       # Configurazione
├── styles/
│   └── globals.css   # Stili globali
├── package.json
├── next.config.js
└── README.md
```
