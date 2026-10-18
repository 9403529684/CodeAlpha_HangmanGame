import random

def play_hangman():
    words = ["python", "computer", "program", "developer", "keyboard"]

    secret_word = random.choice(words)

    guessed_letters = []
    incorrect_guesses = 0
    max_attempts = 6

    print("=" * 40)
    print("       WELCOME TO HANGMAN GAME")
    print("=" * 40)

    while incorrect_guesses < max_attempts:

        print("\nWord:", end=" ")

        for letter in secret_word:
            if letter in guessed_letters:
                print(letter, end=" ")
            else:
                print("_", end=" ")

        print("\nIncorrect guesses:", incorrect_guesses)
        print("Attempts remaining:", max_attempts - incorrect_guesses)

        guess = input("Guess a letter: ").lower().strip()

        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single alphabet letter.")
            continue

        if guess in guessed_letters:
            print("You already guessed that letter. Try another.")
            continue

        guessed_letters.append(guess)

        if guess in secret_word:
            print("Correct guess!")

            if all(letter in guessed_letters for letter in secret_word):
                print("\nCongratulations! You won!")
                print("The word was:", secret_word)
                break
        else:
            incorrect_guesses += 1
            print("Wrong guess!")

    else:
        print("\nGame Over! You lost.")
        print("The correct word was:", secret_word)

    print("\nThank you for playing Hangman!")


play_hangman()