---
title: Binary Boarding Pass
day: 5
id: 4f7b9c28-3e51-49a6-8d12-6a8b4c7e2f93
---

You board the Retreat Express train, but seat assignments are encoded using binary space partitioning. Each boarding pass is 10 characters long:

**Rule:**

- The first 7 characters are either `F` (front) or `B` (back). These specify one of 128 rows (numbered `0` through `127`). `F` means take the lower half, and `B` means take the upper half.
- The last 3 characters are either `L` (left) or `R` (right). These specify one of 8 columns (numbered `0` through `7`). `L` means take the lower half, and `R` means take the upper half.
- Every seat has a unique Seat ID: `row * 8 + column`.

Your task is to decode all boarding passes and find the highest Seat ID in your list.


### **Example**

**Input:**

```
FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL
```

**Explanation:**

- `FBFBBFFRLR`: row 44, column 5. Seat ID: 44 * 8 + 5 = **357**
- `BFFFBBFRRR`: row 70, column 7. Seat ID: 70 * 8 + 7 = **567**
- `FFFBBBFRRR`: row 14, column 7. Seat ID: 14 * 8 + 7 = **119**
- `BBFFBBFRLL`: row 102, column 4. Seat ID: 102 * 8 + 4 = **820**

**Highest Seat ID:** **820**

**Output:**

```
820
```


### **Input Format**

- Multiple lines, where each line contains a 10-character boarding pass code.

### **Output Format**

- A single integer representing the highest Seat ID.

### **Constraints**

- Up to `1000` boarding passes.
- First 7 characters are always `F` or `B`; last 3 characters are always `L` or `R`.
