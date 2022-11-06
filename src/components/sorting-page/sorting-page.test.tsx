import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { SortingPage } from "./sorting-page";
import { cleanup } from "@testing-library/react";
import { handleSelectionSort, handleBubbleSort } from "./sorting-page";
import { IElements, IElement, IButtonState } from "./types";


it("should render and Match Snapshot", () => {
  const ProductComponent = renderer.create(
    <Router>
      <SortingPage />
    </Router>
  );
  expect(ProductComponent).toMatchSnapshot();
});

afterEach(cleanup);

describe("Тестирование сортировки выбором", () => {
  it("Сортировка массива выбором по возрастанию работает корректно несколько элементов", () => {
    const sortedArr: IElements = handleSelectionSort(1, [25, 5, 10, 45], [25, 5, 10, 45], {
      arr: [[25, 5, 10, 45]],
      notsorted: [[0,1,2,3]],
      comparable: [[]],
      sorted: [[]]
    });
    const arr = sortedArr.arr;
    expect(arr[arr.length-1]).toStrictEqual([5, 10, 25, 45]);
  });
  it("Сортировка массива выбором по убыванию работает корректно несколько элементов", () => {
    const sortedArr: IElements = handleSelectionSort(2, [25, 5, 10, 45], [25, 5, 10, 45], {
      arr: [[25, 5, 10, 45]],
      notsorted: [[0,1,2,3]],
      comparable: [[]],
      sorted: [[]]
    });
    const arr = sortedArr.arr;
    expect(arr[arr.length-1]).toStrictEqual([45, 25, 10, 5]);
  });
  it("Сортировка массива выбором по возрастанию работает корректно один элементов", () => {
    const sortedArr: IElements = handleSelectionSort(1, [25], [25], {
      arr: [[25]],
      notsorted: [[0]],
      comparable: [[]],
      sorted: [[]]
    });
    const arr = sortedArr.arr;
    expect(arr[arr.length-1]).toStrictEqual([25]);
  });
  it("Сортировка массива выбором по убыванию работает корректно один элементов", () => {
    const sortedArr: IElements = handleSelectionSort(2, [25], [25], {
      arr: [[25]],
      notsorted: [[0]],
      comparable: [[]],
      sorted: [[]]
    });
    const arr = sortedArr.arr;
    expect(arr[arr.length-1]).toStrictEqual([25]);
  });
  it("Сортировка массива выбором по возрастанию работает корректно пустой массив", () => {
    const sortedArr: IElements = handleSelectionSort(1, [], [], {
      arr: [[]],
      notsorted: [[]],
      comparable: [[]],
      sorted: [[]]
    });
    const arr = sortedArr.arr;
    expect(arr[arr.length-1]).toStrictEqual([]);
  });
  it("Сортировка массива выбором по убыванию работает корректно пустой массив", () => {
    const sortedArr: IElements = handleSelectionSort(2, [], [], {
      arr: [[]],
      notsorted: [[]],
      comparable: [[]],
      sorted: [[]]
    });
    const arr = sortedArr.arr;
    expect(arr[arr.length-1]).toStrictEqual([]);
  });
});

describe("Тестирование сортировки пузырьком", () => {
  it("Сортировка массива пузырьком по возрастанию работает корректно несколько элементов", () => {
    const sortedArr: IElements = handleBubbleSort(1, [25, 5, 10, 45], [25, 5, 10, 45], {
      arr: [[25, 5, 10, 45]],
      notsorted: [[0,1,2,3]],
      comparable: [[]],
      sorted: [[]]
    });
    const arr = sortedArr.arr;
    expect(arr[arr.length-1]).toStrictEqual([5, 10, 25, 45]);
  });
  it("Сортировка массива пузырьком по убыванию работает корректно несколько элементов", () => {
    const sortedArr: IElements = handleBubbleSort(2, [25, 5, 10, 45], [25, 5, 10, 45], {
      arr: [[25, 5, 10, 45]],
      notsorted: [[0,1,2,3]],
      comparable: [[]],
      sorted: [[]]
    });
    const arr = sortedArr.arr;
    expect(arr[arr.length-1]).toStrictEqual([45, 25, 10, 5]);
  });
  it("Сортировка массива пузырьком по возрастанию работает корректно один элементов", () => {
    const sortedArr: IElements = handleBubbleSort(1, [25], [25], {
      arr: [[25]],
      notsorted: [[0]],
      comparable: [[]],
      sorted: [[]]
    });
    const arr = sortedArr.arr;
    expect(arr[arr.length-1]).toStrictEqual([25]);
  });
  it("Сортировка массива пузырьком по убыванию работает корректно один элементов", () => {
    const sortedArr: IElements = handleBubbleSort(2, [25], [25], {
      arr: [[25]],
      notsorted: [[0]],
      comparable: [[]],
      sorted: [[]]
    });
    const arr = sortedArr.arr;
    expect(arr[arr.length-1]).toStrictEqual([25]);
  });
  it("Сортировка массива пузырьком по возрастанию работает корректно пустой массив", () => {
    const sortedArr: IElements = handleBubbleSort(1, [], [], {
      arr: [[]],
      notsorted: [[]],
      comparable: [[]],
      sorted: [[]]
    });
    const arr = sortedArr.arr;
    expect(arr[arr.length-1]).toStrictEqual([]);
  });
  it("Сортировка массива пузырьком по убыванию работает корректно пустой массив", () => {
    const sortedArr: IElements = handleBubbleSort(2, [], [], {
      arr: [[]],
      notsorted: [[]],
      comparable: [[]],
      sorted: [[]]
    });
    const arr = sortedArr.arr;
    expect(arr[arr.length-1]).toStrictEqual([]);
  });
});
