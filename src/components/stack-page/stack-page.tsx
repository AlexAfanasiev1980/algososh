import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./stack-page.node";
import { IStack } from "./stack-page.node";
import { v4 as uuidv4 } from "uuid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const classStack: IStack<string> = new Stack<string>();

interface INewStack {
  element: string | null;
  color?: number;
}

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [stack, setStack] = useState<Array<INewStack>>([]);
  const [buttonAdd, setButtonAdd] = useState<boolean>(true);
  const [buttonDelete, setButtonDelete] = useState<boolean>(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      setButtonAdd(false);
    } else {
      setButtonAdd(true);
    }
  };

  const addStack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    classStack.push(inputValue);
    setStack([...stack, { element: classStack.peak(), color: 2 }]);
    const stackNew = [...stack, { element: classStack.peak(), color: 1 }];
    setTimeout(setStack, SHORT_DELAY_IN_MS, stackNew);
    setInputValue("");
    setButtonAdd(true);
  };

  const deleteStack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (stack.length > 0) {
      const newStack: INewStack | undefined = {
        element: classStack.peak(),
        color: 2,
      };
      if (newStack) {
        setStack([...stack.slice(0, -1), newStack]);
        setTimeout(setStack, SHORT_DELAY_IN_MS, stack.slice(0, -1));
      }
    }
  };

  const clearStack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    classStack.clear();
    setStack([]);
  };

  useEffect(() => {
    if (stack.length) {
      setButtonDelete(false);
    } else {
      setButtonDelete(true);
    }
  }, [stack]);

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stack}>
        <div className={styles.item}>
          <Input
            isLimitText={true}
            maxLength={4}
            extraClass="mr-6"
            value={inputValue}
            onChange={onChange}
          />
          <Button
            text="Добавить"
            onClick={addStack}
            extraClass="mr-6"
            disabled={buttonAdd}
          />
          <Button
            text="Удалить"
            onClick={deleteStack}
            disabled={buttonDelete}
          />
        </div>
        <Button text="Очистить" onClick={clearStack} disabled={buttonDelete} />
      </div>
      {stack && (
        <ul className={styles.string}>
          {stack.map((el: INewStack, index: number, arr: INewStack[]) => {
            let color: ElementStates = ElementStates.Default;
            if (el.color === 2) {
              color = ElementStates.Changing;
            } else if (el.color === 1) {
              color = ElementStates.Default;
            }
            let classText = "item_stack";
            if (index === arr.length - 1 || index === 9) {
              classText = "item_stack1";
            }
            return (
              <li className={styles[classText]} key={uuidv4()}>
                {index === arr.length - 1 && (
                  <p className={styles.text_top}>top</p>
                )}
                {index !== arr.length - 1 && (
                  <p className={styles.text_top}> </p>
                )}
                <Circle letter={String(el.element)} state={color} />
                <p className={styles.text}>{index}</p>
              </li>
            );
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
