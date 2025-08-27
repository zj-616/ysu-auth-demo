// 简单交互与“页面”切换
const qs = (s, r = document) => r.querySelector(s);

const screenLogin = qs('#screen-login');
const screenSuccess = qs('#screen-success');
const form = qs('#loginForm');
const usernameEl = qs('#username');
const passwordEl = qs('#password');

const setScreen = (name) => {
  screenLogin.classList.toggle('active', name === 'login');
  screenSuccess.classList.toggle('active', name === 'success');
  history.replaceState(null, '', name === 'success' ? '#success' : '#');
};

// 输入框清空按钮
document.querySelectorAll('.field').forEach(field => {
  const input = field.querySelector('input');
  const clear = field.querySelector('.clear-btn');
  if (!clear || !input) return;

  const sync = () => {
    clear.style.visibility = input.value ? 'visible' : 'hidden';
  };
  sync();
  input.addEventListener('input', sync);
  clear.addEventListener('click', () => {
    input.value = '';
    input.focus();
    sync();
  });
});

// 登录->成功
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // 简单“校验”
  if (!usernameEl.value.trim() || !passwordEl.value.trim()) return;

  // 成功页文案填充
  const uid = usernameEl.value.trim();
  const nameMap = {
    '202411040371': '毕舲宇'
  };
  const name = nameMap[uid] || '同学';
  const greetName = `${name},傍晚好。`;
  qs('#greetName').textContent = greetName;
  qs('#greetUid').textContent = `您当前登录的用户名为：${uid}`;

  // 切屏
  setScreen('success');
});

// “下线 Logout” -> 返回登录
qs('#btnLogout').addEventListener('click', () => setScreen('login'));

// 根据 URL hash 恢复状态
if (location.hash === '#success') setScreen('success');

// 阻止 iOS 双击缩放
let lastTouch = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - lastTouch <= 300) e.preventDefault();
  lastTouch = now;
}, {passive:false});