import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import {HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors} from "@angular/common/http";

const loggingInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const newReq = req.clone({
    headers: req.headers.set('X-Logging-Interceptor', 'true')
  })
  console.log('[Outgoing Request]')
  return next(newReq);
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))]
}).catch((err) => console.error(err));
