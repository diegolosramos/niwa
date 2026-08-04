# Time complexity

The O notation is used to determine time and space complexity of an algorithm. The space complexity is often of lesser concern than time complexity.

It describes the amount of operations required to execute the algorithm as a function of n. 

Constants are not included in O notation because they only represent a small fraction of the total amount for large n values.

## Complexities

We assume `a` is an array of length `n`.

## O(1)

Constant time complexity. Examples include getting the value at index i in an array: `a[i]`.

## O(n)

Liner time complexity. Example include traversing a binary tree using Breath-First Search (BFS) or Depth-First Search (DFS), or multiplying all values in an array by a constant, `a.map((element) => elemeent * 5)`.

## O(n!)

Factorial time complexity. Found in permutations and factorial calculations.

## O(log n)

Log n time complexity. Found in algorithms where the number of operations is halfed on every iteration. For example, a binary search

## O(n log n)

n log n time complexity. Found in sorting algorithms. Native sorting algorithms in programming languages can be assumed to be (n log n). `a.sort()`

## O(sqrt(n))

Square root of n time complexity. This is an uncommon time complexity. It's used in mathematical problems to find factors of n.

## O(n^2)

Quadradic time complexity. Found usually in problems that involve 2D matrices. 


## O(n*m)

n * m time complexity. It can be thought of as a matrix where n and m are different values. 

## O(n^3)

Cubic time complexity. Found usually in problems that involve 3D matrices. 

## O(2^n)

Non-Polynomial time complexity. Found in algorithms where the number of operations is doubled on every iteration. For example, a recursive expanding algorithm.