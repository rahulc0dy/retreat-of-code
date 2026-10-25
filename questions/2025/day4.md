---
title: Password Corporate Policy
day: 4
id: e2c8a735-9f14-46d2-8b43-7f31a5c68b92
---

The retreat server database contains passwords along with their corporate policy requirements. Each line gives a policy and a password to check:

`min-max char: password`

**Rule:**

The policy indicates the lowest and highest number of times the specified letter must appear in the password for it to be valid.

Your task is to determine how many passwords in your input are valid according to their policies.


### **Example**

**Input:**

```
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
```

**Explanation:**

- `1-3 a: abcde` contains `a` 1 time, which is between 1 and 3. This password is **valid**.
- `1-3 b: cdefg` contains `b` 0 times, which is not between 1 and 3. This password is **invalid**.
- `2-9 c: ccccccccc` contains `c` 9 times, which is between 2 and 9. This password is **valid**.

**Valid Count:** **2**

**Output:**

```
2
```


### **Input Format**

- Multiple lines, each formatted as `min-max char: password`.

### **Output Format**

- A single integer representing the count of valid passwords.

### **Constraints**

- Up to `2000` lines of passwords.
- `min` and `max` are positive integers where `min <= max`.
- Characters and passwords consist of lowercase ASCII letters.
