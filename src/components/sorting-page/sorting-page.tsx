import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { IElements, IElement, IButtonState } from "./types";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { swap, defaultState, defaultButtonState } from "./utils";

export const handleSelectionSort = (choice: number, arrayNew: number[], array: number[], elements: IElements) => {
  const { length } = array;
  const arrayElemets: Array<number[]> = [arrayNew];
  let elementsData: IElements = elements;
  let sortedData: number[] = [];
  let comparableData: number[] = [];
  let notsortedData: number[] = [];
  let step: number = 0;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    let index = i;
    let minInd: number | undefined = 0;
    for (let j = maxInd + 1; j <= length - 1; j++) {
      for (let u = 0; u < length; u++) {
        const filter: number[] = elementsData.sorted[step].filter(
          (el) => u === el
        );
        if (u !== i && u !== j && filter.length === 0) {
          notsortedData.push(u);
        }
      }
      elementsData = {
        ...elementsData,
        arr: [
          ...elementsData.arr,
          elementsData.arr[elementsData.arr.length - 1],
        ],
        comparable: [...elementsData.comparable, [i, j]],
        notsorted: [...elementsData.notsorted, [...notsortedData]],
        sorted: [...elementsData.sorted, [...elementsData.sorted[step]]],
      };
      notsortedData = [];
      step++;
      if (choice === 1) {
        if (array[j] < array[index]) {
          minInd = j;
          index = j;
        }
      } else {
        if (array[j] > array[index]) {
          minInd = j;
          index = j;
        }
      }
    }
    let arrAdd: number[];
    sortedData.push(i);
    if (minInd !== 0) {
      arrAdd = swap(array, maxInd, minInd);
    } else {
      arrAdd = elementsData.arr[step];
    }
    arrayElemets.push([...arrAdd]);
    if (length - 2 <= i) {
      sortedData.push(i + 1);
    } else {
      comparableData = [i + 1, i + 2];
    }
    for (let u = 0; u < length; u++) {
      const filterSort = sortedData.includes(u);
      const filterComparable = comparableData.includes(u);
      if (u !== i && !filterSort && !filterComparable) {
        notsortedData.push(u);
      }
    }
    elementsData = {
      ...elementsData,
      arr: [...elementsData.arr, [...arrAdd]],
      comparable: [...elementsData.comparable, [...comparableData]],
      notsorted: [...elementsData.notsorted, [...notsortedData]],
      sorted: [...elementsData.sorted, [...sortedData]],
    };
    step++;
    notsortedData = [];
  }

  return elementsData;
}

