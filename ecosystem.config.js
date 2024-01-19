module.exports = {
  apps : [{
    name: "TypoGraphy-client",
    script: "npm",
    args: "run start",
    env: {
      NODE_ENV: "production",
    },
  }],
}
