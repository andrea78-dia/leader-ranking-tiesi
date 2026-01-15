import React, { useState, useCallback } from 'react';
import Head from 'next/head';

// ============================================
// NWG RANKING SYSTEM - Web App v1.0
// ============================================

// Configurazione utenti
const USERS = {
  admin: { password: 'nwg2026admin', role: 'admin', name: 'Admin', canSeeAll: true },
  assistente: { password: 'nwg2026ass', role: 'assistente', name: 'Assistente', canSeeAll: true },
  tiesi_patrizio: { password: 'tiesip2026', role: 'k', name: 'Tiesi Patrizio', group: 'TIESI PATRIZIO' },
  tiesi_andrea: { password: 'tiesia2026', role: 'k', name: 'Tiesi Andrea', group: 'TIESI ANDREA' },
  magri_thomas: { password: 'magri2026', role: 'k', name: "Magrì Thomas", group: "MAGRI' THOMAS" },
  ventura_marcello: { password: 'ventura2026', role: 'k', name: 'Ventura Marcello', group: 'VENTURA MARCELLO' },
  colletta_leonardo: { password: 'colletta2026', role: 'k', name: 'Colletta Leonardo', group: 'COLLETTA LEONARDO' },
};

// Lista dei K per il filtro
const K_NAMES = [
  'TIESI PATRIZIO', 'TIESI ANDREA', "MAGRI' THOMAS", 
  'VENTURA MARCELLO', 'COLLETTA LEONARDO'
];