export const handleBubbleSort = (choice: number, arrayNew: number[], array: number[], elements: IElements) => {
  const { length } = array;
  let arrayElemets: number[] = arrayNew;
    let elementsData: IElements = elements;
    let sortedData: number[] = [];
    let notsortedData: number[] = [];
    let step: number = 0;

    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        for (let u = 0; u < length; u++) {
          const filter: number[] = elementsData.sorted[step].filter(
            (el) => u === el
          );
          if (u !== j + 1 && u !== j && filter.length === 0) {
            notsortedData.push(u);
          }
        }
        elementsData = {
          ...elementsData,
          arr: [...elementsData.arr, [...arrayElemets]],
          comparable: [...elementsData.comparable, [j, j + 1]],
          notsorted: [...elementsData.notsorted, [...notsortedData]],
          sorted: [...elementsData.sorted, [...sortedData]],
        };
        notsortedData = [];
        step++;
        if (choice === 1) {
          if (arrayElemets[j + 1] < arrayElemets[j]) {
            arrayElemets = [...swap(arrayElemets, j, j + 1)];
            elementsData = {
              ...elementsData,
              arr: [...elementsData.arr, [...arrayElemets]],
              comparable: [
                ...elementsData.comparable,
                [...elementsData.comparable[step]],
              ],
              notsorted: [
                ...elementsData.notsorted,
                [...elementsData.notsorted[step]],
              ],
              sorted: [...elementsData.sorted, [...elementsData.sorted[step]]],
            };
            step++;
          }
          if (j === length - 2 - i) {
            sortedData.push(j + 1);
            for (let u = 0; u < length - 1 - i; u++) {
              if (u !== j) {
                notsortedData.push(u);
              }
            }
            elementsData = {
              ...elementsData,
              arr: [...elementsData.arr, [...arrayElemets]],
              comparable: [...elementsData.comparable, []],
              notsorted: [...elementsData.notsorted, [...notsortedData]],
              sorted: [...elementsData.sorted, [...sortedData]],
            };
            notsortedData = [];
            step++;
          }
          if (i === length - 2) {
            sortedData.push(0);
            elementsData = {
              ...elementsData,
              arr: [...elementsData.arr, [...arrayElemets]],
              comparable: [...elementsData.comparable, []],
              notsorted: [...elementsData.notsorted, []],
              sorted: [...elementsData.sorted, [...sortedData]],
            };
          }
        } else {
          if (arrayElemets[j + 1] > arrayElemets[j]) {
            arrayElemets = [...swap(arrayElemets, j, j + 1)];
            elementsData = {
              ...elementsData,
              arr: [...elementsData.arr, [...arrayElemets]],
              comparable: [
                ...elementsData.comparable,
                [...elementsData.comparable[step]],
              ],
              notsorted: [
                ...elementsData.notsorted,
                [...elementsData.notsorted[step]],
              ],
              sorted: [...elementsData.sorted, [...elementsData.sorted[step]]],
            };
            step++;
          }
          if (j === length - 2 - i) {
            sortedData.push(j + 1);
            for (let u = 0; u < length - 1 - i; u++) {
              if (u !== j) {
                notsortedData.push(u);
              }
            }
            elementsData = {
              ...elementsData,
              arr: [...elementsData.arr, [...arrayElemets]],
              comparable: [...elementsData.comparable, []],
              notsorted: [...elementsData.notsorted, [...notsortedData]],
              sorted: [...elementsData.sorted, [...sortedData]],
            };
            notsortedData = [];
            step++;
          }
          if (i === length - 2) {
            sortedData.push(0);
            elementsData = {
              ...elementsData,
              arr: [...elementsData.arr, [...arrayElemets]],
              comparable: [...elementsData.comparable, []],
              notsorted: [...elementsData.notsorted, []],
              sorted: [...elementsData.sorted, [...sortedData]],
            };
          }
        }
      }
    }
    return elementsData;
}


