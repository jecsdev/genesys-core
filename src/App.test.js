import { render, screen } from '@testing-library/react';
import App from './App';

test('shows the service suspension notice', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /el período de pruebas ha finalizado/i })).toBeInTheDocument();
  expect(screen.getByText(/contacte a su proveedor/i)).toBeInTheDocument();
});
