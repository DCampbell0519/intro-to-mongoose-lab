
/*------------------------------- Starter Code -------------------------------*/
const prompt = require('prompt-sync')();
// const username = prompt(welcomeMessage());
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer');

// console.log(`Your name is ${username}`);


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log('Connected to MongoDB')
    console.log('Welcome to the CRM')
    await getAction()
    

    // await runQueries()

    // process.exit();
}

// const runQueries = async () => {
//     console.log('Queries are running')
// }

connect();



/*------------------------------ Query Functions -----------------------------*/

// Create
const createCustomer = async () => {
    const name = prompt("Enter Customer's name: ");
    const age = parseInt(prompt("Enter Customer's age: "), 10);
    const customerData = { name, age }

    const newCustomer = await Customer.create(customerData)
    console.log('New Customer:', newCustomer)
    getAction();
}

// View
const viewCustomer = async () => {
    const customers = await Customer.find().sort({ text: 'asc' })
    console.log('All Customers: ', customers)
    getAction();
}

// Update
const updateCustomer = async () => {
    const customers = await Customer.find().sort({ text: 'asc' })
    console.log('Below is a list of Customers:', customers)
    
    let action = prompt('Copy and paste the id of the customer you would like to update here: ')
    console.log(action)
    const newName = prompt("What is the Customer's new name?: ")
    const newAge = parseInt(prompt("What is the Customer's new age?: "), 10)
    const updatedCustomer = await Customer.findByIdAndUpdate(action, { name: newName, age: newAge }, {new: true})
    console.log('Updated Customer: ', updatedCustomer)
    getAction();
}

// Quit
const quitApplication = async () => {
    process.exit()
}


const getAction = async () => {
    console.log('What would you like to do?')
    console.log('  1. Create a customer')
    console.log('  2. View all customers')
    console.log('  3. Update a customer')
    console.log('  4. Delete a customer')
    console.log('  5. Quit')
    let action = parseInt(prompt('Number of action to run: '))
    await performAction(action) 
}

const performAction = async (action) => {
    console.log('Everything seems to be working')

    if (action === 1) {
        // Create a customer
        await createCustomer()
    } else if (action === 2) {
        // View all customers
        await viewCustomer()
    } else if (action === 3) {
        // Update a customer
        await updateCustomer()
//     } else if (action === 4) {
//         // Delete a customer
    } else if (action === 5) {
        // Quit
        await quitApplication()
    }
}


// Create