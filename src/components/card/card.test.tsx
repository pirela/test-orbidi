import { render, screen } from '@testing-library/react';
import Card from "./Card";

test('render Children Card component', () => {
    render(<Card>
      <span> Children Card</span>
    </Card>);
    const linkElement = screen.getByText(/Children Card/i);
    expect(linkElement).toBeInTheDocument();
  });