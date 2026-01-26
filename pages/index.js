import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// ═══════════════════════════════════════════════════════════════════════════════
// LEADER RANKING v11.0 - TOP MANAGER EDITION
// Design: Minimal, Elegante, D'impatto
// ═══════════════════════════════════════════════════════════════════════════════

const USERS = {
  admin: { password: 'admin2026', role: 'admin', name: 'Admin' },
  assistente: { password: 'assist2026', role: 'assistente', name: 'Assistente' },
  thomas: { password: 'thomas2026', role: 'k', name: 'Thomas Magri' },
  marcello: { password: 'marcello2026', role: 'k', name: 'Marcello Ventura' },
  patrizio: { password: 'patrizio2026', role: 'k', name: 'Patrizio Tiesi' },
  andrea: { password: 'andrea2026', role: 'k', name: 'Andrea Tiesi' },
  leonardo: { password: 'leonardo2026', role: 'k', name: 'Leonardo Colletta' },
};

const K_NAMES = ['TIESI PATRIZIO', 'MAGRI THOMAS', 'COLLETTA LEONARDO', 'VENTURA MARCELLO', 'TIESI ANDREA'];

// COLORI NWG - Palette Professionale
const COLORS = {
  primary: '#2AAA8A',      // Verde NWG
  primaryDark: '#1E8A6E',
  gold: '#D4AF37',         // Oro elegante (non giallo acceso)
  goldLight: '#F5E6A3',
  success: '#2E7D32',      // Verde scuro
  warning: '#F57C00',      // Arancione
  danger: '#C62828',       // Rosso scuro
  dark: '#1A1A2E',
  darkBlue: '#16213E',
  light: '#F8FAFC',
  white: '#FFFFFF',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray500: '#64748B',
  gray700: '#334155',
  gray900: '#0F172A',
};

// STATI FV - Mappatura completa
const STATO_MAP_FV = {
  'Impianto installato': 'positivo', 'AAC contratto accettato': 'positivo', 
  'AAC – Contratto accettato in attesa sblocco': 'positivo', 'Impianto pronto per spedizione': 'positivo',
  'Impianto pronto spedizione': 'positivo', 'Cantiere aperto': 'positivo', 
  'Impianto in consegna': 'positivo', 'Rep.Amm - Contratto appena inserito': 'positivo',
  'Rep.Amm appena inserito': 'positivo', 'Ok finanziario ma non tecnico': 'positivo',
  'Rep.Fin - In lavorazione': 'lavorazione', 'Rep.Fin in lavorazione': 'lavorazione',
  'Rep.Amm - Sospeso': 'lavorazione', 'Rep.Amm sospeso': 'lavorazione',
  'Recesso': 'negativo', 'Rep.Fin - Negativo': 'negativo', 'Rep.Fin negativo': 'negativo',
  'Annullato': 'negativo', 'Rep.Amm - Non Perfezionato': 'negativo', 
  'Rep.Amm non perfezionato': 'negativo', 'No': 'negativo',
};

// STATI NWG SPA
const STATO_MAP_SPA = {
  'Accettato': 'positivo', 'In sospeso': 'lavorabile', 'Risoluzione': 'meno',
  'Non perfezionato': 'meno', 'Recesso': 'meno', 'Respinto': 'meno', 'Annullato': 'meno',
};

// STATI NWG ENERGIA
const STATO_MAP_ENERGIA = { 'Attivo': 'positivo', 'Da attivare': 'lavorabile', 'Cessato': 'meno' };

