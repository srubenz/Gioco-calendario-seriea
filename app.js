// Data per le 20 squadre della Serie A 2026-2027 con Stemmi Ufficiali HD
const SERIE_A_TEAMS = [
  { id: 'inter', name: 'Inter', fullName: 'FC Internazionale Milano', short: 'INT', primaryColor: '#0055a5', secondaryColor: '#000000', logo: 'https://crests.football-data.org/108.png' },
  { id: 'juventus', name: 'Juventus', fullName: 'Juventus FC', short: 'JUV', primaryColor: '#000000', secondaryColor: '#ffffff', logo: 'https://crests.football-data.org/109.png' },
  { id: 'milan', name: 'Milan', fullName: 'AC Milan', short: 'MIL', primaryColor: '#cc0000', secondaryColor: '#000000', logo: 'https://crests.football-data.org/98.png' },
  { id: 'napoli', name: 'Napoli', fullName: 'SSC Napoli', short: 'NAP', primaryColor: '#0080ff', secondaryColor: '#ffffff', logo: 'https://crests.football-data.org/113.png' },
  { id: 'atalanta', name: 'Atalanta', fullName: 'Atalanta BC', short: 'ATA', primaryColor: '#1e3a8a', secondaryColor: '#000000', logo: 'https://crests.football-data.org/102.png' },
  { id: 'roma', name: 'Roma', fullName: 'AS Roma', short: 'ROM', primaryColor: '#8b0000', secondaryColor: '#ffcc00', logo: 'https://crests.football-data.org/100.png' },
  { id: 'lazio', name: 'Lazio', fullName: 'SS Lazio', short: 'LAZ', primaryColor: '#87ceeb', secondaryColor: '#ffffff', logo: 'https://crests.football-data.org/110.png' },
  { id: 'fiorentina', name: 'Fiorentina', fullName: 'ACF Fiorentina', short: 'FIO', primaryColor: '#4b0082', secondaryColor: '#ffffff', logo: 'https://crests.football-data.org/99.png' },
  { id: 'bologna', name: 'Bologna', fullName: 'Bologna FC 1909', short: 'BOL', primaryColor: '#990000', secondaryColor: '#002244', logo: 'https://crests.football-data.org/103.png' },
  { id: 'torino', name: 'Torino', fullName: 'Torino FC', short: 'TOR', primaryColor: '#800000', secondaryColor: '#ffffff', logo: 'https://crests.football-data.org/586.png' },
  { id: 'genoa', name: 'Genoa', fullName: 'Genoa CFC', short: 'GEN', primaryColor: '#cc0000', secondaryColor: '#002050', logo: 'https://crests.football-data.org/107.png' },
  { id: 'parma', name: 'Parma', fullName: 'Parma Calcio 1913', short: 'PAR', primaryColor: '#ffcc00', secondaryColor: '#003399', logo: 'https://crests.football-data.org/112.png' },
  { id: 'como', name: 'Como', fullName: 'Como 1907', short: 'COM', primaryColor: '#0055a5', secondaryColor: '#ffffff', logo: 'https://crests.football-data.org/1075.png' },
  { id: 'cagliari', name: 'Cagliari', fullName: 'Cagliari Calcio', short: 'CAG', primaryColor: '#800000', secondaryColor: '#000080', logo: 'https://crests.football-data.org/104.png' },
  { id: 'udinese', name: 'Udinese', fullName: 'Udinese Calcio', short: 'UDI', primaryColor: '#000000', secondaryColor: '#ffffff', logo: 'https://crests.football-data.org/115.png' },
  { id: 'lecce', name: 'Lecce', fullName: 'US Lecce', short: 'LEC', primaryColor: '#ffe600', secondaryColor: '#d00000', logo: 'https://crests.football-data.org/5890.png' },
  { id: 'sassuolo', name: 'Sassuolo', fullName: 'US Sassuolo Calcio', short: 'SAS', primaryColor: '#008000', secondaryColor: '#000000', logo: 'https://upload.wikimedia.org/wikipedia/it/a/a4/Ussassuolostemma.svg' },
  { id: 'venezia', name: 'Venezia', fullName: 'Venezia FC', short: 'VEN', primaryColor: '#ff6600', secondaryColor: '#006633', logo: 'https://crests.football-data.org/454.png' },
  { id: 'frosinone', name: 'Frosinone', fullName: 'Frosinone Calcio', short: 'FRO', primaryColor: '#ffcc00', secondaryColor: '#003399', logo: 'https://crests.football-data.org/470.png' },
  { id: 'monza', name: 'Monza', fullName: 'AC Monza', short: 'MON', primaryColor: '#d00000', secondaryColor: '#ffffff', logo: 'https://crests.football-data.org/5911.png' }
];

const MATCHDAY_2_FIXTURES = [
  { home: 'Inter', away: 'Lecce', time: '18:00' },
  { home: 'Juventus', away: 'Roma', time: '20:45' },
  { home: 'Napoli', away: 'Bologna', time: '18:00' },
  { home: 'Milan', away: 'Torino', time: '20:45' },
  { home: 'Atalanta', away: 'Fiorentina', time: '18:30' },
  { home: 'Lazio', away: 'Venezia', time: '20:45' }
];

const CLOUD_SYNC_ENDPOINT = 'https://api.npoint.io/';
const MASTER_REGISTRY_BIN_ID = '35f3b73eb23bb19a16f2';

// SINTETIZZATORE AUDIO RETRO 8-BIT CON WEB AUDIO API
class RetroAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playBlip(freq = 440, duration = 0.08) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {}
  }

  playLock() {
    if (!this.enabled) return;
    this.playBlip(300, 0.1);
    setTimeout(() => this.playBlip(600, 0.15), 100);
  }

  playFanfare() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((note, idx) => {
      setTimeout(() => this.playBlip(note, 0.18), idx * 140);
    });
  }
}

const audio = new RetroAudioEngine();

// DATABASE ACCOUNT FORUM & SESSIONE UTENTE
let forumUsersStore = [];
let currentForumUser = null;
let isDevMasterMode = false;
let globalCloudRegistry = [];

let selectedSwapTeamId = null;
let selectedSwapType = null;

function toggleSound() {
  audio.enabled = !audio.enabled;
  const btn = document.getElementById('sound-toggle-btn');
  if (btn) {
    btn.innerHTML = audio.enabled ? '🔊 SUONO: ON' : '🔇 SUONO: OFF';
  }
  showToast(audio.enabled ? 'AUDIO ATTIVATO' : 'AUDIO DISATTIVATO');
}

function triggerHapticFeedback() {
  if (navigator.vibrate) {
    try { navigator.vibrate(15); } catch (e) {}
  }
}

function createFallbackBadge(team) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="36" height="36">
    <path d="M50 5 L90 20 L90 60 Q50 95 50 95 Q50 95 10 60 L10 20 Z" fill="${team.primaryColor}" stroke="${team.secondaryColor}" stroke-width="4"/>
    <text x="50" y="58" font-family="Courier New, monospace" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">${team.short.slice(0, 2)}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// STRUTTURA MULTI-LEGA E SESSIONE
let leagues = [];          
let activeLeagueId = null; 
let actualStandings = [];  

// DOM Elements
const screenStart = document.getElementById('screen-start');
const screenApp = document.getElementById('screen-app');
const predictContainer = document.getElementById('predict-list');
const actualContainer = document.getElementById('actual-list');
const participantSelect = document.getElementById('participant-select');
const activeParticipantNameEl = document.getElementById('active-participant-name');
const lockStatusBadge = document.getElementById('lock-status-badge');
const lockBtn = document.getElementById('lock-btn');
const matchdayDisplay = document.getElementById('matchday-display');
const leagueParticipantsList = document.getElementById('league-participants-list');
const leagueLeaderboardBody = document.getElementById('league-leaderboard-body');
const matchdayStatusText = document.getElementById('matchday-status-text');
const leagueSwitcher = document.getElementById('league-switcher');
const cloudStatusBadge = document.getElementById('cloud-status-badge');
const podiumModal = document.getElementById('podium-modal');
const podiumWrapper = document.getElementById('podium-steps-wrapper');
const devMasterModal = document.getElementById('dev-master-modal');
const adminOnlyControls = document.getElementById('admin-only-controls');
const roleBadgeDisplay = document.getElementById('role-badge-display');
const publicCloudLeaguesSelect = document.getElementById('public-cloud-leagues-select');

document.addEventListener('DOMContentLoaded', () => {
  initForumUsersData();
  initMultiLeagueData();
  setupNavigation();
  renderFixturesWidget();
  startTvClock();
  fetchGlobalCloudLeagues();
  checkUrlInvite();
  startCloudBackgroundSync();
  updateUserSessionBadge();
});