export const SortingPage: React.FC = () => {
  const [buttonState, setButtonState] =
    useState<IButtonState>(defaultButtonState);
  const [getCheckedsetChoice, setCheckedChoice] = useState<boolean>(true);
  const [getCheckedVial, setCheckedVial] = useState<boolean>(false);
  const [array, setArray] = useState<number[]>([]);
  const [elements, setElements] = useState<IElements>(defaultState);
  const [element, setElement] = useState<IElement>(defaultState);
  const [arrayNew, setArrayNew] = useState<number[]>([]);

  const randomArr = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const random = Math.floor(Math.random() * (18 - 3) + 3);
    const arr = [];
    for (let i = 0; i < random; i++) {
      arr.push(Math.floor(Math.random() * 100));
    }
    const notsorted = [];
    for (let i = 0; i < arr.length; i++) {
      notsorted.push(i);
    }
    setArray([...arr]);
    setArrayNew([...arr]);
    setElements({
      ...elements,
      arr: [arr],
      notsorted: [notsorted],
      comparable: [[]],
      sorted: [[]],
    });
  };

  const selectionSort = (choice: number) => {
    const notsorted = [];
    for (let i = 0; i < array.length; i++) {
      notsorted.push(i);
    }
    setElements({
      ...elements,
      arr: [array],
      notsorted: [notsorted],
      comparable: [[]],
      sorted: [[]],
    });
    setElements(handleSelectionSort(choice, arrayNew, array, elements))
  };

  const BubbleSort = (choice: number) => {
    setElements({
      ...elements,
      arr: [],
      notsorted: [],
      comparable: [],
      sorted: [],
    });
    const notsorted = [];
    for (let i = 0; i < array.length; i++) {
      notsorted.push(i);
    }
    setElements({
      ...elements,
      arr: [array],
      notsorted: [[...notsorted]],
      comparable: [[]],
      sorted: [[]],
    });
    setElements(handleBubbleSort(choice, arrayNew, array, elements));
  };

  const handleButton = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    if (element.arr.length === 0) {
      return
    }
    const input = e.target as HTMLElement;
    setButtonState((prevState) => {
      return {
        ...prevState,
        upButton: {
          disabled: input.innerText === "По убыванию",
          loading: input.innerText === "По возрастанию",
        },
        downButton: {
          disabled: input.innerText === "По возрастанию",
          loading: input.innerText !== "По возрастанию",
        },
        arrButton: {
          disabled: true,
        },
      };
    });

    getCheckedsetChoice
      ? input.innerText === "По возрастанию"
        ? selectionSort(1)
        : selectionSort(2)
      : input.innerText === "По возрастанию"
      ? BubbleSort(1)
      : BubbleSort(2);
  };

  const handleInput = (e: React.SyntheticEvent): void => {
    const input = e.target as HTMLInputElement;
    if (input.value === "choice") {
      setCheckedChoice(true);
      setCheckedVial(false);
    } else {
      setCheckedChoice(false);
      setCheckedVial(true);
    }
  };

  const count1 = (steps: number, count: number) => {
    setElement({
      ...element,
      arr: elements.arr[count],
      notsorted: elements.notsorted[count],
      comparable: elements.comparable[count],
      sorted: elements.sorted[count],
    });
    count++;
    if (count > steps - 1) {
      setButtonState(defaultButtonState);
      return;
    } else {
      setTimeout(count1, SHORT_DELAY_IN_MS, steps, count);
    }
  };

  useEffect(() => {
    if (elements.arr.length > 0) {
      setTimeout(count1, SHORT_DELAY_IN_MS, elements.arr.length, 0);
    }
  }, [elements]);

  return (
    <SolutionLayout title="Сортировка массива">
      <div>
        <div className={`${styles.flex} ${styles.itemList}`}>
          <div className={`${styles.flex} ${styles.radioInput}`}>
            <RadioInput
              label="Выбор"
              name="choice"
              value="choice"
              checked={getCheckedsetChoice}
              onChange={handleInput}
            />
            <RadioInput
              label="Пузырек"
              name="vial"
              value="vial"
              checked={getCheckedVial}
              onChange={handleInput}
            />
          </div>
          <div className={`${styles.flex} ${styles.button}`}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              onClick={handleButton}
              isLoader={buttonState.upButton.loading}
              linkedList="average"
              disabled={buttonState.upButton.disabled}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={handleButton}
              isLoader={buttonState.downButton.loading}
              linkedList="average"
              disabled={buttonState.downButton.disabled}
            />
          </div>
          <div className={`${styles.button_rigth}`}>
            <Button
              text="Новый массив"
              linkedList="average"
              onClick={randomArr}
              disabled={buttonState.arrButton.disabled}
            />
          </div>
        </div>
        <div className={`${styles.flex} ${styles.column}`}>
          {element.arr &&
            element.arr.map((el, index) => {
              let color: ElementStates = ElementStates.Default;
              const filterSorted = element.sorted.includes(index);
              const filterNotSorted = element.notsorted.includes(index);
              const filterComparable = element.comparable.includes(index);
              if (filterSorted) {
                color = ElementStates.Modified;
              } else if (filterNotSorted) {
                color = ElementStates.Default;
              } else if (filterComparable) {
                color = ElementStates.Changing;
              }
              return (
                <Column
                  index={el}
                  extraClass="ml-2"
                  state={color}
                  key={`${el.toString()}${index.toString()}`}
                />
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
