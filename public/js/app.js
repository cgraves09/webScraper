$(document).ready(() => {
    $('#noArticles').hide();
   const dbArticles = () => { 
                
        $.getJSON("/articles", function(article) {
            displayArticles(article);
            checker();
            $(`.saveArticle`).on('click', function(e) {
                e.preventDefault();
                let id = $(this).data('id');
                let title = $(this).data('title');
                let category = $(this).data('category');
                let link = $(this).data('link');
                let image = $(this).data('image');
                let div = $(this).parents().eq(2);
                $(div).remove();
                $.ajax({
                    method: 'POST',
                    url: '/saved',
                    data: {
                        title: title,
                        category: category,
                        link: link,
                        image: image
                    }
                }).then(data => {
                    $.ajax({
                        method: 'DELETE',
                        url: `/deleteArticle/${id}`
                    }).then(data => {console.log('Deleted')}).catch(err => {if (err) throw err;});                     
                    console.log('Saved Successful');
                    checker();
                }).catch(err => {
                    console.log(err);
                });    
            }); 
        });        
    };
    $('#scrape').click(e => {
        e.preventDefault();
        $('#noArticles').hide();
        $.ajax({
            method: 'GET',
            url: '/scraped',
        }).then(data => {
            dbArticles();
        }).catch(err => {
            console.log(err);
        })
    });

    const displayArticles = article => {
        
        article.forEach((item) => {
            let card = $('<div class="card mb-3">');
            let divRow = $('<div class="row no-gutters">');
            let divColFour = $('<div class="col-md-4">')
            let divCol = $(`<div data-id="${item._id}" class="col-md-8">`);
            let title = $(`<h2 class="title">${item.title}</h2>`);
            let category = $(`<h3 class="category">${item.category}</3>`)
            let link = $(`<a href="${item.link}"><button class="btn btn-primary" class="link">View Article</button></a>`);
            let image = item.image;
            let saveBtn = $(`<button class="btn btn-danger saveArticle" data-id="${item._id}"
            data-title="${item.title}" data-category="${item.category}" 
            data-link="${item.link}" data-image="${item.image}">Save Article</button>`);
            divColFour.css('background-image', image);
            divCol.append(category,title,link,saveBtn);
            divRow.append(divColFour,divCol);
            card.append(divRow);
            $('#results').prepend(card);
        });     
    }
    const checker = () => {
       let title = $('.mb-3').html();
        if(!title){
            $('#noArticles').show(); 
        } 
    }

    dbArticles();   
    
})

