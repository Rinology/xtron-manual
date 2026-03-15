const fs = require('fs');
try {
  fs.copyFileSync(
    'C:\\Users\\taerin\\.gemini\\antigravity\\brain\\382f0d9b-ac27-487f-a960-99b128494ced\\media__1773588233611.png',
    'C:\\Users\\taerin\\Desktop\\quali_New_manual\\public\\images\\pedal\\pedal-rotation.png'
  );
  console.log('Copy Success!');
} catch (e) {
  console.error(e);
}
