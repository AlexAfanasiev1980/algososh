import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [stringLetter, setStringLetter] = useState<Array<string>>([]);
  const [string, setString] = useState<Array<Array<string>>>([]);
  const [step, setStep] = useState<number>();
  const [loader, setLoader] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");

  const swap = (arr: string[], start: number, end: number): string[] => {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    return arr;
  };

  const countID = (steps: number, count: number) => {
    setLoader(true);
    setStringLetter(string[count]);
    setStep(count + 1);
    count++;
    if (count > steps - 1) {
      setLoader(false);
      return;
    } else {
      setTimeout(countID, 1000, steps, count);
    }
  };

  const handleButton = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const arr: string[] = inputValue.split('');
    let start = 0;
    let end = arr.length - 1;
    let arrString: string[][] = [];
    arrString.push([...arr]);
    while (start < end) {
      arrString.push([...swap(arr, start, end)]);
      start++;
      end--;
    }
    setString(arrString);
    setInputValue("");
    
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (string) {
      setTimeout(countID, 500, string.length, 0);
    }
  }, [string]);

  return (
    <SolutionLayout title="Строка">
      <div className={`${styles.content}`}>
        <Input
          isLimitText={true}
          maxLength={11}
          extraClass="mr-6"
          value={inputValue}
          onChange={onChange}
        />
        <Button text="Развернуть" onClick={handleButton} isLoader={loader} />
      </div>

      {stringLetter && (
        <div className={styles.string}>
          {stringLetter.map((el, index, arr) => {
            let color;
            if (step) {
              if (stringLetter.length % 2 !== 0 && step === string.length) {
                color = ElementStates.Modified;
              } else {
                if (index + 1 < step || index > arr.length - step) {
                  color = ElementStates.Modified;
                } else if (index + 1 === step || index === arr.length - step) {
                  color = ElementStates.Changing;
                } else {
                  color = ElementStates.Default;
                }
              }
              return <Circle state={color} letter={el} />;
            } else {
              return <Circle letter={el} />;
            }
          })}
        </div>
      )}
    </SolutionLayout>
  );
};
