var fade = document.querySelector('.fade');
var topNav = document.querySelector('.top');
var title = document.querySelector('.title');
var buttons = document.querySelector('.buttons');
var icons = Array.prototype.slice.call(document.querySelectorAll('.icon'));
var article = document.querySelector('.main-content');
var image = document.querySelector('.splash');
var aquarelle = new Aquarelle(image, 'img/mask.png', {
    autoplay: true,
    loop: false
});

var thecanvas = null;
var blursCountMax = 10;
var blursCountNow = 0;

// 3 blurs was too much, perhaps these values would decrease blur amount by 100.
THREE.HorizontalBlurShader.uniforms.h.value = THREE.HorizontalBlurShader.uniforms.h.value / 2;
THREE.VerticalBlurShader.uniforms.v.value = THREE.VerticalBlurShader.uniforms.v.value / 2;

aquarelle.addEventListener('created', function() {
    // replace image with canvas.
    thecanvas = this.getCanvas();
    thecanvas.removeAttribute('style');
    //thecanvas.classList.add('slow-blur');
    image.parentNode.insertBefore(thecanvas, image.nextSibling);
    image.parentNode.removeChild(image);
});

aquarelle.addEventListener('changed', function(event) {
    //fade.style.opacity = this.transitionInRange(1, 0, 7183, 7933);
    fade.style.opacity = 1;

    topNav.style.opacity = this.transitionInRange(0, 1, 4330, 5660);

    var composer = aquarelle.getComposer();
    var blurs = this.transitionInRange(0, blursCountMax, 3000);
    if (blursCountNow < blursCountMax && blursCountNow < blurs) { // add one 
    	composer.passes[composer.passes.length - 1].renderToScreen = false;
    	blursCountNow++;
	composer.addPass( new THREE.ShaderPass( THREE.HorizontalBlurShader ) );
	var vblur = new THREE.ShaderPass( THREE.VerticalBlurShader );
	vblur.renderToScreen = true;
	composer.addPass( vblur );
    }
    
    //thecanvas.style.webkitFilter = 'blur(' + this.transitionInRange(0, 17, 3000) + 'px)';
    thecanvas.style.webkitTransform = thecanvas.style.transform = 'scale(' + this.transitionInRange(.75, 1) + ')';

    title.style.opacity = this.transitionInRange(0, 1, 0, 2016);
    title.style.webkitTransform = title.style.transform = 'scale(' + this.transitionInRange(.8, 1, 0, 5883) + ')';

    icons.forEach(function(icon) {
        icon.style.webkitFilter = 'blur(' + event.target.transitionInRange(4, 0, 3433, 4149) + 'px)';
        icon.style.opacity = event.target.transitionInRange(0, 1, 3433, 4266);
        icon.style.webkitTransform = icon.style.transform = 'scale(' + event.target.transitionInRange(1.3, 1, 3433, 4400) + ')';
    });
});

aquarelle.addEventListener('completed', function(event) {
    thecanvas = null;
    aquarelle = null;
})


smoothScroll.init();

var lazeLoad = false;

if (lazeLoad) {
    window.lazySizesConfig = {
        addClasses: true
    };

    new LazyLoad({
        data_src: 'src',
        data_srcset: 'srcset'
    });
}