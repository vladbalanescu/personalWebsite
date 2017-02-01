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
// Initialize arrays and initial index
var slideIndex = 1;
var imagesArray = document.getElementsByClassName("galleryPic");
var dotsArray = document.getElementsByClassName("dot");

// Add the dots to DOM
for (i = 1; i <= imagesArray.length; i++) {
    var dot = document.createElement("div");
    dot.className = "dot";
    dot.setAttribute('onClick', 'showDivs(' + i + ')');
    document.getElementById("dotsArea").appendChild(dot);
}

// Initial state
showDivs(slideIndex);

// Go to next image
function plusDivs(n) {
    showDivs(slideIndex += n);
}

// Main function - show the image and the dots
function showDivs(n) {
    slideIndex = n;
    // Reset the index when reached the end of array
    if (n > imagesArray.length) {
        slideIndex = 1
    } else if (n < 1) {
        slideIndex = imagesArray.length
    }

    // Display/hide the image and the corresponding dot
    for (var i = 0; i < imagesArray.length; i++) {

        //Remove all the full images in dot area
        if (dotsArray[i].childNodes[0] !== undefined) {
            dotsArray[i].removeChild(dotsArray[i].childNodes[0]);
        }

        //Current dot
        if (i === slideIndex - 1) {
            imagesArray[i].style.display = "block";
            //Full circle image
            var imgFull = document.createElement("img");
            imgFull.className = "dotCurrent";
            imgFull.src = "./Multimedia/Full.png";
            dotsArray[i].appendChild(imgFull);

        } else {
            //Non-current dots
            imagesArray[i].style.display = "none";
            //Empty circle image
            var imgEmpty = document.createElement("img");
            imgEmpty.className = "dotImg";
            imgEmpty.src = "./Multimedia/Empty.png";
            dotsArray[i].appendChild(imgEmpty);
        }
    }
}
