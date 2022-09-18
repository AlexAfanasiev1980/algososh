export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: (item: T) => void;
  peak: () => T | null;
  clear: (defaultContainer: (T)[]) => void;
  getSize: () => number;
  getLength: () => number;
  getHead: () => number;
  getTail: () => number;
  getElements: () => (T)[];
}

export class Queue<T> implements IQueue<T> {
  private container: (T)[] = [];
  private readonly defaultElements: (T)[] = [];
  private head: number = 0;
  private tail: number = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number, defaultElements: T[]) {
    this.defaultElements = [...defaultElements];
    this.size = size;
    this.container = defaultElements;
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail] = item;
    this.tail++;
    this.length++;
  };

  dequeue = (item: T) => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head] = item;
     if (this.head === this.size) {
      this.head = 0;
    } else {
      this.head++;
    }
    this.length--; 
  };

  clear = (defaultContainer: (T)[]) => {
    console.log(defaultContainer)
    this.container = defaultContainer;
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    if (this.length !== 0) {
      return this.container[this.head];
    }
    return null;
  };

  isEmpty = () => this.length === 0;

  getSize = () => {
    return this.size;
  }

  getLength = () => {
    return this.length;
  }

  getHead = () => {
    return this.head;
  }

  getTail = () => {
    return this.tail;
  }

  getElements = () => {
    return this.container;
  }
}