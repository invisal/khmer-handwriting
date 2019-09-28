class Handwriting {
  constructor(canvas) {
    this.canvas = canvas;
    this.cx = canvas.getContext('2d');

    // States
    this.isDrawing = false;
    this.start = { x: -100, y: -100 };
    this.end = { x: -100, y: -100 };

    // Register the events
    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
    canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
    canvas.addEventListener('touchend', this.onTouchEnd.bind(this));

    // Prevent conflict scrolling gesture
    const override = function(e) {
      if (e.target === canvas) {
        e.preventDefault();
      }
    }

    document.body.addEventListener('touchstart', override, { passive: false });
    document.body.addEventListener('touchmove', override, { passive: false });
    document.body.addEventListener('touchend', override, { passive: false });

    // Using timer for drawing
    window.requestAnimationFrame(this.draw.bind(this));
  }

  clear() {
    this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  toBase64() {
    return this.canvas.toDataURL('image/png', 1);
  }

  draw() {
    if (this.isDrawing) {
      const cx = this.cx;
      cx.strokeStyle = '#000000';
      cx.lineJoin = 'round';
      cx.lineWidth = 5;

      cx.beginPath();
      cx.moveTo(this.end.x, this.end.y);
      cx.lineTo(this.start.x, this.start.y);
      cx.closePath();
      cx.stroke();

      this.start = this.end;
    }

    window.requestAnimationFrame(this.draw.bind(this));
  }

  onTouchStart(e) {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });

    this.canvas.dispatchEvent(mouseEvent);
  }

  onTouchEnd() {
    const mouseEvent = new MouseEvent('mouseup', {});
    this.canvas.dispatchEvent(mouseEvent);
  }

  onTouchMove(e) {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });

    this.canvas.dispatchEvent(mouseEvent);
  }

  onMouseDown(e) {
    this.isDrawing = true;

    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;
    this.end = { x, y };
    this.start = { x, y };
  }

  onMouseMove(e) {
    if (this.isDrawing) {
      const x = e.pageX - this.canvas.offsetLeft;
      const y = e.pageY - this.canvas.offsetTop;
      this.end = { x, y };
    }
  }

  onMouseUp() {
    this.isDrawing = false;
    this.start = this.end;
  }
}
