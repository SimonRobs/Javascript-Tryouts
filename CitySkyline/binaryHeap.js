class BinaryHeap {

    constructor(capacity) {
        this.size = 0;
        this.elements = new Array(capacity + 1);
    }

    insert(elem) {
        let hole = ++this.size;
        for (this.elements[0] = elem; elem > this.elements[int(hole / 2)]; hole /= 2)
            this.elements[int(hole)] = this.elements[int(hole / 2)];

        this.elements[int(hole)] = elem;

        // indicates if the max has changed
        return int(hole) === 1;
    }

    remove(elem) {
        if (this.size === 0) return;

        let found = false;
        let i = 1;

        for (; i <= this.size; ++i) {
            if (this.elements[i] === elem) {
                found = true;
                break;
            }
        }

        if (!found) return;

        this.elements[i] = this.elements[this.size--];
        this.percolateDown(i);

        return i === 1 && this.findMax() !== elem;

    }

    deleteMax() {
        if (this.size === 0) return;

        const max = this.findMax();
        this.elements[1] = this.elements[this.size--];
        this.percolateDown(1);

        return max;
    }

    findMax() {
        return this.elements[1];
    }

    percolateDown(hole) {
        let child = 0;
        const temp = this.elements[hole];

        for (; hole * 2 <= this.size; hole = child) {
            child = hole * 2;
            if (child !== this.size && this.elements[child + 1] > this.elements[child])
                child++;
            if (this.elements[child] > temp)
                this.elements[hole] = this.elements[child];
            else break;
        }
        this.elements[hole] = temp;
    }
}