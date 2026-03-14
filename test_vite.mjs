import { build } from 'vite';

async function run() {
  try {
    await build({ root: 'c:/Users/taerin/Desktop/quali_New_manual' });
    console.log('SUCCESS');
  } catch(e) {
    import('fs').then(fs => fs.writeFileSync('c:/Users/taerin/Desktop/quali_New_manual/build_out.txt', e.message + '\n' + e.stack));
  }
}
run();
