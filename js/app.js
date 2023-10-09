import inquirer from "inquirer";
import chalk from "chalk";
const minimum = 1;
const maximum = 100;
const maxAttempts = 5;
let totalAttempts = 0;
let rounds = 0;
let wins = 0;
async function startGame() {
    console.log(chalk.bgBlueBright("Welcome to the Number Guessing Game!"));
    await playRound();
}
async function playRound() {
    rounds++;
    const secretNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    let attempts = 0;
    console.log(chalk.bgBlueBright(`\nRound ${rounds}`));
    console.log(chalk.yellowBright(`Guess the number between ${minimum} and ${maximum}. You have ${maxAttempts} attempts.`));
    while (attempts < maxAttempts) {
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "guess",
                message: `Attempt ${attempts + 1}: Enter your guess: `,
                validate: (value) => {
                    const number = parseInt(value, 10);
                    if (isNaN(number) || number < minimum || number > maximum) {
                        return "Please enter a valid number between 1 and 100.";
                    }
                    return true;
                },
            },
        ]);
        const guess = parseInt(answer.guess, 10);
        attempts++;
        totalAttempts++;
        if (guess === secretNumber) {
            console.log(`Congratulations! You guessed the number in ${attempts} attempts.`);
            wins++;
            break;
        }
        else if (attempts < maxAttempts) {
            if (guess < secretNumber) {
                console.log("Too low. Try again.");
            }
            else {
                console.log("Too high. Try again.");
            }
        }
        else {
            console.log(chalk.redBright(`Sorry, you've reached the maximum number of attempts. The secret number was ${secretNumber}.`));
        }
    }
    const playAgain = await inquirer.prompt([
        {
            type: "list",
            name: "again",
            message: chalk.bgCyan("Play another round?"),
            choices: ["Yes", "No"],
        },
    ]);
    if (playAgain.again === "Yes") {
        await playRound();
    }
    else {
        console.log(chalk.green("Thanks for playing! Final Score:"));
        console.log(chalk.green(`Rounds played: ${rounds}, Total Attempts: ${totalAttempts}, Wins: ${wins}`));
    }
}
startGame();
