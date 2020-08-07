jQuery(document).ready(function($) {
    
    const searchContainer = $('#searchContainer');
    const searchIcon = $('#searchIcon');
    const searchInputContainer = $('#searchInputContainer');
    const searchInput = $('#searchInput');
    const movieList = $('#movie-list');
    const source = $('#movie-template').html();
    var template = Handlebars.compile(source);

    const filmUrlHome = "https://api.themoviedb.org/3/discover/movie?api_key=1f8e3ba9ab80df0fb50bca64de0dc2cc";
    const tvUrlHome = "https://api.themoviedb.org/3/discover/tv?api_key=1f8e3ba9ab80df0fb50bca64de0dc2cc";

    searchIcon.click(() => {
        searchContainer.slideToggle();
        if ( searchIcon.hasClass('fa-search') ) {
            searchIcon.fadeOut().removeClass('fa-search').addClass('fa-times').fadeIn();
        } else if ( searchIcon.hasClass('fa-times') ) {
            searchIcon.fadeOut().removeClass('fa-times').addClass('fa-search').fadeIn();
        }
    })

    searchInput.click( () => {
        searchInputContainer.addClass('search_active');
    })

    ajaxHome(filmUrlHome, template, movieList, 'Film');
    ajaxHome(tvUrlHome, template, movieList, 'Tv');
    
    searchInput.keyup( function(e) {
        let inputText = searchInput.val();
        if ( !inputText == '' ) {
            ajaxContainer(inputText, template, movieList);
        } else if( inputText == '' || inputText == ' '){
            ajaxHome(filmUrlHome, template, movieList, 'Film');
            ajaxHome(tvUrlHome, template, movieList, 'Tv');
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

    ajaxSearch(searchText, template, movieList, filmUrl, 'Film');
    ajaxSearch(searchText, template, movieList, tvUrl, 'Tv');
}
function ajaxSearch(searchText, template, movieList, url, type) {  
    $.ajax({
        url,
        metod: 'GET',
        data: {
            query: searchText,
            language: "it-IT"
        }
    }).done(function(res) {
        var listObj = res.results;
        print(listObj, template, movieList, type);

        if ( listObj.length === 0 ) {
            alert('non vi sono film o tv disponibili');
        }
    })
}
function ajaxHome(url, template, movieList, type) {  
    $.ajax({
        url,
        metod: 'GET'
    }).done(function(res) {
        var listObj = res.results;
        print(listObj, template, movieList, type);
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
                type,
                overview: listObj[key].overview.substring(0, 100) + '...'
            }

            var html = template(movie);
            movieList.append(html).fadeIn('slow');
        }
    }
}
function starVote( listObj, key ) {
    var num = Math.round( listObj[key].vote_average / 2);
    var star = '';

    for ( var i = 1; i <= 5; i++ ) {
        if ( i < num ) {
            star += '<i class="fas fa-star star-color"></i>'; 
        } else {
            star += '<i class="far fa-star star-color"></i>';
        }
    }

    return star;
}
function fleg( listObj, key ) {
    var language = listObj[key].original_language;

    if ( ( language === "it" ) || ( language === "en" ) ) {
        return '<img src="img/' + language + '.svg" alt="italy" class="flag">';
    } else {
        return language;
    }
}