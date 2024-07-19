"use strict";
class MargheritaBuilder {
    constructor() {
        this.pizza = new MargheritaPizza();
    }
    reset() {
        this.pizza = new MargheritaPizza();
    }
    buildDough() {
        this.pizza.parts.push("Thin Crust Dough");
    }
    buildSauce() {
        this.pizza.parts.push("Tomato Sauce");
    }
    buildCheese() {
        this.pizza.parts.push("Mozzarella Cheese");
    }
    buildToppings(toppings) {
        this.pizza.parts.push(...toppings);
    }
    getPizza() {
        const result = this.pizza;
        this.reset();
        return result;
    }
}
class MargheritaPizza {
    constructor() {
        this.parts = [];
    }
    listParts() {
        console.log(`Margherita Pizza parts: ${this.parts.join(", ")}\n`);
    }
}
class PizzaDirector {
    setBuilder(builder) {
        this.builder = builder;
    }
    buildBasicPizza() {
        if (this.builder) {
            this.builder.buildDough();
            this.builder.buildSauce();
            this.builder.buildCheese();
        }
        else {
            console.error("Builder is not set.");
        }
    }
    buildFullFeaturedPizza(toppings) {
        if (this.builder) {
            this.builder.buildDough();
            this.builder.buildSauce();
            this.builder.buildCheese();
            this.builder.buildToppings(toppings);
        }
        else {
            console.error("Builder is not set.");
        }
    }
}
function clientCodePizza(director) {
    const builder = new MargheritaBuilder();
    director.setBuilder(builder);
    console.log("Basic Margherita Pizza:");
    director.buildBasicPizza();
    builder.getPizza().listParts();
    console.log("Full Featured Margherita Pizza with Toppings:");
    director.buildFullFeaturedPizza(["Pepperoni", "Mushrooms", "Bell Peppers"]);
    builder.getPizza().listParts();
    console.log("Custom Margherita Pizza with Custom Toppings:");
    builder.buildDough();
    builder.buildSauce();
    builder.buildCheese();
    builder.buildToppings(["Olives", "Onions", "Bacon"]);
    builder.getPizza().listParts();
}
const director = new PizzaDirector();
clientCodePizza(director);
