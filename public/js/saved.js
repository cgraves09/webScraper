$(document).ready(() => {
    $('#noArticles').hide(); 
    const savedArticles = article => {
        $.getJSON("/saved", function(article) {
            article.forEach((item) => {
                let card = $('<div class="card mb-3">');
                let divRow = $('<div class="row no-gutters">');
                let divColFour = $('<div class="col-md-4">')
                let divCol = $(`<div data-id="${item._id}" class="col-md-8">`);
                let title = $(`<h2 id="title">${item.title}</h2>`);
                let category = $(`<h3 class="category">${item.category}</3>`);
                let link = $(`<a href="${item.link}"><button class="btn btn-primary" id="link">View Article</button></a>`);
                let image = item.image;
                let deleteBtn = $(`<button data-id="${item._id}" class="btn btn-danger deleteArticle">Delete This Article</button>`);
                divColFour.css('background-image', image);
                divCol.append(category,title,link,deleteBtn);
                divRow.append(divColFour,divCol);
                card.append(divRow);
                $('#results').append(card);
            });
            checker();
            $('.deleteArticle').on('click', function(e) {
                e.preventDefault();
                $(this).parents().eq(2).remove();
                let id = $(this).data('id');
                $.ajax({
                    method: 'DELETE',
                    url: `/delete/${id}`
                }).then(data => {checker()}).catch(err => {if (err) throw err;});
            });
        });
    };
    const checker = () => {
       let title = $('.mb-3').html();
        if(!title){
            $('#noArticles').show(); 
        }else {
            $('#noArticles').hide();  
        } 
    }
    savedArticles();
});