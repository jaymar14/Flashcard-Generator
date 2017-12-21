var ClozeCard = require("./ClozeCard.js");

var BasicCard = require("./BasicCard");

var inquirer = require("inquirer");

var fs = require("fs");

function newQuestion(){
	inquirer.prompt([{
			type: "list",
			name: "type",
			message: "Create or review a flashcard?",
			choices: ["Create Basic Card", "Create Cloze Card", "Review!"]
	}]).then(function(user){
		if(user.type === "Create Basic Card"){
			newBasicCard();
		}
		else if(user.type === "Create Cloze Card"){
			newClozeCard();
		}
		else{
			reviewCards();
		}
	});
}

newQuestion();


function newBasicCard(){
	return inquirer.prompt([
	{
		type: "input",
		name: "front",
		message: "Which question would like to put for front of card?"
	},
	{
		type: "input",
		name: "back",
		message: "what is the answer to question for back of card?"
	}

   ]).then(function(basicInfo){
		newBasic = new BasicCard(basicInfo.front, basicInfo.back);
		console.log(newBasic);

		fs.appendFile("flashcards.txt", JSON.stringify(newBasic) + '\r\n', function(err){
			if(err){
				console.log(err);
			}
		});
		inquirer.prompt([
		{
			type: "confirm",
			name: "confirm",
			message: "Would you like to write another card?",
			default: true
		}
		]).then(function(userConfirm){
			if(userConfirm.confirm === true){
				newBasicCard();
			}else{
				newQuestion();
			}
		});
	});
}

function newClozeCard(){
	return inquirer.prompt([
	{
		type: "input",
		name: "text",
		message: "Please enter full text statement."
	},
	{
		type: "input",
		name: "cloze",
		message: "Please state which words to omit for review."
	},
	{
		type: "input",
		name: "partial",
		message: "Now enter partial text omitting the cloze from previous questions."
	},
	]).then(function(clozeInfo){
		newCloze = new ClozeCard(clozeInfo.text, clozeInfo.cloze, clozeInfo.partial);
		 console.log(newCloze);
		 fs.appendFile("flashcards.txt", JSON.stringify(newCloze) + '\r\n', function(err){
		 	if(err){
		 		console.log(err);
		 	}
		 });
		 inquirer.prompt([
		 	{
		 		type: "confirm",
		 		name: "confirm",
		 		message: "Do you want to write another card?",
		 		default: true
		 	}
		 	]).then(function(userConfirm){
		 		if(userConfirm.confirm ===  true){
		 			newBasicCard();
		 		} else {
		 			newQuestion();
		 		}
		 	});
	});
}

function reviewCards(){
	fs.readFile("flashcards.txt", "utf8", function(err,data){
		if(err){
			throw err;
		}
		console.log("===========================================");
		console.log("[" + data + "]");
	});
}
