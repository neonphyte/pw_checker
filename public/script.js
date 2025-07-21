// public/script.js
document.getElementById('passwordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
  
    const res = await fetch('/check', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ password })
    });
  
    const data = await res.json();
    if (data.valid) {
      window.location.href = `/welcome.html?password=${encodeURIComponent(password)}`;
    } else {
      document.getElementById('message').textContent = data.message;
    }
  });
  