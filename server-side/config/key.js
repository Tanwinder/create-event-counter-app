if(process.env.NODE_ENV === 'production') {
    //for production environment
    console.log("env is prod--------", process.env.NODE_ENV)
    module.exports = require("./prod");
} else {
    //for local development
    console.log("env is development--------", process.env.NODE_ENV)
    module.exports = require("./dev");
}