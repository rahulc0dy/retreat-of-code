---
title: The Mystery Signal
day: 1
id: 3fc951ca-d226-4d07-a6c4-4541feaaf3d3
---

In a far-off land, secret messages are transmitted using a peculiar protocol. Each message is a single line of space-separated integers. The encryption hides the true message by combining the numbers in a special way:

- **Rule:**
    
    For each group of consecutive identical numbers, only the first occurrence is counted. That is, if a number appears repeatedly one after the other, add it only once, then move on to the next different number.
    

Your task is to decode the signal by computing the sum of these numbers as described.


### **Example**

**Input:**

```
3 3 3 4 4 1 1 2 2 2
```

**Explanation:**

- The first three numbers are `3` repeated, so count it once: **3**
- Next, `4` appears twice, so count it once: **4**
- Then, `1` appears twice, so count it once: **1**
- Finally, `2` appears three times, so count it once: **2**

**Sum:** 3 + 4 + 1 + 2 = **10**

**Output:**

```
10
```


### **Input Format**

- A single line containing space-separated integers.

### **Output Format**

- A single integer representing the computed sum.

### **Constraints**

- Up to 1000 integers per input line.
- Each integer is between 0 and 1000.