export default function Home() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [csvData, setCsvData] = useState(null);
  const [rankings, setRankings] = useState(null);
  const [selectedRanking, setSelectedRanking] = useState('ivd_iscritti');
  const [excludeK, setExcludeK] = useState(false);
  const [eventName, setEventName] = useState('SEMINARIO');
  const [eventDate, setEventDate] = useState('14 GENNAIO 2026');

  // LOGIN
  const handleLogin = () => {
    const userConfig = USERS[loginForm.username.toLowerCase().replace(/\s+/g, '_')];
    if (userConfig && userConfig.password === loginForm.password) {
      setUser({ ...userConfig, username: loginForm.username });
      setLoginError('');
    } else {
      setLoginError('Username o password non validi');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCsvData(null);
    setRankings(null);
    setLoginForm({ username: '', password: '' });
  };

  // CSV PARSER
  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(/[,;]/).map(h => h.trim().replace(/"/g, ''));
    
    return lines.slice(1).map(line => {
      const values = [];
      let current = '';
      let inQuotes = false;
      
      for (let char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if ((char === ',' || char === ';') && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      const row = {};
      headers.forEach((h, i) => {
        row[h] = (values[i] || '').replace(/"/g, '');
      });
      return row;
    });
  };

  // FILE UPLOAD
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = parseCSV(event.target.result);
        setCsvData(data);
        generateRankings(data, excludeK);
      } catch (err) {
        alert('Errore nel parsing del CSV: ' + err.message);
      }
    };
    reader.readAsText(file, 'UTF-8');
  };

  // GENERA CLASSIFICHE
  const generateRankings = useCallback((data, filterK) => {
    const isK = (name) => K_NAMES.some(k => name.toUpperCase().includes(k));
    
    // IVD Stats
    const ivdStats = {};
    data.forEach(row => {
      let ivd = (row['Nome Intermediario'] || '').trim();
      if (!ivd) return;
      if (filterK && isK(ivd)) return;
      
      const presente = (row['Presente SI'] || '').toLowerCase() === 'si';
      
      if (!ivdStats[ivd]) ivdStats[ivd] = { iscritti: 0, presenti: 0 };
      ivdStats[ivd].iscritti++;
      if (presente) ivdStats[ivd].presenti++;
    });

    // Networker Stats
    const nwStats = {};
    data.forEach(row => {
      let nw = (row['Nome Primo Networker'] || '').trim();
      if (!nw) return;
      if (filterK && isK(nw)) return;
      
      const presente = (row['Presente SI'] || '').toLowerCase() === 'si';
      
      if (!nwStats[nw]) nwStats[nw] = { iscritti: 0, presenti: 0 };
      nwStats[nw].iscritti++;
      if (presente) nwStats[nw].presenti++;
    });

    // K Stats
    const kStats = {};
    data.forEach(row => {
      let k = (row['Nome Primo K'] || '').trim();
      if (!k) return;
      
      const presente = (row['Presente SI'] || '').toLowerCase() === 'si';
      
      if (!kStats[k]) kStats[k] = { iscritti: 0, presenti: 0 };
      kStats[k].iscritti++;
      if (presente) kStats[k].presenti++;
    });

    const totals = {
      iscritti: data.length,
      presenti: data.filter(r => (r['Presente SI'] || '').toLowerCase() === 'si').length
    };

    const sortByIscritti = (a, b) => b[1].iscritti - a[1].iscritti || a[0].localeCompare(b[0]);
    const sortByPresenti = (a, b) => b[1].presenti - a[1].presenti || b[1].iscritti - a[1].iscritti;

    setRankings({
      ivd_iscritti: Object.entries(ivdStats).sort(sortByIscritti),
      ivd_presenti: Object.entries(ivdStats).filter(([,v]) => v.presenti > 0).sort(sortByPresenti),
      nw: Object.entries(nwStats).sort(sortByIscritti),
      k: Object.entries(kStats).sort(sortByIscritti),
      totals,
      excludeK: filterK
    });
  }, []);

  const toggleExcludeK = () => {
    const newValue = !excludeK;
    setExcludeK(newValue);
    if (csvData) {
      generateRankings(csvData, newValue);
    }
  };

  // Helper per ottenere dati classifica
  const getRankingData = () => {
    if (!rankings) return [];
    
    if (user.role === 'k' && !user.canSeeAll && selectedRanking === 'k') {
      return rankings.k.filter(([name]) => 
        name.toUpperCase().includes(user.group.toUpperCase())
      );
    }
    
    switch(selectedRanking) {
      case 'ivd_iscritti': return rankings.ivd_iscritti;
      case 'ivd_presenti': return rankings.ivd_presenti;
      case 'nw': return rankings.nw;
      case 'k': return rankings.k;
      default: return [];
    }
  };

  // LOGIN SCREEN
  if (!user) {
    return (
      <>
        <Head>
          <title>Leader Ranking - Login</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div style={styles.loginContainer}>
          <div style={styles.loginCard}>
            <div style={styles.loginLogo}>
              <span style={styles.logoLeader}>LEADER</span>
              <span style={styles.logoTiesi}>RANKING</span>
            </div>
            <h1 style={styles.loginTitle}>Team Tiesi</h1>
            <p style={styles.loginSubtitle}>Accedi per gestire le classifiche</p>
            
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Username</label>
              <input
                type="text"
                style={styles.input}
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                placeholder="Inserisci username"
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Password</label>
              <input
                type="password"
                style={styles.input}
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            {loginError && <p style={styles.error}>{loginError}</p>}
            
            <button style={styles.loginButton} onClick={handleLogin}>
              Accedi
            </button>
          </div>
        </div>
      </>
    );
  }

  // MAIN DASHBOARD
  return (
    <>
      <Head>
        <title>Leader Ranking - Team Tiesi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={styles.dashboard}>
        {/* HEADER */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <span style={styles.headerLogo}>LEADER RANKING</span>
            <span style={styles.headerRole}>{user.role.toUpperCase()}</span>
          </div>
          <div style={styles.headerRight}>
            <span style={styles.userName}>👤 {user.name}</span>
            <button style={styles.logoutBtn} onClick={handleLogout}>Esci</button>
          </div>
        </header>

        <main style={styles.main}>
          {/* SIDEBAR */}
          <aside style={styles.sidebar}>
            <h3 style={styles.sidebarTitle}>📊 Classifiche</h3>
            
            {['ivd_iscritti', 'ivd_presenti', 'nw', 'k'].map(type => (
              <button 
                key={type}
                style={{
                  ...styles.menuItem, 
                  ...(selectedRanking === type ? styles.menuItemActive : {})
                }}
                onClick={() => setSelectedRanking(type)}
              >
                {type === 'ivd_iscritti' && '🟠 IVD Iscritti'}
                {type === 'ivd_presenti' && '🟢 IVD Presenti'}
                {type === 'nw' && '🟣 Networker'}
                {type === 'k' && '🟡 Primo K'}
              </button>
            ))}

            <div style={styles.divider}></div>

            {/* FILTRO K */}
            {(user.role === 'admin' || user.role === 'assistente') && (
              <div style={styles.filterSection}>
                <h4 style={styles.filterTitle}>⚙️ Filtri</h4>
                <label style={styles.toggleLabel}>
                  <input 
                    type="checkbox" 
                    checked={excludeK}
                    onChange={toggleExcludeK}
                    style={styles.checkbox}
                  />
                  <span style={styles.toggleText}>Escludi K</span>
                </label>
                {excludeK && (
                  <p style={styles.filterNote}>⚠️ K esclusi da IVD e Networker</p>
                )}
              </div>
            )}

            <div style={styles.divider}></div>

            {/* EVENT CONFIG */}
            {(user.role === 'admin' || user.role === 'assistente') && (
              <div style={styles.eventConfig}>
                <h4 style={styles.filterTitle}>📅 Evento</h4>
                <input
                  type="text"
                  style={styles.inputSmall}
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Nome evento"
                />
                <input
                  type="text"
                  style={styles.inputSmall}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="Data evento"
                />
              </div>
            )}
          </aside>

          {/* CONTENT */}
          <section style={styles.content}>
            {/* UPLOAD */}
            {(user.role === 'admin' || user.role === 'assistente') && (
              <div style={styles.uploadSection}>
                <h2 style={styles.sectionTitle}>📤 Carica CSV</h2>
                <div style={styles.uploadBox}>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    style={styles.fileInput}
                    id="csvUpload"
                  />
                  <label htmlFor="csvUpload" style={styles.uploadLabel}>
                    {csvData ? `✅ ${csvData.length} righe caricate` : '📁 Seleziona file CSV'}
                  </label>
                </div>
              </div>
            )}

            {/* RANKINGS */}
            {rankings ? (
              <div style={styles.rankingSection}>
                <div style={styles.rankingHeader}>
                  <h2 style={styles.sectionTitle}>
                    {selectedRanking === 'ivd_iscritti' && '🟠 Classifica IVD - Iscritti'}
                    {selectedRanking === 'ivd_presenti' && '🟢 Classifica IVD - Presenti'}
                    {selectedRanking === 'nw' && '🟣 Classifica Networker'}
                    {selectedRanking === 'k' && '🟡 Classifica Primo K'}
                  </h2>
                  <div style={styles.statsBox}>
                    <span style={styles.statItem}>
                      <span style={styles.statLabel}>Iscritti</span>
                      <span style={styles.statValue}>{rankings.totals.iscritti}</span>
                    </span>
                    <span style={styles.statItem}>
                      <span style={styles.statLabel}>Presenti</span>
                      <span style={styles.statValueGreen}>{rankings.totals.presenti}</span>
                    </span>
                    <span style={styles.statItem}>
                      <span style={styles.statLabel}>Conv.</span>
                      <span style={styles.statValueBlue}>
                        {Math.round(rankings.totals.presenti / rankings.totals.iscritti * 100)}%
                      </span>
                    </span>
                  </div>
                </div>

                {rankings.excludeK && selectedRanking !== 'k' && (
                  <div style={styles.filterBadge}>🚫 K esclusi dalla classifica</div>
                )}

                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>#</th>
                        <th style={{...styles.th, textAlign: 'left'}}>Nome</th>
                        <th style={styles.th}>Iscritti</th>
                        <th style={styles.th}>Presenti</th>
                        <th style={styles.th}>Conv. %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getRankingData().map(([name, stats], index) => {
                        const pct = stats.iscritti > 0 ? Math.round(stats.presenti / stats.iscritti * 100) : 0;
                        return (
                          <tr key={name} style={index === 0 ? styles.trFirst : styles.tr}>
                            <td style={styles.tdPos}>
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}°`}
                            </td>
                            <td style={styles.tdName}>{name}</td>
                            <td style={styles.tdNum}>{stats.iscritti}</td>
                            <td style={styles.tdNumGreen}>{stats.presenti}</td>
                            <td style={styles.tdPct}>
                              <div style={styles.pctBar}>
                                <div style={{
                                  ...styles.pctFill,
                                  width: `${pct}%`,
                                  background: pct >= 70 ? '#4CAF50' : pct >= 40 ? '#FFC107' : '#FF5722'
                                }}></div>
                              </div>
                              <span>{pct}%</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {(user.role === 'admin' || user.role === 'assistente') && (
                  <div style={styles.exportSection}>
                    <button style={styles.exportBtn}>📸 Genera PNG</button>
                    <button style={styles.exportBtnSecondary}>💾 Salva su Drive</button>
                  </div>
                )}
              </div>
            ) : (
              <div style={styles.noData}>
                <span style={styles.noDataIcon}>📊</span>
                <h3>Nessun dato caricato</h3>
                <p>Carica un file CSV per generare le classifiche</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

// STYLES
const styles = {
  loginContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
  loginCard: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '50px 40px',
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center',
  },
  loginLogo: { marginBottom: '20px' },
  logoLeader: { fontSize: '38px', fontWeight: '800', color: '#7C4DFF', letterSpacing: '3px' },
  logoTiesi: { fontSize: '38px', fontWeight: '300', color: 'white', marginLeft: '10px' },
  loginTitle: { fontSize: '28px', fontWeight: '600', color: 'white', marginBottom: '8px' },
  loginSubtitle: { fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '30px' },
  inputGroup: { marginBottom: '20px', textAlign: 'left' },
  inputLabel: { display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' },
  input: { width: '100%', padding: '15px 18px', fontSize: '16px', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none', boxSizing: 'border-box' },
  error: { color: '#FF5252', fontSize: '14px', marginBottom: '15px' },
  loginButton: { width: '100%', padding: '16px', fontSize: '16px', fontWeight: '700', border: 'none', borderRadius: '12px', background: 'linear-gradient(135deg, #7C4DFF, #536DFE)', color: 'white', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '10px' },

  dashboard: { minHeight: '100vh', background: '#0f0f1a', color: 'white', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '15px' },
  headerLogo: { fontSize: '22px', fontWeight: '800', color: '#7C4DFF', letterSpacing: '2px' },
  headerRole: { fontSize: '11px', padding: '5px 12px', background: 'rgba(124,77,255,0.2)', color: '#7C4DFF', borderRadius: '20px', fontWeight: '700' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '20px' },
  userName: { fontSize: '14px', color: 'rgba(255,255,255,0.7)' },
  logoutBtn: { padding: '8px 20px', fontSize: '13px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', background: 'transparent', color: 'white', cursor: 'pointer' },

  main: { display: 'flex', minHeight: 'calc(100vh - 60px)' },
  sidebar: { width: '280px', background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '25px 20px' },
  sidebarTitle: { fontSize: '13px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' },
  menuItem: { display: 'block', width: '100%', padding: '14px 18px', fontSize: '14px', fontWeight: '500', border: 'none', borderRadius: '10px', background: 'transparent', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', textAlign: 'left', marginBottom: '5px' },
  menuItemActive: { background: 'rgba(124,77,255,0.2)', color: '#7C4DFF' },
  divider: { height: '1px', background: 'rgba(255,255,255,0.1)', margin: '20px 0' },
  filterSection: { padding: '0 5px' },
  filterTitle: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' },
  toggleLabel: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  checkbox: { width: '18px', height: '18px', accentColor: '#7C4DFF' },
  toggleText: { fontSize: '13px', color: 'rgba(255,255,255,0.8)' },
  filterNote: { fontSize: '11px', color: '#FFC107', marginTop: '10px', padding: '8px 10px', background: 'rgba(255,193,7,0.1)', borderRadius: '6px' },
  eventConfig: { padding: '0 5px' },
  inputSmall: { width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', marginBottom: '10px', outline: 'none', boxSizing: 'border-box' },

  content: { flex: 1, padding: '30px', overflowY: 'auto' },
  sectionTitle: { fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '20px' },
  uploadSection: { marginBottom: '30px' },
  uploadBox: { border: '2px dashed rgba(124,77,255,0.3)', borderRadius: '12px', padding: '30px', textAlign: 'center' },
  fileInput: { display: 'none' },
  uploadLabel: { display: 'inline-block', padding: '15px 30px', fontSize: '15px', fontWeight: '600', color: '#7C4DFF', cursor: 'pointer', borderRadius: '10px', background: 'rgba(124,77,255,0.1)' },

  rankingSection: { background: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '25px', border: '1px solid rgba(255,255,255,0.05)' },
  rankingHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' },
  statsBox: { display: 'flex', gap: '20px' },
  statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  statLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' },
  statValue: { fontSize: '24px', fontWeight: '700', color: '#FF6B35' },
  statValueGreen: { fontSize: '24px', fontWeight: '700', color: '#4CAF50' },
  statValueBlue: { fontSize: '24px', fontWeight: '700', color: '#7C4DFF' },
  filterBadge: { display: 'inline-block', padding: '8px 15px', fontSize: '12px', background: 'rgba(255,193,7,0.15)', color: '#FFC107', borderRadius: '20px', marginBottom: '15px' },

  tableContainer: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '12px 15px', fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.05)' },
  trFirst: { background: 'rgba(124,77,255,0.1)', borderBottom: '1px solid rgba(124,77,255,0.2)' },
  tdPos: { padding: '15px', fontSize: '18px', textAlign: 'center', width: '60px' },
  tdName: { padding: '15px', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' },
  tdNum: { padding: '15px', fontSize: '18px', fontWeight: '700', textAlign: 'center', color: '#FF6B35' },
  tdNumGreen: { padding: '15px', fontSize: '18px', fontWeight: '700', textAlign: 'center', color: '#4CAF50' },
  tdPct: { padding: '15px', width: '150px' },
  pctBar: { height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '5px' },
  pctFill: { height: '100%', borderRadius: '4px' },

  exportSection: { display: 'flex', gap: '15px', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' },
  exportBtn: { padding: '14px 28px', fontSize: '14px', fontWeight: '700', border: 'none', borderRadius: '10px', background: 'linear-gradient(135deg, #7C4DFF, #536DFE)', color: 'white', cursor: 'pointer' },
  exportBtnSecondary: { padding: '14px 28px', fontSize: '14px', fontWeight: '600', border: '2px solid rgba(124,77,255,0.5)', borderRadius: '10px', background: 'transparent', color: '#7C4DFF', cursor: 'pointer' },

  noData: { textAlign: 'center', padding: '80px 20px', color: 'rgba(255,255,255,0.4)' },
  noDataIcon: { fontSize: '60px', display: 'block', marginBottom: '20px' },
};