function startTvClock() {
  const clockEl = document.getElementById('tv-live-clock');
  if (!clockEl) return;
  const updateClock = () => {
    const now = new Date();
    const days = ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];
    const months = ['AGO', 'SET', 'OTT', 'NOV', 'DIC', 'GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG'];
    const day = days[now.getDay()];
    const date = String(now.getDate()).padStart(2, '0');
    const month = months[now.getMonth()];
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${day} ${date} ${month} ${hours}:${mins}:${secs}`;
  };
  updateClock();
  setInterval(updateClock, 1000);
}

// CONTROLLO AUTORIZZAZIONE VISIBILITA' LEGA PER UTENTE
function isUserParticipantInLeague(league, user = currentForumUser) {
  if (!league) return false;
  if (isDevMasterMode) return true;

  if (user && league.admin && league.admin.email) {
    if (league.admin.email.toLowerCase() === user.email.toLowerCase()) {
      return true;
    }
  }

  if (Array.isArray(league.participants)) {
    return league.participants.some(p => {
      if (user && p.email && p.email.toLowerCase() === user.email.toLowerCase()) return true;
      if (user && p.name && p.name.toUpperCase() === user.name.toUpperCase()) return true;
      return false;
    });
  }

  return false;
}

function getUserAuthorizedLeagues() {
  if (isDevMasterMode) return leagues;
  return leagues.filter(l => isUserParticipantInLeague(l));
}

async function fetchGlobalCloudLeagues() {
  try {
    const res = await fetch(CLOUD_SYNC_ENDPOINT + MASTER_REGISTRY_BIN_ID);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.leagues)) {
        globalCloudRegistry = data.leagues;
        renderPublicCloudLeaguesDropdown();
      }
    }
  } catch (e) {
    renderPublicCloudLeaguesDropdown();
  }
}

async function syncGlobalCloudRegistry() {
  try {
    const payload = {
      leagues: globalCloudRegistry,
      updatedAt: Date.now()
    };
    await fetch(CLOUD_SYNC_ENDPOINT + MASTER_REGISTRY_BIN_ID, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {}
}

function renderPublicCloudLeaguesDropdown() {
  if (!publicCloudLeaguesSelect) return;
  publicCloudLeaguesSelect.innerHTML = '';

  const allAvailable = [...leagues];
  globalCloudRegistry.forEach(gr => {
    if (!allAvailable.find(l => l.id === gr.id || l.inviteCode === gr.inviteCode)) {
      allAvailable.push(gr);
    }
  });

  if (allAvailable.length === 0) {
    publicCloudLeaguesSelect.innerHTML = `<option value="">NESSUNA LEGA ANCORA REGISTRATA. CREA LA PRIMA LEGA!</option>`;
    return;
  }

  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = '-- SELEZIONA UNA LEGA DAL CLOUD (' + allAvailable.length + ' DISPONIBILI) --';
  publicCloudLeaguesSelect.appendChild(defaultOpt);

  allAvailable.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.inviteCode || l.id;
    opt.textContent = `🏆 ${l.name} [CODICE: ${l.inviteCode || l.id}] (Admin: ${l.admin ? l.admin.name : 'Ruben'})`;
    publicCloudLeaguesSelect.appendChild(opt);
  });
}

async function selectPublicCloudLeague() {
  const selectedCode = publicCloudLeaguesSelect.value;
  if (!selectedCode) {
    alert('SELEZIONA PRIMA UNA LEGA DALLA LISTA!');
    return;
  }

  document.getElementById('join-invite-code').value = selectedCode;
  
  let targetLeague = leagues.find(l => l.inviteCode === selectedCode || l.id === selectedCode || l.cloudBinId === selectedCode);
  if (!targetLeague) {
    const cloudItem = globalCloudRegistry.find(r => r.inviteCode === selectedCode || r.id === selectedCode);
    if (cloudItem && cloudItem.cloudBinId) {
      showToast('DOWNLOAD LEGA DAL CLOUD...');
      await fetchLeagueDataFromCloudBin(cloudItem.cloudBinId);
      targetLeague = leagues.find(l => l.cloudBinId === cloudItem.cloudBinId || l.inviteCode === selectedCode);
    }
  }

  if (targetLeague) {
    showToast(`SELEZIONATA LEGA "${targetLeague.name}"! INSERISCI I TUOI DATI E LA PASSWORD PER ENTRARE.`);
    document.getElementById('join-player-name').focus();
  } else {
    showToast(`CODICE LEGA ${selectedCode} IMPOSTATO! INSERISCI I TUOI DATI.`);
  }
}

async function fetchLeagueDataFromCloudBin(cloudBinId) {
  try {
    const res = await fetch(CLOUD_SYNC_ENDPOINT + cloudBinId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.league) {
        const fetchedLeague = data.league;
        fetchedLeague.cloudBinId = cloudBinId;

        const existingIdx = leagues.findIndex(l => l.id === fetchedLeague.id || l.inviteCode === fetchedLeague.inviteCode);
        if (existingIdx >= 0) {
          leagues[existingIdx] = fetchedLeague;
        } else {
          leagues.push(fetchedLeague);
        }
        activeLeagueId = fetchedLeague.id;
        saveMultiLeagues();
        return true;
      }
    }
  } catch (e) {}
  return false;
}

function isCurrentAdmin() {
  if (isDevMasterMode) return true;
  const curLeague = getActiveLeague();
  if (!curLeague) return false;

  if (currentForumUser && curLeague.admin && curLeague.admin.email) {
    if (currentForumUser.email.toLowerCase() === curLeague.admin.email.toLowerCase()) {
      return true;
    }
  }

  const activeP = getActiveParticipant();
  if (activeP && activeP.name && activeP.name.includes('(ADMIN)')) {
    return true;
  }

  return false;
}

function initForumUsersData() {
  const savedUsers = localStorage.getItem('seriea_2026_forum_users');
  if (savedUsers) {
    try {
      const parsed = JSON.parse(savedUsers);
      if (Array.isArray(parsed)) forumUsersStore = parsed;
    } catch (e) {}
  }

  const savedSession = localStorage.getItem('seriea_2026_current_user');
  if (savedSession) {
    try {
      currentForumUser = JSON.parse(savedSession);
    } catch (e) {}
  }
}

function saveForumUsers() {
  localStorage.setItem('seriea_2026_forum_users', JSON.stringify(forumUsersStore));
  if (currentForumUser) {
    localStorage.setItem('seriea_2026_current_user', JSON.stringify(currentForumUser));
  } else {
    localStorage.removeItem('seriea_2026_current_user');
  }
  updateUserSessionBadge();
}

function updateUserSessionBadge() {
  const userBadgeEl = document.getElementById('user-session-badge');
  if (!userBadgeEl) return;

  if (currentForumUser) {
    userBadgeEl.innerHTML = `
      <span style="color: var(--tv-yellow); font-weight: 700;">👤 ${currentForumUser.name}</span>
      <button class="btn" style="padding: 0.15rem 0.5rem; font-size: 0.9rem;" onclick="logoutForumUser()">🔒 ESCI</button>
    `;
  } else {
    userBadgeEl.innerHTML = `
      <span style="color: var(--tv-cyan); font-weight: 700;">👤 NON LOGGATO</span>
    `;
  }
}

function checkDevMasterAuth(userStr, passStr) {
  const u = userStr.trim().toUpperCase();
  const p = passStr.trim();
  if ((u === 'ADMIN' || u === 'ADMIN@EMAIL.COM') && p === 'brando') {
    return true;
  }
  return false;
}

function loginDirectFromStart(event) {
  if (event) event.preventDefault();

  const userOrEmail = document.getElementById('start-login-email').value.trim();
  const password = document.getElementById('start-login-password').value.trim();

  if (checkDevMasterAuth(userOrEmail, password)) {
    isDevMasterMode = true;
    showToast('🔑 BENVENUTO SVILUPPATORE MASTER (ADMIN)!');
    openDevMasterPanel();
    return;
  }

  const email = userOrEmail.toLowerCase();
  const user = forumUsersStore.find(u => u.email === email);
  if (!user) {
    alert('EMAIL NON TROVATA! REGISTRATI PRIMA CREANDO O PARTECIPANDO AD UNA LEGA.');
    return;
  }
  if (user.password !== password) {
    alert('PASSWORD ERRATA!');
    return;
  }

  currentForumUser = user;
  saveForumUsers();

  const authorizedLeagues = getUserAuthorizedLeagues();
  if (authorizedLeagues.length > 0) {
    activeLeagueId = authorizedLeagues[0].id;
    const curLeague = getActiveLeague();
    const existingP = curLeague.participants.find(p => (p.email && p.email.toLowerCase() === user.email.toLowerCase()) || p.name.toUpperCase() === user.name.toUpperCase());
    if (existingP) {
      curLeague.activeParticipantId = existingP.id;
    }
  }

  showAppScreen();
  showToast(`BENVENUTO ${user.name}! LOGIN EFFETTUATO CON SUCCESSO.`);
}

function openDevMasterPanel() {
  if (devMasterModal) {
    renderDevMasterData();
    devMasterModal.style.display = 'flex';
  }
}

function closeDevMasterModal() {
  if (devMasterModal) devMasterModal.style.display = 'none';
  showAppScreen();
}

function renderDevMasterData() {
  const leaguesContainer = document.getElementById('dev-leagues-list');
  const usersContainer = document.getElementById('dev-users-list');

  if (leaguesContainer) {
    leaguesContainer.innerHTML = '';
    if (leagues.length === 0) {
      leaguesContainer.innerHTML = `<div style="color: var(--tv-cyan);">NESSUNA LEGA SALVATA NEL SISTEMA.</div>`;
    } else {
      leagues.forEach(l => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.padding = '0.4rem 0.6rem';
        div.style.background = '#0d182e';
        div.style.borderRadius = '6px';
        div.style.fontSize = '1rem';

        const cloudUrl = l.cloudBinId ? `https://api.npoint.io/${l.cloudBinId}` : 'Non sincronizzata';

        div.innerHTML = `
          <div>
            <strong style="color: var(--tv-yellow);">${l.name}</strong> (COD: ${l.inviteCode || l.id})
            <div style="font-size: 0.85rem; color: var(--tv-cyan);">
              ADMIN: ${l.admin ? l.admin.name : 'N/A'} • BIN: <a href="${cloudUrl}" target="_blank" style="color: var(--tv-green);">${cloudUrl}</a>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.85rem; background: var(--tv-red);" onclick="deleteLeagueById('${l.id}')">ELIMINA LEGA</button>
        `;
        leaguesContainer.appendChild(div);
      });
    }
  }

  if (usersContainer) {
    usersContainer.innerHTML = '';
    if (forumUsersStore.length === 0) {
      usersContainer.innerHTML = `<div style="color: var(--tv-cyan);">NESSUN ACCOUNT UTENTE REGISTRATO.</div>`;
    } else {
      forumUsersStore.forEach(u => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.padding = '0.4rem 0.6rem';
        div.style.background = '#0d182e';
        div.style.borderRadius = '6px';
        div.style.fontSize = '1rem';

        div.innerHTML = `
          <div>
            <strong style="color: var(--tv-yellow);">👤 ${u.name}</strong> • EMAIL: <span style="color: var(--tv-white);">${u.email}</span>
            <div style="font-size: 0.85rem; color: var(--tv-magenta); font-weight: 700;">PASSWORD: ${u.password}</div>
          </div>
          <button class="btn btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.85rem; background: var(--tv-red);" onclick="deleteUserByEmail('${u.email}')">ELIMINA UTENTE</button>
        `;
        usersContainer.appendChild(div);
      });
    }
  }
}

