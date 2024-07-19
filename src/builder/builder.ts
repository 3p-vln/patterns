interface PizzaBuilder {
  buildDough(): void;
  buildSauce(): void;
  buildCheese(): void;
  buildToppings(toppings: string[]): void;
}

class MargheritaBuilder implements PizzaBuilder {
  private pizza: MargheritaPizza = new MargheritaPizza();

  public reset(): void {
    this.pizza = new MargheritaPizza();
  }

  public buildDough(): void {
    this.pizza.parts.push("Thin Crust Dough");
  }

  public buildSauce(): void {
    this.pizza.parts.push("Tomato Sauce");
  }

  public buildCheese(): void {
    this.pizza.parts.push("Mozzarella Cheese");
  }

  public buildToppings(toppings: string[]): void {
    this.pizza.parts.push(...toppings);
  }

  public getPizza(): MargheritaPizza {
    const result = this.pizza;
    this.reset();
    return result;
  }
}

class MargheritaPizza {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`Margherita Pizza parts: ${this.parts.join(", ")}\n`);
  }
}

class PizzaDirector {
  private builder: PizzaBuilder | undefined;

  public setBuilder(builder: PizzaBuilder): void {
    this.builder = builder;
  }

  public buildBasicPizza(): void {
    if (this.builder) {
      this.builder.buildDough();
      this.builder.buildSauce();
      this.builder.buildCheese();
    } else {
      console.error("Builder is not set.");
    }
  }

  public buildFullFeaturedPizza(toppings: string[]): void {
    if (this.builder) {
      this.builder.buildDough();
      this.builder.buildSauce();
      this.builder.buildCheese();
      this.builder.buildToppings(toppings);
    } else {
      console.error("Builder is not set.");
    }
  }
}

function clientCodePizza(director: PizzaDirector) {
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
