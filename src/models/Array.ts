interface Array<T> {
    remove(elem: T): Array<T>;
  }

Array.prototype.remove = function<T>(this: T[], elem: T): T[] {
    return this.filter(e => e !== elem);
}