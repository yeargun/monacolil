// js-host.ts
function setTextContent(el, text) {
  el.textContent = text;
}
function setInnerHTML(el, html) {
  el.innerHTML = html;
}
function setClassName(el, name) {
  el.className = name;
}
function setStyle(el, prop, value) {
  el.style.setProperty(prop, value);
}
function preventDefault(event) {
  event.preventDefault();
}
function eventKey(event) {
  return event.key;
}
function eventCtrlKey(event) {
  return event.ctrlKey || event.metaKey;
}
function eventShiftKey(event) {
  return event.shiftKey;
}
function inputSetValue(el, value) {
  el.value = value;
}
function canvasGetContext2d(canvas) {
  try {
    return canvas.getContext("2d");
  } catch {
    return null;
  }
}
function canvasSetSize(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
}
function canvasFillRect(ctx, x2, y2, w2, h, color) {
  if (!ctx) {
    return;
  }
  ctx.fillStyle = color;
  ctx.fillRect(x2, y2, w2, h);
}
function setTabIndex(el, value) {
  el.tabIndex = value;
}

// ../../build/monaco-layers/demo-entry.raw.js
var lb = "[ \\t\\r\\n]+";
var mb = "root";
var nb = "string";
var ob = "delimiter";
var pb = "";
var qb = "delimiter.bracket";
var rb = "number";
var sb = "identifier";
var tb = "comment";
var ub = "display";
var vb = "plaintext";
var wb = "string.escape";
var xb = "keyword";
var yb = '[^\\\\"]+';
var zb = "background";
var Ab = "javascript";
var Bb = "height";
var Cb = '\\"';
var Db = "false";
var Eb = "minimap";
var Fb = "vs-dark";
var Gb = "monaco-editor ";
var Hb = "[{}()\\[\\]]";
var Ib = "\n";
var Jb = "\\\\.";
var Kb = "class";
var Lb = "color";
var Mb = "width";
var Nb = "flex";
var Ob = "text";
var Pb = "type";
var Qb = "[^\\\\']+";
var Rb = "px";
var Sb = '[^\\"]+';
var Tb = "absolute";
var Vb = "hc-black";
var Wb = "language";
var Xb = "markdown";
var _b = "position";
var $b = "relative";
var ac = "textarea";
var bc = 65535;
var O = "vs";
function j(a, b, c) {
  b < 0 && (b = 0);
  c > a.length && (c = a.length);
  if (b >= c) return pb;
  return a.slice(b, c);
}
function o(a, b, c, d, e) {
  if (b > d || b == d && c > e) {
    a.startLineNumber = d;
    a.startColumn = e;
    a.endLineNumber = b;
    a.endColumn = c;
  } else {
    a.startLineNumber = b;
    a.startColumn = c;
    a.endLineNumber = d;
    a.endColumn = e;
  }
}
function X(a, b, c) {
  a.piece = b;
  a.color = c;
  a.size_left = 0;
  a.lf_left = 0;
  a.alive = true;
  a.parent = a;
  a.left = a;
  a.right = a;
}
function B(a) {
  var c = [0];
  var d = a.length;
  var b = 0, e;
  for (; b < d; b = b + 1 | 0) {
    e = a.charCodeAt(b);
    if (13 == e) {
      if (b + 1 < d && 10 == a.charCodeAt(b + 1)) {
        c.push(b + 2 | 0);
        b = b + 1;
      } else {
        c.push(b + 1);
      }
    } else {
      10 == e && c.push(b + 1);
    }
  }
  return c;
}
function Y(a) {
  for (; a.left != i; ) a = a.left;
  return a;
}
function Ba(a) {
  for (; a.right != i; ) a = a.right;
  return a;
}
function C(a) {
  if (a.right != i) return Y(a.right);
  for (; a.parent != i; ) {
    if (a.parent.left == a) break;
    a = a.parent;
  }
  if (a.parent == i) return i;
  return a.parent;
}
function Ca(a, b, c, d) {
  a.root = i;
  a.buffers = [];
  a.lineCnt = 1;
  a.length = 0;
  a.eol = c;
  a.eolLength = 2;
  a.eolNormalized = d;
  a.lastChangeBufferPos = { line: 0, column: 0 };
  a.cacheNode = i;
  a.cacheNodeStartOffset = 0;
  a.cacheNodeStartLineNumber = 0;
  a.cacheHasLine = false;
  a.cacheValid = false;
  a.lastVisitedLineNumber = 0;
  a.lastVisitedLineValue = pb;
  Da(a, b);
}
function Da(a, c) {
  var b = { buffer: "", lineStarts: [] };
  b.buffer = pb;
  b.lineStarts = [0];
  a.buffers = [b];
  a.lastChangeBufferPos = { line: 0, column: 0 };
  a.root = i;
  a.lineCnt = 1;
  a.length = 0;
  a.eol = Ib;
  a.eolLength = 2;
  a.eolNormalized = true;
  var d = i;
  b = 0;
  for (; b < c.length; b = b + 1) d = Ea(a, d, c[b], b + 1);
  a.cacheValid = false;
  a.lastVisitedLineNumber = 0;
  a.lastVisitedLineValue = pb;
  s(a);
}
function Ea(a, b, c, d) {
  if (0 == c.buffer.length) return b;
  var e = c.lineStarts;
  0 == e.length && (e = B(c.buffer), c.lineStarts = e);
  d = { bufferIndex: d, start: { line: 0, column: 0 }, end: { line: e.length - 1, column: c.buffer.length - (e[e.length - 1] | 0) | 0 }, lineFeedCnt: e.length - 1, length: c.buffer.length };
  a.buffers.push(c);
  if (b == i) return r(a, i, d);
  return r(a, b, d);
}
function H(a, d) {
  var b = d.right;
  b.size_left = b.size_left + (d.size_left + d.piece.length | 0) | 0;
  b.lf_left = b.lf_left + (d.lf_left + d.piece.lineFeedCnt | 0) | 0;
  d.right = b.left;
  b.left != i && (b.left.parent = d);
  b.parent = d.parent;
  d.parent == i ? a.root = b : d.parent.left == d ? d.parent.left = b : d.parent.right = b;
  b.left = d;
  d.parent = b;
}
function I(a, b) {
  var d = b.left;
  b.left = d.right;
  d.right != i && (d.right.parent = b);
  d.parent = b.parent;
  b.size_left = b.size_left - (d.size_left + d.piece.length | 0) | 0;
  b.lf_left = b.lf_left - (d.lf_left + d.piece.lineFeedCnt | 0) | 0;
  b.parent == i ? a.root = d : b == b.parent.right ? b.parent.right = d : b.parent.left = d;
  d.right = b;
  b.parent = d;
}
function J(a, d, b, c) {
  for (; d != a.root && d != i; ) {
    if (d.parent.left == d) {
      var e = d.parent;
      e.size_left = e.size_left + b | 0;
      e = d.parent;
      e.lf_left = e.lf_left + c | 0;
    }
    d = d.parent;
  }
}
var K;
var ia;
(function() {
  function a(c) {
    return c == i ? 0 : (c.size_left + c.piece.length | 0) + a(c.right) | 0;
  }
  function b(c) {
    return c == i ? 0 : (c.lf_left + c.piece.lineFeedCnt | 0) + b(c.right) | 0;
  }
  K = function(c, d) {
    if (d == c.root) return;
    for (; ; ) {
      var e = d != c.root && d == d.parent.right;
      if (!e) {
        break;
      }
      d = d.parent;
    }
    if (d == c.root) return;
    d = d.parent;
    e = a(d.left) - d.size_left | 0;
    var f = b(d.left) - d.lf_left | 0;
    d.size_left = d.size_left + e | 0;
    d.lf_left = d.lf_left + f | 0;
    for (; d != c.root && (0 != e || 0 != f); ) {
      if (d.parent.left == d) {
        var g = d.parent;
        g.size_left = g.size_left + e | 0;
        g = d.parent;
        g.lf_left = g.lf_left + f | 0;
      }
      d = d.parent;
    }
  };
  ia = function(c, e) {
    if (e.left == i) {
      var d = e.right;
      var f = e, h, g, j2;
    } else {
      if (e.right == i) {
        d = e.left;
        f = e;
      } else {
        f = Y(e.right);
        d = f.right;
      }
    }
    if (f == c.root) {
      c.root = d;
      d.color = 0;
      e.alive = false;
      e.parent = e;
      e.left = e;
      e.right = e;
      i.parent = i;
      c.root.parent = i;
      return;
    }
    h = 1 == f.color;
    f == f.parent.left ? f.parent.left = d : f.parent.right = d;
    if (f == e) {
      d.parent = f.parent;
      K(c, d);
    } else {
      f.parent == e ? d.parent = f : d.parent = f.parent;
      K(c, d);
      f.left = e.left;
      f.right = e.right;
      f.parent = e.parent;
      f.color = e.color;
      e == c.root ? c.root = f : e == e.parent.left ? e.parent.left = f : e.parent.right = f;
      f.left != i && (f.left.parent = f);
      f.right != i && (f.right.parent = f);
      f.size_left = e.size_left;
      f.lf_left = e.lf_left;
      K(c, f);
    }
    e.alive = false;
    e.parent = e;
    e.left = e;
    e.right = e;
    d.parent.left == d && (e = a(d), f = b(d), (e != d.parent.size_left || f != d.parent.lf_left) && (g = e - d.parent.size_left | 0, j2 = f - d.parent.lf_left | 0, d.parent.size_left = e, d.parent.lf_left = f, J(c, d.parent, g, j2)));
    K(c, d.parent);
    if (h) {
      i.parent = i;
      return;
    }
    for (; d != c.root && 0 == d.color; ) {
      if (d == d.parent.left) {
        e = d.parent.right;
        1 == e.color && (e.color = 0, d.parent.color = 1, H(c, d.parent), e = d.parent.right);
        if (0 == e.left.color && 0 == e.right.color) {
          e.color = 1;
          d = d.parent;
        } else {
          0 == e.right.color && (e.left.color = 0, e.color = 1, I(c, e), e = d.parent.right);
          e.color = d.parent.color;
          d.parent.color = 0;
          e.right.color = 0;
          H(c, d.parent);
          d = c.root;
        }
      } else {
        e = d.parent.left;
        1 == e.color && (e.color = 0, d.parent.color = 1, I(c, d.parent), e = d.parent.left);
        if (0 == e.left.color && 0 == e.right.color) {
          e.color = 1;
          d = d.parent;
        } else {
          0 == e.left.color && (e.right.color = 0, e.color = 1, H(c, e), e = d.parent.left);
          e.color = d.parent.color;
          d.parent.color = 0;
          e.left.color = 0;
          I(c, d.parent);
          d = c.root;
        }
      }
    }
    d.color = 0;
    i.parent = i;
  };
})();
function ha(a, d) {
  K(a, d);
  for (; ; ) {
    var b = d != a.root && 1 == d.parent.color;
    if (!b) {
      break;
    }
    if (d.parent == d.parent.parent.left) {
      b = d.parent.parent.right;
      if (1 == b.color) {
        d.parent.color = 0;
        b.color = 0;
        d.parent.parent.color = 1;
        d = d.parent.parent;
      } else {
        d == d.parent.right && (d = d.parent, H(a, d));
        d.parent.color = 0;
        d.parent.parent.color = 1;
        I(a, d.parent.parent);
      }
    } else {
      b = d.parent.parent.left;
      if (1 == b.color) {
        d.parent.color = 0;
        b.color = 0;
        d.parent.parent.color = 1;
        d = d.parent.parent;
      } else {
        d == d.parent.left && (d = d.parent, I(a, d));
        d.parent.color = 0;
        d.parent.parent.color = 1;
        H(a, d.parent.parent);
      }
    }
  }
  a.root.color = 0;
}
function r(a, c, b) {
  var d = { parent: null, left: null, right: null, color: 0, piece: null, size_left: 0, lf_left: 0, alive: false };
  X(d, b, 1);
  d.left = i;
  d.right = i;
  d.parent = i;
  d.size_left = 0;
  d.lf_left = 0;
  if (a.root == i) {
    a.root = d;
    d.color = 0;
  } else {
    if (c.right == i) {
      c.right = d;
      d.parent = c;
    } else {
      c = Y(c.right);
      c.left = d;
      d.parent = c;
    }
  }
  ha(a, d);
  return d;
}
function Z(a, c, b) {
  var d = { parent: null, left: null, right: null, color: 0, piece: null, size_left: 0, lf_left: 0, alive: false };
  X(d, b, 1);
  d.left = i;
  d.right = i;
  d.parent = i;
  d.size_left = 0;
  d.lf_left = 0;
  if (a.root == i) {
    a.root = d;
    d.color = 0;
  } else {
    if (c.left == i) {
      c.left = d;
      d.parent = c;
    } else {
      c = Ba(c.left);
      c.right = d;
      d.parent = c;
    }
  }
  ha(a, d);
  return d;
}
function s(a) {
  var d = a.root;
  var b = 1, c = 0;
  for (; d != i; ) {
    b = b + (d.lf_left + d.piece.lineFeedCnt | 0) | 0;
    c = c + (d.size_left + d.piece.length | 0) | 0;
    d = d.right;
  }
  a.lineCnt = b;
  a.length = c;
  P(a, a.length);
}
function P(a, b) {
  a.cacheValid && (!a.cacheNode.alive || a.cacheNodeStartOffset >= b) && (a.cacheValid = false);
}
function k(a, b, c) {
  return (a.buffers[b].lineStarts[c.line] | 0) + c.column | 0;
}
function t(a, b, c, d) {
  if (0 == d.column) return d.line - c.line | 0;
  var e = a.buffers[b].lineStarts;
  if (d.line == e.length - 1) return d.line - c.line | 0;
  var f = (e[d.line] | 0) + d.column | 0;
  if ((e[d.line + 1 | 0] | 0) > (f + 1 | 0)) return d.line - c.line | 0;
  if (13 == a.buffers[b].buffer.charCodeAt(f - 1 | 0)) return (d.line - c.line | 0) + 1 | 0;
  return d.line - c.line | 0;
}
function D(a, c, b) {
  var d = c.piece;
  var g = a.buffers[d.bufferIndex].lineStarts;
  var h = ((g[d.start.line] | 0) + d.start.column | 0) + b | 0;
  b = d.start.line;
  var e = d.end.line;
  var c = b, f = 0, i2;
  for (; b <= e; ) {
    c = b + ((e - b | 0) / 2 | 0) | 0;
    f = g[c] | 0;
    i2 = c == g.length - 1 ? a.buffers[d.bufferIndex].buffer.length : g[c + 1 | 0] | 0;
    if (h < f) {
      e = c - 1 | 0;
    } else {
      if (h >= i2) {
        b = c + 1 | 0;
      } else {
        break;
      }
    }
  }
  return { line: c, column: h - f | 0 };
}
function L(a, c, b) {
  if (b < 0) return 0;
  c = c.piece;
  a = a.buffers[c.bufferIndex].lineStarts;
  b = (c.start.line + b | 0) + 1 | 0;
  if (b > c.end.line) return (((a[c.end.line] | 0) + c.end.column | 0) - (a[c.start.line] | 0) | 0) - c.start.column | 0;
  return ((a[b] | 0) - (a[c.start.line] | 0) | 0) - c.start.column | 0;
}
function Fa(a, c, b) {
  var d = c.piece;
  var e = D(a, c, b);
  var f = e.line - d.start.line | 0;
  var g = k(a, d.bufferIndex, d.end);
  if ((g - k(a, d.bufferIndex, d.start) | 0) == b) {
    c = t(a, c.piece.bufferIndex, d.start, e);
    if (c != f) {
      a = [0, 0];
      a[0] = c;
      a[1] = 0;
      return a;
    }
  }
  c = e.column;
  a = [0, 0];
  a[0] = f;
  a[1] = c;
  return a;
}
function ja(a, b) {
  var c = b.size_left;
  for (; b != a.root; ) {
    b.parent.right == b && (c = c + (b.parent.size_left + b.parent.piece.length | 0) | 0);
    b = b.parent;
  }
  return c;
}
function M(a, b) {
  if (a.cacheValid) {
    var d = a.cacheNodeStartOffset;
    var c;
    if (d <= b && (d + a.cacheNode.piece.length | 0) >= b) {
      c = b - d | 0;
      b = [null, 0, 0];
      b[0] = a.cacheNode;
      b[1] = c;
      b[2] = d;
      return b;
    }
  }
  d = a.root;
  c = 0;
  for (; d != i; ) {
    if (d.size_left > b) {
      d = d.left;
    } else {
      if ((d.size_left + d.piece.length | 0) >= b) {
        c = c + d.size_left | 0;
        var e = b - d.size_left | 0;
        b = [null, 0, 0];
        b[0] = d;
        b[1] = e;
        b[2] = c;
        a.cacheNode = d;
        a.cacheNodeStartOffset = c;
        a.cacheNodeStartLineNumber = 0;
        a.cacheHasLine = false;
        a.cacheValid = true;
        return b;
      } else {
        b = b - (d.size_left + d.piece.length | 0) | 0;
        c = c + (d.size_left + d.piece.length | 0) | 0;
        d = d.right;
      }
    }
  }
  a = [null, 0, 0];
  a[0] = i;
  a[1] = 0;
  a[2] = c;
  return a;
}
function ka(a, f, b) {
  var d = a.root;
  var c = 0, e;
  for (; d != i; ) {
    if (d.left != i && d.lf_left >= (f - 1 | 0)) {
      d = d.left;
    } else {
      if ((d.lf_left + d.piece.lineFeedCnt | 0) > (f - 1 | 0)) {
        e = L(a, d, (f - d.lf_left | 0) - 2 | 0);
        f = L(a, d, (f - d.lf_left | 0) - 1 | 0);
        c = c + d.size_left | 0;
        a = (e + b | 0) - 1 | 0;
        a > f || (f = a);
        a = [null, 0, 0];
        a[0] = d;
        a[1] = f;
        a[2] = c;
        return a;
      } else {
        if ((d.lf_left + d.piece.lineFeedCnt | 0) == (f - 1 | 0)) {
          f = L(a, d, (f - d.lf_left | 0) - 2 | 0);
          if (((f + b | 0) - 1 | 0) <= d.piece.length) {
            f = (f + b | 0) - 1 | 0;
            a = [null, 0, 0];
            a[0] = d;
            a[1] = f;
            a[2] = c;
            return a;
          }
          b = b - (d.piece.length - f | 0) | 0;
          break;
        } else {
          f = f - (d.lf_left + d.piece.lineFeedCnt | 0) | 0;
          c = c + (d.size_left + d.piece.length | 0) | 0;
          d = d.right;
        }
      }
    }
  }
  f = C(d);
  for (; f != i; ) {
    if (f.piece.lineFeedCnt > 0) {
      d = L(a, f, 0);
      c = ja(a, f);
      a = b - 1 | 0;
      a > d || (d = a);
      a = [null, 0, 0];
      a[0] = f;
      a[1] = d;
      a[2] = c;
      return a;
    } else {
      if (f.piece.length >= (b - 1 | 0)) {
        b = b - 1 | 0;
        d = ja(a, f);
        a = [null, 0, 0];
        a[0] = f;
        a[1] = b;
        a[2] = d;
        return a;
      } else {
        b = b - f.piece.length | 0;
      }
    }
    f = C(f);
  }
  a = [null, 0, 0];
  a[0] = i;
  a[1] = 0;
  a[2] = c;
  return a;
}
function m(a, f, b) {
  var d = a.root;
  var c = 0, e;
  for (; d != i; ) {
    if (d.left != i && (d.lf_left + 1 | 0) >= f) {
      d = d.left;
    } else {
      if (((d.lf_left + d.piece.lineFeedCnt | 0) + 1 | 0) >= f) {
        c = c + d.size_left | 0;
        return ((c + L(a, d, (f - d.lf_left | 0) - 2 | 0) | 0) + b | 0) - 1 | 0;
      } else {
        f = f - (d.lf_left + d.piece.lineFeedCnt | 0) | 0;
        c = c + (d.size_left + d.piece.length | 0) | 0;
        d = d.right;
      }
    }
  }
  return c;
}
function E(a, b) {
  b < 0 && (b = 0);
  var d = a.root;
  var c = b, e = 0, f;
  for (; d != i; ) {
    if (0 != d.size_left && d.size_left >= c) {
      d = d.left;
    } else {
      if ((d.size_left + d.piece.length | 0) >= c) {
        c = Fa(a, d, c - d.size_left | 0);
        d = e + (d.lf_left + c[0] | 0) | 0;
        if (0 == c[0]) {
          d = d + 1 | 0;
          b = (b - m(a, d, 1) | 0) + 1 | 0;
          a = [0, 0];
          a[0] = d;
          a[1] = b;
          return a;
        }
        b = c[1] + 1;
        a = [0, 0];
        a[0] = d + 1 | 0;
        a[1] = b;
        return a;
      } else {
        c = c - (d.size_left + d.piece.length | 0) | 0;
        e = e + (d.lf_left + d.piece.lineFeedCnt | 0) | 0;
        if (d.right == i) {
          d = e + 1 | 0;
          b = ((b - c | 0) - m(a, d, 1) | 0) + 1 | 0;
          a = [0, 0];
          a[0] = d;
          a[1] = b;
          return a;
        }
        d = d.right;
      }
    }
  }
  a = [0, 0];
  a[0] = 1;
  a[1] = 1;
  return a;
}
function Ga(a, c) {
  if (c == i) return pb;
  c = c.piece;
  var b = k(a, c.bufferIndex, c.start);
  return j(a.buffers[c.bufferIndex].buffer, b, k(a, c.bufferIndex, c.end));
}
function la(a, d, b) {
  if (d[0] == b[0]) {
    var c = d[0];
    var e = k(a, c.piece.bufferIndex, c.piece.start);
    return j(a.buffers[c.piece.bufferIndex].buffer, e + d[1] | 0, e + b[1] | 0);
  }
  e = d[0];
  c = k(a, e.piece.bufferIndex, e.piece.start);
  c = j(a.buffers[e.piece.bufferIndex].buffer, c + d[1] | 0, c + e.piece.length | 0);
  d = C(e);
  for (; d != i; ) {
    e = k(a, d.piece.bufferIndex, d.piece.start);
    if (d == b[0]) {
      c = c + j(a.buffers[d.piece.bufferIndex].buffer, e, e + b[1] | 0);
      break;
    }
    c = c + j(a.buffers[d.piece.bufferIndex].buffer, e, e + d.piece.length | 0);
    d = C(d);
  }
  return c;
}
function Ha(a, b) {
  var c;
  if (b.startLineNumber == b.endLineNumber && b.startColumn == b.endColumn) return pb;
  c = ka(a, b.startLineNumber, b.startColumn);
  return la(a, c, ka(a, b.endLineNumber, b.endColumn));
}
function x(a, c) {
  if (c == i) return pb;
  var b = x(a, c.left) + Ga(a, c);
  return b + x(a, c.right);
}
function y(a, b) {
  if (a.lastVisitedLineNumber == b) return a.lastVisitedLineValue;
  a.lastVisitedLineNumber = b;
  if (b == a.lineCnt) {
    a.lastVisitedLineValue = _(a, b, 0);
  } else {
    if (a.eolNormalized) {
      a.lastVisitedLineValue = _(a, b, a.eolLength);
    } else {
      b = _(a, b, 0);
      a.lastVisitedLineValue = b.replace(/\r\n|\r|\n/g, pb);
    }
  }
  return a.lastVisitedLineValue;
}
function _(a, b, c) {
  var d = m(a, b, 1);
  b = b == a.lineCnt ? a.length : m(a, b + 1 | 0, 1) - c | 0;
  b < d && (b = d);
  return la(a, M(a, d), M(a, b));
}
function z(a, b) {
  if (b == a.lineCnt) {
    var c = a.length;
    return c - m(a, b, 1) | 0;
  }
  return (m(a, b + 1 | 0, 1) - m(a, b, 1) | 0) - a.eolLength | 0;
}
function Q(a, c) {
  if (c.length > bc) {
    var e = [];
    while (c.length > bc) {
      var d = c.charCodeAt(65534);
      if (13 == d || d >= 55296 && d <= 56319) {
        d = j(c, 0, 65534);
        c = j(c, 65534, c.length);
      } else {
        d = j(c, 0, bc);
        c = j(c, bc, c.length);
      }
      var b = B(d);
      e.push({ bufferIndex: a.buffers.length, start: { line: 0, column: 0 }, end: { line: b.length - 1, column: d.length - (b[b.length - 1] | 0) | 0 }, lineFeedCnt: b.length - 1, length: d.length });
      var g = a.buffers;
      var f = { buffer: "", lineStarts: [] };
      f.buffer = d;
      f.lineStarts = b;
      g.push(f);
    }
    d = B(c);
    e.push({ bufferIndex: a.buffers.length, start: { line: 0, column: 0 }, end: { line: d.length - 1, column: c.length - (d[d.length - 1] | 0) | 0 }, lineFeedCnt: d.length - 1, length: c.length });
    b = a.buffers;
    a = { buffer: "", lineStarts: [] };
    a.buffer = c;
    a.lineStarts = d;
    b.push(a);
    return e;
  }
  e = a.buffers[0].buffer.length;
  d = B(c);
  f = a.lastChangeBufferPos;
  if (0 != e) {
    b = 0;
    for (; b < d.length; b = b + 1) d[b] = d[b] + e | 0;
  }
  a.buffers[0].lineStarts = a.buffers[0].lineStarts.concat(d.slice(1));
  a.buffers[0].buffer = a.buffers[0].buffer + c;
  d = a.buffers[0].buffer.length;
  c = a.buffers[0].lineStarts.length - 1;
  c = { line: c, column: d - (a.buffers[0].lineStarts[c] | 0) | 0 };
  d = { bufferIndex: 0, start: f, end: c, lineFeedCnt: t(a, 0, f, c), length: d - e };
  a.lastChangeBufferPos = c;
  return [d];
}
function $(a, c, b) {
  let d = c.piece, f = d.lineFeedCnt, g = k(a, d.bufferIndex, d.end), h = k(a, d.bufferIndex, b), e = t(a, d.bufferIndex, d.start, b), i2 = e - f | 0;
  f = h - g | 0;
  c.piece = { bufferIndex: d.bufferIndex, start: d.start, end: b, lineFeedCnt: e, length: d.length + f | 0 };
  J(a, c, f, i2);
}
function ma(a, c, b) {
  let d = c.piece, f = d.lineFeedCnt, g = k(a, d.bufferIndex, d.start), e = t(a, d.bufferIndex, b, d.end), h = e - f | 0;
  f = g - k(a, d.bufferIndex, b) | 0;
  c.piece = { bufferIndex: d.bufferIndex, start: b, end: d.end, lineFeedCnt: e, length: d.length + f | 0 };
  J(a, c, f, h);
}
function Ia(a, c, h) {
  var e = a.buffers[0].buffer.length;
  a.buffers[0].buffer = a.buffers[0].buffer + h;
  var d = B(h);
  var b = 0, f;
  for (; b < d.length; b = b + 1) d[b] = d[b] + e | 0;
  a.buffers[0].lineStarts = a.buffers[0].lineStarts.concat(d.slice(1));
  d = a.buffers[0].lineStarts.length - 1;
  d = { line: d, column: a.buffers[0].buffer.length - (a.buffers[0].lineStarts[d] | 0) | 0 };
  e = c.piece.length + h.length | 0;
  f = c.piece.lineFeedCnt;
  b = t(a, 0, c.piece.start, d);
  c.piece = { bufferIndex: c.piece.bufferIndex, start: c.piece.start, end: d, lineFeedCnt: b, length: e };
  a.lastChangeBufferPos = d;
  J(a, c, h.length, b - f | 0);
}
function Ja(a, h, c) {
  var b = Q(a, h);
  c = Z(a, c, b[b.length - 1]);
  h = b.length - 2;
  for (; h >= 0; ) {
    c = Z(a, c, b[h]);
    h = h - 1;
  }
}
function Ka(a, h, c) {
  h = Q(a, h);
  c = r(a, c, h[0]);
  var b = 1;
  for (; b < h.length; b = b + 1) c = r(a, c, h[b]);
}
function La(a, b, h) {
  a.lastVisitedLineNumber = 0;
  a.lastVisitedLineValue = pb;
  if (a.root != i) {
    var f = M(a, b);
    var c = f[0];
    var d = c.piece;
    var e;
    if (0 == c.piece.bufferIndex && d.end.line == a.lastChangeBufferPos.line && d.end.column == a.lastChangeBufferPos.column && (f[2] + d.length | 0) == b && h.length < bc) {
      Ia(a, c, h);
      s(a);
      return;
    }
    if (f[2] == b) {
      Ja(a, h, c);
      P(a, b);
    } else {
      if ((f[2] + c.piece.length | 0) > b) {
        b = D(a, c, f[1]);
        e = d.bufferIndex;
        f = d.end;
        var g = t(a, d.bufferIndex, b, d.end);
        var j2 = k(a, d.bufferIndex, d.end);
        d = { bufferIndex: e, start: b, end: f, lineFeedCnt: g, length: j2 - k(a, d.bufferIndex, b) | 0 };
        $(a, c, b);
        h = Q(a, h);
        d.length > 0 && r(a, c, d);
        b = 0;
        for (; b < h.length; b = b + 1) c = r(a, c, h[b]);
      } else {
        Ka(a, h, c);
      }
    }
  } else {
    b = Q(a, h);
    h = Z(a, i, b[0]);
    c = 1;
    for (; c < b.length; c = c + 1) h = r(a, h, b[c]);
  }
  s(a);
}
function Ma(a, b, c) {
  a.lastVisitedLineNumber = 0;
  a.lastVisitedLineValue = pb;
  var d, f, g, e, h, j2, l2, m2;
  if (c <= 0 || a.root == i) return;
  f = M(a, b);
  g = M(a, b + c | 0);
  d = f[0];
  e = g[0];
  if (d == e) {
    e = D(a, d, f[1]);
    g = D(a, d, g[1]);
    if (f[2] == b) {
      if (c == d.piece.length) {
        ia(a, d);
        s(a);
        return;
      }
      ma(a, d, g);
      P(a, b);
      s(a);
      return;
    }
    if ((f[2] + d.piece.length | 0) == (b + c | 0)) {
      $(a, d, e);
      s(a);
      return;
    }
    b = d.piece;
    h = b.start;
    c = b.end;
    j2 = b.length;
    l2 = b.lineFeedCnt;
    f = t(a, b.bufferIndex, b.start, e);
    m2 = k(a, b.bufferIndex, e);
    h = m2 - k(a, b.bufferIndex, h) | 0;
    d.piece = { bufferIndex: b.bufferIndex, start: b.start, end: e, lineFeedCnt: f, length: h };
    J(a, d, h - j2 | 0, f - l2 | 0);
    e = b.bufferIndex;
    f = t(a, b.bufferIndex, g, c);
    h = k(a, b.bufferIndex, c);
    r(a, d, { bufferIndex: e, start: g, end: c, lineFeedCnt: f, length: h - k(a, b.bufferIndex, g) | 0 });
    s(a);
    return;
  }
  c = [];
  $(a, d, D(a, d, f[1]));
  P(a, b);
  0 == d.piece.length && c.push(d);
  ma(a, e, D(a, e, g[1]));
  0 == e.piece.length && c.push(e);
  b = C(d);
  for (; b != i && b != e; ) {
    c.push(b);
    b = C(b);
  }
  b = 0;
  for (; b < c.length; b = b + 1) ia(a, c[b]);
  s(a);
}
function na(b) {
  var a = b.listeners.slice();
  b = 0;
  for (; b < a.length; ) {
    a[b]();
    b = b + 1;
  }
}
function Na(a, b) {
  a.deco = b;
  a.color = 0;
  a.maxEndLine = b.range.endLineNumber;
  a.maxEndColumn = b.range.endColumn;
  a.alive = true;
  a.parent = a;
  a.left = a;
  a.right = a;
}
function Oa(a) {
  if (0 == a.past.length) return null;
  var b = a.past[a.past.length - 1];
  a.past.splice(a.past.length - 1, 1);
  a.versionId = a.versionId + 1 | 0;
  return b;
}
function Pa(a) {
  if (0 == a.future.length) return null;
  var b = a.future[a.future.length - 1];
  a.future.splice(a.future.length - 1, 1);
  a.versionId = a.versionId + 1 | 0;
  return b;
}
function oa(a, c, d) {
  var g = [];
  if (0 == c.length || d <= 0) return g;
  var i2 = "g";
  var h = pb, b = 0, f, e, j2, k2;
  for (; b < c.length; ) {
    f = c.charAt(b);
    h = "\\" == f || "^" == f || "$" == f || "." == f || "|" == f || "?" == f || "*" == f || "+" == f || "(" == f || ")" == f || "[" == f || "]" == f || "{" == f || "}" == f ? h + "\\" + f : h + f;
    b = b + 1;
  }
  c = "\\b(?:" + h + ")\\b";
  e = new RegExp(c, i2);
  j2 = a.lineCnt;
  f = 1;
  for (; f <= j2 && g.length < d; ) {
    h = y(a, f);
    c = e.exec(h);
    for (; c && g.length < d; ) {
      b = +c.index | 0;
      c = c[0] + "";
      i2 = (b + c.length | 0) + 1 | 0;
      b = b + 1 | 0;
      k2 = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 };
      o(k2, f, b, f, i2);
      b = [c];
      c = [null, []];
      c[0] = k2;
      c[1] = b;
      g.push(c);
      c = e.exec(h);
    }
    f = f + 1 | 0;
  }
  return g;
}
function Qa(a, h, b, c) {
  let d = Ib, e = h.replace(/\r\n|\r|\n/g, d), f = B(e);
  h = { buffer: "", lineStarts: [] };
  h.buffer = e;
  h.lineStarts = f;
  h = [h];
  e = { root: null, buffers: [], lineCnt: 0, length: 0, eol: "", eolLength: 0, eolNormalized: false, lastChangeBufferPos: null, cacheNode: null, cacheNodeStartOffset: 0, cacheNodeStartLineNumber: 0, cacheHasLine: false, cacheValid: false, lastVisitedLineNumber: 0, lastVisitedLineValue: "" };
  Ca(e, h, d, true);
  a.buffer = e;
  a.languageId = b;
  a.uri = c;
  h = { past: [], future: [], versionId: 0 };
  h.past = [];
  h.future = [];
  h.versionId = 1;
  a.stack = h;
  h = { root: null, nextId: 0 };
  h.root = za;
  h.nextId = 1;
  a.decorations = h;
  h = { listeners: [], disposed: false };
  h.listeners = [];
  h.disposed = false;
  a.onDidChangeContent = h;
  a.versionId = 1;
}
function A(a, c, d) {
  var e = [];
  var f = 0, g, h, i2, j2, k2, b, l2;
  for (; f < c.length; f = f + 1) e.push(c[f]);
  c = 0;
  for (; c < e.length; ) {
    b = c + 1;
    for (; b < e.length; ) {
      f = e[c];
      g = e[b];
      (g.range.startLineNumber > f.range.startLineNumber || g.range.startLineNumber == f.range.startLineNumber && g.range.startColumn > f.range.startColumn) && (e[c] = g, e[b] = f);
      b = b + 1 | 0;
    }
    c = c + 1;
  }
  g = [];
  b = 0;
  for (; b < e.length; ) {
    c = e[b];
    f = m(a.buffer, c.range.startLineNumber, c.range.startColumn);
    h = m(a.buffer, c.range.endLineNumber, c.range.endColumn);
    i2 = Ha(a.buffer, c.range);
    h > f && Ma(a.buffer, f, h - f | 0);
    c.text.length > 0 && La(a.buffer, f, c.text);
    f = E(a.buffer, f + c.text.length | 0);
    h = c.range.startLineNumber;
    j2 = c.range.startColumn;
    k2 = f[0];
    f = f[1];
    l2 = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 };
    o(l2, h, j2, k2, f);
    f = c.identifier;
    c = { range: null, text: "", identifier: 0 };
    c.range = l2;
    c.text = i2;
    c.identifier = f;
    g.push(c);
    b = b + 1;
  }
  a.versionId = a.versionId + 1 | 0;
  d && (c = a.stack, c.past.push(g), c.future = [], c.versionId = c.versionId + 1 | 0);
  na(a.onDidChangeContent);
  return g;
}
function pa(a) {
  var b = Oa(a.stack);
  if (!b) return;
  a.stack.future.push(A(a, b, false));
}
function aa(a) {
  var b = Pa(a.stack);
  if (!b) return;
  a.stack.past.push(A(a, b, false));
}
function p(a, b, c, d, e) {
  let f = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 };
  o(f, b, c, d, e);
  a.startLineNumber = f.startLineNumber;
  a.startColumn = f.startColumn;
  a.endLineNumber = f.endLineNumber;
  a.endColumn = f.endColumn;
  a.selectionStartLineNumber = b;
  a.selectionStartColumn = c;
  a.positionLineNumber = d;
  a.positionColumn = e;
}
function F(a, b, c, d, e) {
  a.languageId = b;
  a.tokenPostfix = c;
  a.defaultToken = d;
  a.keywords = e;
  a.stateNames = [];
  a.stateRules = [];
  a.maxStack = 100;
}
function u(a, b, c, d, e, f) {
  a.id = b;
  a.lexer = c;
  a.lineComment = d;
  a.blockCommentStart = e;
  a.blockCommentEnd = f;
}
var ba = /* @__PURE__ */ (function() {
  function a(g2, a2) {
    if (g2.stateNames.indexOf(a2) >= 0) return;
    g2.stateNames.push(a2);
    g2.stateRules.push([]);
  }
  function b(g2, b2, c2, d2, e2, f2, h2) {
    a(g2, b2);
    var v2 = g2.stateNames;
    var i3 = v2.indexOf(b2);
    (0 == c2.length || "^" != c2.charAt(0)) && (c2 = "^(?:" + c2 + ")");
    b2 = g2.stateRules[i3];
    g2 = { pattern: new RegExp(), lineStart: false, kind: 0, token: "", next: "" };
    g2.pattern = new RegExp(c2, pb);
    g2.lineStart = h2;
    g2.kind = d2;
    g2.token = e2;
    g2.next = f2;
    b2.push(g2);
  }
  function c() {
    let b2 = "break case catch class continue const constructor debugger default delete do else export extends false finally for from function get if import in instanceof let new null return set static super switch symbol this throw true try typeof undefined var void while with yield async await of type interface enum implements package private protected public readonly namespace abstract as asserts keyof infer never unknown any boolean number string unique".split(" ");
    let g2 = { languageId: "", tokenPostfix: "", defaultToken: "", keywords: [], stateNames: [], stateRules: [], maxStack: 0 };
    F(g2, Ab, ".js", "source", b2);
    a(g2, mb);
    d(g2);
    return g2;
  }
  function d(g2) {
    let f2 = mb, d2 = pb, c2 = false;
    b(g2, f2, lb, 0, d2, d2, c2);
    let h2 = tb;
    b(g2, f2, "//.*", 0, h2, d2, c2);
    b(g2, f2, "/\\*", 1, h2, h2, c2);
    let l2 = Cb, e2 = nb;
    b(g2, f2, l2, 1, e2, e2, c2);
    let m2 = "'", i3 = "stringS";
    b(g2, f2, m2, 1, e2, i3, c2);
    let n2 = "`", j3 = "stringT";
    b(g2, f2, n2, 1, e2, j3, c2);
    let k2 = rb;
    b(g2, f2, "0[xX][0-9a-fA-F]+", 0, k2, d2, c2);
    b(g2, f2, "\\d+\\.\\d+([eE][+\\-]?\\d+)?", 0, k2, d2, c2);
    b(g2, f2, "\\d+", 0, k2, d2, c2);
    b(g2, f2, "[a-zA-Z_$][\\w$]*", 4, sb, d2, c2);
    b(g2, f2, Hb, 0, qb, d2, c2);
    k2 = ob;
    b(g2, f2, "[;,.]", 0, k2, d2, c2);
    b(g2, f2, "[+\\-*/%&|^~<>=!?:]+", 0, k2, d2, c2);
    a(g2, h2);
    b(g2, h2, "\\*/", 2, h2, d2, c2);
    b(g2, h2, "[^*]+", 0, h2, d2, c2);
    b(g2, h2, "\\*", 0, h2, d2, c2);
    a(g2, e2);
    f2 = Jb;
    h2 = wb;
    b(g2, e2, f2, 0, h2, d2, c2);
    b(g2, e2, l2, 2, e2, d2, c2);
    b(g2, e2, yb, 0, e2, d2, c2);
    a(g2, i3);
    b(g2, i3, f2, 0, h2, d2, c2);
    b(g2, i3, m2, 2, e2, d2, c2);
    b(g2, i3, Qb, 0, e2, d2, c2);
    a(g2, j3);
    b(g2, j3, f2, 0, h2, d2, c2);
    b(g2, j3, n2, 2, e2, d2, c2);
    b(g2, j3, "[^\\\\`]+", 0, e2, d2, c2);
  }
  function e() {
    let d2 = ["true", Db, "null"], c2 = pb;
    let g2 = { languageId: "", tokenPostfix: "", defaultToken: "", keywords: [], stateNames: [], stateRules: [], maxStack: 0 };
    F(g2, "json", ".json", c2, d2);
    let e2 = mb;
    a(g2, e2);
    b(g2, e2, lb, 0, c2, c2, false);
    b(g2, e2, "[{}\\[\\]]", 0, qb, c2, false);
    b(g2, e2, "[:,]", 0, ob, c2, false);
    b(g2, e2, "true|false|null", 4, xb, c2, false);
    b(g2, e2, "-?\\d+(\\.\\d+)?([eE][+\\-]?\\d+)?", 0, rb, c2, false);
    let f2 = Cb;
    d2 = nb;
    b(g2, e2, f2, 1, d2, d2, false);
    a(g2, d2);
    b(g2, d2, Jb, 0, wb, c2, false);
    b(g2, d2, f2, 2, d2, c2, false);
    b(g2, d2, yb, 0, d2, c2, false);
    return g2;
  }
  function f() {
    let c2 = "False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case".split(" "), d2 = pb;
    let g2 = { languageId: "", tokenPostfix: "", defaultToken: "", keywords: [], stateNames: [], stateRules: [], maxStack: 0 };
    F(g2, "python", ".python", d2, c2);
    let f2 = mb;
    a(g2, f2);
    c2 = false;
    b(g2, f2, lb, 0, d2, d2, c2);
    b(g2, f2, "#.*", 0, tb, d2, c2);
    let m2 = '\\"\\"\\"', e2 = nb, h2 = "tstring";
    b(g2, f2, m2, 1, e2, h2, c2);
    let n2 = "'''", i3 = "tstringS";
    b(g2, f2, n2, 1, e2, i3, c2);
    let k2 = Cb;
    b(g2, f2, k2, 1, e2, e2, c2);
    let l2 = "'", j3 = "stringS";
    b(g2, f2, l2, 1, e2, j3, c2);
    let o2 = rb;
    b(g2, f2, "\\d+\\.\\d+", 0, o2, d2, c2);
    b(g2, f2, "\\d+", 0, o2, d2, c2);
    b(g2, f2, "[a-zA-Z_][\\w]*", 4, sb, d2, c2);
    b(g2, f2, Hb, 0, qb, d2, c2);
    b(g2, f2, "[:;,.=+\\-*/%<>!&|^~]+", 0, ob, d2, c2);
    a(g2, e2);
    f2 = Jb;
    o2 = wb;
    b(g2, e2, f2, 0, o2, d2, c2);
    b(g2, e2, k2, 2, e2, d2, c2);
    b(g2, e2, yb, 0, e2, d2, c2);
    a(g2, j3);
    b(g2, j3, f2, 0, o2, d2, c2);
    b(g2, j3, l2, 2, e2, d2, c2);
    b(g2, j3, Qb, 0, e2, d2, c2);
    a(g2, h2);
    b(g2, h2, m2, 2, e2, d2, c2);
    b(g2, h2, '[^"]+', 0, e2, d2, c2);
    b(g2, h2, k2, 0, e2, d2, c2);
    a(g2, i3);
    b(g2, i3, n2, 2, e2, d2, c2);
    b(g2, i3, "[^']+", 0, e2, d2, c2);
    b(g2, i3, l2, 0, e2, d2, c2);
    return g2;
  }
  function g() {
    let d2 = "html", e2 = "html head body div span script style link meta title p a ul ol li table tr td th form input button img h1 h2 h3 h4 h5 h6 section article nav footer header main pre code textarea select option".split(" "), c2 = pb;
    let g2 = { languageId: "", tokenPostfix: "", defaultToken: "", keywords: [], stateNames: [], stateRules: [], maxStack: 0 };
    F(g2, d2, ".html", c2, e2);
    let h2 = mb;
    a(g2, h2);
    let i3 = lb;
    d2 = false;
    b(g2, h2, i3, 0, c2, c2, d2);
    let f2 = tb;
    b(g2, h2, "<!--", 1, f2, f2, d2);
    e2 = "tag";
    b(g2, h2, "</?[a-zA-Z][\\w:-]*", 1, e2, e2, d2);
    b(g2, h2, "[^<]+", 0, c2, c2, d2);
    a(g2, f2);
    b(g2, f2, "-->", 2, f2, c2, d2);
    b(g2, f2, "[^-]+", 0, f2, c2, d2);
    b(g2, f2, "-", 0, f2, c2, d2);
    a(g2, e2);
    b(g2, e2, "/?>", 2, e2, c2, d2);
    b(g2, e2, i3, 0, c2, c2, d2);
    b(g2, e2, "[a-zA-Z_:][\\w:.-]*", 0, "attribute.name", c2, d2);
    b(g2, e2, "=", 0, ob, c2, d2);
    let j3 = Cb;
    f2 = "attribute.value";
    h2 = "attr";
    b(g2, e2, j3, 1, f2, h2, d2);
    let k2 = "'";
    i3 = "attrS";
    b(g2, e2, k2, 1, f2, i3, d2);
    a(g2, h2);
    b(g2, h2, j3, 2, f2, c2, d2);
    b(g2, h2, Sb, 0, f2, c2, d2);
    a(g2, i3);
    b(g2, i3, k2, 2, f2, c2, d2);
    b(g2, i3, "[^']+", 0, f2, c2, d2);
    return g2;
  }
  function h() {
    let d2 = ["important", Lb, zb, "margin", "padding", "border", ub, Nb, "grid", _b, "top", "left", "right", "bottom", Mb, Bb, "font", Ob, "align", "justify", "content", Tb, $b, "fixed", "block", "inline", "none", "auto", "inherit", "initial"], c2 = pb;
    let g2 = { languageId: "", tokenPostfix: "", defaultToken: "", keywords: [], stateNames: [], stateRules: [], maxStack: 0 };
    F(g2, "css", ".css", c2, d2);
    let f2 = mb;
    a(g2, f2);
    d2 = false;
    b(g2, f2, lb, 0, c2, c2, d2);
    let e2 = tb;
    b(g2, f2, "/\\*", 1, e2, e2, d2);
    let i3 = Cb, h2 = nb;
    b(g2, f2, i3, 1, h2, h2, d2);
    b(g2, f2, "#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\\b", 0, "number.hex", c2, d2);
    b(g2, f2, "-?\\d+(\\.\\d+)?(px|em|rem|%|vh|vw|pt|ex)?", 0, rb, c2, d2);
    b(g2, f2, "[a-zA-Z_-][\\w-]*", 4, sb, c2, d2);
    let j3 = ob;
    b(g2, f2, "[{}();:]", 0, j3, c2, d2);
    b(g2, f2, "[.,#>\\[\\]+~*]", 0, j3, c2, d2);
    a(g2, e2);
    b(g2, e2, "\\*/", 2, e2, c2, d2);
    b(g2, e2, "[^*]+", 0, e2, c2, d2);
    b(g2, e2, "\\*", 0, e2, c2, d2);
    a(g2, h2);
    b(g2, h2, i3, 2, h2, c2, d2);
    b(g2, h2, Sb, 0, h2, c2, d2);
    return g2;
  }
  function i2() {
    let d2 = [], c2 = pb;
    let g2 = { languageId: "", tokenPostfix: "", defaultToken: "", keywords: [], stateNames: [], stateRules: [], maxStack: 0 };
    F(g2, Xb, ".md", c2, d2);
    d2 = mb;
    a(g2, d2);
    let e2 = xb;
    b(g2, d2, "^#{1,6}[ \\t].*$", 0, e2, c2, true);
    b(g2, d2, "^\\s*[-*+]\\s+", 0, e2, c2, true);
    let h2 = "`+", f2 = nb;
    e2 = "code";
    b(g2, d2, h2, 1, f2, e2, false);
    b(g2, d2, "\\*\\*[^*]+\\*\\*", 0, "strong", c2, false);
    b(g2, d2, "\\*[^*]+\\*", 0, "emphasis", c2, false);
    b(g2, d2, "\\[[^\\]]+\\]\\([^\\)]+\\)", 0, "string.link", c2, false);
    b(g2, d2, "[^`*\\[#]+", 0, c2, c2, false);
    b(g2, d2, ".", 0, c2, c2, false);
    a(g2, e2);
    b(g2, e2, h2, 2, f2, c2, false);
    b(g2, e2, "[^`]+", 0, f2, c2, false);
    return g2;
  }
  function j2(a2) {
    var b2 = 0;
    for (; b2 < w.length; ) {
      if (w[b2].id == a2.id) {
        w[b2] = a2;
        return;
      }
      b2 = b2 + 1;
    }
    w.push(a2);
  }
  return function() {
    if (ga) return;
    ga = true;
    var k2 = c();
    var a2 = "//";
    var b2 = "/*";
    var d2 = "*/";
    var l2 = { id: "", lexer: null, lineComment: "", blockCommentStart: "", blockCommentEnd: "" };
    u(l2, Ab, k2, a2, b2, d2);
    j2(l2);
    l2 = "typescript";
    k2 = c();
    k2.languageId = l2;
    k2.tokenPostfix = ".ts";
    var m2 = { id: "", lexer: null, lineComment: "", blockCommentStart: "", blockCommentEnd: "" };
    u(m2, l2, k2, a2, b2, d2);
    j2(m2);
    k2 = e();
    l2 = { id: "", lexer: null, lineComment: "", blockCommentStart: "", blockCommentEnd: "" };
    u(l2, "json", k2, a2, b2, d2);
    j2(l2);
    k2 = f();
    a2 = '"""';
    l2 = { id: "", lexer: null, lineComment: "", blockCommentStart: "", blockCommentEnd: "" };
    u(l2, "python", k2, "#", a2, a2);
    j2(l2);
    k2 = g();
    a2 = pb;
    l2 = { id: "", lexer: null, lineComment: "", blockCommentStart: "", blockCommentEnd: "" };
    u(l2, "html", k2, a2, "<!--", "-->");
    j2(l2);
    k2 = h();
    l2 = { id: "", lexer: null, lineComment: "", blockCommentStart: "", blockCommentEnd: "" };
    u(l2, "css", k2, a2, b2, d2);
    j2(l2);
    b2 = i2();
    d2 = { id: "", lexer: null, lineComment: "", blockCommentStart: "", blockCommentEnd: "" };
    u(d2, Xb, b2, a2, a2, a2);
    j2(d2);
    b2 = c();
    d2 = { id: "", lexer: null, lineComment: "", blockCommentStart: "", blockCommentEnd: "" };
    u(d2, vb, b2, a2, a2, a2);
    j2(d2);
  };
})();
function qa(a) {
  ba();
  var b = 0;
  for (; b < w.length; ) {
    if (w[b].id == a) return w[b];
    b = b + 1;
  }
  return null;
}
function Ra(a, b, c) {
  a.root = b;
  a.model = c;
  b = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0, selectionStartLineNumber: 0, selectionStartColumn: 0, positionLineNumber: 0, positionColumn: 0 };
  p(b, 1, 1, 1, 1);
  a.selection = b;
  a.scrollTop = 0;
  a.lineHeight = 19;
  a.width = 800;
  a.height = 400;
  a.showLineNumbers = true;
  a.showMinimap = true;
  a.theme = "vs";
  a.languageId = c.languageId;
  a.readOnly = false;
  b = "div";
  a.overflow = document.createElement(b);
  a.margin = document.createElement(b);
  a.scrollable = document.createElement(b);
  a.linesHost = document.createElement(b);
  a.textarea = document.createElement(ac);
  a.minimapCanvas = document.createElement("canvas");
  Sa(a);
}
function Sa(a) {
  setClassName(a.root, Gb + a.theme);
  let c = _b, e = $b;
  setStyle(a.root, c, e);
  let f = "overflow";
  setStyle(a.root, f, "hidden");
  setStyle(a.root, "font-family", "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace");
  setStyle(a.root, "font-size", "14px");
  setStyle(a.root, "line-height", a.lineHeight.toString(10) + Rb);
  setClassName(a.overflow, "overflow-guard");
  let b = Nb;
  setStyle(a.overflow, ub, b);
  let g = Bb;
  setStyle(a.overflow, g, "100%");
  setClassName(a.margin, "margin");
  let d = Mb;
  setStyle(a.margin, d, "48px");
  setStyle(a.margin, b, "0 0 48px");
  setClassName(a.scrollable, "monaco-scrollable-element");
  setStyle(a.scrollable, b, "1 1 auto");
  setStyle(a.scrollable, f, "auto");
  setStyle(a.scrollable, c, e);
  setClassName(a.linesHost, "view-lines");
  a.textarea.setAttribute(Kb, "inputarea");
  e = "off";
  a.textarea.setAttribute("wrap", e);
  a.textarea.setAttribute("autocorrect", e);
  a.textarea.setAttribute("autocapitalize", e);
  a.textarea.setAttribute("spellcheck", Db);
  setTabIndex(a.textarea, 0);
  setStyle(a.textarea, c, Tb);
  c = "1px";
  setStyle(a.textarea, d, c);
  setStyle(a.textarea, g, c);
  setStyle(a.textarea, "opacity", "0");
  setClassName(a.minimapCanvas, Eb);
  setStyle(a.minimapCanvas, d, "64px");
  setStyle(a.minimapCanvas, b, "0 0 64px");
  a.scrollable.appendChild(a.linesHost);
  a.overflow.appendChild(a.margin);
  a.overflow.appendChild(a.scrollable);
  a.overflow.appendChild(a.minimapCanvas);
  a.root.appendChild(a.overflow);
  a.root.appendChild(a.textarea);
  R(a);
}
function R(a) {
  var c = a.root;
  var e = a.theme;
  setClassName(c, Gb + e);
  if (a.theme == Fb || a.theme == Vb) {
    setStyle(a.root, zb, "#1e1e1e");
    setStyle(a.root, Lb, "#d4d4d4");
  } else {
    setStyle(a.root, zb, "#fffffe");
    setStyle(a.root, Lb, "#000000");
  }
}
function ra(a) {
  a = (a.scrollTop / a.lineHeight | 0) + 1 | 0;
  return a < 1 ? 1 : a;
}
function Ta(a) {
  var b = (ra(a) + (a.height / a.lineHeight | 0) | 0) + 2 | 0;
  a = a.model.buffer.lineCnt;
  return b > a ? a : b;
}
function Ua(a) {
  return a.indexOf(tb) >= 0 ? "mtk-comment" : a.indexOf(nb) >= 0 ? "mtk-string" : a.indexOf(xb) >= 0 ? "mtk-keyword" : a.indexOf(rb) >= 0 ? "mtk-number" : a.indexOf("tag") >= 0 ? "mtk-tag" : a.indexOf("attribute") >= 0 ? "mtk-attr" : "mtk";
}
function sa(a) {
  var c = pb, b = 0, d;
  for (; b < a.length; ) {
    d = a.charAt(b);
    "<" == d ? c = c + "&lt;" : ">" == d ? c = c + "&gt;" : "&" == d ? c = c + "&amp;" : c = c + d;
    b = b + 1;
  }
  return c;
}
function Va(a, c) {
  if (0 == c.length) {
    if (0 == a.length) return "<span>&nbsp;</span>";
    return '<span class="mtk">' + sa(a) + "</span>";
  }
  var e = pb, b = 0, f, d;
  for (; b < c.length; ) {
    f = c[b][0];
    d = a.length;
    b + 1 < c.length && (d = c[b + 1][0]);
    d = j(a, f, d);
    e = e + '<span class="';
    e = e + Ua(c[b][1]) + '">' + sa(d) + "</span>";
    b = b + 1;
  }
  return e;
}
function Wa(a) {
  if (!a.showMinimap) {
    setStyle(a.minimapCanvas, ub, "none");
    return;
  }
  setStyle(a.minimapCanvas, ub, "block");
  var c = a.height;
  c < 1 && (c = 1);
  var r2 = a.minimapCanvas;
  canvasSetSize(r2, 64, c);
  var s2 = a.minimapCanvas;
  var e = canvasGetContext2d(s2);
  var b = "#f3f3f3";
  var f = "#6e6e6e";
  (a.theme == Fb || a.theme == Vb) && (b = "#1e1e1e", f = "#5a5a5a");
  canvasFillRect(e, 0, 0, 64, c, b);
  var d = a.model.buffer.lineCnt;
  if (d < 1) return;
  c = c / d;
  c < 1 && (c = 1);
  b = 1;
  for (; b <= d; ) {
    var g = z(a.model.buffer, b);
    if (g > 0) {
      var h = (b - 1 | 0) * c;
      canvasFillRect(e, 2, h, Xa(g), c, f);
    }
    b = b + 1 | 0;
  }
}
var l = /* @__PURE__ */ (function() {
  function a(a2) {
    var b2 = a2.length - 1;
    for (; b2 >= 0; ) {
      if ("." == a2.charAt(b2)) return j(a2, 0, b2);
      b2 = b2 - 1;
    }
    return pb;
  }
  function b(g, b2) {
    for (; b2.length > 0; ) {
      var c2 = g.stateNames.indexOf(b2);
      if (c2 >= 0) return g.stateRules[c2];
      b2 = a(b2);
    }
    b2 = g.stateNames.indexOf(mb);
    if (b2 >= 0) return g.stateRules[b2];
    return [];
  }
  function c(g, a2) {
    return 0 == a2.length ? a2 : a2.indexOf(".") >= 0 || 0 == g.tokenPostfix.length ? a2 : a2 + g.tokenPostfix;
  }
  function d(g, a2, f) {
    var m2 = [];
    var d2 = 0, e2 = true, n2, l2, p2, k2, h, o2, i2;
    for (; e2 || d2 < f.length; ) {
      0 == a2[0].length && a2[0].push(mb);
      n2 = a2[0][a2[0].length - 1] || "";
      l2 = b(g, n2);
      p2 = j(f, d2, f.length);
      k2 = null;
      e2 = pb;
      i2 = 0;
      for (; i2 < l2.length; i2 = i2 + 1) {
        h = l2[i2];
        if (h.lineStart && 0 != d2) continue;
        o2 = h.pattern.exec(p2);
        if (o2) {
          e2 = o2[0] + "";
          k2 = h;
          break;
        }
      }
      i2 = g.defaultToken;
      l2 = pb;
      if (k2) {
        h = k2.kind;
        i2 = k2.token;
        l2 = k2.next;
      } else {
        if (d2 < f.length) {
          e2 = f.charAt(d2);
        } else {
          break;
        }
        h = 0;
      }
      if (0 == e2.length) {
        if (d2 < f.length) {
          e2 = f.charAt(d2);
          i2 = g.defaultToken;
        } else {
          break;
        }
        h = 0;
      }
      4 == h && (i2 = g.keywords.indexOf(e2) >= 0 ? xb : sb);
      6 == h || "@rematch" != i2 && (k2 = c(g, i2), k2.length > 0 && (i2 = [0, ""], i2[0] = d2, i2[1] = k2, m2.push(i2)), d2 = d2 + e2.length | 0);
      1 == h ? a2[0].length < g.maxStack && a2[0].push(l2) : 2 == h ? a2[0].length > 1 && a2[0].splice(a2[0].length - 1, 1) : 3 == h ? a2[0][a2[0].length - 1] = l2 : 5 == h ? a2[0] = [mb] : 7 == h && a2[0].length < g.maxStack && a2[0].push(n2);
      if (0 == d2 && 0 == e2.length && 0 == h) break;
      e2 = false;
    }
    return m2;
  }
  function e(a2) {
    a2 = qa(a2);
    if (!a2) return null;
    return a2.lexer;
  }
  return function(a2) {
    R(a2);
    var f = ra(a2);
    var k2 = Ta(a2);
    var c2 = e(a2.languageId);
    var i2 = [[]];
    i2[0] = [mb];
    var b2 = 1, g, h, j2;
    for (; b2 < f && c2; ) {
      d(c2, i2, y(a2.model.buffer, b2));
      b2 = b2 + 1 | 0;
    }
    b2 = pb;
    h = b2;
    for (; f <= k2; ) {
      j2 = y(a2.model.buffer, f);
      g = [];
      !c2 || (g = d(c2, i2, j2));
      a2.showLineNumbers && (b2 = b2 + '<div class="line-number" style="height:' + a2.lineHeight.toString(10) + 'px">' + f.toString(10) + "</div>");
      h = h + '<div class="view-line" data-line="' + f.toString(10) + '" style="height:' + a2.lineHeight.toString(10) + 'px">' + Va(j2, g) + "</div>";
      f = f + 1 | 0;
    }
    setInnerHTML(a2.margin, b2);
    setInnerHTML(a2.linesHost, h);
    setStyle(a2.linesHost, Bb, ((a2.model.buffer.lineCnt * a2.lineHeight | 0) + (a2.height / 2 | 0) | 0).toString(10) + Rb);
    Wa(a2);
    v(a2);
  };
})();
function v(a) {
  let c = (a.selection.positionColumn - 1 | 0) * 8 | 0, b = Rb;
  setStyle(a.textarea, "top", ((a.selection.positionLineNumber - 1 | 0) * a.lineHeight | 0).toString(10) + b);
  setStyle(a.textarea, "left", (c + 48 | 0).toString(10) + b);
  inputSetValue(a.textarea, pb);
}
function Xa(a) {
  return a < 60 ? a : 60;
}
function Ya(a, b) {
  let c = { root: null, overflow: null, margin: null, scrollable: null, linesHost: null, textarea: null, minimapCanvas: null, model: null, selection: null, scrollTop: 0, lineHeight: 0, width: 0, height: 0, showLineNumbers: false, showMinimap: false, theme: "", languageId: "", readOnly: false };
  Ra(c, a, b);
  return c;
}
function n(e) {
  var c = e.model.buffer.lineCnt;
  var f = e.selection.positionLineNumber;
  f < 1 && (f = 1);
  f > c && (f = c);
  var d = z(e.model.buffer, f) + 1 | 0;
  var a = e.selection.positionColumn;
  a < 1 && (a = 1);
  a > d || (d = a);
  a = e.selection.selectionStartLineNumber;
  var b = e.selection.selectionStartColumn;
  a < 1 && (a = 1);
  a > c && (a = c);
  c = z(e.model.buffer, a) + 1 | 0;
  b < 1 && (b = 1);
  b > c || (c = b);
  b = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0, selectionStartLineNumber: 0, selectionStartColumn: 0, positionLineNumber: 0, positionColumn: 0 };
  p(b, a, c, f, d);
  e.selection = b;
}
function q(e, f, a) {
  let b = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0, selectionStartLineNumber: 0, selectionStartColumn: 0, positionLineNumber: 0, positionColumn: 0 };
  p(b, f, a, f, a);
  e.selection = b;
  n(e);
  v(e);
}
function ca(e, a) {
  let b = e.selection, c = b.startLineNumber, d = b.startColumn, f = b.endLineNumber, g = b.endColumn;
  let h = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 };
  o(h, c, d, f, g);
  c = { range: null, text: "", identifier: 0 };
  c.range = h;
  c.text = a;
  c.identifier = 0;
  A(e.model, [c], true);
  a = E(e.model.buffer, m(e.model.buffer, b.startLineNumber, b.startColumn) + a.length | 0);
  q(e, a[0], a[1]);
}
function G(e, a) {
  if (e.readOnly || 0 == a.length) return;
  ca(e, a);
  l(e);
}
var Za;
var _a;
(function() {
  function a(e2) {
    if (e2.readOnly) return;
    var a2 = e2.selection;
    var b2, c2, d2, f2, g, h;
    if (a2.startLineNumber != a2.endLineNumber || a2.startColumn != a2.endColumn) {
      ca(e2, pb);
      l(e2);
      return;
    }
    if (1 == a2.positionLineNumber && 1 == a2.positionColumn) return;
    b2 = E(e2.model.buffer, m(e2.model.buffer, a2.positionLineNumber, a2.positionColumn) - 1 | 0);
    c2 = e2.model;
    d2 = b2[0];
    f2 = b2[1];
    g = a2.positionLineNumber;
    a2 = a2.positionColumn;
    h = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 };
    o(h, d2, f2, g, a2);
    a2 = { range: null, text: "", identifier: 0 };
    a2.range = h;
    a2.text = pb;
    a2.identifier = 0;
    A(c2, [a2], true);
    q(e2, b2[0], b2[1]);
    l(e2);
  }
  function b(e2) {
    if (e2.readOnly) return;
    var a2 = e2.selection;
    var b2, c2, d2, f2, g;
    if (a2.startLineNumber != a2.endLineNumber || a2.startColumn != a2.endColumn) {
      ca(e2, pb);
      l(e2);
      return;
    }
    b2 = m(e2.model.buffer, a2.positionLineNumber, a2.positionColumn);
    if (b2 >= e2.model.buffer.length) return;
    b2 = E(e2.model.buffer, b2 + 1 | 0);
    c2 = e2.model;
    d2 = a2.positionLineNumber;
    a2 = a2.positionColumn;
    f2 = b2[0];
    b2 = b2[1];
    g = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 };
    o(g, d2, a2, f2, b2);
    a2 = { range: null, text: "", identifier: 0 };
    a2.range = g;
    a2.text = pb;
    a2.identifier = 0;
    A(c2, [a2], true);
    l(e2);
  }
  function c(e2, a2) {
    var b2 = m(e2.model.buffer, e2.selection.positionLineNumber, e2.selection.positionColumn);
    b2 > 0 && (b2 = b2 - 1 | 0);
    b2 = E(e2.model.buffer, b2);
    if (a2) {
      a2 = e2.selection.selectionStartLineNumber;
      var c2 = e2.selection.selectionStartColumn;
      var d2 = b2[0];
      b2 = b2[1];
      var f2 = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0, selectionStartLineNumber: 0, selectionStartColumn: 0, positionLineNumber: 0, positionColumn: 0 };
      p(f2, a2, c2, d2, b2);
      e2.selection = f2;
      n(e2);
      v(e2);
    } else {
      q(e2, b2[0], b2[1]);
    }
  }
  function d(e2, a2) {
    var b2 = m(e2.model.buffer, e2.selection.positionLineNumber, e2.selection.positionColumn);
    b2 < e2.model.buffer.length && (b2 = b2 + 1 | 0);
    b2 = E(e2.model.buffer, b2);
    if (a2) {
      a2 = e2.selection.selectionStartLineNumber;
      var c2 = e2.selection.selectionStartColumn;
      var d2 = b2[0];
      b2 = b2[1];
      var f2 = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0, selectionStartLineNumber: 0, selectionStartColumn: 0, positionLineNumber: 0, positionColumn: 0 };
      p(f2, a2, c2, d2, b2);
      e2.selection = f2;
      n(e2);
      v(e2);
    } else {
      q(e2, b2[0], b2[1]);
    }
  }
  function e(e2, a2) {
    var f2 = e2.selection.positionLineNumber - 1 | 0;
    f2 < 1 && (f2 = 1);
    var b2 = e2.selection.positionColumn;
    var c2 = z(e2.model.buffer, f2) + 1 | 0;
    b2 > c2 && (b2 = c2);
    if (a2) {
      a2 = e2.selection.selectionStartLineNumber;
      c2 = e2.selection.selectionStartColumn;
      var d2 = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0, selectionStartLineNumber: 0, selectionStartColumn: 0, positionLineNumber: 0, positionColumn: 0 };
      p(d2, a2, c2, f2, b2);
      e2.selection = d2;
      n(e2);
      v(e2);
    } else {
      q(e2, f2, b2);
    }
  }
  function f(e2, a2) {
    var f2 = e2.selection.positionLineNumber + 1 | 0;
    var b2 = e2.model.buffer.lineCnt;
    f2 > b2 && (f2 = b2);
    b2 = e2.selection.positionColumn;
    var c2 = z(e2.model.buffer, f2) + 1 | 0;
    b2 > c2 && (b2 = c2);
    if (a2) {
      a2 = e2.selection.selectionStartLineNumber;
      c2 = e2.selection.selectionStartColumn;
      var d2 = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0, selectionStartLineNumber: 0, selectionStartColumn: 0, positionLineNumber: 0, positionColumn: 0 };
      p(d2, a2, c2, f2, b2);
      e2.selection = d2;
      n(e2);
      v(e2);
    } else {
      q(e2, f2, b2);
    }
  }
  Za = function(g, h, i2) {
    if (h == Pb) {
      G(g, i2);
      return;
    }
    if ("deleteLeft" == h) {
      a(g);
      return;
    }
    if ("deleteRight" == h) {
      b(g);
      return;
    }
    if ("undo" == h) {
      pa(g.model);
      n(g);
      l(g);
      return;
    }
    if ("redo" == h) {
      aa(g.model);
      n(g);
      l(g);
      return;
    }
    if ("tab" == h) {
      G(g, "	");
      return;
    }
    if ("cursorLeft" == h) {
      c(g, false);
      return;
    }
    if ("cursorRight" == h) {
      d(g, false);
      return;
    }
    if ("cursorUp" == h) {
      e(g, false);
      return;
    }
    if ("cursorDown" == h) {
      f(g, false);
      return;
    }
    if ("selectAll" == h) {
      h = g.model.buffer.lineCnt;
      i2 = z(g.model.buffer, h) + 1 | 0;
      var j2 = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0, selectionStartLineNumber: 0, selectionStartColumn: 0, positionLineNumber: 0, positionColumn: 0 };
      p(j2, 1, 1, h, i2);
      g.selection = j2;
      n(g);
      v(g);
      return;
    }
    if ("enter" == h) {
      G(g, Ib);
      return;
    }
  };
  _a = function(g, h) {
    var i2 = eventKey(h);
    var k2 = eventCtrlKey(h);
    var j2 = eventShiftKey(h);
    var m2, o2, q2;
    if (k2 && ("z" == i2 || "Z" == i2)) {
      preventDefault(h);
      if (j2) {
        aa(g.model);
        n(g);
        l(g);
      } else {
        pa(g.model);
        n(g);
        l(g);
      }
      return;
    }
    if (k2 && ("y" == i2 || "Y" == i2)) {
      preventDefault(h);
      aa(g.model);
      n(g);
      l(g);
      return;
    }
    if (k2 && ("a" == i2 || "A" == i2)) {
      preventDefault(h);
      h = g.model.buffer.lineCnt;
      i2 = z(g.model.buffer, h) + 1 | 0;
      j2 = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0, selectionStartLineNumber: 0, selectionStartColumn: 0, positionLineNumber: 0, positionColumn: 0 };
      p(j2, 1, 1, h, i2);
      g.selection = j2;
      n(g);
      v(g);
      return;
    }
    if ("Backspace" == i2) {
      preventDefault(h);
      a(g);
      return;
    }
    if ("Delete" == i2) {
      preventDefault(h);
      b(g);
      return;
    }
    if ("Enter" == i2) {
      preventDefault(h);
      G(g, Ib);
      return;
    }
    if ("Tab" == i2) {
      preventDefault(h);
      G(g, "	");
      return;
    }
    if ("ArrowLeft" == i2) {
      preventDefault(h);
      c(g, j2);
      return;
    }
    if ("ArrowRight" == i2) {
      preventDefault(h);
      d(g, j2);
      return;
    }
    if ("ArrowUp" == i2) {
      preventDefault(h);
      e(g, j2);
      return;
    }
    if ("ArrowDown" == i2) {
      preventDefault(h);
      f(g, j2);
      return;
    }
  };
})();
function S(a, b) {
  if (b < 0) {
    b = (-b | 0) - 1 | 0;
    if (b >= a[1].length) return 0;
    return a[1][b] | 0;
  }
  if (b >= a[0].length) return 0;
  return a[0][b] | 0;
}
function ta(a, b, h) {
  if (b < 0) {
    b = -b - 1;
    while (a[1].length <= b) a[1].push(0);
    a[1][b] = h;
  } else {
    while (a[0].length <= b) a[0].push(0);
    a[0][b] = h;
  }
}
function da(a, b) {
  if (b < 0) {
    b = (-b | 0) - 1 | 0;
    if (b >= a[1].length) return null;
    return a[1][b];
  }
  if (b >= a[0].length) return null;
  return a[0][b];
}
function T(a, b, h) {
  if (b < 0) {
    b = -b - 1;
    while (a[1].length <= b) a[1].push(null);
    a[1][b] = h;
  } else {
    while (a[0].length <= b) a[0].push(null);
    a[0][b] = h;
  }
}
var ua = /* @__PURE__ */ (function() {
  function a(a2, b2, d, c2) {
    for (; ; ) {
      var e = d < a2.length && c2 < b2.length && (a2[d] || "") == (b2[c2] || "");
      if (!e) {
        break;
      }
      d = d + 1 | 0;
      c2 = c2 + 1 | 0;
    }
    return d;
  }
  function b(a2, b2) {
    return a2 < b2 ? a2 : b2;
  }
  function c(a2, b2) {
    return a2 > b2 ? a2 : b2;
  }
  return function(e, f) {
    var i2 = [];
    if (0 == e.length && 0 == f.length) return i2;
    if (0 == e.length) {
      f = f.length;
      e = [0, 0, 0, 0];
      e[0] = 0;
      e[1] = 0;
      e[2] = 0;
      e[3] = f;
      i2.push(e);
      return i2;
    }
    if (0 == f.length) {
      f = e.length;
      e = [0, 0, 0, 0];
      e[0] = 0;
      e[1] = f;
      e[2] = 0;
      e[3] = 0;
      i2.push(e);
      return i2;
    }
    var j2 = [[], []];
    j2[0] = [0, 0, 0, 0, 0, 0, 0, 0];
    j2[1] = [0, 0, 0, 0, 0, 0, 0, 0];
    var h = [[], []];
    h[0] = [];
    h[1] = [];
    var d = a(e, f, 0, 0);
    ta(j2, 0, d);
    if (0 == d) {
      T(h, 0, null);
    } else {
      var g = { prev: null, x: 0, y: 0, length: 0 };
      g.prev = null;
      g.x = 0;
      g.y = 0;
      g.length = d;
      T(h, 0, g);
    }
    var k2 = 0, m2 = 0, q2 = false, r2, s2, l2, o2, n2, p2;
    for (; !q2; ) {
      k2 = k2 + 1 | 0;
      g = k2 % 2;
      r2 = -b(k2, f.length + g | 0) | 0;
      s2 = b(k2, e.length + g | 0);
      g = r2;
      for (; g <= s2; ) {
        l2 = g != s2 ? S(j2, g + 1 | 0) : -1;
        d = g != r2 ? S(j2, g - 1 | 0) + 1 | 0 : -1;
        d = b(c(l2, d), e.length);
        o2 = d - g | 0;
        if (d <= e.length && o2 <= f.length) {
          p2 = a(e, f, d, o2);
          ta(j2, g, p2);
          n2 = d == l2 ? da(h, g + 1 | 0) : da(h, g - 1 | 0);
          if (p2 != d) {
            p2 = p2 - d | 0;
            l2 = { prev: null, x: 0, y: 0, length: 0 };
            l2.prev = n2;
            l2.x = d;
            l2.y = o2;
            l2.length = p2;
            T(h, g, l2);
          } else {
            T(h, g, n2);
          }
          if (S(j2, g) == e.length && (S(j2, g) - g | 0) == f.length) {
            m2 = g;
            q2 = true;
            break;
          }
        }
        g = g + 2 | 0;
      }
      if (k2 > ((e.length + f.length | 0) + 2 | 0)) break;
    }
    g = da(h, m2);
    h = e.length;
    j2 = f.length;
    for (; true; ) {
      f = null;
      if (g) {
        d = g.x + g.length | 0;
        k2 = g.y + g.length | 0;
        l2 = g.x;
        m2 = g.y;
        f = g.prev;
        g = true;
      } else {
        d = 0;
        k2 = 0;
        l2 = 0;
        m2 = 0;
        g = false;
      }
      (d != h || k2 != j2) && (e = [0, 0, 0, 0], e[0] = d, e[1] = h, e[2] = k2, e[3] = j2, i2.push(e));
      if (!g) break;
      g = f;
      h = l2;
      j2 = m2;
    }
    f = [];
    e = i2.length - 1;
    for (; e >= 0; ) {
      f.push(i2[e]);
      e = e - 1;
    }
    return f;
  };
})();
function U(a) {
  var d = [];
  var c = pb, b = 0, e;
  for (; b < a.length; ) {
    e = a.charAt(b);
    if (e == Ib) {
      d.push(c);
      c = pb;
    } else {
      "\r" != e && (c = c + e);
    }
    b = b + 1;
  }
  d.push(c);
  return d;
}
function N(a, b, c) {
  if (!a) return c;
  a = a[b];
  if (!a) return c;
  return a + "";
}
function va(a, b, c) {
  if (!a) return c;
  a = a[b];
  if (!a) return c;
  if (a + "" == Db) return false;
  if ("off" == a + "") return false;
  return true;
}
function $a(a, e) {
  a.view = e;
  let b = { listeners: [], disposed: false };
  b.listeners = [];
  b.disposed = false;
  a.contentEmitter = b;
  a.disposed = false;
  e.model.onDidChangeContent.listeners.push(function() {
    na(a.contentEmitter);
  });
  e.textarea.addEventListener("keydown", function(b2) {
    _a(a.view, b2);
  }, false);
  e.textarea.addEventListener("input", function(h) {
    h = h.target;
    h = h.value + "";
    h.length > 0 && G(a.view, h);
  }, false);
  e.scrollable.addEventListener("scroll", function(b2) {
    b2 = a.view;
    b2.scrollTop = +a.view.scrollable.scrollTop | 0;
    l(a.view);
  }, false);
}
function ab(a) {
  var b = +a.view.root.clientWidth | 0;
  var c = +a.view.root.clientHeight | 0;
  b < 1 && (b = a.view.width);
  c < 1 && (c = a.view.height);
  a = a.view;
  a.width = b;
  a.height = c;
  var d = Rb;
  setStyle(a.root, Mb, b.toString(10) + d);
  setStyle(a.root, Bb, c.toString(10) + d);
  l(a);
}
function bb(a, b, c) {
  var d = pb;
  var e;
  c && !!c.text && (d = c.text + "");
  Za(a.view, b, d);
}
function cb(a, b, c, d) {
  a[0] = b;
  a[1] = c;
  a[2] = d;
  a[3] = [];
  b = a[1].view.model.buffer;
  c = x(b, b.root);
  b = a[2].view.model.buffer;
  b = x(b, b.root);
  a[3] = ua(U(c), U(b));
}
function ea(e, h, a, b) {
  ba();
  var c = V;
  V = V + 1 | 0;
  var d = pb;
  var f = "/model/" + c.toString(10);
  c = { scheme: "", authority: "", path: "", query: "", fragment: "" };
  c.scheme = "inmemory";
  c.authority = d;
  c.path = f;
  c.query = d;
  c.fragment = d;
  d = { buffer: null, uri: null, languageId: "", stack: null, decorations: null, onDidChangeContent: null, versionId: 0 };
  Qa(d, h, a, c);
  Aa.push(d);
  e = Ya(e, d);
  e.theme = b;
  e.languageId = a;
  R(e);
  l(e);
  h = { view: null, contentEmitter: null, disposed: false };
  $a(h, e);
  W.push(h);
  return h;
}
function db(a, b) {
  var h = N(b, "value", pb);
  var c = N(b, Wb, vb);
  h = ea(a, h, c, N(b, "theme", O));
  c = h.view;
  c.showLineNumbers = "off" != N(b, "lineNumbers", "on");
  b && !!b.minimap && (a = h.view, a.showMinimap = va(b.minimap, "enabled", true));
  a = h.view;
  a.readOnly = va(b, "readOnly", false);
  l(h.view);
  return h;
}
function eb(a, b) {
  var c = "div";
  var d = document.createElement(c);
  var e = document.createElement(c);
  c = Nb;
  setStyle(a, ub, c);
  var f = "1 1 50%";
  setStyle(d, c, f);
  setStyle(e, c, f);
  a.appendChild(d);
  a.appendChild(e);
  c = pb;
  f = N(b, Wb, vb);
  var g;
  g = b && !!b.original ? b.original + "" : c;
  var h;
  b && !!b.modified && (c = b.modified + "");
  b = ea(d, g, f, O);
  c = ea(e, c, f, O);
  d = [null, null, null, []];
  cb(d, a, b, c);
  return d;
}
function fb(a) {
  var b = 0, c;
  for (; b < W.length; ) {
    c = W[b].view;
    c.theme = a;
    R(c);
    l(c);
    b = b + 1;
  }
}
function gb(a) {
  a = a.view.model.buffer;
  return x(a, a.root);
}
function wa(a, b, c) {
  bb(a, b, c);
}
function hb(a) {
  var e = [];
  var i2 = a.view.model.buffer.lineCnt;
  var b = 1, f, g, c, d, h;
  for (; b <= i2; ) {
    c = y(a.view.model.buffer, b);
    f = fa(c);
    if (f == c.length) {
      b = b + 1 | 0;
      continue;
    }
    d = b;
    c = b + 1 | 0;
    for (; c <= i2; ) {
      h = y(a.view.model.buffer, c);
      g = fa(h);
      if (g == h.length) {
        c = c + 1 | 0;
        continue;
      }
      if (g > f) {
        d = c;
        c = c + 1 | 0;
        continue;
      }
      break;
    }
    d > b && (c = [0, 0, false], c[0] = b, c[1] = d, c[2] = false, e.push(c));
    b = b + 1 | 0;
  }
  return e;
}
function fa(a) {
  var b = 0, c;
  for (; b < a.length; ) {
    c = a.charAt(b);
    if (" " != c && "	" != c) return b;
    b = b + 1;
  }
  return b;
}
function xa(a, b) {
  var c = y(a.view.model.buffer, b[0]);
  a = b[1] - 1;
  a < 0 && (a = 0);
  a > c.length && (a = c.length);
  b = a;
  for (; b > 0 && ya(c.charAt(b - 1)); ) b = b - 1;
  for (; a < c.length && ya(c.charAt(a)); ) a = a + 1 | 0;
  if (b == a) return pb;
  return j(c, b, a);
}
function ya(a) {
  var b = a.charCodeAt(0);
  var c;
  if (b >= 48 && b <= 57) return true;
  if (b >= 65 && b <= 90) return true;
  if (b >= 97 && b <= 122) return true;
  return "_" == a || "$" == a;
}
function ib(a) {
  var b = qa(a.view.languageId);
  var d = "//";
  var c;
  b && b.lineComment.length > 0 && (d = b.lineComment);
  var e = a.view.selection.positionLineNumber;
  b = y(a.view.model.buffer, e);
  var f = fa(b);
  c = j(b, f, b.length);
  if (0 == c.indexOf(d)) {
    d = d.length;
    var g;
    c.length > d && " " == c.charAt(d) && (d = d + 1 | 0);
    f = j(b, 0, f);
    c = f + j(c, d, c.length);
    d = a.view.model;
    b = b.length + 1 | 0;
    f = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 };
    o(f, e, 1, e, b);
    b = { range: null, text: "", identifier: 0 };
    b.range = f;
    b.text = c;
    b.identifier = 0;
    A(d, [b], true);
  } else {
    c = j(b, 0, f) + d + " " + c;
    d = a.view.model;
    b = b.length + 1 | 0;
    f = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 };
    o(f, e, 1, e, b);
    b = { range: null, text: "", identifier: 0 };
    b.range = f;
    b.text = c;
    b.identifier = 0;
    A(d, [b], true);
  }
  l(a.view);
}
function jb(a) {
  var c = a.view.selection.positionColumn;
  var b = [0, 0];
  b[0] = a.view.selection.positionLineNumber;
  b[1] = c;
  b = xa(a, b);
  if (0 == b.length) return [];
  return oa(a.view.model.buffer, b, 200);
}
function kb(a, b, c) {
  ba();
  var f = Fb;
  a = db(a, { __proto__: null, value: 'function hello(name) {\n  const msg = "hi " + name;\n  return msg;\n}\n', language: Ab, theme: f, lineNumbers: "on" });
  q(a.view, 1, 23);
  wa(a, Pb, { __proto__: null, text: "!" });
  wa(a, "undo", { __proto__: null });
  fb(f);
  ab(a);
  var h = oa(a.view.model.buffer, "msg", 1e3);
  var d = hb(a);
  q(a.view, 2, 10);
  var e = jb(a);
  var g = a.view.selection.positionColumn;
  f = [0, 0];
  f[0] = a.view.selection.positionLineNumber;
  f[1] = g;
  g = xa(a, f);
  f = a.view.model.buffer.lineCnt;
  2 > f || (f = 2);
  q(a.view, f, 1);
  a.view.scrollTop = (f - 1 | 0) * a.view.lineHeight | 0;
  l(a.view);
  ib(a);
  b = eb(b, { __proto__: null, original: "a\nb\nc\n", modified: "a\nx\nc\n", language: vb });
  f = b[1].view.model.buffer;
  var i2 = x(f, f.root);
  f = b[2].view.model.buffer;
  f = x(f, f.root);
  b[3] = ua(U(i2), U(f));
  b = b[3];
  setTextContent(c, "value=" + gb(a).length.toString(10) + " matches=" + h.length.toString(10) + " folds=" + d.length.toString(10) + " highlights=" + e.length.toString(10) + " hover=" + g + " diffs=" + b.length.toString(10));
}
var cc = { bufferIndex: 0, start: { line: 0, column: 0 }, end: { line: 0, column: 0 }, lineFeedCnt: 0, length: 0 };
var dc = { parent: null, left: null, right: null, color: 0, piece: null, size_left: 0, lf_left: 0, alive: false };
X(dc, cc, 0);
var i = dc;
var V = 1;
var ec = { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 };
o(ec, 1, 1, 1, 1);
dc = pb;
cc = { id: 0, range: null, className: "", hoverMessage: "", isWholeLine: false };
cc.id = 0;
cc.range = ec;
cc.className = dc;
cc.hoverMessage = dc;
cc.isWholeLine = false;
dc = { parent: null, left: null, right: null, color: 0, deco: null, maxEndLine: 0, maxEndColumn: 0, alive: false };
Na(dc, cc);
var za = dc;
var Aa = [];
var w = [];
var ga = false;
var W = [];
export {
  db as create,
  gb as editorGetValue,
  kb as runDemo,
  fb as setTheme
};
