const withRemoveImports = require("next-remove-imports")();

module.exports =
  withRemoveImports(
    {
      async redirects() {
        return [
          {
            source: '/',
            destination: '/home',
            permanent: true,
          }
        ]
      },
      webpack: (config, options) => {
        config.module.rules.push({
          test: /\.md$/,
          use: "raw-loader"
        });
        return config;
      },
    }
  );
  
