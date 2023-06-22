
export enum Channels {
  ipcTest = "ipc-example",
  getMetadata = "get-metadata"
}

export const validChannels = [
  Channels.ipcTest,
  Channels.getMetadata
];

type GpsDecimal = {
  isValid: boolean;
  Lat: number;
  Lng: number;
};

export type ExifGeneric = {
  image?: any;
  thumbnail?: any;
  exif?: any;
  gps?: any;
  interoperability?: any;
  makernote?: any;
};

export type PhotoMetadata = {
  dateCreated: string;
  filename: string;
  fileExt: string;
  metadata: any;
  hasExif: boolean;
  exif?: any;
  gps?: GpsDecimal;
  image?: any;
};
