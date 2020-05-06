jQuery(document).ready(function($) {
    var inputSearch = $('.input-search');
    var btnSearch = $('.btn-search');
    var movieList = $('#movie-list');
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);
    
    btnSearch.click(function () { 
        var searchText = inputSearch.val().trim().toLowerCase();      
        if (searchText !== '') {
            ajaxContainer(searchText, template, movieList); 
        } else {
            alert('Perfavore, inserisci il titolo del film');
            inputSearch.focus().select();
        }
    });

    inputSearch.keypress(function (e) { 
        if (e.which === 13 ) {
            var searchText = inputSearch.val().trim().toLowerCase();      
            if (searchText !== '') {
                ajaxContainer(searchText, template, movieList); 
            } else {
                alert('Perfavore, inserisci il titolo del film');
                inputSearch.focus().select();
            } 
        }
    });

}); // End Script

//_____________________FUNCTION______________________//
function reset(element) {
    element.html('');
}
function ajaxContainer (searchText, template, movieList) {
    reset(movieList);
    var filmUrl = "https://api.themoviedb.org/3/search/movie?api_key=1f8e3ba9ab80df0fb50bca64de0dc2cc";
    var tvUrl = "https://api.themoviedb.org/3/search/tv?api_key=1f8e3ba9ab80df0fb50bca64de0dc2cc";

    ajax(searchText, template, movieList, filmUrl, 'Film');
    ajax(searchText, template, movieList, tvUrl, 'Tv');
}
function ajax(searchText, template, movieList, url, type) {  
    $.ajax({
        url,
        metod: 'GET',
        data: {
            query: searchText,
            language: "it-IT"
        },
        success: function(res) {
            var listObj = res.results;
            print(listObj, template, movieList, type);
        },
        error: function() {
            alert('Ops, si è verificato un errore, la pregiamo di riprovare più tardi');
        }
    });
}
function print(listObj, template, movieList, type) {
    if( listObj.length > 0 ) {

        var title, originalTitle;

        for( var key in listObj ) {

            if (type === 'Film') {
                title = listObj[key].title;
                originalTitle = listObj[key].original_title;
            } else if ( type === 'Tv' ) {
                title = listObj[key].name;
                originalTitle = listObj[key].original_name;
            }

            if (!!listObj[key].poster_path) {
                poster = '<img src="https://image.tmdb.org/t/p/w342'+ listObj[key].poster_path + '" alt="'+ title +'" >';
            } else {
                poster = '<img src="img/no-poster.png" alt="#">'
            }

            var movie = {
                poster,
                title,
                originalTitle,
                originalLanguage: fleg(listObj, key),
                vote: starVote(listObj, key),
                type
            }

            var html = template(movie);
            movieList.append(html);
        }
    }
}
function starVote(listObj, key) {
    var num = Math.round( listObj[key].vote_average / 2);
    var difference = 5 - num;
    var star = '';
    
    if ( num === 0 ) {
        for ( var i = 0; i < 5; i++) {
            star += '<i class="far fa-star"></i>';
        }
        return star;  
    } else if ( num !== 0 ) {
        for (var i = 0; i < num; i++) {
            star += '<i class="fas fa-star"></i>';  
        }
        for (var i = 0; i < difference; i++) {
            star += '<i class="far fa-star"></i>';
        }
        return star;
    }
}
function fleg(listObj, key) {
    var language = listObj[key].original_language;
    if ( language === "it" ) {
        return '<img src="img/it.svg" alt="italy" width="20" height="20">';
    } else if ( language === "en" ) {
        return '<img src="img/en.svg" alt="england" width="20" height="20">';
    } else {
        return language;
    }
}