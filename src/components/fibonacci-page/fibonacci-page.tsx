import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [fibonacci, setFibonacci] = useState<Array<number> | null>([]);
  const [arrFib, setArrFib] = useState<Array<number>>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const getArr = (arr: number[], count: number): number[] | null => {
    if (arr.length <= 0) {
      return null;
    }
    return arr.filter((el, index) => index < count && index !== 0);
  };

  const countID = (arr: number[], steps: number, count: number) => {
    setLoader(true);
    setFibonacci(getArr(arr, count));
    count++;
    if (count > steps) {
      setArrFib([]);
      setLoader(false);
      return;
    } else {
      setTimeout(countID, 1000, arr, steps, count);
    }
  };

  const fibIterative = (n: number): number[] => {
    let arr: number[] = [0, 1];
    for (let i = 2; i < n + 2; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  };

  const handleButton = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const arr: number[] = [];
    if (Number(inputValue) > 0) {
      arr.push(...fibIterative(Number(inputValue)));
    }
    setArrFib(arr);
    setInputValue("");
    setLoader(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    Number(e.target.value) > 19 ? setDisabled(true) : setDisabled(false);
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (arrFib.length > 0) {
      setTimeout(countID, 500, arrFib, arrFib.length, 1);
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
            let classText = "item";
            if (index === arr.length - 1 || index === 9) {
              classText = "item1";
            }
            return (
              <div className={styles[classText]}>
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
