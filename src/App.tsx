import { useEffect, useState } from 'react';
import './App.css';

import SearchTxt from './components/search/SearchTxt';
import { initialData } from './Mocks/initialData';
import { indexCountriesByName } from './utils/functions';
import { ObjIndexCountry } from './interfaces/interface';


function App() {
  const [options, setOptions] = useState<ObjIndexCountry>({})

  useEffect( () => {
    setOptions(indexCountriesByName(initialData))
  }, [])

  return (
    <div className='flex justify-center items-center content-center	 w-screen h-screen'>
        <div>
          <SearchTxt options={options}/>
        </div>
    </div>
  );
}

export default App;
