'use strict'

let assert = require('assert');

//bank account class containing utlility functions
//has values accountNumber, Owner, and an empty transactions array on initalization
class BankAccount {
    constructor (accountNumber, owner) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.transactions = [];
    } 
    //function that returns the balance of transactions array
    balance () {
        //sets balance to 0
        let balance = 0;
        //runs through this.transactions
        for (let transaction in this.transactions){
            //in no payee specified it is a deposit
            if(this.transactions[transaction].amount > 0 && !this.transactions[transaction].payee) {
                // add this transaction amount value to the balance variable
                balance += this.transactions[transaction].amount;
            }
            //if payee exists it is a charge or a refund
            else if (this.transactions[transaction].payee) {
                //subract this transaction amount from the balance variable
                //subtracts negative values (refunds) which adds to bank account
                balance -= this.transactions[transaction].amount;
            }
        }
        return balance;
    }
    //method for depositing money into the account
    deposit(amt) {
        //if amount is positive, add the transaction to the array
        if (amt > 0) this.transactions.push(new Transaction(amt));
    }
    //method for charging the account
    charge (amt, payee) {
        //sets balance variable to the current account balance
        let balance = this.balance();
        //if balance variable minus this charge is over 0
        if (balance - amt > 0){
            //add charge to the transactions array
            this.transactions.push(new Transaction(amt, payee));
        } 
        //else disallow
        else {
            return false;
        }
    }
}

// extends BankAccount class and has accrueInterest utlitiy method
//has an interest rate value on initalization
class SavingsAccount extends BankAccount {
    constructor (accountNumber, owner, interestRate) {
        super(accountNumber, owner);
        this.interestRate = interestRate;
    }
    //computes interest based on current balance
    //interest rate can be set on initalization
    accrueInterest() {
        let balance = this.balance();
        let interest = balance * this.interestRate;
        this.transactions.push(new Transaction(interest));
    }
}

//class which creates new Transactions
//can be added to transactions array
//contains amount of transaction, who is being payed, and the date of the transaction
class Transaction {
    constructor (amount, payee) {
        this.amount = amount;
        this.payee = payee;
        this.date = Date();
    }
}



//tests
if (typeof describe === 'function'){
    describe('BankAccount', function(){
        it('should have an accountNumber, an owner, and an empty transaction list of balance 0', function(){
            let acct1 = new BankAccount("5553429", "John Doe");
            assert.equal(acct1.accountNumber, '5553429');
            assert.equal(acct1.owner, 'John Doe');
            assert.equal(acct1.balance(), 0);
        });
        it('should be able to deposit money into an account', function(){
            let acct1 = new BankAccount("5553429", "John Doe");
            acct1.deposit(100);
            assert.equal(acct1.balance(), 100);
        });
        it('should not allow negative deposits or 0 deposits', function(){
            let acct1 = new BankAccount("5553429", "John Doe");
            acct1.deposit(100);            
            acct1.deposit(-200);
            assert.equal(acct1.balance(), 100);
        });
        it('should calculate new balances correctly, and allow refunds', function(){
            let acct1 = new BankAccount("5553429", "John Doe");
            acct1.deposit(100);            
            acct1.charge(30.50, "Target");
            acct1.charge(15.15, "FreeBirds");
            assert.equal(acct1.balance(), 54.35);
            acct1.charge(-20, "Target");
            assert.equal(acct1.balance(), 74.35);
        });
        it('should not allow the balance to reduce lower than 0', function(){
            let acct1 = new BankAccount("5553429", "John Doe");
            acct1.deposit(100);            
            acct1.charge(1000, "Diamond Shop"); // should not be allowed
            assert.equal(acct1.balance(), 100);
        });
        it('should provide a date for charges and deposits', function(){
            let acct1 = new BankAccount("5553429", "John Doe");
            acct1.deposit(100);      
            assert.equal(acct1.transactions.slice(-1).date);      
            acct1.charge(25, "Pet Supplies");            
            assert.equal(acct1.transactions.slice(-1).date);
        });
    });
    describe('SavingsAccount', function() {
        it('should accrue interest', function(){
            let acct1 = new SavingsAccount("5553429", "John Doe", 0.01);
            acct1.deposit(500);            
            acct1.accrueInterest();
            assert.equal(acct1.balance(), 505);
        });
    })
  }
  