import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express, { Request, Response } from 'express';
import { join } from 'path';
import { AppServerModule } from './src/app/app.server.module';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

// O aplicativo Express é exportado para que possa ser usado por funções serverless, etc.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/algamoney-ui/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve arquivos estáticos da pasta /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // Todas as rotas regulares usam o Universal engine
  server.get('*', (req: Request, res: Response) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = process.env['PORT'] || 4000;

  // Inicializa o servidor Node
  const server = app();
  server.listen(port, () => {
    console.log(`Servidor Node rodando em http://localhost:${port}`);
  });
}

// Inicializa o servidor caso este arquivo seja executado diretamente
declare const __non_webpack_require__: NodeRequire;
if (require.main === module) {
  run();
}

export * from './src/main.server';