function deleteLeagueById(leagueId) {
  if (confirm(`SEI SICURO DI VOLER ELIMINARE LA LEGA ${leagueId}?`)) {
    leagues = leagues.filter(l => l.id !== leagueId);
    globalCloudRegistry = globalCloudRegistry.filter(r => r.id !== leagueId);
    syncGlobalCloudRegistry();
    if (activeLeagueId === leagueId) {
      const authorized = getUserAuthorizedLeagues();
      activeLeagueId = authorized.length > 0 ? authorized[0].id : null;
    }
    saveMultiLeagues();
    renderDevMasterData();
    renderPublicCloudLeaguesDropdown();
    showToast('LEGA ELIMINATA DAL MASTER.');
  }
}

function deleteUserByEmail(email) {
  if (confirm(`SEI SICURO DI VOLER ELIMINARE L'UTENTE ${email}?`)) {
    forumUsersStore = forumUsersStore.filter(u => u.email !== email);
    saveForumUsers();
    renderDevMasterData();
    showToast('UTENTE ELIMINATO DALL\'ARCHIVIO FORUM.');
  }
}

function resetEntireSystemData() {
  if (confirm('⚠️ ATTENZIONE: STAI PER AZZERARE TUTTI I DATI DEL SISTEMA! CONFERMI?')) {
    localStorage.clear();
    leagues = [];
    forumUsersStore = [];
    activeLeagueId = null;
    showToast('SISTEMA RESETTATO.');
    location.reload();
  }
}

function deleteCurrentLeague() {
  if (!isCurrentAdmin()) {
    showToast('SOLO L\'ADMIN DELLA LEGA PUO\' ELIMINARLA.');
    return;
  }
  const curLeague = getActiveLeague();
  if (!curLeague) return;

  if (confirm(`⚠️ SEI SICURO DI VOLER ELIMINARE DEFINITIVAMENTE LA LEGA "${curLeague.name}"?`)) {
    leagues = leagues.filter(l => l.id !== curLeague.id);
    globalCloudRegistry = globalCloudRegistry.filter(r => r.id !== curLeague.id);
    syncGlobalCloudRegistry();
    
    const authorized = getUserAuthorizedLeagues();
    activeLeagueId = authorized.length > 0 ? authorized[0].id : null;
    
    saveMultiLeagues();
    renderPublicCloudLeaguesDropdown();
    if (activeLeagueId) {
      showAppScreen();
      showToast('LEGA ELIMINATA.');
    } else {
      showStartScreen();
      showToast('NON SEI ISCRITTO AD ALCUNA LEGA ATTIVA.');
    }
  }
}

function logoutForumUser() {
  currentForumUser = null;
  isDevMasterMode = false;
  saveForumUsers();
  showToast('DISCONNESSO CON SUCCESSO.');
  showStartScreen();
}

function switchTab(targetId) {
  audio.playBlip(500, 0.05);
  const tabs = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.view-section');

  tabs.forEach(tab => {
    if (tab.dataset.target === targetId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  sections.forEach(sec => {
    if (sec.id === targetId) {
      sec.classList.add('active');
      sec.style.display = 'block';
    } else {
      sec.classList.remove('active');
      sec.style.display = 'none';
    }
  });

  if (targetId === 'results-view') {
    updateLeagueResults();
  } else if (targetId === 'trend-view') {
    renderTrendView();
  }

  syncActiveLeagueWithCloud();
}

function setupNavigation() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.onclick = (e) => {
      e.preventDefault();
      const target = tab.dataset.target;
      switchTab(target);
    };
  });
}

