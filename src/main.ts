import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


// LANCEMENT DE MON APP ANGULAR
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
