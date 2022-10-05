import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { StringComponent } from "./string";
import { cleanup } from "@testing-library/react";
import { revers } from "./string";

const res = [
  [
    ["п", "р", "и", "в", "е", "т"],
    ["т", "р", "и", "в", "е", "п"],
    ["т", "е", "и", "в", "р", "п"],
    ["т", "е", "в", "и", "р", "п"],
  ],
  [
    ["п", "а", "р", "о", "м"],
    ["м", "а", "р", "о", "п"],
    ["м", "о", "р", "а", "п"],
  ],
  [["п"]],
];

it("should render and Match Snapshot", () => {
  const ProductComponent = renderer.create(
    <Router>
      <StringComponent />
    </Router>
  );
  expect(ProductComponent).toMatchSnapshot();
});

afterEach(cleanup);

it("Разворот строки работает корректно", () => {
  expect(revers(["п", "р", "и", "в", "е", "т"])).toStrictEqual(res[0]);
  expect(revers(["п", "а", "р", "о", "м"])).toStrictEqual(res[1]);
  expect(revers(["п"])).toStrictEqual(res[2]);
  expect(revers([])).toStrictEqual([]);
  // Рендерим компонент
  // render(
  //   <Router>
  //     <StringComponent />
  //   </Router>
  // );

  // const input = screen.getByRole("textbox");

  // Находим кнопку, увеличивающую значение
  // let button = screen.getByTestId("button");
  // expect(button).toBeInTheDocument();

  // fireEvent.change(input, { target: { value: "Привет" } });
  // fireEvent.click(button);

  // button = await screen.findByText('Развернуть');

  // expect(button).toBeInTheDocument();

  // const res = await screen.getAllByTestId("circle").map((i) => i.innerHTML);

  // expect(exp).toEqual(res);

  // inputValue.change("Привет");
  // expect(inputValue.textContent).toBe("Привет");

  // fireEvent.click(button);

  // Проверяем, что состояние счетчика теперь рано 1
  // expect(countValue.textContent).toBe("1");

  // Уменьшаем значение счетчика, симулируя нажатие на соответствующую кнопку
  // fireEvent.click(decrement);

  // Проверяем, что состояние счетчика теперь рано 0
  // expect(countValue.textContent).toBe("0");
});
