
/*------------------------------- Starter Code -------------------------------*/
const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer');

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Welcome to the CRM')
    await getAction()
}

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
    
    let action = prompt('Copy and paste the id of the customer you would like to UPDATE here: ')
    const newName = prompt("What is the Customer's new name?: ")
    const newAge = parseInt(prompt("What is the Customer's new age?: "), 10)
    const updatedCustomer = await Customer.findByIdAndUpdate(action, { name: newName, age: newAge }, {new: true})
    console.log('Updated Customer: ', updatedCustomer)
    getAction();
}

// Delete
const deleteCustomer = async () => {
    const customers = await Customer.find().sort({ text: 'asc' })
    console.log('Below is a list of Customers:', customers)

    let action = prompt('Copy and paste the id of the customer you would like to DELETE here: ')
    const deletedCustomer = await Customer.findByIdAndDelete(action)
    console.log('Deleted Customer:', deletedCustomer)
    getAction();
}

// Quit
const quitApplication = async () => {
    console.log('Exiting application.  Fare thee well, you magnificent thing you...')
    mongoose.connection.close();
    process.exit();
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
    if (action === 1) {
        await createCustomer()
    } else if (action === 2) {
        await viewCustomer()
    } else if (action === 3) {
        await updateCustomer()
    } else if (action === 4) {
        await deleteCustomer()
    } else if (action === 5) {
        await quitApplication()
    }
}
