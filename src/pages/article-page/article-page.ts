import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';


import { Article } from '../../app/article.model';
import { ArticleService } from '../../app/article.service';



@Component({
  selector: 'page-article-page',
  templateUrl: 'article-page.html',
})
export class ArticlePage {

  private article: Article;
  private categories: string[];
 

  constructor(private navCtrl: NavController,
              private navParms: NavParams,
              private articleService: ArticleService,
              private alertCtrl: AlertController) {
    this.categories = articleService.categories;

    this.article = {     
        name:"",
        category: "",
        description:"",
        expiration_date: "",
        sale_price: 0
    };

    const articleId = navParms.get('articleId');
    if(articleId){   
      articleService.get(articleId)
      .then(article => this.article = article);    
    }
    
  }

  onSave(){
    if(this.article.id){
      this.articleService.update(this.article);
    }else{
       console.log(this.article);
      this.articleService.add(this.article);
    }
    this.navCtrl.pop();
  }

  onTrash(){
     let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: `Seguro que desea eleminar este artículo: "${this.article.name}"?`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {        
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.articleService.remove(this.article.id);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
