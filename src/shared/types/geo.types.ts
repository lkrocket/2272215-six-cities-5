export interface IGeo {
  latitude: number;
  longitude: number;
}

export interface IGeoLocation {
  city: string;
  geo: IGeo;
}

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export type GeoLocationDataType = {
  [key in CityName]: IGeo;
};

export const geoLocationData: GeoLocationDataType = {
  [CityName.Paris]: {
    latitude: 48.85661,
    longitude: 2.351499,
  },
  [CityName.Cologne]: {
    latitude: 50.938361,
    longitude: 6.959974,
  },
  [CityName.Brussels]: {
    latitude: 50.846557,
    longitude: 4.351697,
  },
  [CityName.Amsterdam]: {
    latitude: 52.370216,
    longitude: 4.895168,
  },
  [CityName.Hamburg]: {
    latitude: 53.550341,
    longitude: 10.000654,
  },
  [CityName.Dusseldorf]: {
    latitude: 51.225402,
    longitude: 6.776314,
  },
};
