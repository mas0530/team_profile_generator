const inquirer = require("inquirer");
const fs = require("fs");
const generateTeam = require("./src/page-template.js");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const { networkInterfaces } = require("os");

const newTeamMemberArray = [];
const htmlArr = []

//*const questions = async() => {
//const answers = await inquirer
//  .prompt([

// ])
//}//*
const engineerPrompt = () => {
    inquirer.prompt([

        {
            type: 'input',
            name: 'engineerName',
            message: "What is the engineer's name?",
        },
        {
            type: 'input',
            name: 'engineerId',
            message: "What is the engineer's Id?",
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: "What is the engineer's email?",
        },
        {
            type: 'input',
            name: 'github',
            message: "What is your github username?",
        }
    ]).then(engineerAnswer => {
        const engineer = new Engineer(engineerAnswer.engineerName, engineerAnswer.engineerId, engineerAnswer.engineerEmail, engineerAnswer.github);
        console.log(engineer.getRole());

        newTeamMemberArray.push(engineer);
        console.log(newTeamMemberArray);

        addMember();

    })
};

const internPrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'school',
            message: "What is your school name?"
        },
        {
            type: 'input',
            name: 'internId',
            message: "What is the intern's Id?"

        },
        {
            type: 'input',
            name: 'internName',
            message: "What is the intern's name?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your email?",

        }

    ]).then(internAnswers => {
        const intern = new Intern(internAnswers.internName, internAnswers.internId, internAnswers.internEmail, internAnswers.school)
        console.log(intern.getRole());
        newTeamMemberArray.push(intern);
        console.log(newTeamMemberArray);
        addMember();
    })
};


const employeeHtml = () => {
    //writeToFile();
    newTeamMemberArray.forEach(teamMember => {
        let role = teamMember.getRole();

        if (role == 'Manager') {
            //create html block for manager
            let managerHtml = `
            <div class="card-body">
            <h5 class="card-title">MANAGER</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${teamMember.getId()}</li>
                <li class="list-group-item">Email: ${teamMember.getEmail()}</li>
                <li class="list-group-item">Office Number: ${teamMember.getOfficeNumber()}</li>
            </ul>
        </div>
            `
            htmlArr.push(managerHtml);
        }
        
        else if (role == 'Engineer') {
            //create html block for manager
            let engineerHtml = `
            <div class="card-body">
            <h5 class="card-title">ENGINEER</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${teamMember.getId()}</li>
                <li class="list-group-item">Email: ${teamMember.getEmail()}</li>
                <li class="list-group-item">Github: ${teamMember.getGithub()}</li>
            </ul>
        </div>
            `
            htmlArr.push(engineerHtml);
        }

        else {
            //create html block for manager
            let internHtml = `
            <div class="card-body">
            <h5 class="card-title">INTERN</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${teamMember.getId()}</li>
                <li class="list-group-item">Email: ${teamMember.getEmail()}</li>
                <li class="list-group-item">School: ${teamMember.getSchool()}</li>
            </ul>
        </div>
            `
            htmlArr.push(internHtml);
        }
    })
    const joinedHtmlArr = htmlArr.join("")
    console.log(joinedHtmlArr)
    return joinedHtmlArr;

}

function appendHTML() {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Document</title>
</head>

<body>
    <header>My Team</header>
    <div class="card" style="width: 18rem;">

    //adding the html block
    ${employeeHtml()}
    </div>
</body>

</html>`
}

function writeToFile() {
    fs.writeFile('./dist/index.html', appendHTML(), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

const buildTeam = () => {
    writeToFile();
}

const addMember = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "What is your role?",
            choices: ["Engineer", "Intern", "Finish building team"]
        }
    ])
        .then(memberChoice => {
            console.log(memberChoice)
            if (memberChoice.role == "Engineer") {
                console.log()
                engineerPrompt();
            } else if (memberChoice.role == "Intern") {
                internPrompt();
            } else {
                buildTeam();
            }
        })

}

const managerPrompt = () => {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                type: 'input',
                name: "managerName",
                message: "What is the manager's name?"
            },
            {
                type: 'input',
                name: "managerId",
                message: "What is the manager's ID?"
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "What is the manager's office number?"

            },
            {
                type: 'input',
                name: 'email',
                message: "What is your email?"
            }
        ])
        .then((answers) => {
            // Use user feedback for... whatever!!
            console.log(answers)
            let manager = new Manager(answers.managerName, answers.managerId, answers.officeNumber, answers.email)
            newTeamMemberArray.push(manager);
            console.log(newTeamMemberArray);
            addMember();
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
};




//if else statement or switch statement
//What happens when either one of the options is chosen
//call engineerPrompt function?
//call internPrompt function?
//call buildTeam function?


managerPrompt();
