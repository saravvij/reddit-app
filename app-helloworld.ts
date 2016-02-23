import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";


@Component({
  
  selector: 'hello-world',
  template:`
    <div>
        <ul>
            <li *ngFor = "#name of names">{{ name }}</li>
        </ul>
    </div>
  `
})

class HelloWorld {
    
    names:string[];
    
    constructor(){
        this.names = ["Ari", "Jon", "Sara", "Sri"];
    }
}

bootstrap(HelloWorld);