function renderTrendView() {
  const curLeague = getActiveLeague();
  if (!curLeague) return;

  const leaderCard = document.getElementById('trend-leader-card');
  const tbody = document.getElementById('trend-table-body');

  const stats = curLeague.participants.map(p => {
    let totalDiff = 0;
    p.prediction.forEach((teamId, predIdx) => {
      const actualIdx = actualStandings.findIndex(t => t.id === teamId);
      totalDiff += Math.abs((predIdx + 1) - (actualIdx + 1));
    });

    const avgDiff = (totalDiff / 20).toFixed(1);
    const accuracyPct = Math.max(0, Math.round(((60 - totalDiff) / 60) * 100));

    return {
      participant: p,
      score: p.score,
      exact: p.stats ? p.stats.exact : 0,
      totalDiff: totalDiff,
      avgDiff: avgDiff,
      accuracyPct: accuracyPct
    };
  });

  stats.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.totalDiff !== b.totalDiff) return a.totalDiff - b.totalDiff;
    return b.exact - a.exact;
  });

  const leader = stats[0];
  if (leaderCard && leader) {
    leaderCard.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="color: var(--tv-yellow); font-size: 1.1rem; text-transform: uppercase; font-weight: 700;">👑 LEADER ATTUALE IN CLASSIFICA</div>
          <div style="font-size: 2.4rem; color: var(--tv-white); font-weight: 700;">${leader.participant.name}</div>
          <div style="font-size: 1.1rem; color: var(--tv-cyan);">
            PROIEZIONE PUNTEGGIO: <strong style="color: var(--tv-green);">${leader.score} PTS</strong> • SCARTO MEDIO: <strong>${leader.avgDiff} posiz.</strong>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 3.5rem; color: var(--tv-yellow); font-weight: 700;">${leader.accuracyPct}%</div>
          <div style="font-size: 1rem; color: var(--tv-white);">INDICE ACCURATEZZA</div>
        </div>
      </div>
    `;
  }

  if (tbody) {
    tbody.innerHTML = '';
    stats.forEach((item, idx) => {
      const rank = idx + 1;
      let trendBadge = `<span class="phase-pill winter" style="background: var(--tv-cyan); color: #000;">📈 IN SALITA</span>`;
      if (rank === 1) trendBadge = `<span class="phase-pill final" style="background: var(--tv-yellow); color: #000;">👑 FORMA TOP</span>`;
      else if (rank === 2 || rank === 3) trendBadge = `<span class="phase-pill winter">🎯 COSTANTE</span>`;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color: var(--tv-yellow);">${rank}°</strong></td>
        <td><strong style="color: var(--tv-white);">${item.participant.name}</strong></td>
        <td><span style="color: var(--tv-green); font-weight: 700; font-size: 1.3rem;">${item.score} PTS</span></td>
        <td><span style="color: var(--tv-cyan);">${item.avgDiff} posizioni</span></td>
        <td><strong style="color: var(--tv-yellow);">${item.accuracyPct}%</strong></td>
        <td>${trendBadge}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

function initMultiLeagueData() {
  const savedLeagues = localStorage.getItem('seriea_2026_multi_leagues');
  if (savedLeagues) {
    try {
      const parsed = JSON.parse(savedLeagues);
      if (Array.isArray(parsed) && parsed.length > 0) {
        leagues = parsed;
      }
    } catch (e) {}
  }

  activeLeagueId = localStorage.getItem('seriea_2026_active_league_id');
  if (!activeLeagueId || !leagues.find(l => l.id === activeLeagueId)) {
    const authorized = getUserAuthorizedLeagues();
    if (authorized.length > 0) {
      activeLeagueId = authorized[0].id;
    } else if (leagues.length > 0) {
      activeLeagueId = leagues[0].id;
    }
  }

  const savedActual = localStorage.getItem('seriea_2026_actual_standings');
  if (savedActual) {
    try {
      const parsed = JSON.parse(savedActual);
      if (Array.isArray(parsed) && parsed.length === SERIE_A_TEAMS.length) {
        actualStandings = parsed.map(id => SERIE_A_TEAMS.find(t => t.id === id)).filter(Boolean);
      }
    } catch (e) {}
  }
  if (actualStandings.length !== SERIE_A_TEAMS.length) {
    actualStandings = [...SERIE_A_TEAMS];
  }
}

function getActiveLeague() {
  return leagues.find(l => l.id === activeLeagueId) || leagues[0];
}

function saveMultiLeagues() {
  localStorage.setItem('seriea_2026_multi_leagues', JSON.stringify(leagues));
  localStorage.setItem('seriea_2026_active_league_id', activeLeagueId);
  syncActiveLeagueToCloud();
}

function saveActual() {
  localStorage.setItem('seriea_2026_actual_standings', JSON.stringify(actualStandings.map(t => t.id)));
}

function startCloudBackgroundSync() {
  setInterval(() => {
    if (activeLeagueId) {
      syncActiveLeagueWithCloud(true);
    }
    fetchGlobalCloudLeagues();
  }, 8000);
}

function updateCloudBadgeStatus(statusText, isConnected) {
  if (!cloudStatusBadge) return;
  if (isConnected) {
    cloudStatusBadge.innerHTML = `<span style="background: var(--tv-green); color: #000; padding: 0.15rem 0.5rem; font-weight: 700; border-radius: 4px;">🟢 CLOUD ONLINE</span>`;
  } else {
    cloudStatusBadge.innerHTML = `<span style="background: var(--tv-yellow); color: #000; padding: 0.15rem 0.5rem; font-weight: 700; border-radius: 4px;">🟡 CLOUD LOCALE</span>`;
  }
}

async function syncActiveLeagueToCloud() {
  const curLeague = getActiveLeague();
  if (!curLeague) return;

  try {
    const cloudBinId = curLeague.cloudBinId;
    const payload = {
      league: curLeague,
      forumUsers: forumUsersStore,
      actualStandings: actualStandings.map(t => t.id),
      updatedAt: Date.now()
    };

    if (cloudBinId) {
      await fetch(CLOUD_SYNC_ENDPOINT + cloudBinId, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      updateCloudBadgeStatus('SYNC OK', true);
    } else {
      const res = await fetch(CLOUD_SYNC_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.id) {
          curLeague.cloudBinId = data.id;
          saveMultiLeagues();
          updateCloudBadgeStatus('BIN CREATO', true);
        }
      }
    }

    if (!globalCloudRegistry.find(r => r.id === curLeague.id)) {
      globalCloudRegistry.push({
        id: curLeague.id,
        name: curLeague.name,
        inviteCode: curLeague.inviteCode || curLeague.id,
        cloudBinId: curLeague.cloudBinId,
        admin: curLeague.admin
      });
      syncGlobalCloudRegistry();
    }
  } catch (e) {
    updateCloudBadgeStatus('OFFLINE', false);
  }
}

async function syncActiveLeagueWithCloud(isSilent = false) {
  const curLeague = getActiveLeague();
  if (!curLeague || !curLeague.cloudBinId) return;

  try {
    const res = await fetch(CLOUD_SYNC_ENDPOINT + curLeague.cloudBinId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.league && Array.isArray(data.league.participants)) {
        const remoteLeague = data.league;

        if (Array.isArray(data.forumUsers)) {
          data.forumUsers.forEach(ru => {
            if (!forumUsersStore.find(u => u.email === ru.email)) {
              forumUsersStore.push(ru);
            }
          });
          saveForumUsers();
        }

        let merged = false;
        remoteLeague.participants.forEach(rp => {
          const localP = curLeague.participants.find(p => p.id === rp.id || p.name.toUpperCase() === rp.name.toUpperCase());
          if (!localP) {
            curLeague.participants.push(rp);
            merged = true;
          } else if (rp.isLocked && !localP.isLocked) {
            localP.isLocked = true;
            localP.prediction = rp.prediction;
            merged = true;
          }
        });

        if (remoteLeague.currentMatchday > curLeague.currentMatchday) {
          curLeague.currentMatchday = remoteLeague.currentMatchday;
          merged = true;
        }

        if (merged) {
          saveMultiLeagues();
          renderLeaguePanel();
          renderPredictList();
          updateLeagueResults();
          renderTrendView();
          if (!isSilent) showToast('PRONOSTICI AGGIORNATI IN TEMPO REALE DAL CLOUD!');
        }
        updateCloudBadgeStatus('ONLINE', true);
      }
    }
  } catch (e) {
    updateCloudBadgeStatus('OFFLINE', false);
  }
}

function checkUrlInvite() {
  const urlParams = new URLSearchParams(window.location.search);
  const inviteCode = urlParams.get('invite');

  if (inviteCode) {
    const targetLeague = leagues.find(l => l.inviteCode === inviteCode || l.id === inviteCode || l.cloudBinId === inviteCode);
    if (targetLeague) {
      activeLeagueId = targetLeague.id;
      saveMultiLeagues();
      showJoinModal(targetLeague);
      return;
    }
    
    const cloudItem = globalCloudRegistry.find(r => r.inviteCode === inviteCode || r.id === inviteCode);
    if (cloudItem && cloudItem.cloudBinId) {
      fetchLeagueDataFromCloudBin(cloudItem.cloudBinId).then(success => {
        if (success) {
          const loaded = leagues.find(l => l.cloudBinId === cloudItem.cloudBinId);
          if (loaded) showJoinModal(loaded);
        }
      });
      return;
    }
  }

  const authorized = getUserAuthorizedLeagues();
  if (authorized.length > 0 && activeLeagueId) {
    showAppScreen();
  } else {
    showStartScreen();
  }
}

function showStartScreen() {
  screenStart.style.display = 'flex';
  screenApp.style.display = 'none';
  renderPublicCloudLeaguesDropdown();
}

function showAppScreen() {
  screenStart.style.display = 'none';
  screenApp.style.display = 'block';
  renderLeagueSwitcher();
  renderLeaguePanel();
  renderPredictList();
  renderActualList();
  updateLeagueResults();
  renderTrendView();
  switchTab('predict-view');
}

function renderLeagueSwitcher() {
  if (!leagueSwitcher) return;
  leagueSwitcher.innerHTML = '';

  const authorizedLeagues = getUserAuthorizedLeagues();

  if (authorizedLeagues.length === 0) {
    leagueSwitcher.innerHTML = `<option value="">NESSUNA LEGA PARTECIPATA</option>`;
    return;
  }

  authorizedLeagues.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.id;
    opt.textContent = `LEGA: ${l.name} (${l.inviteCode || l.id})`;
    if (l.id === activeLeagueId) opt.selected = true;
    leagueSwitcher.appendChild(opt);
  });
}

function switchActiveLeague(leagueId) {
  const targetLeague = leagues.find(l => l.id === leagueId);
  if (!targetLeague) return;

  if (!isUserParticipantInLeague(targetLeague)) {
    showToast('🔒 ACCESSO NEGATO: NON SEI ISCRITTO A QUESTA LEGA.');
    renderLeagueSwitcher();
    return;
  }

  activeLeagueId = leagueId;
  saveMultiLeagues();
  renderLeagueSwitcher();
  renderLeaguePanel();
  renderPredictList();
  updateLeagueResults();
  renderTrendView();
  showToast(`PASSATO ALLA LEGA: ${getActiveLeague().name}`);
  syncActiveLeagueWithCloud();
}

function createLeagueByAdmin(event) {
  if (event) event.preventDefault();
  audio.playLock();

  const adminName = document.getElementById('admin-name').value.trim().toUpperCase();
  const adminEmail = document.getElementById('admin-email').value.trim().toLowerCase();
  const adminPassword = document.getElementById('admin-password').value.trim();
  const leagueName = document.getElementById('admin-league-name').value.trim().toUpperCase() || 'LEGA SERIE A';

  if (!adminName || !adminEmail || !adminPassword) {
    alert('INSERISCI NOME, EMAIL E PASSWORD ADMIN!');
    return;
  }

  let user = forumUsersStore.find(u => u.email === adminEmail);
  if (!user) {
    user = { id: 'usr_' + Date.now(), name: adminName, email: adminEmail, password: adminPassword, createdAt: new Date().toISOString() };
    forumUsersStore.push(user);
  }
  currentForumUser = user;
  saveForumUsers();

  const randomCode = 'SERIEA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const newLeagueId = 'league_' + Date.now();
  const adminId = 'p_admin_' + Date.now();

  const newLeague = {
    id: newLeagueId,
    name: leagueName,
    inviteCode: randomCode,
    cloudBinId: null,
    admin: { name: adminName, email: adminEmail, id: adminId },
    startMatchday: 2,
    currentMatchday: 2,
    isUnlocked: false,
    participants: [
      {
        id: adminId,
        name: adminName + ' (ADMIN)',
        email: adminEmail,
        prediction: SERIE_A_TEAMS.map(t => t.id),
        isLocked: false,
        score: 0,
        stats: { exact: 0, close: 0, wrong: 0, scudettoBonus: 0, relegationBonus: 0 }
      }
    ],
    activeParticipantId: adminId
  };

  leagues.push(newLeague);
  activeLeagueId = newLeagueId;
  saveMultiLeagues();

  renderPublicCloudLeaguesDropdown();
  showAppScreen();
  showToast(`LEGA "${leagueName}" CREATA DA ${adminName}!`);
}

async function joinLeagueByInvite(event) {
  if (event) event.preventDefault();
  audio.playLock();

  const inviteCode = document.getElementById('join-invite-code').value.trim().toUpperCase();
  const playerName = document.getElementById('join-player-name').value.trim().toUpperCase();
  const playerEmail = document.getElementById('join-player-email').value.trim().toLowerCase();
  const playerPassword = document.getElementById('join-player-password').value.trim();

  if (!inviteCode || !playerName || !playerEmail || !playerPassword) {
    alert('INSERISCI CODICE LEGA, NOME, EMAIL E PASSWORD!');
    return;
  }

  let user = forumUsersStore.find(u => u.email === playerEmail);
  if (!user) {
    user = { id: 'usr_' + Date.now(), name: playerName, email: playerEmail, password: playerPassword, createdAt: new Date().toISOString() };
    forumUsersStore.push(user);
  }
  currentForumUser = user;
  saveForumUsers();

  let targetLeague = leagues.find(l => l.inviteCode === inviteCode || l.id === inviteCode || l.cloudBinId === inviteCode);
  
  if (!targetLeague) {
    const cloudItem = globalCloudRegistry.find(r => r.inviteCode === inviteCode || r.id === inviteCode);
    if (cloudItem && cloudItem.cloudBinId) {
      await fetchLeagueDataFromCloudBin(cloudItem.cloudBinId);
      targetLeague = leagues.find(l => l.cloudBinId === cloudItem.cloudBinId || l.inviteCode === inviteCode);
    }
  }

  if (!targetLeague) {
    const newLeagueId = 'league_' + Date.now();
    targetLeague = {
      id: newLeagueId,
      name: 'LEGA ' + inviteCode,
      inviteCode: inviteCode,
      cloudBinId: inviteCode.startsWith('SERIEA-') ? null : inviteCode,
      startMatchday: 2,
      currentMatchday: 2,
      isUnlocked: false,
      participants: [],
      activeParticipantId: null
    };
    leagues.push(targetLeague);
  }

  activeLeagueId = targetLeague.id;

  const existingP = targetLeague.participants.find(p => (p.email && p.email.toLowerCase() === playerEmail) || p.name.toUpperCase() === playerName);
  if (existingP) {
    existingP.email = playerEmail;
    targetLeague.activeParticipantId = existingP.id;
  } else {
    const newPlayerId = 'p_' + Date.now();
    targetLeague.participants.push({
      id: newPlayerId,
      name: playerName,
      email: playerEmail,
      prediction: SERIE_A_TEAMS.map(t => t.id),
      isLocked: false,
      score: 0,
      stats: { exact: 0, close: 0, wrong: 0, scudettoBonus: 0, relegationBonus: 0 }
    });
    targetLeague.activeParticipantId = newPlayerId;
  }

  saveMultiLeagues();
  showAppScreen();
  showToast(`BENVENUTO ${playerName}! SEI ENTRATO NELLA LEGA!`);
}

function showJoinModal(league) {
  showStartScreen();
  document.getElementById('join-invite-code').value = league.inviteCode || league.id;
  document.getElementById('join-player-name').focus();
  showToast(`INSERISCI I TUOI DATI PER ENTRARE NELLA LEGA "${league.name}"`);
}

function getActiveParticipant() {
  const curLeague = getActiveLeague();
  if (!curLeague) return null;

  if (currentForumUser) {
    const userMatch = curLeague.participants.find(p => (p.email && p.email.toLowerCase() === currentForumUser.email.toLowerCase()) || p.name.toUpperCase() === currentForumUser.name.toUpperCase());
    if (userMatch) return userMatch;
  }

  return curLeague.participants.find(p => p.id === curLeague.activeParticipantId) || curLeague.participants[0];
}

function addParticipant() {
  if (!isCurrentAdmin()) {
    showToast('SOLO L\'ADMIN PUO\' AGGIUNGERE GIOCATORI.');
    return;
  }
  const curLeague = getActiveLeague();
  const input = document.getElementById('new-participant-name');
  const name = input.value.trim().toUpperCase();
  if (!name) {
    showToast('INSERISCI UN NOME VALIDO');
    return;
  }
  const newId = 'p_' + Date.now();
  curLeague.participants.push({
    id: newId,
    name: name,
    email: '',
    prediction: SERIE_A_TEAMS.map(t => t.id),
    isLocked: false,
    score: 0,
    stats: { exact: 0, close: 0, wrong: 0, scudettoBonus: 0, relegationBonus: 0 }
  });
  curLeague.activeParticipantId = newId;
  input.value = '';
  saveMultiLeagues();
  renderLeaguePanel();
  renderPredictList();
  renderTrendView();
  showToast(`GIOCATORE "${name}" ISCRITTO!`);
}

function removeParticipant(id) {
  if (!isCurrentAdmin()) {
    showToast('SOLO L\'ADMIN PUO\' RIMUOVERE GIOCATORI.');
    return;
  }
  const curLeague = getActiveLeague();
  if (curLeague.participants.length <= 1) {
    showToast('ALMENO 1 GIOCATORE RICHIESTO.');
    return;
  }
  curLeague.participants = curLeague.participants.filter(p => p.id !== id);
  if (curLeague.activeParticipantId === id) {
    curLeague.activeParticipantId = curLeague.participants[0].id;
  }
  saveMultiLeagues();
  renderLeaguePanel();
  renderPredictList();
  renderTrendView();
  showToast('GIOCATORE RIMOSSO.');
}

function switchParticipant(id) {
  const curLeague = getActiveLeague();
  curLeague.activeParticipantId = id;
  saveMultiLeagues();
  renderLeaguePanel();
  renderPredictList();
  renderTrendView();
}

function renderLeaguePanel() {
  const curLeague = getActiveLeague();
  if (!curLeague) return;

  const isAdmin = isCurrentAdmin();

  if (roleBadgeDisplay) {
    if (isDevMasterMode) {
      roleBadgeDisplay.innerHTML = `<span style="background: var(--tv-magenta); color: #fff; padding: 0.15rem 0.5rem; font-weight: 700; border-radius: 4px;" onclick="openDevMasterPanel()" title="Apri Pannello Master Sviluppatore">🛠️ MASTER DEVELOPER</span>`;
    } else if (isAdmin) {
      roleBadgeDisplay.innerHTML = `<span style="background: var(--tv-yellow); color: #000; padding: 0.15rem 0.5rem; font-weight: 700; border-radius: 4px;">👑 VISTA ADMIN</span>`;
    } else {
      roleBadgeDisplay.innerHTML = `<span style="background: var(--tv-cyan); color: #000; padding: 0.15rem 0.5rem; font-weight: 700; border-radius: 4px;">👤 VISTA GIOCATORE</span>`;
    }
  }

  if (adminOnlyControls) {
    adminOnlyControls.style.display = isAdmin ? 'block' : 'none';
  }

  const baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
  const inviteLink = baseUrl + '?invite=' + (curLeague.inviteCode || curLeague.id);

  const inviteCodeEl = document.getElementById('league-invite-code-display');
  const inviteLinkEl = document.getElementById('league-invite-link-display');
  if (inviteCodeEl) inviteCodeEl.textContent = curLeague.inviteCode || curLeague.id;
  if (inviteLinkEl) inviteLinkEl.value = inviteLink;

  participantSelect.innerHTML = '';
  curLeague.participants.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} ${p.isLocked ? '[SIGILLATO]' : '[MODIFICABILE]'}`;
    if (p.id === curLeague.activeParticipantId) opt.selected = true;
    participantSelect.appendChild(opt);
  });

  const activeP = getActiveParticipant();
  if (activeParticipantNameEl && activeP) activeParticipantNameEl.textContent = activeP.name;

  if (activeP && activeP.isLocked) {
    lockStatusBadge.innerHTML = `<span class="rule-pill exact">SIGILLATO INVIOLABILE</span>`;
    lockBtn.innerHTML = `🔒 SIGILLATO`;
    lockBtn.className = `btn btn-secondary`;
    lockBtn.disabled = true;
  } else {
    lockStatusBadge.innerHTML = `<span class="rule-pill close">MODIFICABILE</span>`;
    lockBtn.innerHTML = `SIGILLA`;
    lockBtn.className = `btn btn-primary`;
    lockBtn.disabled = false;
  }

  matchdayDisplay.textContent = curLeague.currentMatchday;
  matchdayStatusText.innerHTML = `LEGA: <strong>${curLeague.name}</strong> • CORSA ALLA 38a GIORNATA FINALE.`;

  leagueParticipantsList.innerHTML = '';
  curLeague.participants.forEach(p => {
    const card = document.createElement('div');
    card.className = `stat-card ${p.isLocked ? 'exact' : 'close'}`;
    card.style.display = 'flex';
    card.style.justifyContent = 'space-between';
    card.style.alignItems = 'center';
    card.style.width = '100%';
    card.style.padding = '0.6rem 1rem';

    card.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div class="rank-badge" style="background: var(--tv-black); color: var(--tv-yellow); border-color: var(--tv-yellow);">${p.name.charAt(0).toUpperCase()}</div>
        <div>
          <strong style="font-size: 1.2rem; color: var(--tv-white);">${p.name}</strong>
          <div style="font-size: 1rem; color: var(--tv-cyan);">
            ${p.isLocked ? '[SIGILLATO INVIOLABILE]' : '[IN ATTESA DI SIGILLO]'}
          </div>
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <button class="btn" style="padding: 0.2rem 0.5rem; font-size: 1rem;" onclick="switchParticipant('${p.id}'); switchTab('predict-view');">MODIFICA</button>
        ${isAdmin && curLeague.participants.length > 1 ? `<button class="action-btn" title="Elimina" onclick="removeParticipant('${p.id}')">X</button>` : ''}
      </div>
    `;
    leagueParticipantsList.appendChild(card);
  });
}

function copyInviteLink() {
  const linkEl = document.getElementById('league-invite-link-display');
  if (linkEl && navigator.clipboard) {
    navigator.clipboard.writeText(linkEl.value).then(() => {
      showToast('LINK D\'INVITO COPIATO!');
    });
  } else if (linkEl) {
    prompt('COPIA QUESTO LINK D\'INVITO:', linkEl.value);
  }
}

function shareViaWhatsApp() {
  const curLeague = getActiveLeague();
  const baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
  const inviteLink = baseUrl + '?invite=' + (curLeague.inviteCode || curLeague.id);
  const msg = encodeURIComponent(`Entra nella mia Lega "${curLeague.name}" per il Pronostico Serie A 2026-2027!\nCodice: ${curLeague.inviteCode}\nClicca sul link per registrarti con la tua email: ${inviteLink}`);
  window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
}

function copyWhatsAppLeaderboardText() {
  const curLeague = getActiveLeague();
  if (!curLeague) return;

  const baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
  const inviteLink = baseUrl + '?invite=' + (curLeague.inviteCode || curLeague.id);

  const sorted = [...curLeague.participants].sort((a, b) => b.score - a.score);

  let text = `⚽ SERIE A 2026-2027 - LEGA: ${curLeague.name}\n`;
  text += `🏆 CLASSIFICA GENERALE (G${curLeague.currentMatchday})\n\n`;

  sorted.forEach((p, idx) => {
    const rank = idx + 1;
    let icon = `${rank}°`;
    if (rank === 1) icon = '1° 🥇';
    if (rank === 2) icon = '2° 🥈';
    if (rank === 3) icon = '3° 🥉';

    text += `${icon} ${p.name} - ${p.score} PTS\n`;
  });

  text += `\n⚽ Unisciti alla Lega e fai il tuo pronostico:\n${inviteLink}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('CLASSIFICA WHATSAPP COPIATA NEGLI APPUNTI!');
    });
  } else {
    prompt('COPIA IL TESTO PER WHATSAPP:', text);
  }
}

