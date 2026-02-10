import { render, screen, fireEvent } from "@testing-library/react";
import PropertyContactForm from "@/components/PropertyConctactForm";
import { PropertyType } from "@/models/Property";

// 1. Usamos el mock de la propiedad (la casa)
const mockProperty = {
  _id: "prop_123",
  owner: "owner_456" as any, // El componente usa esto como 'recipient'
} as unknown as PropertyType;

test("debe permitir escribir en los campos de nombre y mensaje", () => {
  render(<PropertyContactForm property={mockProperty} />);

  // 2. Buscamos los inputs por su Placeholder o Label
  const nameInput = screen.getByPlaceholderText(/Enter your name/i);
  const messageInput = screen.getByPlaceholderText(/Enter your message/i);

  // 3. Simulamos que el usuario escribe
  fireEvent.change(nameInput, { target: { value: "Emanuel" } });
  fireEvent.change(messageInput, {
    target: { value: "Hi, this property is amazing" },
  });

  // 4. Verificamos que los valores existan en la pantalla
  expect(screen.getByDisplayValue("Emanuel")).toBeInTheDocument();
  expect(
    screen.getByDisplayValue("Hi, this property is amazing"),
  ).toBeInTheDocument();
});
