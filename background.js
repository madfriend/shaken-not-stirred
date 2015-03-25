$(document).ready(function() {

    // no matter how you call shit, it's still shit..
    var bad_words = [
        'mix', 'bootleg', 'rmx',
        'edit', 'twerk', 'refix',
        'bootup', 're-rub', 'club', 'rework',
        're boot', 'bass', 'retwerk',
        'mush', 'remaster', 'mash', 'vocal',
        'boosted', 'version', 'обрезка', 'нарезка',
        'concept', 'reboot', 'dj'];

    // string helpers
    var contains = function(str1, str2) {
        return str1.indexOf(str2) !== -1;
    };

    var contains_any = function(str, words) {
        for (i in words) {
            if (contains(str, words[i])) return true;
        }
        return false;
    };

    var input = $('input#s_search').length? $('input#s_search') : $('input#search_query');

    var searching_for_remixes = false;
    searching_for_remixes = contains_any(input.val().toLowerCase(), bad_words);

    // whenever user updates the search term, update
    // searching_for_remix varible
    // keyup event might be really slow, but it is used by VK scripts, workarounds are:
    // - 'change' event (would trigger on Enter, which might be never pressed)
    // - throttling the 'keyup' handler, which might still allow remixes to sneak in from time to time
    input.on('keyup', function() {
        searching_for_remixes = contains_any($(this).val()
            .toLowerCase(), bad_words);
        console.log("searching for crazy shit? ", searching_for_remixes);
    });

    // whenever the list of audios updates, we traverse the inserted nodes
    // and delete remixes if necessary
    var track_handler = function(element) {

        // should we even look at this element?
        if (searching_for_remixes) return false;
        var target = $(element);
        if (!target.is("div.audio")) return false;

        // okay, grabbing the artist and title..
        artist = target.find('.title_wrap').find('a').first().text();
        title = target.find('span.title').first().text();

        if (contains_any(artist.toLowerCase(), bad_words) ||
            contains_any(title.toLowerCase(), bad_words)) {
            console.log(artist, title, ' is a fucking remix! gosh!');
            target.remove();
        }
    };

    // main playlist
    $('#audios_list').on('DOMNodeInserted', function(e) {
        return track_handler(e.target);
    });

    // playlist in the header (added dynamically)
    $('body').on('DOMNodeInserted', '#pad_playlist_panel', function(e) {
        return track_handler(e.target);
    });

    // server-generated playlist
    $("#results.audio_results").children('div.audio').each(function(index, el) {
        return track_handler(el);
    });
});