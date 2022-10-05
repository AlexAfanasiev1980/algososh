import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";


const text = "По возрастанию";

const onClick = jest.fn();

describe("Компонент Button", () => {
  it("Рендер кнопки без текста", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Рендер кнопки с текстом", () => {
    const button = renderer.create(<Button text = {text}/>).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Рендер заблокированной кнопки", () => {
    const button = renderer.create(<Button disabled = {true}/>).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Рендер кнопки с индикацией загрузки", () => {
    const button = renderer.create(<Button isLoader = {true}/>).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("onClick works", () => {
    render (<Button text = "Тест" onClick = {onClick}/>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});