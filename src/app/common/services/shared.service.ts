import { Injectable, OnInit } from "@angular/core";

declare var $: any;

@Injectable({
    providedIn: 'root',
})

export class SharedService implements OnInit {
    ngOnInit(): void {

    }
    
    getTableMaxHeight(val:any = 0){
        let output = 0;
        const wh:any = $(window).height();
        let removeHeight = 0;
        removeHeight = 344 + val;
        output = wh - removeHeight;
        if(output < 300){
            output = 300;
        }
        return output;
    }
}