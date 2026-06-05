const config = {

    MODE: "local",

    local: {
        API_URL: "https://localhost:8080",
        SOCKET_URL: "https://localhost:8080",
        },


    prod: {
        API_URL: "https://localhost:8080",
        SOCKET_URL: "https://localhost:8080",
    },

    get API_URL() {
        return this[this.MODE].API_URL;
    },

    get SOCKET_URL() {
        return this[this.MODE].SOCKET_URL;
    }

};

export default config;

