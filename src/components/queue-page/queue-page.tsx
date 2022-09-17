import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";
import { v4 as uuidv4 } from "uuid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

interface IColor {
  color?: ElementStates;
  index?: number | undefined;
}

export const QueuePage: React.FC = () => {
  const defaultContainer = ["", "", "", "", "", "", ""];
  const [inputValue, setInputValue] = useState<string>("");
  const [container, setContainer] = useState<string[]>(defaultContainer);
  const [head, setHead] = useState<number>(0);
  const [tail, setTail] = useState<number>(0);
  const [tailColor, setTailColor] = useState<IColor>({});
  const [headColor, setHeadColor] = useState<IColor>({});
  const [length, setLength] = useState<number>(0);
  const [buttonAdd, setButtonAdd] = useState<boolean>(true);
  const [buttonDelete, setButtonDelete] = useState<boolean>(true);
  const [buttonClear, setButtonClear] = useState<boolean>(true);
  const maxLength = 6;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    e.target.value ? setButtonAdd(false) : setButtonAdd(true);
  };

  const enqueue = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (length === 7 || tail === 7 || head === 6) {
      return;
    }
    setTailColor({ color: ElementStates.Changing, index: tail });
    setTimeout(() => {
      const arr = container;
      if (tail === 0 && head !== 0) {
        arr[head] = inputValue;
        setTail(head + 1);
      } else {
        arr[tail] = inputValue;
        setTail(tail + 1);
      }
      setContainer([...arr]);
      setInputValue("");
      setButtonAdd(true);
    }, SHORT_DELAY_IN_MS);
    setTimeout(() => {
      setTailColor({});
    }, SHORT_DELAY_IN_MS);
    setLength(length + 1);
  };

  const dequeue = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (head === 7) {
      return;
    }
    const arr = container;

    setHeadColor({ color: ElementStates.Changing, index: head });
    setTimeout(() => {
      arr[head] = "";
      setContainer([...arr]);
      if (head === 6 || head + 2 > tail) {
        setTail(0);
      }
      if (head < 6) {
        setHead(head + 1);
      }
      setHeadColor({});
    }, SHORT_DELAY_IN_MS);

    setLength(length - 1);
  };

  const clear = () => {
    setHead(0);
    setTail(0);
    setContainer(defaultContainer);
    setLength(0);
  };

  useEffect(() => {
    if (length) {
      setButtonDelete(false);
    } else {
      setButtonDelete(true);
    }
    if (length) {
      setButtonClear(false);
    } else if (length === 0 && head === 6) {
      setButtonDelete(false);
    } else {
      setButtonClear(true);
    }
  }, [length, head]);

  return (
    <SolutionLayout title="Очередь">
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
            onClick={enqueue}
            extraClass="mr-6"
            disabled={buttonAdd}
          />
          <Button text="Удалить" onClick={dequeue} disabled={buttonDelete} />
        </div>
        <Button text="Очистить" onClick={clear} disabled={buttonClear} />
      </div>
      {container && (
        <ul className={styles.string}>
          {container.map((el: string, index: number, arr: string[]) => {
            let color: ElementStates = ElementStates.Default;
            if (tailColor.color && index === tailColor.index) {
              color = tailColor?.color;
            }
            if (headColor.color && index === headColor.index) {
              color = headColor?.color;
            }
            const classText = index === arr.length - 1 || index === maxLength ? "item_stack1" : "item_stack";
            return (
              <li className={styles[classText]} key={uuidv4()}>
                {index === head && <p className={styles.text_top}>head</p>}
                {index !== head && <p className={styles.text_top}> </p>}
                <Circle letter={el} state={color} />
                <p className={styles.text}>{index}</p>
                {tail !== 0 && index === tail - 1 && (
                  <p className={styles.text}>tail</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
