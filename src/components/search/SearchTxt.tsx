import { useCallback, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5"
import clsx from "clsx"

import Card from "../card/Card"

import { findNear } from "../../utils/functions";
import { Country, ObjIndexCountry } from "../../interfaces/interface";

interface Props {
    label?: string
    options: ObjIndexCountry
}

const SearchTxt = ({
    label = 'Find a city',
    options
}: Props) => {
    const [searchText, setSearchText] = useState<string>('')
    const [optionsFiltered, setOptionsFiltered] = useState<ObjIndexCountry>(options)
    const [optionSelected, setOptionsSelected] = useState<Country | null>(null)
    const [optionSelectedNears, setOptionSelectedNears] = useState<ObjIndexCountry[]>([])

    const handleClear = useCallback(() => {
        setOptionsSelected(null)
        setSearchText('')
    }, [])

    const search = useCallback((query: string) => {
        const lowerQuery = query.toLowerCase();
        const results: ObjIndexCountry = {};
        Object.keys(options).forEach((key) => {
            if (key.includes(lowerQuery)) {
                results[key] = (options[key]);
            }
        })
        return results;
    }, [options]);


    const handleSearchInput = useCallback((query: string) => {
        let searchTimeout: NodeJS.Timeout = setTimeout(() => { }, 0);

        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const results = search(query);
            setOptionsFiltered(results)
        }, 300);
    }, [search]);

    useEffect(() => {
        setOptionsSelected(null)
        handleSearchInput(searchText)
    }, [searchText, handleSearchInput])

    useEffect(() => {
        if (!optionSelected) { return }

        const otherPoints = Object.keys(options).map((key) => ({
            latitude: Number(options[key].lat),
            longitude: Number(options[key].lng)
        }))
        const dataNear = findNear({
            initialPoint: {
                latitude: Number(optionSelected?.lat),
                longitude: Number(optionSelected?.lng)
            },
            otherPoints
        })
        const countries: ObjIndexCountry[] = []
        dataNear.forEach((near: any) => {
            const country = search(`${near.latitude}|${near.longitude}`)
            countries.push(country)
        })
        setOptionSelectedNears(countries)

    }, [optionSelected, options, search])

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleClear()
    }

    return (
        <Card>
            <span className="">{label}</span>
            <form className="relative" onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full bg-gray-50 rounded pl-2 pr-10 text-xl border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="">
                    <IoCloseOutline size={20} className="absolute top-1 right-2 hover:cursor-pointer hover:text-blue-500 focus:text-blue-500" onClick={() => handleClear()} />
                </button>
            </form>

            <div className="flex flex-col max-h-96 mt-4 overflow-y-auto scroll-smooth focus:scroll-auto p-2 border rounded-md ">
                {
                    Object.keys(optionsFiltered).map((key, index) => (
                        <span
                            tabIndex={0}
                            onClick={() => setOptionsSelected(optionsFiltered[key])}
                            key={key}
                            className={
                                clsx("pl-1 hover:bg-blue-100 hover:cursor-pointer", {
                                    "bg-gray-100": index % 2 === 0
                                })
                            }>
                            {optionsFiltered[key].name}
                        </span>
                    ))
                }
            </div>


            {optionSelected && <div className="pt-4">
                <span className="font-semibold">{`Cercanos a ${optionSelected?.name}:`}</span>
                <ul className="pt-1">
                    {
                        (optionSelectedNears).map((item) => Object.keys(item).map((key) => <li key={`${item[key]?.lat}|${item[key]?.lng}`}>{item[key]?.name}</li>))
                    }
                </ul>
            </div>}
        </Card>
    )
}

export default SearchTxt
