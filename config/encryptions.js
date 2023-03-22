const CryptoJS = require('crypto-js');

class Encryptions {
  decrypt(value) {
    const key = 'mykey';
    const encryptedPassword = value;
    const bytes = CryptoJS.AES.decrypt(encryptedPassword.toString(), key);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
   // console.log(decryptedPassword);
    let pass;
    return pass = decryptedPassword;
  }

  encrypt(value) {
    const password = value;
    const key = 'mykey';
    const encryptedPassword = CryptoJS.AES.encrypt(password, key);
    return encryptedPassword.toString();
  }
}

// const encryptions = new Encryptions();
// const plaintext = 'testing123$1';
// console.log(`Plaintext: ${plaintext}`);

// const encrypted = encryptions.encrypt(plaintext);
// console.log(`Encrypted: ${encrypted}`);

// const decrypted = encryptions.decrypt(encrypted);
// console.log(`Decrypted: ${decrypted}`);


module.exports = Encryptions;
