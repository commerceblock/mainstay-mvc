module.exports = {
  db: {
    user: "",
    password: "",
    database: "mainstay",
    address: "localhost",
    port: "27017"
  },
  server: {
    port: process.env.LISTEN_API
  }
}
