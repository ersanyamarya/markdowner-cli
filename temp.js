const devDep = {
    "nodemon": "^2.0.15",
            "prettier": "^2.5.1",
    "ts-jest": "^27.1.3",
}
console.log(Object.keys(devDep).reduce((acc,e)=> acc=`${acc} ${e}`,"npm install -D"));