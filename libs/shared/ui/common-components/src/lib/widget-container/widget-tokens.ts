import { InjectionToken } from '@angular/core';

export interface WeatherWidgetData {
  city: string;
  message: string;
}

export const WEATHER_WIDGET = new InjectionToken<WeatherWidgetData>(
  'weather widgets'
);
