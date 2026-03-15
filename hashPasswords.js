const bcrypt = require("bcryptjs");

const password1 = "12345"; // Nandini
const password2 = "123456"; // Priya

const hash1 = bcrypt.hashSync(password1, 10);
const hash2 = bcrypt.hashSync(password2, 10);

console.log("Hash for Nandini:", hash1);
console.log("Hash for Priya:", hash2);
