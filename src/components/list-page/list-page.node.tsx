import { createSecureContext } from "tls";

export class Nodes<T> {
  value: T | null;
  next: Nodes<T> | null;
  constructor(value: T | null, next?: Nodes<T> | null) {
    this.value = value === undefined ? null : value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  getElements: () => T[] | undefined;
  insertAt: (element: T, position: number) => void;
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getSize: () => number;
  addByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  getHead: () => Nodes<T> | null;
  getTail: () => Nodes<T> | undefined;
  getIndex: (index: number) => Nodes<T> | undefined;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Nodes<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  getElements(): T[] | undefined {
    if (this.size === 0) {
      return;
    }
    let current = this.head;
    const list: T[] = [];
    if (current?.value !== null) {
      while (current?.value) {
        list.push(current.value);
        current = current.next;
      }
      return list;
    }
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Nodes(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (currIndex < index) {
          if (currIndex === index - 1) {
            node.next = curr!.next;
            curr!.next = node;
          } else {
            curr = curr!.next;
          }
          currIndex++;
        }
      }
      this.size++;
    }
  }

  append(element: T) {
    const node = new Nodes(element);
    let current: Nodes<T> | null;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Nodes(element);
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  deleteHead() {
    if (this.head === null) {
      return;
    } else {
      this.head = this.head.next;
    }
    this.size--;
  }

  deleteTail() {
    let current;
    if (this.head === null) {
      return;
    } else {
      current = this.head;
    }
    let nextNode;
    while (current.next) {
      nextNode = current.next;
      if (nextNode.next !== null) {
        current = current.next;
      } else {
        current.next = null;
      }
    }
    this.size--;
  }

  getSize(): number {
    return this.size;
  }

  addByIndex(element: T, index: number) {
    if (index > this.size) {
      alert(`Введите индекс от 1 до ${this.size}`);
      return;
    }
    if (this.head === null) {
      return;
    }
    const node = new Nodes(element);
    let current = this.head;
    let number = 0;
    while (number < index) {
      if (number === index - 1) {
        const next = current?.next;
        current.next = node;
        node.next = next;
      }
      number++;
      if (current.next && number < index) {
        current = current.next;
      }
    }
    this.size++;
  }

  deleteByIndex(index: number) {
    if (index > this.size - 1) {
      alert(`Введите индекс от 1 до ${this.size}`);
      return;
    }
    if (this.head === null) {
      return;
    }
    if (index === 0) {
      this.deleteHead();
    } else if (index === this.size - 1) {
      this.deleteTail();
    } else {
      let current = this.head;
      let count = 0;
      while (count < index) {
        if (count === index - 1) {
          const nextNode = current?.next;
          if (nextNode) {
            current.next = nextNode.next;
          }
          
        } else {
          if (current.next) {
            current = current.next;
          }
          
        }
        count++;
      }
      this.size--;
    }
    
  }

  getHead(): Nodes<T> | null {
    return this.head;
  }

  getTail() {
    if (this.head === null) {
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current;
  }

  getIndex(index: number) {
    if (this.head === null || index > this.size -1) {
      return;
    }
    let current = this.head;
    let count = 0;
    while (count < index) {
      if (current.next) {
        current = current.next;
      }
      
      count++;
    }
    return current;
  }
}
