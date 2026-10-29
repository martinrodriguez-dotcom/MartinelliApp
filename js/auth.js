// Martinelli Autos - Inicio de sesión con Firebase Authentication.
// Las claves de usuario no se almacenan ni se consultan en Firestore.
window.handleLogin = async (event) => {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-pwd').value;
  const text = document.getElementById('login-btn-text');
  const error = document.getElementById('login-error');
  if (!email || !password) return;
  if (text) text.textContent = 'Verificando acceso...';
  if (error) error.classList.add('hidden');
  try {
    await window.fbSignIn(window.fbAuth, email, password);
    // onAuthStateChanged en js/app.js carga perfil, roles y datos.
  } catch (e) {
    console.error('Inicio de sesión Martinelli:', e.code || e.message);
    if (error) {
      error.innerText = 'No se pudo iniciar sesión. Revisá correo, contraseña y que Email/Password esté habilitado en Firebase Authentication.';
      error.classList.remove('hidden');
    }
  } finally { if (text) text.textContent = 'Ingresar al Sistema'; }
};
window.resetLoginPassword = async () => {
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  if (!email) return alert('Primero escribí tu correo electrónico.');
  try {
    await window.fbSendPasswordReset(window.fbAuth, email);
    alert('Si el correo tiene una cuenta habilitada, recibirás instrucciones para restablecer la contraseña.');
  } catch (e) {
    console.error('Restablecer contraseña:', e.code || e.message);
    alert('No se pudo solicitar el cambio de contraseña. Revisá la configuración de Firebase Authentication.');
  }
};
window.updateProfileUI = () => {
  const user = window.state.currentUser;
  if (!user) return;
  const name = document.getElementById('user-name-display');
  const role = document.getElementById('user-role-display');
  const initial = document.getElementById('user-initial');
  const menu = document.getElementById('admin-menu');
  if (name) name.innerText = user.nombre || 'Usuario';
  if (role) role.innerText = user.rol || 'Vendedor';
  if (initial) initial.innerText = String(user.nombre || 'U')[0].toUpperCase();
  if (menu) menu.classList.toggle('hidden', user.rol !== 'Admin');
  const backup = document.getElementById('topbar-backup');
  if (backup) {
    backup.classList.toggle('hidden', user.rol !== 'Admin');
    backup.classList.toggle('flex', user.rol === 'Admin');
  }
};
window.showLogin = () => {
  document.getElementById('app-loader')?.classList.add('hidden');
  document.getElementById('app-wrapper')?.classList.add('hidden');
  document.getElementById('auth-view')?.classList.remove('hidden');
};
window.launchApp = () => {
  document.getElementById('app-loader')?.classList.add('hidden');
  document.getElementById('auth-view')?.classList.add('hidden');
  document.getElementById('app-wrapper')?.classList.remove('hidden');
  window.updateProfileUI();
  window.renderAllViews?.();
  window.switchTab?.('flota');
};
window.handleLogout = async () => {
  if (!confirm('¿Estás seguro de cerrar sesión?')) return;
  try {
    await window.fbSignOut(window.fbAuth);
    window.state.currentUser = null;
    window.state.usuarios = [];
    window.state.transacciones = [];
    window.state.autos = [];
    window.state.ventas = [];
    window.state.formularios = [];
    window.state.consultas = [];
    window.state.comisiones = [];
    window.state.sucursales = [];
    window.state.cierres_personal = [];
    document.getElementById('login-pwd').value = '';
    window.showLogin();
  } catch (e) { alert('No se pudo cerrar sesión: ' + e.message); }
};
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-form')?.addEventListener('submit', window.handleLogin);
});
