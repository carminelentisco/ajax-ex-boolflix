jQuery(document).ready(function($) {
    var inputSearch = $('.input-search');
    var btnSearch = $('.btn-search');
    var movieList = $('#movie-list');
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);
    
    btnSearch.click(function () { 
       var searchText = inputSearch.val();
       inputSearch.val(' ');
       
       $.ajax({
           url: "https://api.themoviedb.org/3/search/movie?api_key=1f8e3ba9ab80df0fb50bca64de0dc2cc",
           method: 'GET',
           data: {
               query: searchText,
               language: "it-IT"
           },
           success: function (res) {
                var movieListObj = res.results;
                
                for( var key in movieListObj ) {
                    var movie = {
                        title: movieListObj[key].title,
                        originalTitle: movieListObj[key].original_title,
                        originalLanguage: movieListObj[key].original_language,
                        vote: movieListObj[key].vote_average
                    }

                    var html = template(movie);
                    movieList.append(html);
                }
            },
            error: function () {
                error('Ops, si è verificato un errore, la pregiamo di riprovare più tardi');
                alert('Ops, si è verificato un errore, la pregiamo di riprovare più tardi');
            }
       });

    });

}); // End Script'