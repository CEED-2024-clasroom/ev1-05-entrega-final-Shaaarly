class Line {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.line = null;
    }

    create() {
        this.line = document.createElement('DIV');
        this.line.classList.add('line');
        this.line.style.left = `${this.x}px`;
        this.line.style.top = `${this.y}px`;
        document.body.appendChild(this.line);
    }

    update(length, angle) {
        this.line.style.width = `${length}px`;
        this.line.style.transform = `rotate(${angle}deg)`;
    }
}

export default Line;