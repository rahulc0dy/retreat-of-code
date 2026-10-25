---
title: Historian Hysteria
day: 1
id: f0a3e8b1-5d9c-4826-a147-38e2b9c71d54
---

The Chief Historian has gone missing. You are given two separate lists of location IDs compiled by search teams to reconcile.

**Rule:**

1. Pair up the smallest number in the left list with the smallest number in the right list.
2. Pair up the second-smallest number in the left list with the second-smallest number in the right list, and so on.
3. For each pair, find the absolute difference between the numbers.
4. Add up all differences to compute the total distance.

Your task is to compute the total distance between the two lists.


### **Example**

**Input:**

```
3   4
4   3
2   5
1   3
3   9
3   3
```

**Explanation:**

- Smallest: `1` and `3`, difference is `2`
- Second smallest: `2` and `3`, difference is `1`
- Third smallest: `3` and `3`, difference is `0`
- Fourth smallest: `3` and `4`, difference is `1`
- Fifth smallest: `3` and `5`, difference is `2`
- Sixth smallest: `4` and `9`, difference is `5`

**Total Distance:** 2 + 1 + 0 + 1 + 2 + 5 = **11**

**Output:**

```
11
```


### **Input Format**

- Multiple lines, each containing two space-separated integers.

### **Output Format**

- A single integer representing the total distance between the paired lists.

### **Constraints**

- Up to `2000` pairs of integers.
- Numbers are positive integers between `0` and `100000`.
