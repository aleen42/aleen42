const imageToAscii = require('image-to-ascii');
const intensity = require('@aleen42/intensity');

// The path can be either a local path or an url
imageToAscii('https://avatars.githubusercontent.com/aleen42', {
    pixels       : new Array(126).fill('').map((v, i) => String.fromCharCode(i)) // Ascii
        .filter((v, i) => i >= 32) // filter by visible
        .sort((a, b) => intensity(a) - intensity(b)) // sort by pixel intensity
        .join(''),
    size_options : {
        screen_size : {
            width : 100,
        },
        px_size     : {
            width : 16.67 / 8.8,
        },
    },
}, (err, converted) => {
    (() => {

    })()

    require('fs').writeFileSync('test.html', `<p>
    <span style="font-family: Consolas, monospace;line-height:1.140484375em;white-space: nowrap;position: relative;display: inline-block;zoom: 0.5;">
                ${merge(converted
        .replace(/\r?\n/g, '<br />')
        .replace(/\x1b\[30m(.*?)\x1b\[39m/g, '<span style="color: #073642;">$1</span>')
        .replace(/\x1b\[31m(.*?)\x1b\[39m/g, '<span style="color: #CB4B16;">$1</span>')
        .replace(/\x1b\[32m(.*?)\x1b\[39m/g, '<span style="color: #2B9A91;">$1</span>')
        .replace(/\x1b\[33m(.*?)\x1b\[39m/g, '<span style="color: #B58900;">$1</span>')
        .replace(/\x1b\[34m(.*?)\x1b\[39m/g, '<span style="color: #268BD2;">$1</span>')
        .replace(/\x1b\[35m(.*?)\x1b\[39m/g, '<span style="color: #B53576;">$1</span>')
        .replace(/\x1b\[36m(.*?)\x1b\[39m/g, '<span style="color: #2AA198;">$1</span>')
        .replace(/\x1b\[37m(.*?)\x1b\[39m/g, '<span style="color: #FFFFFF;">$1</span>')
        .replace(/\x1b\[91m(.*?)\x1b\[39m/g, '<span style="color: #CB4B16;">$1</span>')
        .replace(/\x1b\[92m(.*?)\x1b\[39m/g, '<span style="color: #586E75;">$1</span>')
        .replace(/\x1b\[93m(.*?)\x1b\[39m/g, '<span style="color: #657B83;">$1</span>')
        .replace(/\x1b\[94m(.*?)\x1b\[39m/g, '<span style="color: #1B74C9;">$1</span>')
        .replace(/\x1b\[95m(.*?)\x1b\[39m/g, '<span style="color: #B53576;">$1</span>')
        .replace(/\x1b\[96m(.*?)\x1b\[39m/g, '<span style="color: #93A1A1;">$1</span>')
        .replace(/\x1b\[97m(.*?)\x1b\[39m/g, '<span style="color: #ABABAB;">$1</span>')
    )}
</span></p>`, 'utf8');

    function merge(html) {
        let color, content = [], contents = [];
        const div = document.createElement('div');
        div.innerHTML = html;
        Array.from(div.childNodes()).forEach(s => {
            if (s.nodeName === 'SPAN') {
                if (color !== s.getAttribute('style')) {
                    content[0] && contents.push(`<span style="${color}">${content.join('')}</span>`);
                    color = s.getAttribute('style');
                    content = [];
                }
                content.push(s.innerHTML);
            } else {
                contents.push(s.outerHTML || '');
            }
        });

        content[0] && contents.push(`<span style="${color}">${content.join('')}</span>`);
        return contents.join('');
    }
});