function showPodiumCeremony() {
  const curLeague = getActiveLeague();
  if (!curLeague || !podiumModal || !podiumWrapper) return;

  const sorted = [...curLeague.participants].sort((a, b) => b.score - a.score);
  if (sorted.length === 0) return;

  const p1 = sorted[0] || { name: '-', score: 0 };
  const p2 = sorted[1] || { name: '-', score: 0 };
  const p3 = sorted[2] || { name: '-', score: 0 };

  document.getElementById('podium-title').textContent = '🏆 CAMPIONE D\'ITALIA';
  document.getElementById('podium-subtitle').textContent = `LEGA "${curLeague.name.toUpperCase()}" - 38a GIORNATA FINALE`;

  podiumWrapper.innerHTML = `
    <div class="podium-step podium-silver">
      <div class="podium-avatar">🥈</div>
      <div class="podium-name">${p2.name}</div>
      <div class="podium-pts">${p2.score} PTS</div>
      <div class="podium-block">2°</div>
    </div>

    <div class="podium-step podium-gold">
      <div class="podium-avatar">👑</div>
      <div class="podium-name">${p1.name}</div>
      <div class="podium-pts">${p1.score} PTS</div>
      <div class="podium-block">1°</div>
    </div>

    <div class="podium-step podium-bronze">
      <div class="podium-avatar">🥉</div>
      <div class="podium-name">${p3.name}</div>
      <div class="podium-pts">${p3.score} PTS</div>
      <div class="podium-block">3°</div>
    </div>
  `;

  podiumModal.style.display = 'flex';
  audio.playFanfare();
  triggerHapticFeedback();
}

