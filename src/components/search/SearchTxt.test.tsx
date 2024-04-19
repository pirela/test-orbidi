import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { indexCountriesByName } from '../../utils/functions';
import { initialData } from '../../Mocks/initialData';
import SearchTxt from './SearchTxt';

describe('SearchTxt Component', () => {
    const options = indexCountriesByName(initialData)
  
    test('Validate input SearchTxt component', () => {  
      const options = indexCountriesByName(initialData)
      const { getByRole } = render( <SearchTxt options={options}></SearchTxt>);
      
      const inputElement: HTMLInputElement  = getByRole('textbox') as HTMLInputElement;
    
      expect(inputElement.value.length).toBe(0);
    
      fireEvent.change(inputElement, { target: { value: 'berry' } });
    
      expect(inputElement.value.length).toBe(5);
    
    });
    
    test('filters options correctly on input change', async () => {
      const { container, getByPlaceholderText, getByText } = render(<SearchTxt options={options} />);
      const inputElement = getByPlaceholderText('Buscar');
      const spanElementsWithTabIndex: NodeListOf<HTMLElement> = container.querySelectorAll('span[tabIndex]');
  
      expect(spanElementsWithTabIndex.length).toBe(16657);
      
      fireEvent.change(inputElement, { target: { value: 'Bessemer C' } });
      
      await waitFor(() => {
        const spanElementsWithTabIndex: NodeListOf<HTMLElement> = container.querySelectorAll('span[tabIndex]');
        expect(getByText('Bessemer City')).toBeInTheDocument(); 
        expect(spanElementsWithTabIndex.length).toBe(1);     
      });
    });
  
  
    test('selects an option on click, show "Cercanos" ', async () => {
      const { getByPlaceholderText, getByText } = render(<SearchTxt options={options} />);
      const inputElement:HTMLInputElement = getByPlaceholderText('Buscar') as HTMLInputElement;
      
      fireEvent.change(inputElement, { target: { value: 'Bessemer C' } });
  
      await waitFor(() => {
        fireEvent.click(getByText('Bessemer City'));
      });
      await waitFor(() => {
        expect(getByText('Cercanos a Bessemer City:')).toBeInTheDocument(); 
      });
    });
  
    test('clears search input and options on clear button click', async () => {
      const { getByPlaceholderText, getByRole, queryByText } = render(<SearchTxt options={options} />);
      const inputElement:HTMLInputElement = getByPlaceholderText('Buscar') as HTMLInputElement;
      
      const clearButton = getByRole('button');
  
      fireEvent.change(inputElement, { target: { value: 'jose pirela' } });
  
      await waitFor(() => {
        fireEvent.click(clearButton);
      });
  
      expect(inputElement.value).toBe('');
      expect(queryByText('jose pirela')).not.toBeInTheDocument();
    });
  
    
  });