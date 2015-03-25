# Shaken, not stirred (0.1)

This chrome extension for VK removes audio tracks which are considered remixes (unless you really searched for them).

Tracks with these words in either artist or title field are not shown:
```
	'mix', 'bootleg', 'rmx',
    'edit', 'twerk', 'refix',
    'bootup', 're-rub', 'club', 'rework',
    're boot', 'bass', 'retwerk',
	'mush', 'remaster', 'mash', 'vocal',
	'boosted', 'version', 'обрезка', 'нарезка',
	'concept', 'reboot', 'dj'
```

Once you enter one of these terms in the search field, filtering is disabled for all terms.

Some debugging output can be found in the console.

## Future work

- use vanilla JS instead of jQuery
- add extension icon (click on which should toggle the filtering)
- make this extension an all-purpose sanitizer: e.g. some titles definitely need to be cleared of links, years, etc)
