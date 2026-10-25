---
title: Gift Box Wrapping Logistics
day: 2
id: 7d3c8e41-2b69-4f81-9b7e-e14589d3c52a
---

The elves at the Retreat packing warehouse are preparing holiday gift boxes for developers. Every gift box is a rectangular prism with dimensions: length, width, and height (measured in feet).

The elves need to know how much wrapping paper to order for all boxes.

**Rule:**

For each box, find the surface area `2*l*w + 2*w*h + 2*h*l`. In addition, add extra paper equal to the area of the smallest side (`min(l*w, w*h, h*l)`).

Your task is to calculate the total square feet of wrapping paper needed for all gift boxes.


### **Example**

**Input:**

```
2x3x4
1x1x10
```

**Explanation:**

- A box with dimensions `2x3x4` has a surface area of `2*6 + 2*12 + 2*8 = 52`. The smallest side is `2*3 = 6`. Total paper needed: 52 + 6 = **58**.
- A box with dimensions `1x1x10` has a surface area of `2*1 + 2*10 + 2*10 = 42`. The smallest side is `1*1 = 1`. Total paper needed: 42 + 1 = **43**.

**Total:** 58 + 43 = **101**

**Output:**

```
101
```


### **Input Format**

- Multiple lines, where each line contains the dimensions of a box formatted as `lxwxh`.

### **Output Format**

- A single integer representing the total square feet of wrapping paper required.

### **Constraints**

- Up to `1000` boxes.
- Dimensions `l`, `w`, and `h` are positive integers between `1` and `50`.
