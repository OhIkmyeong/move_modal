export class Include{
    async init(){
        const $$dom = document.querySelectorAll('[data-include]');
        for(let $dom of $$dom){
            const data = await this.fetch_html($dom);
            $dom.innerHTML = data;
            $dom.removeAttribute('data-include');
        }//for
    }//init

    fetch_html($dom){
        const url = $dom.dataset.include;
        return fetch(url).then(res=>res.text());
    }//fetch_html
}//class-Include