function closePodiumModal() {
  if (podiumModal) podiumModal.style.display = 'none';
}

function toggleLockActiveParticipant() {
  const activeP = getActiveParticipant();
  if (!activeP) return;

  if (activeP.isLocked) {
    showToast('🔒 QUESTO PRONOSTICO E\' SIGILLATO ED INVIOLABILE. NON PUO\' ESSERE MODIFICATO.');
    return;
  }

  if (confirm(`SEI SICURO DI VOLER SIGILLARE IL TUO PRONOSTICO?\nUNA VOLTA SIGILLATO NON POTRA' PIÙ ESSERE MODIFICATO DA NESSUNO!`)) {
    activeP.isLocked = true;
    audio.playLock();
    showToast(`PRONOSTICO DI ${activeP.name} SIGILLATO INVIOLABILE!`);
    saveMultiLeagues();
    renderLeaguePanel();
    renderPredictList();
    renderTrendView();
  }
}

function setMatchday(num) {
  if (!isCurrentAdmin()) {
    showToast('SOLO L\'ADMIN PUO\' MODIFICARE LA GIORNATA.');
    return;
  }
  const curLeague = getActiveLeague();
  curLeague.currentMatchday = Math.min(38, Math.max(1, num));
  if (curLeague.currentMatchday >= 38) {
    curLeague.isUnlocked = true;
  }
  saveMultiLeagues();
  renderLeaguePanel();
  updateLeagueResults();
  renderTrendView();
  showToast(`GIORNATA ${curLeague.currentMatchday} DI 38`);
}

function unlockFinalResults() {
  if (!isCurrentAdmin()) {
    showToast('SOLO L\'ADMIN PUO\' SBLOCCARE I RISULTATI FINALI.');
    return;
  }
  const curLeague = getActiveLeague();
  curLeague.currentMatchday = 38;
  curLeague.isUnlocked = true;
  saveMultiLeagues();
  renderLeaguePanel();
  updateLeagueResults();
  renderTrendView();
  switchTab('results-view');
  showPodiumCeremony();
  showToast('38a GIORNATA CONCLUSA! RISULTATI FINALI SBLOCCATI!');
}

function renderPredictList() {
  predictContainer.innerHTML = '';
  const activeP = getActiveParticipant();
  const curLeague = getActiveLeague();

  if (!activeP || !curLeague) return;

  const currentPredictionTeams = activeP.prediction
    .map(id => SERIE_A_TEAMS.find(t => t.id === id))
    .filter(Boolean);

  if (activeP.isLocked) {
    predictContainer.innerHTML = `
      <div class="score-dashboard" style="border-color: var(--tv-green); background: #001f0f;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem; color: var(--tv-green);">[ SIGILLATO INVIOLABILE 🔒 ]</div>
        <h3 style="font-size: 1.6rem; color: var(--tv-yellow); margin-bottom: 0.5rem;">PRONOSTICO CONSEGNATO CON SUCCESSO</h3>
        <p style="color: var(--tv-white); max-width: 550px; margin: 0 auto 1rem auto; font-size: 1.15rem;">
          IL PRONOSTICO DEL GIOCATORE <strong>${activeP.name}</strong> E' STATO SIGILLATO ED INVIATO IN CLOUD.
          PER GARANTIRE LA MASSIMA CORRETTREZZA DEL GIOCO, NESSUNO (NEANCHE L'ADMIN) PUO' PIU' ALTERARLO O SBLOCCARLO.
        </p>
        <span class="phase-pill final" style="background: var(--tv-green); color: #000;">FEDE ALLA 38a GIORNATA FINALE</span>
      </div>
    `;
    return;
  }

  currentPredictionTeams.forEach((team, index) => {
    const rank = index + 1;
    const card = createTeamCard(team, rank, 'predict');
    predictContainer.appendChild(card);
  });
  setupDragAndDrop(predictContainer, 'predict');
}

