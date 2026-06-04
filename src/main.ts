import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from '@/presentation/common/filters/domain-exception.filter';
import { HttpLoggingInterceptor } from '@/presentation/common/interceptors/http-logging.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3001;
  const nodeEnv = configService.get<string>('NODE_ENV') ?? 'development';

  // CORS — allow Next.js frontend
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global filters, interceptors, pipes
  app.useGlobalFilters(new DomainExceptionFilter());
  app.useGlobalInterceptors(new HttpLoggingInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((e) =>
          Object.values(e.constraints ?? {}),
        );
        return new (require('@nestjs/common').BadRequestException)(messages);
      },
    }),
  );

  // Swagger (development only)
  if (nodeEnv === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Syleia API')
      .setDescription('REST API for Syleia — Colombian satin accessories store')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(port);
  console.log(`🚀 Syleia API running on http://localhost:${port}`);
  if (nodeEnv === 'development') {
    console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
  }
}

void bootstrap();
