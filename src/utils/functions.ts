import { orderByDistance } from 'geolib';

import { Country, ObjIndexCountry } from '../interfaces/interface';

export function indexCountriesByName(items: Country[]) {
    const indexedData: ObjIndexCountry = {};
    items.forEach(obj => {
        indexedData[`${obj.name}|${obj.lat}|${obj.lng}`.toLowerCase()] = obj;
    });
    return indexedData
}

interface PropNear {
    initialPoint: {
        latitude: number,
        longitude: number
    }
    otherPoints: {
        latitude: number,
        longitude: number
    }[]
}
export function findNear({ initialPoint, otherPoints }: PropNear) {
    const order = orderByDistance(initialPoint, otherPoints);
    return [order[1], order[2], order[3]]
}