function renderActualList() {
  actualContainer.innerHTML = '';
  actualStandings.forEach((team, index) => {
    const rank = index + 1;
    const card = createTeamCard(team, rank, 'actual');
    actualContainer.appendChild(card);
  });
  setupDragAndDrop(actualContainer, 'actual');
}

function getZoneType(rank) {
  if (rank === 1) return 'champions-1';
  if (rank >= 2 && rank <= 4) return 'champions';
  if (rank === 5) return 'europa';
  if (rank === 6) return 'conference';
  if (rank >= 18) return 'relegation';
  return 'safe';
}

function getZoneLabel(rank) {
  if (rank === 1) return '1° POSTO - SCUDETTO (CHAMPIONS LEAGUE)';
  if (rank >= 2 && rank <= 4) return 'CHAMPIONS LEAGUE';
  if (rank === 5) return 'EUROPA LEAGUE';
  if (rank === 6) return 'CONFERENCE LEAGUE';
  if (rank >= 18) return 'RETROCESSIONE IN SERIE B';
  return 'SALVEZZA';
}

function handleTeamTapSwap(teamId, type) {
  audio.playBlip(600, 0.05);
  triggerHapticFeedback();

  if (selectedSwapTeamId === teamId && selectedSwapType === type) {
    selectedSwapTeamId = null;
    selectedSwapType = null;
    showToast('SELEZIONE ANNULLATA');
    renderPredictList();
    renderActualList();
    return;
  }

  if (!selectedSwapTeamId || selectedSwapType !== type) {
    selectedSwapTeamId = teamId;
    selectedSwapType = type;
    showToast('SQUADRA SELEZIONATA. TOCCA UN\'ALTRA SQUADRA PER SCAMBIARE!');
    renderPredictList();
    renderActualList();
  } else {
    const team1Id = selectedSwapTeamId;
    const team2Id = teamId;
    selectedSwapTeamId = null;
    selectedSwapType = null;

    if (type === 'predict') {
      const activeP = getActiveParticipant();
      if (activeP.isLocked) {
        showToast('🔒 PRONOSTICO SIGILLATO INVIOLABILE.');
        return;
      }
      const list = activeP.prediction;
      const idx1 = list.indexOf(team1Id);
      const idx2 = list.indexOf(team2Id);

      if (idx1 >= 0 && idx2 >= 0) {
        const temp = list[idx1];
        list[idx1] = list[idx2];
        list[idx2] = temp;
        saveMultiLeagues();
        renderPredictList();
        renderTrendView();
        audio.playBlip(800, 0.1);
        showToast('SCAMBIO POSIZIONE EFFETTUATO!');
      }
    } else {
      const idx1 = actualStandings.findIndex(t => t.id === team1Id);
      const idx2 = actualStandings.findIndex(t => t.id === team2Id);

      if (idx1 >= 0 && idx2 >= 0) {
        const temp = actualStandings[idx1];
        actualStandings[idx1] = actualStandings[idx2];
        actualStandings[idx2] = temp;
        saveActual();
        renderActualList();
        renderTrendView();
        audio.playBlip(800, 0.1);
        showToast('SCAMBIO REALE EFFETTUATO!');
      }
    }
  }
}

function createTeamCard(team, rank, type) {
  const card = document.createElement('div');
  const isSelected = (selectedSwapTeamId === team.id && selectedSwapType === type);

  card.className = `team-card ${isSelected ? 'selected-swap' : ''}`;
  card.setAttribute('draggable', 'true');
  card.setAttribute('data-id', team.id);
  card.setAttribute('data-zone', getZoneType(rank));

  const fallbackSrc = createFallbackBadge(team);

  card.innerHTML = `
    <div class="drag-handle" title="Trascina">::</div>
    <div class="rank-badge">${rank}</div>
    <img class="team-logo" src="${team.logo}" alt="${team.name}" onerror="this.src='${fallbackSrc}'; this.onerror=null;">
    <div class="team-info">
      <span class="team-name">${team.name.toUpperCase()} ${isSelected ? ' (SELEZIONATA)' : ''}</span>
      <span class="team-zone-label">${getZoneLabel(rank)}</span>
    </div>
    <div class="card-actions">
      <button class="action-btn move-up" title="Su" ${rank === 1 ? 'disabled' : ''}>▲</button>
      <button class="action-btn move-down" title="Giù" ${rank === 20 ? 'disabled' : ''}>▼</button>
    </div>
  `;

  card.addEventListener('click', (e) => {
    if (e.target.closest('.card-actions') || e.target.closest('.drag-handle')) return;
    handleTeamTapSwap(team.id, type);
  });

  const btnUp = card.querySelector('.move-up');
  const btnDown = card.querySelector('.move-down');

  btnUp.addEventListener('click', (e) => {
    e.stopPropagation();
    moveTeam(type, rank - 1, -1);
  });

  btnDown.addEventListener('click', (e) => {
    e.stopPropagation();
    moveTeam(type, rank - 1, 1);
  });

  return card;
}

function moveTeam(type, index, delta) {
  audio.playBlip(550, 0.04);
  triggerHapticFeedback();

  if (type === 'predict') {
    const activeP = getActiveParticipant();
    if (activeP.isLocked) {
      showToast('🔒 PRONOSTICO SIGILLATO INVIOLABILE.');
      return;
    }
    const list = activeP.prediction;
    const newIndex = index + delta;
    if (newIndex < 0 || newIndex >= list.length) return;

    const temp = list[index];
    list[index] = list[newIndex];
    list[newIndex] = temp;

    saveMultiLeagues();
    renderPredictList();
    renderTrendView();
  } else {
    const newIndex = index + delta;
    if (newIndex < 0 || newIndex >= actualStandings.length) return;

    const temp = actualStandings[index];
    actualStandings[index] = actualStandings[newIndex];
    actualStandings[newIndex] = temp;

    saveActual();
    renderActualList();
    renderTrendView();
  }
}

