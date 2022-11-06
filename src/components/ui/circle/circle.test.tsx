import React from "react";
import renderer from "react-test-renderer";
// import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Компонент Circle", () => {
  it("Рендер Circle без буквы", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Рендер Circle c буквами", () => {
    const circle = renderer.create(<Circle letter={`rrr`}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Рендер Circle c head", () => {
    const circle = renderer.create(<Circle head={`head`}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Рендер Circle c react-элементом в head", () => {
    const circle = renderer.create(<Circle head={<Circle />}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Рендер Circle c tail", () => {
    const circle = renderer.create(<Circle tail={`tail`}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Рендер Circle c react-элементом в tail", () => {
    const circle = renderer.create(<Circle tail={<Circle />}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Рендер Circle c index", () => {
    const circle = renderer.create(<Circle index={1}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Рендер Circle c пропом isSmall === true", () => {
    const circle = renderer.create(<Circle isSmall={true}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Рендер Circle в состоянии default", () => {
    const circle = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Рендер Circle в состоянии changing", () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Рендер Circle в состоянии modified", () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });
});