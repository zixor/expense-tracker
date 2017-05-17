import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { Article } from "../../app/article.model";
import { ArticleService } from "../../app/article.service";
import { Login }  from "../login/login";
import { ArticlePage } from "../article-page/article-page"

@Component({
  selector: 'page-list-article',
  templateUrl: 'list-article.html',
})
export class ListArticle {

  private articles: Article[];

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private articleService: ArticleService) {}

  ionViewWillEnter(){
    if(!this.isUserAlreadyLoggedIn()) {
            this.navCtrl.push(Login);
      }else{
            this.articleService.getAll()
                .then( articles => this.articles = articles );
    }
  }

  onItemClick(expense){
      console.log(expense);
      this.navCtrl.push(ArticlePage,{
        expenseId: expense.id
      });
  }

  onAddClick(){
    this.navCtrl.push(ArticlePage);
  }

  isUserAlreadyLoggedIn(){
    let user = window.localStorage.getItem('userProfile');
    return user !== null;
  }

}
