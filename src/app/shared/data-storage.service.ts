import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map, tap, take, exhaustMap} from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment'
// Fix ENV //

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put(environment.API, recipes).subscribe(
            response => console.log(response)
        )
    }

    fetchRecipes(){
       return this.http.get<Recipe[]>(environment.API,
           ).pipe(map(
            recipes =>  {
                return recipes.map(recipes =>{
                    return {...recipes, ingredients: recipes.ingredients ? recipes.ingredients : []}
                })
            }
        ), tap(
            recipes =>
            this.recipeService.setRecipes(recipes)
        ))
    }
}
