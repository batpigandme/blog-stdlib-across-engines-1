# oracle.py -- what every line of driver.js's output must be, computed in
# Python from the printed inputs, independently of any JavaScript engine.
#
#   python3 oracle.py < output.txt      # exit 0 and "oracle: N of N lines" if all correct
#
# Each rule is the ECMA-262 conversion the typed-array store applies
# (ToUint8 / ToInt16 / ToUint16 / ToInt32 / ToUint32: the mathematical value
# modulo 2^k, then reinterpreted as signed for the Int types), written here with
# Python's unbounded integers, so no floating point is involved anywhere.
import sys

def wrap(v, bits, signed):
    v %= 1 << bits
    return v - (1 << bits) if signed and v >= 1 << (bits - 1) else v

T = {'uint8': (8, False), 'uint16': (16, False), 'int16': (16, True), 'int32': (32, True), 'uint32': (32, False)}
rows = {}
for l in sys.stdin:
    l = l.rstrip('\n')
    if ' ' not in l:
        continue
    name, _, vals = l.rpartition(' ')
    rows[name] = vals

def ints(name):
    return [int(v) for v in rows[name].split(',')]

x = {'uint8': ints('in-u8x'), 'int16': ints('in-i16x'), 'uint16': ints('in-u16x')}
y = {'uint8': ints('in-u8y'), 'int16': ints('in-i16y'), 'uint16': ints('in-u16y')}
N = len(x['uint8'])
want = {}
F = {'add': lambda a, b: a + b, 'mul': lambda a, b: a * b}
for op, ti, to in (('add', 'uint8', 'uint8'), ('add', 'uint8', 'uint16'), ('add', 'int16', 'int16'),
                   ('add', 'int16', 'int32'), ('add', 'uint16', 'uint16'), ('mul', 'uint16', 'uint16'),
                   ('mul', 'uint16', 'uint32'), ('mul', 'int16', 'int16'), ('mul', 'uint8', 'uint8')):
    want['ops.%s %s,%s->%s' % (op, ti, ti, to)] = [wrap(F[op](a, b), *T[to]) for a, b in zip(x[ti], y[ti])]
z = [0] * N   # N/2 elements, stride -2: the first result lands at index N-2
for k in range(N // 2):
    z[N - 2 - 2 * k] = wrap(x['int16'][2 * k] + y['int16'][2 * k], 16, True)
want['ops.add int16 stride 2,2,-2'] = z
want['gsorthp int16 ascending'] = sorted(x['int16'])
want['gsorthp uint16 descending'] = sorted(x['uint16'], reverse=True)
s = list(x['uint8']); s[0::2] = sorted(s[0::2])
want['gsorthp uint8 stride 2'] = s
want['binary number.uint16.base.mul'] = [(a * b) % 65536 for a, b in zip(x['uint16'], y['uint16'])]
want['binary number.uint8.base.add'] = [(a + b) % 256 for a, b in zip(x['uint8'], y['uint8'])]

checked = bad = 0
for name, v in rows.items():
    if name.startswith('in-') or name.startswith('meta'):
        continue
    if name not in want:
        print('oracle: no rule for', name); bad += 1; continue
    checked += 1
    if ints(name) != want[name]:
        bad += 1
        got = ints(name)
        i = next(i for i in range(min(len(got), N)) if got[i] != want[name][i]) if len(got) == N else -1
        print('oracle: WRONG %s (first difference at %d)' % (name, i))
missing = [k for k in want if k not in rows]
for k in missing:
    print('oracle: line missing:', k)
print('oracle: %d of %d lines correct%s' % (checked - bad, len(want), '' if not missing else ', %d missing' % len(missing)))
sys.exit(1 if bad or missing else 0)
