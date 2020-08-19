const bcrypt = require('bcrypt');


async function example(){
    const salt = await bcrypt.genSalt(10)

    const hashed = await bcrypt.hash('yash@131', salt)

    console.log(hashed);
    
}
example()