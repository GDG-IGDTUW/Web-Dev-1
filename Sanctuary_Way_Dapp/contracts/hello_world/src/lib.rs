#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, Env, String, Address};


#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Event {
    name: String,
    address: Address,
    amount: u32,
}

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {

    pub fn donate(env: Env, address: Address, amount: u32) {
        if let Some(mut event) = env.storage().persistent().get::<_, Event>(&address) {
            event.amount += amount;
            env.storage().persistent().set(&address, &event);
        } else {
            panic!("Event not found");
        }
    }

    pub fn balance(env: Env, address: Address) -> Option<u32> {
        if let Some(event) = env.storage().persistent().get::<_, Event>(&address) {
            Some(event.amount)
        } else {
            None
        }
    }

    pub fn add_event(env: Env, name: String, address: Address, amount: u32) {
        let event = Event {
            name,
            address: address.clone(),
            amount,
        };
        env.storage().persistent().set(&address, &event);
    }
}