const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    maxIndex: 1345
};
const images = [];
let imagesLoaded = 0;

function preloadImages() {
    for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `Canvas/compressed_images/frame_${i.toString().padStart(4, "0")}.jpg`;
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === frames.maxIndex) {
                loadImage(frames.currentIndex);  // Ensure initial image loads
                startAnimation();
            }
        };

        img.onerror = () => {
            console.error(`Image ${imageUrl} failed to load.`);
        };

        images.push(img);
    }
}

function loadImage(index) {
    if (index >= 0 && index < frames.maxIndex) {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentIndex = index;
    }
}

function startAnimation() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            scrub: 2,
            end: "bottom bottom"
        }
    });

    function updateFrame(index) {
        return {
            currentIndex: index,
            ease: "linear",
            onUpdate: function () {
                loadImage(Math.floor(frames.currentIndex));
            }
        };
    }

    tl.to(frames, updateFrame(90), "first")
        .to(".animate1", { opacity: 0, ease: "linear" }, "first")


        .to(frames, updateFrame(180), "second")
        .to(".animate2", { opacity: 1, ease: "linear" }, "second")

        .to(frames, updateFrame(270), "third")
        .to(".animate2", { opacity: 1, ease: "linear" }, "third")

        .to(frames, updateFrame(360), "fourth")
        .to(".animate2", { opacity: 0, ease: "linear" }, "fourth")

        .to(frames, updateFrame(450), "fifth")
        .to(".animate3", { opacity: 1, ease: "linear" }, "fifth")

        .to(frames, updateFrame(540), "sixth")
        .to(".animate3", { opacity: 1, ease: "linear" }, "sixth")

        .to(frames, updateFrame(630), "seventh")
        .to(".animate3", { opacity: 0, ease: "linear" }, "seventh")

        .to(frames, updateFrame(720), "eighth")
        .to(".panel", { x: "0%", ease: "expo" }, "eighth")

        .to(frames, updateFrame(810), "nineth")
        .to(".panel", { x: "0%", ease: "linear" }, "nineth")

        .to(frames, updateFrame(900), "tenth")
        .to(".panel", { opacity: 0, ease: "linear" }, "tenth")

        .to(frames, updateFrame(990), "eleventh")
        .to("canvas", { scale: 0.5, ease: "linear" }, "eleventh")

        .to(frames, updateFrame(1080), "twelvth")
        .to(".panelism", { opacity: 1, ease: "expo" }, "twelvth")

        .to(frames, updateFrame(1170), "twelvth")
        .to(".panelism span", { width: 200, ease: "expo" }, "twelvth")

        .to(frames, updateFrame(1280), "thirteenth")
        .to("canvas", { scale: 1, ease: "linear" }, "thirteenth")

        .to(frames, updateFrame(1300), "fourteenth")
        .to(".panelism", { scale: 2, ease: "circ" }, "fourteenth")

        .to(frames, updateFrame(1345), "fifteen")
        .to(".panelism", { scale: 2, ease: "circ" }, "fifteen")

    // Re-load the current frame on window resize
    window.addEventListener("resize", function () {
        loadImage(Math.floor(frames.currentIndex));
    });

    document.querySelectorAll(".headings h3")
    .forEach(function (elem) {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 90%",
                end: "bottom 20%",
                scrub: 2
            },
            opacity: 0.3
        })
    })
}

// Start preloading images
preloadImages();


const lenis = new Lenis();
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)