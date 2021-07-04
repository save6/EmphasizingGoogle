function save_options() {
    let keyword_list = [];
    const elements = document.querySelectorAll('.keyword');

    //保存するキーワードの配列作成
    for(let i = 0; i < elements.length; i++){
        if (elements[i].value != ""){

            if(validateString(elements[i].value)){
                alert("文字列「" + elements[i].value + "」の中に記号が使われています。「.&#$%@」以外の記号は検索に使えません。");
            }
            else{
                keyword_list.push(elements[i].value);
            }
        }
    }

    chrome.storage.sync.set({
      "searchWordList": keyword_list
    }, function() {
      var status = document.getElementById('status');
      status.textContent = '保存されました';
    });
}
   
function restore_options() {

    const elements = document.querySelectorAll('.keyword');
    
    chrome.storage.sync.get("searchWordList", function(items) {

        if(items.searchWordList != undefined){
            for(let i = 0; i < items.searchWordList.length; i++){
                elements[i].value = items.searchWordList[i];
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

function validateString(val) {
    var reg = new RegExp(/[!"'()\*\+\-,\/:;<=>?\[\\\]^_`{|}~]/g);
    if(reg.test(val)) {
      return true;
    }
    return false;
}
