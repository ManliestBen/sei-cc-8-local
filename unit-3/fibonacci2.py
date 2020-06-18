# 0, 1, 1, 2, 3, 5, 8, 13, etc
# Enter how many terms of the Fibonacci sequence

n1 = 0
n2 = 1
count = 0

termCount = int(input("How many terms? "))


# First Number      0   1   1   2   3   5
# Second Number     1   1   2   3   5   8
# Fib Number        1   2   3   5   8   13
#Count              1   2   3   4   5   6   

if termCount <= 0:
    print("Please enter a positive number!")
elif termCount == 1:
    print(f'Fibonacci sequence up to {termCount} is {n1}')
else: 
    print(f'Fibonacci sequence up to {termCount} is: ')
    while termCount > count:
        fib = n1 + n2
        print(n1)
        n1 = n2
        n2 = fib
        count += 1
