use std::io;
use rand::Rng;
use std::cmp;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1, 101);

//    println!("The secret number is: {}", secret_number);

    loop {
        let mut guess = String::new();

        io::stdin().read_line(&mut guess)
            .expect("Failed to read line");

        let guess: i32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {}", guess);

        match guess.cmp(&secret_number) {
            cmp::Ordering::Less => println!("Too small!"),
            cmp::Ordering::Greater => println!("Too big!"),
            cmp::Ordering::Equal => {
                println!("You win!");
                break;
            },
        }
    }
}

// Expressions

//fn main() {
//    let y: i32 = {
//        5
//    };
//
//    println!("The value of y is: {}", y);
//}

// Control flow
//
//fn main() {
//    let number = 3;
//
//    if number != 0 {
//        println!("number was something other than zero");
//    }
//}