export default function Home() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeView, setActiveView] = useState('report'); // UNICA VIEW: 'report'
  const [reportCSVs, setReportCSVs] = useState({ ivd: null, energy: null, fv: null, seminari: null });
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ═══════════════════════════════════════════════════════════════════════════
  // PARSE CSV
  // ═══════════════════════════════════════════════════════════════════════════
  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(';').map(h => h.trim().replace(/"/g, '').replace(/^\uFEFF/, ''));
    return lines.slice(1).map(line => {
      const values = line.split(';').map(v => v.trim().replace(/^"|"$/g, ''));
      const row = {}; headers.forEach((h, i) => { row[h] = values[i] || ''; }); return row;
    }).filter(row => Object.values(row).some(v => v));
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PROCESS REPORT CSV
  // ═══════════════════════════════════════════════════════════════════════════
  const processReportCSV = async (type, file) => {
    const text = await file.text();
    const data = parseCSV(text);
    setReportCSVs(prev => ({ ...prev, [type]: { data, rows: data.length, fileName: file.name } }));
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERA REPORT AGGREGATO
  // ═══════════════════════════════════════════════════════════════════════════
  const generateReport = () => {
    if (!reportCSVs.ivd && !reportCSVs.energy && !reportCSVs.fv && !reportCSVs.seminari) {
      alert('Carica almeno un CSV per generare il report');
      return;
    }
    setIsLoading(true);

    const report = {
      generatedAt: new Date().toISOString(),
      pilastri: {},
      heatmapMesi: {},
      alertDaAttivare: null,
      trackerCoaching: null,
    };

    // Helper per estrarre mese
    const getMeseIndex = (row) => {
      const mese = row['Mese di Produzione'] || '';
      const mesi = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
      const idx = mesi.findIndex(m => mese.includes(m));
      return idx >= 0 ? idx : -1;
    };

    // Helper classifiche
    const buildClassifiche = (data, keyK, keyNW, keySDP, getStats) => {
      const k = {}, nw = {}, sdp = {};
      data.forEach(row => {
        const kName = row[keyK] || '';
        const nwName = row[keyNW] || '';
        const sdpName = row[keySDP] || '';
        const stats = getStats(row);
        if (kName && !kName.includes('Nome')) { if (!k[kName]) k[kName] = { total: 0, ...stats.init }; k[kName].total++; Object.keys(stats.add).forEach(key => k[kName][key] = (k[kName][key] || 0) + stats.add[key]); }
        if (nwName && !nwName.includes('Nome')) { if (!nw[nwName]) nw[nwName] = { total: 0, ...stats.init }; nw[nwName].total++; Object.keys(stats.add).forEach(key => nw[nwName][key] = (nw[nwName][key] || 0) + stats.add[key]); }
        if (sdpName && !sdpName.includes('Nome')) { if (!sdp[sdpName]) sdp[sdpName] = { total: 0, ...stats.init }; sdp[sdpName].total++; Object.keys(stats.add).forEach(key => sdp[sdpName][key] = (sdp[sdpName][key] || 0) + stats.add[key]); }
      });
      return {
        k: Object.entries(k).sort((a, b) => b[1].total - a[1].total),
        nw: Object.entries(nw).sort((a, b) => b[1].total - a[1].total),
        sdp: Object.entries(sdp).sort((a, b) => b[1].total - a[1].total),
      };
    };

    // ═══ FOTOVOLTAICO ═══
    if (reportCSVs.fv?.data) {
      const data = reportCSVs.fv.data;
      const mesiCount = Array(12).fill(0);
      const statiCount = {};
      let positivi = 0, lavorazione = 0, negativi = 0;

      data.forEach(row => {
        const m = getMeseIndex(row); if (m >= 0) mesiCount[m]++;
        const stato = row['Stato'] || '';
        if (stato) {
          statiCount[stato] = (statiCount[stato] || 0) + 1;
          const cat = STATO_MAP_FV[stato] || 'altro';
          if (cat === 'positivo') positivi++;
          else if (cat === 'lavorazione') lavorazione++;
          else negativi++;
        }
      });

      const classifiche = buildClassifiche(data, 'Nome Primo K', 'Nome Primo Networker', 'Nome Primo SDP FV',
        (row) => {
          const stato = row['Stato'] || '';
          const cat = STATO_MAP_FV[stato] || 'altro';
          return { init: { positivo: 0, lavorazione: 0, negativo: 0 }, add: { [cat]: 1 } };
        });

      report.pilastri.fv = {
        totale: data.length,
        funnel: { inseriti: data.length, positivi, lavorazione, negativi, pctPositivi: Math.round(positivi/data.length*100) || 0, pctNegativi: Math.round(negativi/data.length*100) || 0 },
        statiDettaglio: Object.entries(statiCount).sort((a,b) => b[1] - a[1]),
        classifiche,
      };
      report.heatmapMesi.fv = { mesi: mesiCount };
    }

    // ═══ LUCE AMICA ═══
    if (reportCSVs.energy?.data) {
      const data = reportCSVs.energy.data;
      const mesiCount = Array(12).fill(0);
      const statiSPA = {}, statiEnergia = {};
      let accettati = 0, lavorabili = 0, persi = 0;
      const alertVerde = [], alertGiallo = [], alertRosso = [];

      data.forEach(row => {
        const m = getMeseIndex(row); if (m >= 0) mesiCount[m]++;
        
        const statoSPA = row['Stato NWG Spa'] || row['Stato'] || '';
        const statoEnergia = row['Stato NWG Energia'] || '';
        
        if (statoSPA) {
          statiSPA[statoSPA] = (statiSPA[statoSPA] || 0) + 1;
          const cat = STATO_MAP_SPA[statoSPA];
          if (cat === 'positivo') accettati++;
          else if (cat === 'lavorabile') lavorabili++;
          else persi++;
        }
        if (statoEnergia) statiEnergia[statoEnergia] = (statiEnergia[statoEnergia] || 0) + 1;

        // Alert Da Attivare (Accettato SPA ma Da attivare Energia)
        if (statoSPA === 'Accettato' && statoEnergia === 'Da attivare') {
          const dataIns = row['Inserimento'] || row['Data Inserimento'] || '';
          if (dataIns) {
            const d = new Date(dataIns.replace(' ', 'T'));
            const giorni = Math.floor((new Date() - d) / (1000*60*60*24));
            const alert = { cliente: row['Cliente'] || row['Ragione Sociale'] || 'N/D', intermediario: row['Nome Primo Networker'] || 'N/D', giorni, fascia: giorni <= 30 ? 'verde' : giorni <= 60 ? 'giallo' : 'rosso' };
            if (giorni <= 30) alertVerde.push(alert);
            else if (giorni <= 60) alertGiallo.push(alert);
            else alertRosso.push(alert);
          }
        }
      });

      const classifiche = buildClassifiche(data, 'Nome Primo K', 'Nome Primo Networker', 'Nome Primo SDP LA',
        () => ({ init: {}, add: {} }));

      report.pilastri.energy = {
        totale: data.length,
        funnel: { inseriti: data.length, accettati, lavorabili, persi, pctAccettati: Math.round(accettati/data.length*100) || 0 },
        statiSPA: Object.entries(statiSPA).sort((a,b) => b[1] - a[1]),
        statiEnergia: Object.entries(statiEnergia).sort((a,b) => b[1] - a[1]),
        classifiche,
      };
      report.heatmapMesi.energy = { mesi: mesiCount };
      report.alertDaAttivare = {
        verde: alertVerde.sort((a,b) => a.giorni - b.giorni),
        giallo: alertGiallo.sort((a,b) => a.giorni - b.giorni),
        rosso: alertRosso.sort((a,b) => a.giorni - b.giorni),
        totale: alertVerde.length + alertGiallo.length + alertRosso.length,
      };
    }

    // ═══ SEMINARI / COLLABORATORI ═══
    if (reportCSVs.seminari?.data) {
      const data = reportCSVs.seminari.data;
      const mesiCount = Array(12).fill(0);
      let iscritti = 0, presenti = 0, attivati = 0;

      data.forEach(row => {
        const m = getMeseIndex(row); if (m >= 0) mesiCount[m]++;
        iscritti++;
        if (row['Presente SI'] === 'Si' || row['Presente'] === 'Si') presenti++;
      });

      // Attivati from IVD
      if (reportCSVs.ivd?.data) {
        attivati = reportCSVs.ivd.data.length;
      }

      const classifiche = buildClassifiche(data, 'Nome Primo K', 'Nome Primo Networker', 'Nome Primo SDP',
        (row) => {
          const presente = row['Presente SI'] === 'Si' || row['Presente'] === 'Si';
          return { init: { iscritti: 0, presenti: 0 }, add: { iscritti: 1, presenti: presente ? 1 : 0 } };
        });

      report.pilastri.collaboratori = {
        totale: iscritti,
        funnel: { iscritti, presenti, attivati, pctPresenti: Math.round(presenti/iscritti*100) || 0, pctAttivati: Math.round(attivati/iscritti*100) || 0 },
        classifiche,
      };
      report.heatmapMesi.seminari = { mesi: mesiCount };
    }

    // ═══ IVD ATTIVATI ═══
    if (reportCSVs.ivd?.data) {
      const data = reportCSVs.ivd.data;
      const mesiCount = Array(12).fill(0);
      data.forEach(row => { const m = getMeseIndex(row); if (m >= 0) mesiCount[m]++; });
      report.heatmapMesi.ivd = { mesi: mesiCount };

      // TRACKER COACHING
      const trackerList = [];
      data.forEach(row => {
        const nome = row['Nome Attivato'] || row['Nome'] || '';
        const dataAttivazione = row['Data Attivazione'] || row['Inserimento'] || '';
        if (nome && dataAttivazione) {
          const dAtt = new Date(dataAttivazione.replace(' ', 'T'));
          trackerList.push({
            nome,
            dataAttivazione: dAtt,
            giorniLA: null,
            giorniFV: null,
            giorniIscritto: null,
            giorniAttivato: null,
          });
        }
      });

      // Calcola milestone per ogni IVD
      trackerList.forEach(t => {
        // Cerca primo LA
        if (reportCSVs.energy?.data) {
          const firstLA = reportCSVs.energy.data.find(r => (r['Nome Primo Networker'] || '').toUpperCase().includes(t.nome.toUpperCase().split(' ')[0]));
          if (firstLA && firstLA['Inserimento']) {
            const d = new Date(firstLA['Inserimento'].replace(' ', 'T'));
            t.giorniLA = Math.max(0, Math.floor((d - t.dataAttivazione) / (1000*60*60*24)));
          }
        }
        // Cerca primo FV
        if (reportCSVs.fv?.data) {
          const firstFV = reportCSVs.fv.data.find(r => (r['Nome Primo Networker'] || '').toUpperCase().includes(t.nome.toUpperCase().split(' ')[0]));
          if (firstFV && firstFV['Inserimento']) {
            const d = new Date(firstFV['Inserimento'].replace(' ', 'T'));
            t.giorniFV = Math.max(0, Math.floor((d - t.dataAttivazione) / (1000*60*60*24)));
          }
        }
      });

      const calcMedia = (arr) => arr.length > 0 ? Math.round(arr.reduce((a,b) => a+b, 0) / arr.length) : null;
      const laGiorni = trackerList.filter(t => t.giorniLA !== null).map(t => t.giorniLA);
      const fvGiorni = trackerList.filter(t => t.giorniFV !== null).map(t => t.giorniFV);

      report.trackerCoaching = {
        totale: trackerList.length,
        lista: trackerList.slice(0, 20),
        medie: { la: calcMedia(laGiorni), fv: calcMedia(fvGiorni), iscritto: null, attivato: null },
        completamento: {
          la: trackerList.length > 0 ? Math.round(laGiorni.length / trackerList.length * 100) : 0,
          fv: trackerList.length > 0 ? Math.round(fvGiorni.length / trackerList.length * 100) : 0,
          iscritto: 0,
          attivato: 0,
        },
      };
    }

    setTimeout(() => {
      setReportData(report);
      setIsLoading(false);
    }, 500);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DOWNLOAD CSV
  // ═══════════════════════════════════════════════════════════════════════════
  const downloadCSV = (data, filename) => {
    const csv = 'Cliente;Intermediario;Giorni\n' + data.map(a => `${a.cliente};${a.intermediario};${a.giorni}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = filename; link.click();
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // STYLES
  // ═══════════════════════════════════════════════════════════════════════════
  const S = {
    // Layout
    container: { minHeight: '100vh', background: `linear-gradient(135deg, ${COLORS.light} 0%, ${COLORS.gray100} 100%)`, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
    
    // Header
    header: { background: COLORS.white, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 100 },
    logo: { display: 'flex', alignItems: 'center', gap: 8 },
    logoText: { fontSize: 20, fontWeight: 800, color: COLORS.primary },
    logoSub: { fontSize: 20, fontWeight: 300, color: COLORS.gray700 },
    
    // Buttons
    btn: { padding: '10px 20px', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14, transition: 'all 0.2s ease' },
    btnPrimary: { background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`, color: COLORS.white },
    btnGold: { background: `linear-gradient(135deg, ${COLORS.gold}, #B8960C)`, color: COLORS.white },
    btnOutline: { background: 'transparent', border: `2px solid ${COLORS.gray200}`, color: COLORS.gray700 },
    btnDanger: { background: `linear-gradient(135deg, ${COLORS.danger}, #8B0000)`, color: COLORS.white },
    
    // Cards
    card: { background: COLORS.white, borderRadius: 16, padding: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)', border: `1px solid ${COLORS.gray100}` },
    cardTitle: { fontSize: 18, fontWeight: 700, color: COLORS.gray900, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 },
    
    // Stats
    statBig: { fontSize: 48, fontWeight: 800, lineHeight: 1 },
    statLabel: { fontSize: 12, color: COLORS.gray500, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.5px' },
    
    // Badge
    badge: { padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: 'uppercase' },
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGIN SCREEN
  // ═══════════════════════════════════════════════════════════════════════════
  if (!user) {
    return (
      <>
        <Head><title>Leader Ranking | Login</title><meta name="viewport" content="width=device-width,initial-scale=1" /></Head>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.darkBlue} 100%)`, padding: 20 }}>
          <div style={{ background: COLORS.white, borderRadius: 24, padding: 48, width: '100%', maxWidth: 420, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ width: 80, height: 80, background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: `0 10px 40px ${COLORS.primary}50` }}>
                <span style={{ fontSize: 36 }}>📊</span>
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: COLORS.gray900, margin: 0 }}>Leader Ranking</h1>
              <p style={{ color: COLORS.gray500, marginTop: 8 }}>Top Manager Analytics</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input
                type="text"
                placeholder="Username"
                value={loginForm.username}
                onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                style={{ padding: '14px 18px', borderRadius: 12, border: `2px solid ${COLORS.gray200}`, fontSize: 16, outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.gray200}
              />
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                onKeyPress={e => e.key === 'Enter' && handleLogin()}
                style={{ padding: '14px 18px', borderRadius: 12, border: `2px solid ${COLORS.gray200}`, fontSize: 16, outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.gray200}
              />
              {loginError && <p style={{ color: COLORS.danger, fontSize: 14, margin: 0, textAlign: 'center' }}>{loginError}</p>}
              <button
                onClick={() => {
                  const u = USERS[loginForm.username.toLowerCase()];
                  if (u && u.password === loginForm.password) { setUser(u); setLoginError(''); }
                  else setLoginError('Credenziali non valide');
                }}
                style={{ ...S.btn, ...S.btnPrimary, padding: '16px', fontSize: 16, marginTop: 8 }}
              >
                Accedi
              </button>
            </div>
            
            <p style={{ textAlign: 'center', marginTop: 32, color: COLORS.gray500, fontSize: 12 }}>v11.0 • Top Manager Edition</p>
          </div>
        </div>
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN APP - REPORT UNIFICATO
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <>
      <Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1" /></Head>
      <div style={S.container}>
        {/* HEADER */}
        <header style={S.header}>
          <div style={S.logo}>
            <span style={S.logoText}>LEADER</span>
            <span style={S.logoSub}>RANKING</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ ...S.badge, background: `${COLORS.primary}15`, color: COLORS.primary }}>{user.role.toUpperCase()}</span>
            <span style={{ color: COLORS.gray500, fontSize: 14 }}>{user.name}</span>
            <button onClick={() => { setUser(null); setReportData(null); setReportCSVs({ ivd: null, energy: null, fv: null, seminari: null }); }} style={{ ...S.btn, ...S.btnOutline, padding: '8px 16px' }}>
              Esci
            </button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main style={{ padding: 24, maxWidth: 1600, margin: '0 auto' }}>
          
          {/* UPLOAD AREA */}
          <div style={{ ...S.card, marginBottom: 24 }}>
            <h2 style={S.cardTitle}>📊 Report Aggregato</h2>
            <p style={{ color: COLORS.gray500, marginBottom: 20 }}>Carica i CSV per generare il report completo con classifiche, statistiche e analytics</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
              {[
                { key: 'ivd', label: 'IVD Attivati', emoji: '🟠', color: COLORS.warning },
                { key: 'energy', label: 'Luce Amica', emoji: '⚡', color: COLORS.gold },
                { key: 'fv', label: 'Fotovoltaico', emoji: '☀️', color: COLORS.primary },
                { key: 'seminari', label: 'Seminari', emoji: '🎓', color: COLORS.success },
              ].map(({ key, label, emoji, color }) => (
                <div key={key} style={{ background: reportCSVs[key] ? `${color}10` : COLORS.gray100, borderRadius: 12, padding: 20, border: `2px solid ${reportCSVs[key] ? color : COLORS.gray200}`, transition: 'all 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 24 }}>{emoji}</span>
                    <span style={{ fontWeight: 600, color: COLORS.gray700 }}>{label}</span>
                  </div>
                  <input type="file" accept=".csv" id={`csv-${key}`} style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV(key, e.target.files[0]); }} />
                  <label htmlFor={`csv-${key}`} style={{ display: 'block', cursor: 'pointer', padding: 12, background: COLORS.white, borderRadius: 8, textAlign: 'center', color: reportCSVs[key] ? COLORS.success : COLORS.gray500, fontSize: 13, fontWeight: 500, border: `1px dashed ${reportCSVs[key] ? COLORS.success : COLORS.gray300}` }}>
                    {reportCSVs[key] ? `✓ ${reportCSVs[key].rows} righe caricate` : 'Clicca per caricare'}
                  </label>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={generateReport} disabled={isLoading} style={{ ...S.btn, ...S.btnPrimary, flex: 1, opacity: isLoading ? 0.7 : 1 }}>
                {isLoading ? '⏳ Elaborazione...' : '📊 GENERA REPORT'}
              </button>
              <button onClick={() => { setReportCSVs({ ivd: null, energy: null, fv: null, seminari: null }); setReportData(null); }} style={{ ...S.btn, ...S.btnOutline }}>
                🗑️ Reset
              </button>
            </div>
          </div>

          {/* REPORT RESULTS */}
          {reportData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* HEATMAP CALENDARIO */}
              {Object.keys(reportData.heatmapMesi).length > 0 && (
                <div style={S.card}>
                  <h3 style={S.cardTitle}>🗓️ Calendario Attività</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                    {Object.entries(reportData.heatmapMesi).map(([type, data]) => {
                      const info = { fv: { emoji: '☀️', label: 'Fotovoltaico', color: COLORS.primary }, energy: { emoji: '⚡', label: 'Luce Amica', color: COLORS.gold }, seminari: { emoji: '🎓', label: 'Seminari', color: COLORS.success }, ivd: { emoji: '🟠', label: 'Attivati', color: COLORS.warning } }[type];
                      if (!info) return null;
                      const mesiNomi = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
                      const max = Math.max(...data.mesi, 1);
                      const total = data.mesi.reduce((a,b) => a+b, 0);
                      return (
                        <div key={type} style={{ background: COLORS.gray100, borderRadius: 12, padding: 16, border: `1px solid ${COLORS.gray200}` }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <span style={{ fontWeight: 600, color: info.color }}>{info.emoji} {info.label}</span>
                            <span style={{ fontSize: 20, fontWeight: 800, color: info.color }}>{total}</span>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
                            {data.mesi.map((val, i) => {
                              const intensity = val / max;
                              const bg = val === 0 ? COLORS.gray200 : intensity > 0.7 ? COLORS.success : intensity > 0.3 ? COLORS.gold : COLORS.danger;
                              return (
                                <div key={i} style={{ height: 44, borderRadius: 8, background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.transform = 'scale(1.05)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'}>
                                  <span style={{ fontSize: 9, color: val === 0 ? COLORS.gray500 : COLORS.white, fontWeight: 500 }}>{mesiNomi[i]}</span>
                                  {val > 0 && <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.white }}>{val}</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PILASTRO FOTOVOLTAICO */}
              {reportData.pilastri.fv && (
                <div style={S.card}>
                  <h3 style={S.cardTitle}><span style={{ fontSize: 28 }}>☀️</span> Pilastro Fotovoltaico</h3>
                  
                  {/* Funnel */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ ...S.statBig, color: COLORS.primary }}>{reportData.pilastri.fv.funnel.inseriti}</div>
                      <div style={S.statLabel}>Inseriti</div>
                    </div>
                    <span style={{ fontSize: 24, color: COLORS.gray300 }}>→</span>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ ...S.statBig, color: COLORS.success }}>{reportData.pilastri.fv.funnel.positivi}</div>
                      <div style={S.statLabel}>🟢 Positivi ({reportData.pilastri.fv.funnel.pctPositivi}%)</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ ...S.statBig, color: COLORS.gold }}>{reportData.pilastri.fv.funnel.lavorazione}</div>
                      <div style={S.statLabel}>🟡 Lavorazione</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ ...S.statBig, color: COLORS.danger }}>{reportData.pilastri.fv.funnel.negativi}</div>
                      <div style={S.statLabel}>🔴 Persi ({reportData.pilastri.fv.funnel.pctNegativi}%)</div>
                    </div>
                  </div>

                  {/* Stati raggruppati */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                    {[
                      { label: 'POSITIVI', color: COLORS.success, items: reportData.pilastri.fv.statiDettaglio.filter(([s]) => STATO_MAP_FV[s] === 'positivo') },
                      { label: 'LAVORAZIONE', color: COLORS.gold, items: reportData.pilastri.fv.statiDettaglio.filter(([s]) => STATO_MAP_FV[s] === 'lavorazione') },
                      { label: 'NEGATIVI', color: COLORS.danger, items: reportData.pilastri.fv.statiDettaglio.filter(([s]) => STATO_MAP_FV[s] === 'negativo' || !STATO_MAP_FV[s]) },
                    ].map(({ label, color, items }) => (
                      <div key={label} style={{ background: `${color}08`, borderRadius: 12, padding: 16, border: `2px solid ${color}30` }}>
                        <div style={{ fontWeight: 700, color, marginBottom: 12, fontSize: 13 }}>● {label} ({items.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {items.map(([stato, count], i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: COLORS.gray700 }}>
                              <span>{stato}</span>
                              <span style={{ fontWeight: 700, color }}>{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Classifiche */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {[
                      { title: 'K Manager', emoji: '👑', data: reportData.pilastri.fv.classifiche.k, color: COLORS.gold },
                      { title: 'Networker', emoji: '⭐', data: reportData.pilastri.fv.classifiche.nw, color: COLORS.primary },
                      { title: 'SDP', emoji: '🔵', data: reportData.pilastri.fv.classifiche.sdp, color: '#2196F3' },
                    ].map(({ title, emoji, data, color }) => (
                      <div key={title} style={{ background: COLORS.gray100, borderRadius: 12, padding: 16 }}>
                        <div style={{ fontWeight: 700, color, marginBottom: 12, fontSize: 14 }}>{emoji} {title}</div>
                        <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                          {data.slice(0, 10).map(([name, stats], i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${COLORS.gray200}`, fontSize: 12 }}>
                              <span style={{ color: COLORS.gray700, fontWeight: i < 3 ? 600 : 400 }}>{i+1}° {name}</span>
                              <div style={{ display: 'flex', gap: 8 }}>
                                <span style={{ color: COLORS.success, fontWeight: 600 }}>{stats.positivo || 0}</span>
                                <span style={{ color: COLORS.gold }}>{stats.lavorazione || 0}</span>
                                <span style={{ color: COLORS.danger }}>{stats.negativo || 0}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PILASTRO LUCE AMICA */}
              {reportData.pilastri.energy && (
                <div style={S.card}>
                  <h3 style={S.cardTitle}><span style={{ fontSize: 28 }}>⚡</span> Pilastro Luce Amica</h3>
                  
                  {/* Funnel */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ ...S.statBig, color: COLORS.gold }}>{reportData.pilastri.energy.funnel.inseriti}</div>
                      <div style={S.statLabel}>Inseriti</div>
                    </div>
                    <span style={{ fontSize: 24, color: COLORS.gray300 }}>→</span>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ ...S.statBig, color: COLORS.success }}>{reportData.pilastri.energy.funnel.accettati}</div>
                      <div style={S.statLabel}>🟢 Accettati ({reportData.pilastri.energy.funnel.pctAccettati}%)</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ ...S.statBig, color: COLORS.gold }}>{reportData.pilastri.energy.funnel.lavorabili}</div>
                      <div style={S.statLabel}>🟡 Lavorabili</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ ...S.statBig, color: COLORS.danger }}>{reportData.pilastri.energy.funnel.persi}</div>
                      <div style={S.statLabel}>🔴 Persi</div>
                    </div>
                  </div>

                  {/* Stati NWG SPA e Energia */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
                    <div style={{ background: COLORS.gray100, borderRadius: 12, padding: 16 }}>
                      <div style={{ fontWeight: 700, color: COLORS.primary, marginBottom: 12 }}>📋 Stati NWG SPA</div>
                      {reportData.pilastri.energy.statiSPA.map(([stato, count], i) => {
                        const cat = STATO_MAP_SPA[stato];
                        const color = cat === 'positivo' ? COLORS.success : cat === 'lavorabile' ? COLORS.gold : COLORS.danger;
                        return (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                              {stato}
                            </span>
                            <span style={{ fontWeight: 700, color }}>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ background: COLORS.gray100, borderRadius: 12, padding: 16 }}>
                      <div style={{ fontWeight: 700, color: COLORS.primary, marginBottom: 12 }}>⚡ Stati NWG Energia</div>
                      {reportData.pilastri.energy.statiEnergia.map(([stato, count], i) => {
                        const cat = STATO_MAP_ENERGIA[stato];
                        const color = cat === 'positivo' ? COLORS.success : cat === 'lavorabile' ? COLORS.gold : COLORS.danger;
                        return (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                              {stato}
                            </span>
                            <span style={{ fontWeight: 700, color }}>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Classifiche LA */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {[
                      { title: 'K Manager', emoji: '👑', data: reportData.pilastri.energy.classifiche.k, color: COLORS.gold },
                      { title: 'Networker', emoji: '⭐', data: reportData.pilastri.energy.classifiche.nw, color: COLORS.primary },
                      { title: 'SDP', emoji: '🔵', data: reportData.pilastri.energy.classifiche.sdp, color: '#2196F3' },
                    ].map(({ title, emoji, data, color }) => (
                      <div key={title} style={{ background: COLORS.gray100, borderRadius: 12, padding: 16 }}>
                        <div style={{ fontWeight: 700, color, marginBottom: 12, fontSize: 14 }}>{emoji} {title} ({data.length})</div>
                        <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                          {data.slice(0, 10).map(([name, stats], i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${COLORS.gray200}`, fontSize: 12 }}>
                              <span style={{ color: COLORS.gray700, fontWeight: i < 3 ? 600 : 400 }}>{i+1}° {name}</span>
                              <span style={{ fontWeight: 700, color: COLORS.gray900 }}>{stats.total}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PILASTRO COLLABORATORI */}
              {reportData.pilastri.collaboratori && (
                <div style={S.card}>
                  <h3 style={S.cardTitle}><span style={{ fontSize: 28 }}>🎓</span> Pilastro Collaboratori</h3>
                  
                  {/* Funnel */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ ...S.statBig, color: COLORS.primary }}>{reportData.pilastri.collaboratori.funnel.iscritti}</div>
                      <div style={S.statLabel}>📝 Iscritti</div>
                    </div>
                    <span style={{ fontSize: 24, color: COLORS.gray300 }}>→</span>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ ...S.statBig, color: COLORS.success }}>{reportData.pilastri.collaboratori.funnel.presenti}</div>
                      <div style={S.statLabel}>✅ Presenti ({reportData.pilastri.collaboratori.funnel.pctPresenti}%)</div>
                    </div>
                    <span style={{ fontSize: 24, color: COLORS.gray300 }}>→</span>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ ...S.statBig, color: COLORS.warning }}>{reportData.pilastri.collaboratori.funnel.attivati}</div>
                      <div style={S.statLabel}>🟠 Attivati ({reportData.pilastri.collaboratori.funnel.pctAttivati}%)</div>
                    </div>
                  </div>

                  {/* Classifiche */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {[
                      { title: 'K Manager', emoji: '👑', data: reportData.pilastri.collaboratori.classifiche.k, color: COLORS.gold },
                      { title: 'Networker', emoji: '⭐', data: reportData.pilastri.collaboratori.classifiche.nw, color: COLORS.primary },
                      { title: 'SDP', emoji: '🔵', data: reportData.pilastri.collaboratori.classifiche.sdp, color: '#2196F3' },
                    ].map(({ title, emoji, data, color }) => (
                      <div key={title} style={{ background: COLORS.gray100, borderRadius: 12, padding: 16 }}>
                        <div style={{ fontWeight: 700, color, marginBottom: 12, fontSize: 14 }}>{emoji} {title}</div>
                        <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                          {data.slice(0, 10).map(([name, stats], i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${COLORS.gray200}`, fontSize: 12 }}>
                              <span style={{ color: COLORS.gray700, fontWeight: i < 3 ? 600 : 400 }}>{i+1}° {name}</span>
                              <div style={{ display: 'flex', gap: 8 }}>
                                <span style={{ color: COLORS.primary }}>{stats.iscritti || stats.total || 0}</span>
                                <span style={{ color: COLORS.success }}>{stats.presenti || 0}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ALERT + TRACKER COACHING */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 }}>
                
                {/* ALERT DA ATTIVARE */}
                {reportData.alertDaAttivare && reportData.alertDaAttivare.totale > 0 && (
                  <div style={S.card}>
                    <h3 style={S.cardTitle}><span style={{ fontSize: 24 }}>🚨</span> Alert Da Attivare</h3>
                    <p style={{ color: COLORS.gray500, marginBottom: 20, fontSize: 13 }}>Luce Amica accettati in attesa NWG Energia (limite 150g)</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {[
                        { label: 'Verde (0-30g)', color: COLORS.success, data: reportData.alertDaAttivare.verde, file: 'alert_verde_0-30g.csv' },
                        { label: 'Giallo (31-60g)', color: COLORS.gold, data: reportData.alertDaAttivare.giallo, file: 'alert_giallo_31-60g.csv' },
                        { label: 'Rosso (61-150g)', color: COLORS.danger, data: reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150), file: 'alert_rosso_61-150g.csv' },
                        { label: 'Persi (>150g)', color: COLORS.gray500, data: reportData.alertDaAttivare.rosso.filter(a => a.giorni > 150), file: 'persi_oltre_150g.csv' },
                      ].map(({ label, color, data, file }) => data.length > 0 && (
                        <div key={label} style={{ background: `${color}10`, borderRadius: 10, padding: 14, border: `2px solid ${color}30` }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <span style={{ fontWeight: 700, color, fontSize: 14 }}>● {label}: {data.length}</span>
                            <button onClick={() => downloadCSV(data, file)} style={{ padding: '6px 12px', background: color, color: COLORS.white, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>📥 CSV</button>
                          </div>
                          <div style={{ maxHeight: 80, overflowY: 'auto' }}>
                            {data.slice(0, 4).map((a, i) => (
                              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '4px 0', color: COLORS.gray700 }}>
                                <span>{a.cliente}</span>
                                <span style={{ fontWeight: 700, color }}>{a.giorni}g</span>
                              </div>
                            ))}
                            {data.length > 4 && <div style={{ fontSize: 11, color: COLORS.gray500, fontStyle: 'italic' }}>...e altri {data.length - 4}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TRACKER COACHING */}
                {reportData.trackerCoaching && reportData.trackerCoaching.totale > 0 && (
                  <div style={S.card}>
                    <h3 style={S.cardTitle}><span style={{ fontSize: 24 }}>🎯</span> Tracker Coaching IVD</h3>
                    <p style={{ color: COLORS.gray500, marginBottom: 20, fontSize: 13 }}>Milestone per IVD attivati - Tempo medio al primo risultato</p>
                    
                    {/* Medie milestone */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
                      {[
                        { label: '1° Luce Amica', emoji: '⚡', value: reportData.trackerCoaching.medie.la, pct: reportData.trackerCoaching.completamento.la, color: COLORS.gold },
                        { label: '1° Fotovoltaico', emoji: '☀️', value: reportData.trackerCoaching.medie.fv, pct: reportData.trackerCoaching.completamento.fv, color: COLORS.primary },
                        { label: '1° Iscritto', emoji: '📝', value: reportData.trackerCoaching.medie.iscritto, pct: reportData.trackerCoaching.completamento.iscritto, color: COLORS.success },
                        { label: '1° Attivato', emoji: '🟠', value: reportData.trackerCoaching.medie.attivato, pct: reportData.trackerCoaching.completamento.attivato, color: COLORS.warning },
                      ].map(({ label, emoji, value, pct, color }) => (
                        <div key={label} style={{ background: COLORS.gray100, borderRadius: 10, padding: 14, textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: COLORS.gray500, marginBottom: 4 }}>{emoji} {label}</div>
                          <div style={{ fontSize: 24, fontWeight: 800, color }}>{value !== null ? `${value}g` : '-'}</div>
                          <div style={{ fontSize: 11, color: COLORS.success, marginTop: 4 }}>{pct}% completato</div>
                        </div>
                      ))}
                    </div>

                    {/* Lista IVD */}
                    <div style={{ background: COLORS.gray100, borderRadius: 10, padding: 14, maxHeight: 200, overflowY: 'auto' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(4, 1fr)', gap: 8, marginBottom: 8, fontSize: 10, color: COLORS.gray500, fontWeight: 600 }}>
                        <span>NOME</span>
                        <span style={{ textAlign: 'center' }}>⚡ LA</span>
                        <span style={{ textAlign: 'center' }}>☀️ FV</span>
                        <span style={{ textAlign: 'center' }}>📝 Iscr</span>
                        <span style={{ textAlign: 'center' }}>🟠 Att</span>
                      </div>
                      {reportData.trackerCoaching.lista.map((t, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr repeat(4, 1fr)', gap: 8, padding: '8px 0', borderBottom: `1px solid ${COLORS.gray200}`, fontSize: 12 }}>
                          <span style={{ color: COLORS.gray700, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.nome}</span>
                          <span style={{ textAlign: 'center', color: t.giorniLA !== null ? COLORS.success : COLORS.danger, fontWeight: 600 }}>{t.giorniLA !== null ? `${t.giorniLA}g` : '❌'}</span>
                          <span style={{ textAlign: 'center', color: t.giorniFV !== null ? COLORS.success : COLORS.danger, fontWeight: 600 }}>{t.giorniFV !== null ? `${t.giorniFV}g` : '❌'}</span>
                          <span style={{ textAlign: 'center', color: t.giorniIscritto !== null ? COLORS.success : COLORS.danger, fontWeight: 600 }}>{t.giorniIscritto !== null ? `${t.giorniIscritto}g` : '❌'}</span>
                          <span style={{ textAlign: 'center', color: t.giorniAttivato !== null ? COLORS.success : COLORS.danger, fontWeight: 600 }}>{t.giorniAttivato !== null ? `${t.giorniAttivato}g` : '❌'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* FOOTER */}
          <footer style={{ textAlign: 'center', padding: '40px 20px', color: COLORS.gray500, fontSize: 12 }}>
            v11.0 • Leader Ranking • Top Manager Edition
          </footer>
        </main>
      </div>
    </>
  );
}
