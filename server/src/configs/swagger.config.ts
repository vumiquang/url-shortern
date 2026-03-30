import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'API documentation for Product service',
      contact: {
        name: 'Backend Team',
        email: 'backend@company.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8000/api/',
        description: 'Local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
}

export default swaggerJSDoc(options)
