import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";

class Article {
    
    title: string;
    link: string;
    votes: number;
    
    constructor(title: string, link: string, votes?: number){
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }
    
    voteUp(): void {
        this.votes += 1;
    }
    
    voteDown(): void {
        this.votes -= 1;
    }
    
}

@Component({
    selector:'reddit-article',
    host:{
        class:'row'
    },
    inputs: ['article'],
    template:`
        <div class="four wide column center aligned votes">
          <div class="ui statistic">
            <div class="value">
                {{ article.votes }}
            </div>
            <div class="label">
                Points
            </div>
          </div>
        </div>
        
        <div class="twelve wide column">
            <a class="ui large header" href="{{ article.link }}">
                {{ article.title }}
            </a>
            <ul class="ui big horizontal list voters">
                <li class="item">
                    <a href (click)="voteUp()">
                        <i class="arrow up icon">Upvote</i>
                    </a>
                </li>
                <li class="item">
                    <a href (click)="voteDown()">
                        <i class="arrow down icon">Downvote</i>
                    </a>
                </li>
            </ul>
            
        </div>
        
        
    `
})

class ArticleComponent{
    
    article: Article;
    
    constructor(){
    }
    
    voteDown(): boolean {
        this.article.voteDown();
        return false;
    }
    
    voteUp(): boolean {
        this.article.voteUp();
        return false;
    }
    
}


@Component({
    selector:"reddit",
    directives:[ArticleComponent],
    template:`
        <form class="ui large form segment">
            <h3 class="ui header">Add a Link</h3>
            <div class="field">
                <label for="title">Title:</label>
                <input name="title" #newTitle/>
            </div>
            <div class="field">
                <label for="link">Link:</label>
                <input name="link" #newLink/>
            </div>   
            <button (click)="addArticle(newTitle, newLink)" class="ui positive right floated button">
                Submit Link
            </button>
            
            <div class="ui grid posts">
                <reddit-article 
                    *ngFor = "#article of articles"
                    [article] = "article" >
                </reddit-article>
            </div>
        </form>
    `
})

class RedditApp{
    
    articles: Article[];
    
    constructor(){
        this.articles = [
                new Article("ms", "http://www.google.com", 10),
                new Article("google", "http://www.google.com", 5),
                new Article("fb", "http://www.facebook.com", 4),
                new Article("apple", "http://www.apple.com", 8)
            ];
    }
    
    addArticle(title:HTMLInputElement, link:HTMLInputElement) : void {
        console.log(`Adding article title ${title.value} and link as ${link.value}`);
        this.articles.push(new Article(title.value, link.value, 0));
        title.value = '';
        link.value = '';
    }
}

bootstrap(RedditApp);






