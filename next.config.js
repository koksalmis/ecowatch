module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://www.nadirdoviz.com/:path*', // Replace with your API URL
        },
      ]
    },
  }

  