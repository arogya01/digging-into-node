
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


function ask(question) {
  rl.question(question, (ans) => {
    if (ans === 'q') {
      process.exit(1);
    }
    rl.write(`the answer recieved : ${ans} \n`);
    ask(question);
  });

}

ask("what is your name ?");
