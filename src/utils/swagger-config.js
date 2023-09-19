import swaggerJSDoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Marx eCom Api',
            version: '1.0.0',
            description: 'documentation for Marx eCom',
            contact: {
                name: "Marx LORDEUS",
                url: "https://maxgarylordeus.com",
                email: "info@gmail.com",
            },
        },
        servers: [
            {
              url: "http://localhost:8080",
              description: 'Development server',
            },
        ],
    },
    apis: ['src/routes/*.js'], // Specify the paths to your Express route files
};

const specs = swaggerJSDoc(options);

export default specs;
