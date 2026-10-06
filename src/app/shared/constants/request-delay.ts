import { HttpContextToken } from '@angular/common/http';

export const REQUEST_DELAY_MS = new HttpContextToken<number>(() => 0);
