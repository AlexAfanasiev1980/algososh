import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../constants/delays";
import { getArr, getFibonacciNumbers  } from "./utils";

const MAX_STRING = 9;
const MAX_LENGTH = 19;

export const FibonacciPage: React.FC = () => {
  const [fibonacci, setFibonacci] = useState<Array<number> | null>([]);
  const [arrFib, setArrFib] = useState<Array<number>>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setDisabled] = useState<boolean>(false);
  
  const countID = (arr: number[], steps: number, count: number) => {
    setLoader(true);
    setFibonacci(getArr(arr, count));
    count++;
    if (count > steps) {
      setArrFib([]);
      setLoader(false);
      return;
    } 
    setTimeout(countID, DELAY_IN_MS, arr, steps, count);
  };

  const handleButton = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setArrFib(getFibonacciNumbers(Number(inputValue)));
    setInputValue("");
    setLoader(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isNotCorrectValue = Number(e.target.value) > MAX_LENGTH
    setDisabled(isNotCorrectValue);
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (arrFib.length > 0) {
      setTimeout(countID, SHORT_DELAY_IN_MS, arrFib, arrFib.length, 1);
    }
  }, [arrFib]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={`${styles.content}`}>
        <Input
          placeholder="Введите число"
          type="number"
          isLimitText={true}
          max={19}
          extraClass="mr-6"
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text="Рассчитать"
          onClick={handleButton}
          isLoader={loader}
          disabled={isDisabled}
        />
      </div>

      {fibonacci && (
        <div className={styles.string}>
          {fibonacci.map((el, index, arr) => {
            const classText =  index === arr.length - 1 || index === MAX_STRING ? "item1" : "item"
            return (
              <div className={styles[classText]} key={`${el}${index}`}>
                <Circle letter={String(el)} key={index} />
                <p className={styles.text}>{index}</p>
              </div>
            );
            // }
          })}
        </div>
      )}
    </SolutionLayout>
  );
};
