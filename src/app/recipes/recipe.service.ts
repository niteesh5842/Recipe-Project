import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Paneer Pizza',
  //     'Spicy: I am loving it!!!',
  //     'https://www.simplyrecipes.com/thmb/JM-orIwOXTKXsUodT8gToU06w40=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-LEAD-3-8aa37af554cf4445a1e3e54fdc66e974.jpg',
  //     [new Ingredient('Paneer', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'A Veg Burger',
  //     'Delicious: What else do we need!!',
  //     'https://www.simplyrecipes.com/thmb/zoXdwqf9fbB2fu0CRvgV9PBh6kA=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Gluten-Free-Eggplant-Parm-LEAD-1-b7b72a7dedd7481aaae2fec98eccc85b.jpg',
  //     [new Ingredient('Mushroom', 10), new Ingredient('Buns', 2)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
