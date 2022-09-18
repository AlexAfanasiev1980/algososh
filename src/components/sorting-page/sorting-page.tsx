import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { v4 as uuidv4 } from "uuid";
import { IElements, IElement } from "./types";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { swap } from "./utils";

export const SortingPage: React.FC = () => {
  const defaultState = {
    arr: [],
    comparable: [],
    notsorted: [],
    sorted: [],
  }
  const [loaderUp, setLoaderUp] = useState<boolean>(false);
  const [loaderDown, setLoaderDown] = useState<boolean>(false);
  const [getCheckedsetChoice, setCheckedChoice] = useState<boolean>(true);
  const [getCheckedVial, setCheckedVial] = useState<boolean>(false);
  const [array, setArray] = useState<number[]>([]);
  const [upButton, setUpButton] = useState<boolean>(false);
  const [downButton, setDownButton] = useState<boolean>(false);
  const [arrButton, setArrButton] = useState<boolean>(false);
  const [elements, setElements] = useState<IElements>(defaultState);
  const [element, setElement] = useState<IElement>(defaultState);

  const [arrayNew, setArrayNew] = useState<number[]>([]);
  let [step, setStep] = useState<number>(0);

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
    setStep(0);
  };

  const selectionSort = (choice: number) => {
    const { length } = array;
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
    const arrayElemets: Array<number[]> = [arrayNew];
    let elementsData: IElements = elements;
    let sortedData: number[] = [];
    let comparableData: number[] = [];
    let notsortedData: number[] = [];
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
        setStep(step++);
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
      setStep(step++);
      notsortedData = [];
    }
    setElements(elementsData);
  };

  const BubbleSort = (choice: number) => {
    setElements({
      ...elements,
      arr: [],
      notsorted: [],
      comparable: [],
      sorted: [],
    });
    const { length } = array;
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
    let arrayElemets: number[] = arrayNew;
    let elementsData: IElements = elements;
    let sortedData: number[] = [];
    let notsortedData: number[] = [];

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
        setStep(step++);
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
            setStep(step++);
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
            setStep(step++);
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
            setStep(step++);
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
            setStep(step++);
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
    setStep(0);
    setElements(elementsData);
  };

  const handleButton = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const input = e.target as HTMLElement;
    input.innerText === "По возрастанию"
      ? setLoaderUp(true)
      : setLoaderDown(true);
    setArrButton(true);
    if (getCheckedsetChoice && input.innerText === "По возрастанию") {
      selectionSort(1);
      setDownButton(true);
    }
    if (getCheckedsetChoice && input.innerText === "По убыванию") {
      selectionSort(2);
      setUpButton(true);
    }
    if (getCheckedVial && input.innerText === "По возрастанию") {
      BubbleSort(1);
      setDownButton(true);
    }
    if (getCheckedVial && input.innerText === "По убыванию") {
      BubbleSort(2);
      setUpButton(true);
    }
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
      setDownButton(false);
      setUpButton(false);
      setArrButton(false);
      setLoaderUp(false);
      setLoaderDown(false);
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
              isLoader={loaderUp}
              linkedList="average"
              disabled={upButton}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={handleButton}
              isLoader={loaderDown}
              linkedList="average"
              disabled={downButton}
            />
          </div>
          <div className={`${styles.button_rigth}`}>
            <Button
              text="Новый массив"
              linkedList="average"
              onClick={randomArr}
              disabled={arrButton}
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
                  key={uuidv4()}
                />
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
