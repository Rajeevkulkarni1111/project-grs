window.addEventListener("load", () => {

    const tl = gsap.timeline();

    // Sun
    tl.from(".sun", {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    });

    // G
    tl.fromTo(".letter:nth-child(1)",
        {
            x: -120,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 0.6
        }
    );

    // R
    tl.fromTo(".letter:nth-child(2)",
        {
            y: -120,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.6
        },
        "-=0.3"
    );

    // S
    tl.fromTo(".letter:nth-child(3)",
        {
            x: 120,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 0.6
        },
        "-=0.3"
    );

    // Gift
    tl.to(".gift", {
        opacity: 1,
        y: -5,
        duration: 0.5
    });

    // Name
    tl.to(".name", {
        opacity: 1,
        y: -5,
        duration: 0.5
    });

    // Button
    tl.to("#beginBtn", {
        opacity: 1,
        scale: 1,
        duration: 0.6
    });

});