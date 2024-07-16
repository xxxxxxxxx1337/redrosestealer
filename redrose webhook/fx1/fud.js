const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const colors = require('colors');


const targetFolder = path.join(__dirname, '..', 'jsconfuser1');
const fileName = 'denemeeee.js';

function encrypt(text) {
  const aesKey = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12); 

  const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  return {
    encryptedData: encrypted,
    iv: iv.toString('hex'),
    aesKey: aesKey.toString('hex'),
    authTag: authTag
  };
}

async function main() {
  try {
    const stubPath = path.resolve(__dirname, 'xx.js');
    const stubCode = fs.readFileSync(stubPath, 'utf8');

    const { encryptedData, iv, aesKey, authTag } = encrypt(stubCode);

    const runnerCode = `
    const crypto = require('crypto');

    function decrypt(encdata, iv, aesKey, authTag) {
      const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(aesKey, 'hex'), Buffer.from(iv, 'hex'));
      decipher.setAuthTag(Buffer.from(authTag, 'hex'));
      let decrypted = decipher.update(encdata, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    }

    const decrypted = decrypt('${encryptedData}', '${iv}', '${aesKey}', '${authTag}');
    try {
      new Function('require', decrypted)(require);
    } catch (error) {
      console.error('Decryption or execution failed:', error);
    }
    `;

    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }
    fs.writeFileSync(path.join(targetFolder, fileName), runnerCode, 'utf8');
    console.log(`${colors.green('Success:')} ${fileName} written to ${targetFolder}`);
  } catch (error) {
    console.error(`${colors.red('Error:')} ${error.message}`);
  }
}

main();
