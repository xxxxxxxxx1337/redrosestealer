const fs = require('fs');
const JSConfuser = require('js-confuser');

const inputFile = 'denemeeee.js';
const outputFile = '../gb/2774d371798da45d.js';
const config = require('./confuser-config.json');

fs.readFile(inputFile, 'utf8', (err, code) => {
  if (err) throw err;

  JSConfuser.obfuscate(code, config).then((obfuscatedCode) => {
    fs.writeFile(outputFile, obfuscatedCode, (err) => {
      if (err) throw err;
      console.log('The file has been obfuscated successfully.');
    });
  }).catch(err => {
    console.error('Obfuscation failed:', err);
  });
});
