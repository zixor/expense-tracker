
import  uuidV4 from 'uuid/v4';
import  Dexie from 'dexie';
import { Article } from './article.model';

export class ArticleService extends Dexie {

    articles: Dexie.Table<Article,string>;

    categories = ['Comida','Licor','Other'];

    constructor(){
      //database name
      super('expense_tracker');
      this.version(1).stores({
        //Key value and index fields
         articles: 'id,date'
      });
    }

  get(articleId: string): Dexie.Promise<Article>{
    return this.articles.get(articleId);
  }

  update(article: Article){    
    this.articles.update(article.id,article);
  }

  add(article: Article){
    article.id = uuidV4();
    this.articles.add(article);
  }

  remove(articleId: string){
    this.articles.delete(articleId);
  }

  getAll(): Dexie.Promise<Article[]>{
    return this.articles.toArray();
  }
}