import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { routes } from './routes';


const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {origin: '*'})

app.register(fastifySwagger,{
    openapi: {
    info:{
        title: 'Swagger',
        version: '1.0.0'
    }
}
})

app.register(fastifySwaggerUi, {
    routePrefix: '/swagger'
})

app.get('/', () => {
    return 'Hello world'
})

app.register(routes)

app.listen({port: 3000 }).then(() => {
    console.log('HTTP server running on port 3000');
});