import forge from 'node-forge';

export const isGetRequest = (req) => {
  return req.method === "GET"
}

export const isEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

export const isInt = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export const isPhoneNumber = (value) => {
  return /^(((\+44\s?|0044\s?)?|(\(?0))((2[03489]\)?\s?\d{4}\s?\d{4})|(1[23456789]1\)?\s?\d{3}\s?\d{4})|(1[23456789][234578][0234679]\)?\s?\d{6})|(1[2579][0245][0467]\)?\s?\d{5})|(11[345678]\)?\s?\d{3}\s?\d{4})|(1[35679][234689]\s?[46789][234567]\)?\s?\d{4,5})|([389]\d{2}\s?\d{3}\s?\d{4})|([57][0-9]\s?\d{4}\s?\d{4})|(500\s?\d{6})|(7[456789]\d{2}\s?\d{6})))$/.test(value)
}

export const createHashSalt = (value) => {
  const salt = createSalt();
  const hash = createHash(value, salt);
  console.log('creathashsalt', salt)

  return {
    hash,
    salt
  }
}

export const createHash = (value, salt) => {
  const md = forge.md.sha256.create();
  const hash = md.update(value + salt).digest().toHex();

  return hash;
}

export const createSalt = () => {
  const saltChar = '1234567890abcdesfghijklmnopqrstuvwxyz'.split('');
  let salt = ''
  
  for (let i = 0; i < 20; i++) {
    let rand = Math.floor(Math.random() * saltChar.length);
    salt += saltChar[rand]
  }

  return salt
}
