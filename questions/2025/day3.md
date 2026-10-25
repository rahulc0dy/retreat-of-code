---
title: Drone Delivery Grid
day: 3
id: b9a1d642-4f8e-4731-bc63-5e28a9b1c74f
---

An autonomous navigation drone delivers packages across a two-dimensional grid of houses.

The drone starts at location `(0, 0)` and immediately delivers a package there. Then it follows a sequence of directional movement commands:

**Rule:**

- `^` moves North (`y + 1`)
- `v` moves South (`y - 1`)
- `>` moves East (`x + 1`)
- `<` moves West (`x - 1`)

At each move, the drone delivers another package to the house at that location. Even if a house has already received a package before, it receives another one.

Your task is to determine how many unique houses receive at least one package.


### **Example**

**Input:**

```
^>v<
```

**Explanation:**

- Starts at `(0, 0)` (1 house)
- `^` moves to `(0, 1)` (2 houses)
- `>` moves to `(1, 1)` (3 houses)
- `v` moves to `(1, 0)` (4 houses)
- `<` moves to `(0, 0)` (already visited)

**Total unique houses:** **4**

**Output:**

```
4
```


### **Input Format**

- A single line containing directional characters (`^`, `v`, `>`, `<`).

### **Output Format**

- A single integer representing the number of unique houses that receive at least one package.

### **Constraints**

- Up to `10000` direction characters per input line.
- Valid characters are only `^`, `v`, `>`, `<`.
