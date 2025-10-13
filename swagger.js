const swaggerAutogen = require('swagger-autogen')();

const port = process.env.PORT || 3000;
const host = process.env.SWAGGER_HOST || `localhost:${port}`;

const doc = {
  info: { title: 'TaskForge API', description: 'week 5-7' },
  host,
  schemes: host.startsWith('localhost') ? ['http'] : ['https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter: Bearer <JWT token>'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/books.js', './routes/authors.js', './routes/auth.js', './routes/users.js', './routes/projects.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('swagger.json generated at', outputFile);
});
