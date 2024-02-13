import { ethers } from "hardhat";
import {assert, expect} from "chai";
import {loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Test Todo", function(){
    async function deployTodo(){
        const TodoImpl = await ethers.getContractFactory("TodoImpl");
        const todoImpl = await TodoImpl.deploy();

        const {createTodo, getNumberOfTodos} = await ethers.getContractAt("ITodo", todoImpl);
        return {createTodo, getNumberOfTodos};
    }
    describe("test create Todo", function(){
        it("when i create one todo i should get 1 when i try to get the number of the Todos", async function(){
            const{createTodo, getNumberOfTodos} = await loadFixture(deployTodo);
            await createTodo("Jump", "i am jumping");
            const result = await getNumberOfTodos();
            expect(result).is.equal(1);
        }),
        it("", async function(){
            const{createTodo, getNumberOfTodos} = await loadFixture(deployTodo);
            await createTodo("Jump", "i am jumping");
            await createTodo("Run", "i am running");
            const result = await getNumberOfTodos();
            expect(result).is.equal(2);
        }),
        it("assert that when creating a todo, no duplicate title is allowed", async function(){
            const {createTodo, getNumberOfTodos} = await loadFixture(deployTodo);
            await createTodo("Jump", "i am jumping");
            try{
            await createTodo("Jump", "I am humming");
            }catch(error){
                expect(error.message).to.include("a title with this title already exist...");
            }
            const result = await getNumberOfTodos();
            expect(result).is.equal(1);
        })
    }),
    describe("", function(){
        it("", async function(){

        })
    })
});