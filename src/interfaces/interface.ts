export interface ObjIndexCountry {
    [index: string]: Country
}

export interface Country {
    "country": string,
    "name": string,
    "lat": string,
    "lng": string
}