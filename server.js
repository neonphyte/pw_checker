const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const commonPasswords = new Set(
  fs.readFileSync('./xato-net-10-million-passwords-1000.txt', 'utf-8').split('\n').map(p => p.trim())
);

app.use(express.json());
app.use(express.static('public'));

app.post('/check', (req, res) => {
  const { password } = req.body;

  // OWASP password requirements (basic)
//   const lengthOK = password.length >= 8;
//   const upperOK = /[A-Z]/.test(password);
//   const lowerOK = /[a-z]/.test(password);
//   const numberOK = /[0-9]/.test(password);
//   const symbolOK = /[\W_]/.test(password);
  const notCommon = !commonPasswords.has(password);

//   if (!lengthOK) return res.json({ valid: false, message: "Password must be at least 8 characters." });
//   if (!upperOK || !lowerOK) return res.json({ valid: false, message: "Must include both upper and lower case letters." });
//   if (!numberOK) return res.json({ valid: false, message: "Must include at least one number." });
//   if (!symbolOK) return res.json({ valid: false, message: "Must include a symbol." });
  if (!notCommon) return res.json({ valid: false, message: "Password is too common." });

  res.json({ valid: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
