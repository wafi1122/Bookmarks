const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainers = document.getElementById('bookmarks-container');

let bookmarks = [];
// show modal focus on inputs
function showModal(){
    modal.classList.add("show-modal");
    websiteNameEl.focus();
}

// modal event listeners
modalShow.addEventListener('click',showModal);
modalClose.addEventListener('click' , () => modal.classList.remove('show-modal'))
window.addEventListener('click', (e)=> (e.target === modal ? modal.classList.remove('show-modal'):false));
 
// validate form
function validate(nameValue,urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!nameValue || !urlValue){
        alert('please submit a both fields.')
        return false;
    }
    
    if(!urlValue.match(regex)){
        alert('please provide a valid web address');
        return false;
    }
    //valid
    return true;
}

//build bookmarks DOM
function buildBookmarks(){
    // build items
    bookmarks.forEach((bookmark) => {
        const {name,url} = bookmark;
        //item
        const item = document.createElement('div');
        item.classList.add('item');
        //close icon
        const closeIcon = document.createElement('i')
        closeIcon.classList.add('fas','fa-solid');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.addEventListener('click', () => deleteBookmark(url));
        //favicon / link container
        const linkInfo =document.createElement('div');
        linkInfo.classList.add('name');
        //favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src' ,`https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt','favicon');
        // link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target','_blank');
        link.textContent = name;
        //append bookmarks to the container
        linkInfo.append(favicon,link);
        item.append(closeIcon,linkInfo);
        bookmarksContainers.appendChild(item);
         

    });
}



// fetch bookmarks from localstorage
    function fetchBookmarks(){
        //get bookmarks from local storage if avaiable
        if(localStorage.getItem('bookmarks')){
            bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        }else{
            bookmarks = [
                {
                    name:'jacinto Design',
                    url :'https://jacinto.design',
                },
            ];
            localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        }
        buildBookmarks();
    }
// handle data from form
function storeBookmark(e){
    e.preventDefault(); // use to cancel the submit to server
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if ( !urlValue.startsWith('http://') && !urlValue.startsWith('https://')){
        urlValue = `https://${urlValue}`;
    }
   
    if(!validate(nameValue,urlValue)){
        return false;
    }
    const bookmark = {
        name : nameValue,
        url:urlValue,
    };
    bookmarks.push(bookmark);
    
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();




}
// event Listener
bookmarkForm.addEventListener('submit',storeBookmark);

fetchBookmarks();