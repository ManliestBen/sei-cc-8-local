import random

hidden = random.randrange(1, 11)

guess = int(input('Make a guess:'))
guessCount = 1

while guess != hidden:
    if guess > hidden:
        print('Too high')
        guessCount += 1
        guess = int(input('Make another guess:'))

    else:
        print('Too low')
        guessCount += 1
        guess = int(input('Make another guess:'))

print(f'You guessed it in {guessCount} guesses')