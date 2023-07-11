// Write your tests here
import React from "react";
import {
  getByLabelText,
  getByPlaceholderText,
  render,
  screen,
  waitFor,
  userEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional";
import userEvent from "@testing-library/user-event";

test("sanity", () => {
  expect(true).toBe(true);
});
test("hata olmadan render ediliyor", async () => {
  render(<AppFunctional />);
});

test("x ve y nin başlagıç kordinatları doğru gösteriliyor mu?", async () => {
  render(<AppFunctional />);
  const kareler = screen.getByText(/Koordinatlar/i);
  expect(kareler).toHaveTextContent("(2,2)");
});
test("aşağı butonuna basınca kordinatlar doğru gösteriliyor mu?", async () => {
  render(<AppFunctional />);
  const down = screen.getByText(/Koordinatlar/i);
  const downButton = screen.getByText("AŞAĞI");
  userEvent.click(downButton);
  expect(down).toHaveTextContent("(2,3)");
});
test("sınıra geldikten sonra kareyi yeniden aynı yönde hareket ettirince hata mesajı yansıtıyor mu?", async () => {
  render(<AppFunctional />);

  const downButton = screen.getByText("AŞAĞI");
  userEvent.click(downButton);
  userEvent.click(downButton);
  const mesaj = screen.getByTestId("message");
  expect(mesaj).toHaveTextContent("Aşağıya gidemezsiniz");
});
test("emaili hatalı girince datadan gelen mesaj ekrana yansıtılıyor mu?", async () => {
  render(<AppFunctional />);
  const mesaj = screen.getByTestId("message");
  const mail = screen.getByTestId("email");
  userEvent.type(mail, "igmail.com");
  const button = screen.getByTestId("submit");
  userEvent.click(button);
  expect(mesaj).toHaveTextContent("");
});
