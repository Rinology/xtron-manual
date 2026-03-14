const { execSync } = require('child_process');
const fs = require('fs');
try {
  console.log('starting install');
  const result = execSync('npm.cmd install react-medium-image-zoom', { cwd: 'c:\\Users\\taerin\\Desktop\\quali_New_manual', encoding: 'utf-8' });
  fs.writeFileSync('c:\\Users\\taerin\\Desktop\\quali_New_manual\\install_out.txt', result);
  console.log('install complete');
} catch (e) {
  fs.writeFileSync('c:\\Users\\taerin\\Desktop\\quali_New_manual\\install_out.txt', e.stdout + '\n' + e.stderr);
  console.log('install failed');
}
