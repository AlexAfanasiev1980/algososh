import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";
import { v4 as uuidv4 } from "uuid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "./queue-page.node";
import { IQueue } from "./queue-page.node";
import { IColor } from "./types";

const defaultContainer = [...["", "", "", "", "", "", ""]];
const turn: IQueue<string> = new Queue<string>(7, defaultContainer);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [container, setContainer] = useState<string[]>([]);
  const [head, setHead] = useState<number>(0);
  const [tail, setTail] = useState<number>(0);
  const [tailColor, setTailColor] = useState<IColor>({});
  const [headColor, setHeadColor] = useState<IColor>({});
  const [length, setLength] = useState<number>(0);
  const [buttonAdd, setButtonAdd] = useState<boolean>(true);
  const [buttonDelete, setButtonDelete] = useState<boolean>(true);
  const [buttonClear, setButtonClear] = useState<boolean>(true);
  const maxIndex = 6;
  const maxLength = 7;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    e.target.value ? setButtonAdd(false) : setButtonAdd(true);
  };

  const enqueue = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      turn.getLength() === maxLength ||
      turn.getTail() === maxLength ||
      turn.getHead() === maxIndex
    ) {
      return;
    }
    setTailColor({ color: ElementStates.Changing, index: turn.getTail() });
    setTimeout(() => {
      if (turn.getTail() === 0 && turn.getHead() !== 0) {
        setTail(turn.getHead() + 1);
      } else {
        setTail(turn.getTail() + 1);
      }
      turn.enqueue(inputValue);
      setLength(turn.getLength());
      setContainer(turn.getElements());
      setInputValue("");
      setButtonAdd(true);
    }, SHORT_DELAY_IN_MS);
    setTimeout(() => {
      setTailColor({});
    }, SHORT_DELAY_IN_MS);
  };

  const dequeue = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (turn.getHead() === maxLength || turn.getHead() === turn.getTail()) {
      return;
    }
    setHeadColor({ color: ElementStates.Changing, index: turn.getHead() });
    setTimeout(() => {
      turn.dequeue("");
      setContainer(turn.getElements());
      if (turn.getHead() === maxIndex || turn.getHead() + 1 > turn.getTail()) {
        setTail(0);
      }
      if (turn.getHead() < maxLength) {
        setHead(turn.getHead());
      }
      setHeadColor({});
    }, SHORT_DELAY_IN_MS);
    setLength(turn.getLength());
  };

  const clear = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const defaultEl = ["", "", "", "", "", "", ""];
    turn.clear(defaultEl);
    setTimeout(() => {
      setHead(turn.getHead());
      setTail(turn.getTail());
      setLength(turn.getLength());
      setContainer(turn.getElements());
    }, 500);
  };

  useEffect(() => {
    length ? setButtonDelete(false) : setButtonDelete(true);
    if (length) {
      setButtonClear(false);
    } else if (length === 0 && head === 6) {
      setButtonDelete(false);
    } else {
      setButtonClear(true);
    }
  }, [length, head]);

  useEffect(() => {
    setContainer(defaultContainer);
  }, [])

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
            const classText =
              index === arr.length - 1 || index === maxIndex
                ? "item_stack1"
                : "item_stack";
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
