const { execSync } = require('child_process');
const fs = require('fs');
try {
  const result = execSync('npm.cmd run build', { cwd: 'c:\\Users\\taerin\\Desktop\\quali_New_manual', encoding: 'utf-8' });
  fs.writeFileSync('c:\\Users\\taerin\\Desktop\\quali_New_manual\\build_out.txt', result);
} catch (e) {
  fs.writeFileSync('c:\\Users\\taerin\\Desktop\\quali_New_manual\\build_out.txt', e.stdout + '\n' + e.stderr);
}
