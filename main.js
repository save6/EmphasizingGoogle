let keyword = [];

chrome.storage.sync.get("searchWordList", function(items) {
  keyword = items.searchWordList;

  if(keyword.length > 0){
    searchURL();
  }

});

function searchURL(){
   $(".g").each(function(i, o){
     for(let k of keyword){
        let reg = new RegExp(k);
        if($(o).find('a').attr('href').match(reg)){
           $(o).css('background-color','yellow');
           break;
        }
     }     
  });
}

