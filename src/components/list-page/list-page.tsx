import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { LinkedList } from "./list-page.node";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list-page.module.css";
import { ILinkedList } from "./list-page.node";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../constants/delays";
import { IData } from "./types";
import { IButtonState } from "./types";
import { defaultButtonState, defaultdataState } from "./utils";

const list: ILinkedList<number> = new LinkedList<number>();

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndexValue, setInputIndexValue] = useState<string>("");
  const [listArr, setListArr] = useState<number[] | undefined>([]);
  const [data, setData] = useState<IData>(defaultdataState);
  const [numberColor, setNumberColor] = useState<number | undefined>();
  const [targetIndex, setTarget] = useState<number | undefined>();
  const [buttonState, setButtonState] =
    useState<IButtonState>(defaultButtonState);

  const randomListArray = () => {
    setListArr([]);
    list.clear();
    const random = Math.floor(Math.random() * (6 - 4) + 4);
    const arr = [];
    for (let i = 0; i < random; i++) {
      let value = Math.floor(Math.random() * 100);
      arr.push(value);
      list.append(value);
    }
    const setList: number[] | undefined = [];
    let current = list.getHead();
    if (current !== null && current.value !== null) {
      while (current?.value) {
        setList.push(current.value);
        current = current?.next;
      }
    }
    setListArr(setList);
  };

  const arrByIndex = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!inputIndexValue || !inputValue) {
      return;
    }
    if (Number(inputIndexValue) > list.getSize()-1) {
      alert(`Введите индекс от 1 до ${list.getSize()-1}`);
      return;
    }
    let count = 0;
    let element = Number(inputIndexValue);
    setData({
      ...data,
      number: Number(inputValue),
      index: count,
      type: "AddIndex",
    });
    setButtonState((prevState) => {
      return {
        ...prevState,
        addInHead: {
          disabled: true,
          loading: false,
        },
        addInTail: {
          disabled: true,
          loading: false
        },
        delFromHead: {
          disabled: true,
          loading: false
        },
        delFromTail: {
          disabled: true,
          loading: false
        },
        addByIndex: {
          disabled: false,
          loading: true
        },
        delByIndex: {
          disabled: true,
          loading: false
        },
      };
    });
    setTimeout(function get() {
      if (count < element) {
        count++;
        setData({
          ...data,
          number: Number(inputValue),
          index: count,
          type: "AddIndex",
        });
        setTimeout(get, 500);
      } else {
        setTimeout(() => {
          list.addByIndex(Number(inputValue), Number(inputIndexValue));
          setListArr(list.getElements());
          setNumberColor(element);
          setInputIndexValue("");
          setData({ type: "" });
          setInputValue("");
          setTimeout(() => {
            setNumberColor(undefined);
          }, SHORT_DELAY_IN_MS);
        }, SHORT_DELAY_IN_MS);
      }
    }, SHORT_DELAY_IN_MS);
  };

  const delByIndex = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!inputIndexValue) {
      return;
    }
    if (Number(inputIndexValue) > list.getSize()-1) {
      alert(`Введите индекс от 1 до ${list.getSize()-1}`);
      return;
    }
    let count = 0;
    let element = Number(inputIndexValue);
    let nodeValue: number | undefined | null = list?.getIndex(element)?.value;
    setData({
      ...data,
      number: nodeValue,
      index: count,
      type: "DelIndex",
    });
    setButtonState((prevState) => {
      return {
        ...prevState,
        addInHead: {
          disabled: true,
          loading: false,
        },
        addInTail: {
          disabled: true,
          loading: false
        },
        delFromHead: {
          disabled: true,
          loading: false
        },
        delFromTail: {
          disabled: true,
          loading: false
        },
        addByIndex: {
          disabled: true,
          loading: false
        },
        delByIndex: {
          disabled: false,
          loading: true
        },
      };
    });
    setTimeout(function get() {
      if (count <= element) {
        count++;
        setData({
          ...data,
          number: nodeValue,
          index: count,
          type: "DelIndex",
        });
        setTimeout(get, DELAY_IN_MS);
      } else if (count === element + 1) {
        setTimeout(() => {
          setData({
            ...data,
            number: nodeValue,
            index: count - 1,
            type: "DelIndex",
          });
          setTarget(element);
          count++;
        }, SHORT_DELAY_IN_MS);
        setTimeout(get, SHORT_DELAY_IN_MS);
      } else {
        setTimeout(() => {
          list.deleteByIndex(element);
          setListArr(list.getElements());
          setTarget(undefined);
          setInputIndexValue("");
          setInputValue("");
          setData({ type: "" });
          setInputValue("");
          setTimeout(() => {
            setNumberColor(undefined);
          }, DELAY_IN_MS);
        }, DELAY_IN_MS);
      }
    }, DELAY_IN_MS);
  };

  const addArrAppend = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setData({
      ...data,
      number: Number(inputValue),
      index: list.getSize() - 1,
      type: "head",
    });
    setButtonState((prevState) => {
      return {
        ...prevState,
        addInHead: {
          disabled: true,
          loading: false,
        },
        addInTail: {
          disabled: false,
          loading: true
        },
        delFromHead: {
          disabled: true,
          loading: false
        },
        delFromTail: {
          disabled: true,
          loading: false
        },
        addByIndex: {
          disabled: true,
          loading: false
        },
        delByIndex: {
          disabled: true,
          loading: false
        },
      };
    });
    setTimeout(() => {
      list.append(Number(inputValue));
      setNumberColor(list.getSize() - 1);
      setListArr(list.getElements());
      setData({ type: "" });
      setInputValue("");
      setTimeout(() => {
        setNumberColor(undefined);
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  };

  const addArrPrepend = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setData({
      ...data,
      number: Number(inputValue),
      index: 0,
      type: "head",
    });
    setButtonState((prevState) => {
      return {
        ...prevState,
        addInHead: {
          disabled: false,
          loading: true,
        },
        addInTail: {
          disabled: true,
          loading: false
        },
        delFromHead: {
          disabled: true,
          loading: false
        },
        delFromTail: {
          disabled: true,
          loading: false
        },
        addByIndex: {
          disabled: true,
          loading: false
        },
        delByIndex: {
          disabled: true,
          loading: false
        },
      };
    });
    setTimeout(() => {
      list.prepend(Number(inputValue));
      setNumberColor(0);
      setListArr(list.getElements());
      setData({ type: "" });
      setInputValue("");
      setTimeout(() => {
        setNumberColor(undefined);
      }, DELAY_IN_MS);
    }, DELAY_IN_MS);
  };

  const deleteArrPrepend = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setData({
      ...data,
      number: list?.getHead()?.value,
      index: 0,
      type: "delTail",
    });
    setButtonState((prevState) => {
      return {
        ...prevState,
        addInHead: {
          disabled: true,
          loading: false
        },
        addInTail: {
          disabled: true,
          loading: false
        },
        delFromHead: {
          disabled: false,
          loading: true
        },
        delFromTail: {
          disabled: true,
          loading: false
        },
        addByIndex: {
          disabled: true,
          loading: false
        },
        delByIndex: {
          disabled: true,
          loading: false
        },
      };
    });
    setTimeout(() => {
      list.deleteHead();
      setListArr(list.getElements());
      setData({ type: "" });
    }, SHORT_DELAY_IN_MS);
  };

  const deleteArrAppend = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setData({
      ...data,
      number: list?.getTail()?.value,
      index: list.getSize() - 1,
      type: "delTail",
    });
    setButtonState((prevState) => {
      return {
        ...prevState,
        addInHead: {
          disabled: true,
          loading: false
        },
        addInTail: {
          disabled: true,
          loading: false
        },
        delFromHead: {
          disabled: true,
          loading: false
        },
        delFromTail: {
          disabled: false,
          loading: true
        },
        addByIndex: {
          disabled: true,
          loading: false
        },
        delByIndex: {
          disabled: true,
          loading: false
        },
      };
    });
    setTimeout(() => {
      list.deleteTail();
      setListArr(list.getElements());
      setData({ type: "" });
    }, SHORT_DELAY_IN_MS);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!Number(e.target.value)) {
      return;
    }
    e.target.placeholder === "Введите значение" ? setInputValue(e.target.value.trim()) : setInputIndexValue(e.target.value.trim());
  };

  useEffect(() => {
    randomListArray();
  }, []);

  useEffect(() => {
    setButtonState((prevState) => {
      return {
        ...prevState,
        addInHead: {
          disabled: inputValue === "",
          loading: false,
        },
        addInTail: {
          disabled: inputValue === "",
          loading: false
        },
        delFromHead: {
          disabled: listArr === undefined,
          loading: false
        },
        delFromTail: {
          disabled: listArr === undefined,
          loading: false
        },
        addByIndex: {
          disabled: (inputIndexValue === "" || inputValue === ""),
          loading: false
        },
        delByIndex: {
          disabled: (inputIndexValue === "" || listArr === undefined),
          loading: false
        },
      };
    });
  }, [listArr, inputValue, inputIndexValue]);

  return (
    <SolutionLayout title="Связный список">
      <div>
        <div className={`${styles.item} ${styles.item_top}`}>
          <div className={styles.item}>
            <Input
              isLimitText={true}
              maxLength={4}
              extraClass="mr-6"
              value={inputValue}
              onChange={onChange}
              placeholder="Введите значение"
            />
          </div>
          <div className={`${styles.item} ${styles.item_button}`}>
            <Button
              text="Добавить в head"
              extraClass="mr-6"
              disabled={buttonState.addInHead.disabled}
              linkedList="small"
              onClick={addArrPrepend}
              isLoader={buttonState.addInHead.loading}
            />
            <Button
              text="Добавить в tail"
              disabled={buttonState.addInTail.disabled}
              extraClass="mr-6"
              linkedList="small"
              onClick={addArrAppend}
              isLoader={buttonState.addInTail.loading}
            />
            <Button
              text="Удалить из head"
              extraClass="mr-6"
              linkedList="small"
              onClick={deleteArrPrepend}
              disabled={buttonState.delFromHead.disabled}
              isLoader={buttonState.delFromHead.loading}
            />
            <Button
              text="Удалить из tail"
              linkedList="small"
              onClick={deleteArrAppend}
              disabled={buttonState.delFromTail.disabled}
              isLoader={buttonState.delFromTail.loading}
            />
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.item}>
            <Input
              extraClass="mr-6"
              value={inputIndexValue}
              onChange={onChange}
              placeholder="Введите индекс"
              type="number"
            />
          </div>
          <div className={`${styles.item} ${styles.item_button}`}>
            <Button
              text="Добавить по индексу"
              extraClass="mr-6"
              linkedList="big"
              onClick={arrByIndex}
              disabled={buttonState.addByIndex.disabled}
              isLoader={buttonState.addByIndex.loading}
            />
            <Button
              text="Удалить по индексу"
              linkedList="big"
              onClick={delByIndex}
              disabled={buttonState.delByIndex.disabled}
              isLoader={buttonState.delByIndex.loading}
            />
          </div>
        </div>
      </div>
      {listArr && (
        <ul className={styles.string}>
          {listArr.map((el: number, index: number, arr: number[]) => {
            let element = el.toString();
            let condition = data.number && index === data.index;
            if (
              condition &&
              (data.type === "delHead" ||
                data.type === "delTail" ||
                (data.type === "DelIndex" && index === targetIndex))
            ) {
              element = "";
            }
            let typeHead: number = 3;
            let typeTail: number = 3;
            let color = ElementStates.Default;
            if (
              condition &&
              (data.type === "head" ||
                data.type === "delHead" ||
                data.type === "AddIndex")
            ) {
              typeHead = 1;
            } else if (index === 0) {
              typeHead = 2;
            } else if (index !== 0) {
              typeHead = 3;
            }
            if (
              condition &&
              (data.type === "delTail" ||
                (data.type === "DelIndex" && index === targetIndex))
            ) {
              typeTail = 1;
            } else if (index === arr.length - 1) {
              typeTail = 2;
            } else if (index !== 0) {
              typeTail = 3;
            }
            numberColor === index
              ? (color = ElementStates.Modified)
              : (color = ElementStates.Default);
            if (data.index && index < data.index && data.type === "AddIndex") {
              color = ElementStates.Changing;
            }
            if (data.index && index < data.index && data.type === "DelIndex") {
              color = ElementStates.Changing;
            }

            return (
              <li
                key={`${el.toString()}${index.toString()}`}
                className={styles.item_li}
              >
                <div>
                  {typeHead === 1 && (
                    <div className={styles.text_top}>
                      <Circle
                        letter={data?.number?.toString()}
                        state={ElementStates.Changing}
                        isSmall={true}
                      />
                    </div>
                  )}
                  {typeHead === 2 && <p className={styles.text_top}>head</p>}
                  {typeHead === 3 && <p className={styles.text_top}></p>}
                  <Circle letter={element} state={color} />
                  <p className={styles.text}>{index}</p>
                  {typeTail === 1 &&
                    (data.type === "delTail" || data.type === "DelIndex") && (
                      <div className={styles.text_button}>
                        <Circle
                          letter={data?.number?.toString()}
                          state={ElementStates.Changing}
                          isSmall={true}
                        />
                      </div>
                    )}
                  {typeTail === 2 && <p className={styles.text_button}>tail</p>}
                  {typeTail === 3 && <p className={styles.text_button}> </p>}
                </div>
                {index !== arr.length - 1 && (
                  <div className={styles.arrowIcon}>
                    <ArrowIcon />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
