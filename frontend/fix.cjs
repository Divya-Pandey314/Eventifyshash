const fs = require('fs');
const path = 'c:/Users/User/Documents/Eventify/frontend/src/pages/Profile.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" defaultChecked />',
  'checked={emailNotifs} onChange={(e) => setEmailNotifs(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />'
);

content = content.replace(
  'className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" defaultChecked />',
  'checked={oppAlerts} onChange={(e) => setOppAlerts(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />'
);

fs.writeFileSync(path, content);
console.log('Done!');