function setupDragAndDrop(container, type) {
  let draggedCard = null;
  const cards = container.querySelectorAll('.team-card');

  cards.forEach(card => {
    card.addEventListener('dragstart', (e) => {
      triggerHapticFeedback();
      audio.playBlip(400, 0.05);
      if (type === 'predict') {
        const activeP = getActiveParticipant();
        if (activeP.isLocked) {
          e.preventDefault();
          showToast('🔒 PRONOSTICO SIGILLATO INVIOLABILE.');
          return;
        }
      }
      draggedCard = card;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', () => {
      if (draggedCard) {
        card.classList.remove('dragging');
        draggedCard = null;
        updateOrderFromDOM(container, type);
      }
    });

    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const afterElement = getDragAfterElement(container, e.clientY);
      if (afterElement == null) {
        container.appendChild(draggedCard);
      } else {
        container.insertBefore(draggedCard, afterElement);
      }
    });
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.team-card:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateOrderFromDOM(container, type) {
  const newOrderIds = [...container.querySelectorAll('.team-card')].map(card => card.getAttribute('data-id'));

  if (type === 'predict') {
    const activeP = getActiveParticipant();
    if (activeP.isLocked) return;
    activeP.prediction = newOrderIds;
    saveMultiLeagues();
    renderPredictList();
    renderTrendView();
  } else {
    actualStandings = newOrderIds.map(id => SERIE_A_TEAMS.find(t => t.id === id));
    saveActual();
    renderActualList();
    renderTrendView();
  }
}

function resetPrediction() {
  const activeP = getActiveParticipant();
  if (activeP.isLocked) {
    showToast('🔒 PRONOSTICO SIGILLATO INVIOLABILE.');
    return;
  }
  activeP.prediction = [...SERIE_A_TEAMS].sort((a, b) => a.name.localeCompare(b.name)).map(t => t.id);
  saveMultiLeagues();
  renderPredictList();
  renderTrendView();
  showToast('ORDINE ALFABETICO RIPRISTINATO.');
}

function randomizePrediction() {
  const activeP = getActiveParticipant();
  if (activeP.isLocked) {
    showToast('🔒 PRONOSTICO SIGILLATO INVIOLABILE.');
    return;
  }
  activeP.prediction = [...activeP.prediction].sort(() => Math.random() - 0.5);
  saveMultiLeagues();
  renderPredictList();
  renderTrendView();
  showToast('PRONOSTICO CASUALE GENERATO!');
}

function randomizeActual() {
  actualStandings = [...actualStandings].sort(() => Math.random() - 0.5);
  saveActual();
  renderActualList();
  renderTrendView();
  showToast('SIMULAZIONE REALE AGGIORNATA!');
}

function updateLeagueResults() {
  const curLeague = getActiveLeague();
  if (!curLeague) return;

  const isUnlocked = curLeague.isUnlocked || curLeague.currentMatchday >= 38;

  const actualScudettoTeamId = actualStandings[0]?.id;
  const actualRelegatedIds = actualStandings.slice(17, 20).map(t => t.id);

  curLeague.participants.forEach(p => {
    let baseScore = 0;
    let exact = 0;
    let close = 0;
    let wrong = 0;
    let scudettoBonus = 0;
    let relegationBonus = 0;
    const badges = [];

    p.prediction.forEach((teamId, predIndex) => {
      const predRank = predIndex + 1;
      const actualIndex = actualStandings.findIndex(t => t.id === teamId);
      const actualRank = actualIndex + 1;
      const diff = Math.abs(predRank - actualRank);

      if (diff === 0) {
        baseScore += 3;
        exact++;
      } else if (diff === 1) {
        baseScore += 1;
        close++;
      } else {
        wrong++;
      }
    });

    if (p.prediction[0] === actualScudettoTeamId) {
      scudettoBonus = 2;
      badges.push({ icon: '🎯', title: 'Cecchino Scudetto' });
    }

    let relGuessed = 0;
    const predRelegatedIds = p.prediction.slice(17, 20);
    predRelegatedIds.forEach(id => {
      if (actualRelegatedIds.includes(id)) {
        relegationBonus += 2;
        relGuessed++;
      }
    });

    if (relGuessed === 3) {
      badges.push({ icon: '🛟', title: 'Fiuto Salvezza Perfect' });
    }

    if (exact >= 6) {
      badges.push({ icon: '🔮', title: 'Oracolo Supremo' });
    }

    p.score = baseScore + scudettoBonus + relegationBonus;
    p.stats = { exact, close, wrong, scudettoBonus, relegationBonus, badges };
  });

  saveMultiLeagues();
  renderLeaderboard(isUnlocked);
}

function renderLeaderboard(isUnlocked) {
  const curLeague = getActiveLeague();
  if (!curLeague) return;

  leagueLeaderboardBody.innerHTML = '';
  const sorted = [...curLeague.participants].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.stats.exact !== a.stats.exact) return b.stats.exact - a.stats.exact;
    if (b.stats.scudettoBonus !== a.stats.scudettoBonus) return b.stats.scudettoBonus - a.stats.scudettoBonus;
    if (b.stats.relegationBonus !== a.stats.relegationBonus) return b.stats.relegationBonus - a.stats.relegationBonus;
    return a.name.localeCompare(b.name);
  });

  sorted.forEach((p, index) => {
    const rank = index + 1;
    let rankBadge = `${rank}°`;
    if (rank === 1) {
      rankBadge = '1° 🏆 CAMPIONE D\'ITALIA';
    } else if (rank === 2) rankBadge = '2°';
    else if (rank === 3) rankBadge = '3°';

    const badgesHtml = p.stats.badges ? p.stats.badges.map(b => `<span class="game-badge" title="${b.title}">${b.icon} ${b.title}</span>`).join(' ') : '';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong style="color: var(--tv-yellow);">${rankBadge}</strong></td>
      <td>
        <strong style="color: var(--tv-white);">${p.name}</strong>
        <div style="margin-top: 0.2rem;">${badgesHtml}</div>
      </td>
      <td>
        ${isUnlocked ? `<span style="font-weight: 700; color: var(--tv-green); font-size: 1.4rem;">${p.score}</span> <span style="font-size: 1rem; color: var(--tv-white);">PTS</span>` : '<span style="color: var(--tv-cyan);">[NASCOSTO]</span>'}
      </td>
      <td>
        ${isUnlocked ? `
          <span class="rule-pill exact">ESATTE: ${p.stats.exact} (+3)</span>
          <span class="rule-pill close">SCARTO 1: ${p.stats.close} (+1)</span>
          ${p.stats.scudettoBonus > 0 ? `<span class="rule-pill exact" style="background: var(--tv-yellow); color: #000;">🏆 SCUDETTO (+2)</span>` : ''}
          ${p.stats.relegationBonus > 0 ? `<span class="rule-pill close" style="background: var(--tv-red); color: #fff;">🔴 RETROCESSE (+${p.stats.relegationBonus})</span>` : ''}
        ` : '<span style="color: var(--tv-white);">-</span>'}
      </td>
    `;
    leagueLeaderboardBody.appendChild(tr);
  });

  if (isUnlocked) {
    const activeP = getActiveParticipant();
    if (activeP) {
      document.getElementById('total-score').innerHTML = `${activeP.score} <span>PTS</span>`;
      document.getElementById('rank-title').textContent = getTitleForScore(activeP.score);
      document.getElementById('count-exact').textContent = activeP.stats.exact;
      document.getElementById('count-close').textContent = activeP.stats.close;
      document.getElementById('count-wrong').textContent = activeP.stats.wrong;
      renderSingleParticipantDetail(activeP);
    }
  } else {
    document.getElementById('total-score').innerHTML = `🔒 <span>PTS</span>`;
    document.getElementById('rank-title').textContent = `IN ATTESA DELLA 38a GIORNATA FINALE`;
    document.getElementById('count-exact').textContent = '-';
    document.getElementById('count-close').textContent = '-';
    document.getElementById('count-wrong').textContent = '-';
    document.getElementById('results-table-body').innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 1.5rem; color: var(--tv-cyan);">
          I PRONOSTICI SI SBLOCCHERANNO ALLA 38a GIORNATA FINALE.
          <br><br>
          ${isCurrentAdmin() ? `<button class="btn btn-primary" onclick="unlockFinalResults()">SIMULA FINE CAMPIONATO (SBLOCCA)</button>` : `<span>SOLO L'ADMIN PUO' SBLOCCARE I RISULTATI.</span>`}
        </td>
      </tr>
    `;
  }
}

function getTitleForScore(score) {
  if (score >= 56) return 'ORACOLO SUPREMO SERIE A';
  if (score >= 45) return 'DIRETTORE SPORTIVO PRO';
  if (score >= 35) return 'ESPERTO DI CALCIO';
  if (score >= 25) return 'TIFOSO DA BAR';
  if (score >= 15) return 'GIOCATORE D\'AZZARDO';
  return 'DEBUTTANTE SFORTUNATO';
}

function renderSingleParticipantDetail(participant) {
  const tbody = document.getElementById('results-table-body');
  tbody.innerHTML = '';

  const comparison = [];
  participant.prediction.forEach((teamId, predIndex) => {
    const team = SERIE_A_TEAMS.find(t => t.id === teamId);
    const predRank = predIndex + 1;
    const actualIndex = actualStandings.findIndex(t => t.id === teamId);
    const actualRank = actualIndex + 1;
    const diff = Math.abs(predRank - actualRank);
    let pts = 0;
    if (diff === 0) pts = 3;
    else if (diff === 1) pts = 1;

    let isScudettoBonus = (predRank === 1 && actualRank === 1);
    let isRelegationBonus = (predRank >= 18 && actualRank >= 18);

    comparison.push({ team, predRank, actualRank, diff: predRank - actualRank, pts, isScudettoBonus, isRelegationBonus });
  });

  comparison.sort((a, b) => a.predRank - b.predRank);

  comparison.forEach(item => {
    const tr = document.createElement('tr');
    const fallbackSrc = createFallbackBadge(item.team);
    
    let diffText = '<span style="color: var(--tv-green); font-weight:700;">ESATTO 🎯</span>';
    if (item.diff > 0) diffText = `<span style="color: var(--tv-red); font-weight:700;">▼ -${item.diff}</span>`;
    if (item.diff < 0) diffText = `<span style="color: var(--tv-green); font-weight:700;">▲ +${Math.abs(item.diff)}</span>`;

    let totalTeamPts = item.pts;
    let bonusLabel = '';
    if (item.isScudettoBonus) {
      totalTeamPts += 2;
      bonusLabel = ' [🏆 SCUDETTO +2]';
    }
    if (item.isRelegationBonus) {
      totalTeamPts += 2;
      bonusLabel = ' [🔴 RETROCESSA +2]';
    }

    tr.innerHTML = `
      <td><strong style="color: var(--tv-yellow);">${item.predRank}°</strong></td>
      <td>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <img src="${item.team.logo}" alt="${item.team.name}" width="24" height="24" style="object-fit: contain;" onerror="this.src='${fallbackSrc}'; this.onerror=null;">
          <span style="font-weight: 700;">${item.team.name.toUpperCase()}</span>
        </div>
      </td>
      <td><span style="color: var(--tv-cyan);">${item.actualRank}°</span></td>
      <td>${diffText}</td>
      <td>
        <span class="point-badge pts-${item.pts > 0 ? item.pts : '0'}">
          +${totalTeamPts} PTS${bonusLabel}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>■</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
