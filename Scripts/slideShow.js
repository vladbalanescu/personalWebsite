/*------------------COPYRIGHT------------------*
* ALL RIGHTS RESERVED TO VLAD BALANESCU, 2016  *
* Personal Website                             *
* NOTICE:  All  information  contained  herein *
*          is and remains  the   property   of *
*          Vlad Balanescu.  The   intellectual *
*          and technical  concepts   contained *
*          herein  are proprietary   to   Vlad *
*          Balanescu.   Dissemination  of this *
*          information   or   reproduction  of *
*          this material is strictly forbidden *
*          unless prior written  permission is *
*          obtained    from     Vlad Balanescu.*
----------------------------------------------*/
$(document).ready(function() {
    //Global variables:
    var timeOnSlide1 = 5;
    timeBetweenSlides1 = 3;
    var timeOnSlide2 = 3;
    timeBetweenSlides2 = 1;
    animationstring = 'animation';
    animation = false;
    keyframeprefix = '';
    domPrefixes = 'Webkit Moz O Khtml'.split(' ');
    pfx = '';

    // Main slide container
    slidy = document.getElementById("slidy");
    if (slidy.style.animationName !== undefined) {
        animation = true;
    }
    if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
            if (slidy.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                pfx = domPrefixes[i];
                animationstring = pfx + 'Animation';
                keyframeprefix = '-' + pfx.toLowerCase() + '-';
                animation = true;
                break;
            }
        }
    }
    if (animation === true) {
        var images = slidy.getElementsByTagName("img"),
            firstImg = images[0],
            imgWrap = firstImg.cloneNode(false);
        slidy.appendChild(imgWrap);
        var imgCount = images.length,
            totalTime = (timeOnSlide1 + timeBetweenSlides1) * (imgCount - 1),
            slideRatio = (timeOnSlide1 / totalTime) * 100,
            moveRatio = (timeBetweenSlides1 / totalTime) * 100,
            basePercentage = 100 / imgCount,
            position = 0,
            css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML += "#slidy { text-align: left; margin: 0; font-size: 0; position: relative; width: " + (imgCount * 100) + "%; }";
        css.innerHTML += "#slidy img { float: left; width: " + basePercentage + "%; }";
        css.innerHTML += "@" + keyframeprefix + "keyframes slidy {";
        for (i = 0; i < (imgCount - 1); i++) {
            position += slideRatio;
            css.innerHTML += position + "% { left: -" + (i * 100) + "%; }";
            position += moveRatio;
            css.innerHTML += position + "% { left: -" + ((i + 1) * 100) + "%; }";
        }
        css.innerHTML += "}";
        css.innerHTML += "#slidy { left: 0%; " + keyframeprefix + "transform: translate3d(0,0,0); " + keyframeprefix + "animation: " + totalTime + "s slidy infinite; }";
        document.body.appendChild(css);
    }

    // Coding slide container
    slidy = document.getElementById("slidyC");
    if ((slidy !== null) && (slidy.style.animationName !== undefined)) {
        animation = true;
    }
    if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
            if (slidy.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                pfx = domPrefixes[i];
                animationstring = pfx + 'Animation';
                keyframeprefix = '-' + pfx.toLowerCase() + '-';
                animation = true;
                break;
            }
        }
    }
    if ((animation === true) && (slidy !== null)) {
        var images = slidy.getElementsByTagName("img"),
            firstImg = images[0],
            imgWrap = firstImg.cloneNode(false);
        slidy.appendChild(imgWrap);
        var imgCount = images.length,
            totalTime = (timeOnSlide2 + timeBetweenSlides2) * (imgCount - 1),
            slideRatio = (timeOnSlide2 / totalTime) * 100,
            moveRatio = (timeBetweenSlides2 / totalTime) * 100,
            basePercentage = 100 / imgCount,
            position = 0,
            css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML += "#slidyC { float: right; font-size: 0; position: relative; width: " + (imgCount * 100) + "%; }";
        css.innerHTML += "#slidyC img {float: right; width: " + basePercentage + "%; height: 11vw;}";
        css.innerHTML += "@" + keyframeprefix + "keyframes slidyC {";
        for (i = 0; i < (imgCount - 1); i++) {
            position += slideRatio;
            css.innerHTML += position + "% { right: -" + (i * 100) + "%; }";
            position += moveRatio;
            css.innerHTML += position + "% { right: -" + ((i + 1) * 100) + "%; }";
        }
        css.innerHTML += "}";
        css.innerHTML += "#slidyC { right: 0%; " + keyframeprefix + "transform: translate3d(0,0,0); " + keyframeprefix + "animation: " + totalTime + "s slidyC infinite; }";
        document.body.appendChild(css);
    }

    // Running slide container
    slidy = document.getElementById("slidyR");
    if ((slidy !== null) && (slidy.style.animationName !== undefined)) {
        animation = true;
    }
    if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
            if (slidy.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                pfx = domPrefixes[i];
                animationstring = pfx + 'Animation';
                keyframeprefix = '-' + pfx.toLowerCase() + '-';
                animation = true;
                break;
            }
        }
    }
    if ((slidy !== null) && (animation === true)) {
        var images = slidy.getElementsByTagName("img"),
            firstImg = images[0],
            imgWrap = firstImg.cloneNode(false);
        slidy.appendChild(imgWrap);
        var imgCount = images.length,
            totalTime = (timeOnSlide2 + timeBetweenSlides2) * (imgCount - 1),
            slideRatio = (timeOnSlide2 / totalTime) * 100,
            moveRatio = (timeBetweenSlides2 / totalTime) * 100,
            basePercentage = 100 / imgCount,
            position = 0,
            css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML += "#slidyR { float: right; font-size: 0; position: relative; width: " + (imgCount * 100) + "%; }";
        css.innerHTML += "#slidyR img {float: left; width: " + basePercentage + "%; height: 11vw; }";
        css.innerHTML += "@" + keyframeprefix + "keyframes slidyR {";
        for (i = 0; i < (imgCount - 1); i++) {
            position += slideRatio;
            css.innerHTML += position + "% { right: -" + (i * 100) + "%; }";
            position += moveRatio;
            css.innerHTML += position + "% { right: -" + ((i + 1) * 100) + "%; }";
        }
        css.innerHTML += "}";
        css.innerHTML += "#slidyR { right: 0%; " + keyframeprefix + "transform: translate3d(0,0,0); " + keyframeprefix + "animation: " + totalTime + "s slidyR infinite; }";
        document.body.appendChild(css);
    }

    // Travelling slide container
    slidy = document.getElementById("slidyT");
    if ((slidy !== null) && (slidy.style.animationName !== undefined)) {
        animation = true;
    }
    if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
            if (slidy.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                pfx = domPrefixes[i];
                animationstring = pfx + 'Animation';
                keyframeprefix = '-' + pfx.toLowerCase() + '-';
                animation = true;
                break;
            }
        }
    }
    if ((slidy !== null) && (animation === true)) {
        var images = slidy.getElementsByTagName("img"),
            firstImg = images[0],
            imgWrap = firstImg.cloneNode(false);
        slidy.appendChild(imgWrap);
        var imgCount = images.length,
            totalTime = (timeOnSlide2 + timeBetweenSlides2) * (imgCount - 1),
            slideRatio = (timeOnSlide2 / totalTime) * 100,
            moveRatio = (timeBetweenSlides2 / totalTime) * 100,
            basePercentage = 100 / imgCount,
            position = 0,
            css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML += "#slidyT { float: right; font-size: 0; position: relative; width: " + (imgCount * 100) + "%; }";
        css.innerHTML += "#slidyT img {float: left; width: " + basePercentage + "%; height: 11vw; }";
        css.innerHTML += "@" + keyframeprefix + "keyframes slidyT {";
        for (i = 0; i < (imgCount - 1); i++) {
            position += slideRatio;
            css.innerHTML += position + "% { right: -" + (i * 100) + "%; }";
            position += moveRatio;
            css.innerHTML += position + "% { right: -" + ((i + 1) * 100) + "%; }";
        }
        css.innerHTML += "}";
        css.innerHTML += "#slidyT { right: 0%; " + keyframeprefix + "transform: translate3d(0,0,0); " + keyframeprefix + "animation: " + totalTime + "s slidyT infinite; }";
        document.body.appendChild(css);
    }

    // Volunteering slide container
    slidy = document.getElementById("slidyV");
    if ((slidy !== null) && (slidy.style.animationName !== undefined)) {
        animation = true;
    }
    if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
            if (slidy.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                pfx = domPrefixes[i];
                animationstring = pfx + 'Animation';
                keyframeprefix = '-' + pfx.toLowerCase() + '-';
                animation = true;
                break;
            }
        }
    }
    if ((slidy !== null) && (animation === true)) {
        var images = slidy.getElementsByTagName("img"),
            firstImg = images[0],
            imgWrap = firstImg.cloneNode(false);
        slidy.appendChild(imgWrap);
        var imgCount = images.length,
            totalTime = (timeOnSlide2 + timeBetweenSlides2) * (imgCount - 1),
            slideRatio = (timeOnSlide2 / totalTime) * 100,
            moveRatio = (timeBetweenSlides2 / totalTime) * 100,
            basePercentage = 100 / imgCount,
            position = 0,
            css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML += "#slidyV {float: right; font-size: 0; position: relative; width: " + (imgCount * 100) + "%; }";
        css.innerHTML += "#slidyV img {float: left; width: " + basePercentage + "%; height: 11vw; }";
        css.innerHTML += "@" + keyframeprefix + "keyframes slidyV {";
        for (i = 0; i < (imgCount - 1); i++) {
            position += slideRatio;
            css.innerHTML += position + "% { right: -" + (i * 100) + "%; }";
            position += moveRatio;
            css.innerHTML += position + "% { right: -" + ((i + 1) * 100) + "%; }";
        }
        css.innerHTML += "}";
        css.innerHTML += "#slidyV { right: 0%; " + keyframeprefix + "transform: translate3d(0,0,0); " + keyframeprefix + "animation: " + totalTime + "s slidyV infinite; }";
        document.body.appendChild(css);
    }
});
