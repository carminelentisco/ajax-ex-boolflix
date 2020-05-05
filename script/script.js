jQuery(document).ready(function($) {
    var inputSearch = $('.input-search');
    var btnSearch = $('.btn-search');
    var movieList = $('#movie-list');
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);
    
    btnSearch.click(function () { 
        var searchText = inputSearch.val().trim().toLowerCase();      
        if (searchText !== '') {
            console.clear();
            reset(movieList);
            ajaxMovie(searchText, template, movieList);
            ajaxTv(searchText, template, movieList);
        } else {
            alert('Perfavore, inserisci il titolo del film');
            console.error('Non è stato inserito nessun titolo');
            inputSearch.focus().select();
        }
    });

}); // End Script

//_____________________FUNCTION______________________//
function reset(element) {
    element.html('');
}

function ajaxMovie(searchText, template, movieList) {
    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie?api_key=1f8e3ba9ab80df0fb50bca64de0dc2cc",
        method: 'GET',
        data: {
            query: searchText,
            language: "it-IT"
        },
        success: function (res) {
            var movieListObj = res.results;        
            moviePrint(movieListObj, template, movieList);
        },
        error: function () {
            error('Ops, si è verificato un errore, la pregiamo di riprovare più tardi');
            alert('Ops, si è verificato un errore, la pregiamo di riprovare più tardi');
        }
    });
}

function ajaxTv (searchText, template, movieList) {
    $.ajax({
        url: "https://api.themoviedb.org/3/search/tv?api_key=1f8e3ba9ab80df0fb50bca64de0dc2cc",
        metod: 'GET',
        data: {
            query: searchText,
            language: "it-IT"
        },
        success: function(res) {
            var tvListObj = res.results;
            tvPrint(tvListObj, template, movieList);
        },
        error: function() {
            error('Ops, si è verificato un errore, la pregiamo di riprovare più tardi');
            alert('Ops, si è verificato un errore, la pregiamo di riprovare più tardi');
        }
    });
}

function moviePrint(movieListObj, template, movieList) {
    if( movieListObj.length > 0 ) {
        for( var key in movieListObj ) {
            var movie = {
                title: movieListObj[key].title,
                originalTitle: movieListObj[key].original_title,
                originalLanguage: fleg(movieListObj, key),
                vote: starVote(movieListObj, key),
                type: "Film"
            }

            var html = template(movie);
            movieList.append(html);
        }
    }
}

function tvPrint(tvListObj, template, movieList) {
    if( tvListObj.length > 0 ) {
        for( var key in tvListObj ) {
            var tv = {
                title: tvListObj[key].name,
                originalTitle: tvListObj[key].original_name,
                originalLanguage: fleg(tvListObj, key),
                vote: starVote(tvListObj, key),
                type: "TV"
            }

            var html = template(tv);
            movieList.append(html);
        }
    }
}

function starVote(movieListObj, key) {
    var num = Math.round( movieListObj[key].vote_average / 2);
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

function fleg(movieListObj, key) {
    var language = movieListObj[key].original_language;
    if ( language === "it" ) {
        return '<img src="img/it.svg" alt="italy" width="20" height="20">';
    } else if ( language === "en" ) {
        return '<img src="img/en.svg" alt="england" width="20" height="20">';
    } else {
        return language;
    }
}