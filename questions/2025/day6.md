---
title: Chronal Frequency Calibration
day: 6
id: d1e8c4b7-6a3f-4295-8e71-9c3b5a8d2e64
---

You arrive at the coding lodge and need to calibrate the chronal computer's frequency. Below the display is a list of all frequency adjustments.

**Rule:**

Starting with a frequency of `0`, apply all frequency adjustments in order:
- `+X` increases the frequency by `X`
- `-X` decreases the frequency by `X`

Your task is to determine the resulting frequency after applying all adjustments.


### **Example**

**Input:**

```
+1
-2
+3
+1
```

**Explanation:**

- Start at `0`
- Current frequency `0`, change `+1`: resulting frequency is **1**
- Current frequency `1`, change `-2`: resulting frequency is **-1**
- Current frequency `-1`, change `+3`: resulting frequency is **2**
- Current frequency `2`, change `+1`: resulting frequency is **3**

**Final Frequency:** **3**

**Output:**

```
3
```


### **Input Format**

- Multiple lines, each containing a signed integer (for example, `+10` or `-5`).

### **Output Format**

- A single integer representing the final accumulated frequency.

### **Constraints**

- Up to `2000` adjustments per input file.
- Each value is between `-1000` and `1000`.
